import { useEffect, useMemo, useRef, useState } from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import TurndownService from 'turndown';
import { marked } from 'marked';

type Note = {
  id: string;
  title: string;
  markdown: string;
  updatedAt: number;
};

const STORAGE_KEY = 'md-notes-v1';
const DEFAULT_MD = '# 新建笔记\n\n在这里开始记录你的想法。';

const turndown = new TurndownService({ headingStyle: 'atx', codeBlockStyle: 'fenced' });

function markdownToHtml(markdown: string) {
  return marked.parse(markdown, { async: false }) as string;
}

function htmlToMarkdown(html: string) {
  return turndown.turndown(html).trim();
}

function titleFromMarkdown(markdown: string) {
  const firstLine = markdown
    .split('\n')
    .map((line) => line.trim())
    .find(Boolean);

  if (!firstLine) {
    return '未命名笔记';
  }

  const cleaned = firstLine.replace(/^#+\s*/, '').replace(/[\*_`~>#-]/g, '').trim();
  return cleaned || '未命名笔记';
}

function createNote(seed?: Partial<Note>): Note {
  const markdown = seed?.markdown ?? DEFAULT_MD;
  return {
    id: seed?.id ?? crypto.randomUUID(),
    title: seed?.title ?? titleFromMarkdown(markdown),
    markdown,
    updatedAt: seed?.updatedAt ?? Date.now()
  };
}

function loadNotes(): Note[] {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return [createNote()];
  }

  try {
    const parsed = JSON.parse(raw) as Note[];
    if (!Array.isArray(parsed) || parsed.length === 0) {
      return [createNote()];
    }

    return parsed
      .filter((item) => item && typeof item.id === 'string' && typeof item.markdown === 'string')
      .map((item) => createNote(item));
  } catch {
    return [createNote()];
  }
}

function App() {
  const [notes, setNotes] = useState<Note[]>(() => loadNotes());
  const [activeId, setActiveId] = useState<string>(() => loadNotes()[0].id);
  const [query, setQuery] = useState('');
  const activeIdRef = useRef(activeId);
  const isHydratingRef = useRef(false);

  useEffect(() => {
    activeIdRef.current = activeId;
  }, [activeId]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  }, [notes]);

  const visibleNotes = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      return notes;
    }

    return notes.filter((note) => {
      return (
        note.title.toLowerCase().includes(q) ||
        note.markdown.toLowerCase().includes(q)
      );
    });
  }, [notes, query]);

  const activeNote = useMemo(() => {
    return notes.find((item) => item.id === activeId) ?? notes[0];
  }, [notes, activeId]);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: '开始输入 Markdown 笔记内容...'
      })
    ],
    content: markdownToHtml(activeNote?.markdown ?? DEFAULT_MD),
    onUpdate: ({ editor: currentEditor }) => {
      if (isHydratingRef.current) {
        return;
      }

      const nextMarkdown = htmlToMarkdown(currentEditor.getHTML());
      const currentId = activeIdRef.current;

      setNotes((prev) => {
        return prev.map((note) => {
          if (note.id !== currentId) {
            return note;
          }

          return {
            ...note,
            markdown: nextMarkdown,
            title: titleFromMarkdown(nextMarkdown),
            updatedAt: Date.now()
          };
        });
      });
    }
  });

  useEffect(() => {
    if (!editor || !activeNote) {
      return;
    }

    const currentMarkdown = htmlToMarkdown(editor.getHTML());
    if (currentMarkdown === activeNote.markdown.trim()) {
      return;
    }

    isHydratingRef.current = true;
    editor.commands.setContent(markdownToHtml(activeNote.markdown), {
      emitUpdate: false
    });
    isHydratingRef.current = false;
  }, [editor, activeNote]);

  function createNewNote() {
    const note = createNote();
    setNotes((prev) => [note, ...prev]);
    setActiveId(note.id);
  }

  function deleteNote(id: string) {
    setNotes((prev) => {
      if (prev.length === 1) {
        const replacement = createNote();
        setActiveId(replacement.id);
        return [replacement];
      }

      const next = prev.filter((note) => note.id !== id);
      if (activeIdRef.current === id) {
        setActiveId(next[0].id);
      }

      return next;
    });
  }

  return (
    <main className="notes-shell">
      <aside className="notes-sidebar">
        <div className="sidebar-top">
          <h1>笔记仓</h1>
          <button type="button" className="action-btn" onClick={createNewNote}>
            新建
          </button>
        </div>
        <input
          className="search-input"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="搜索标题或正文"
        />
        <div className="note-list">
          {visibleNotes.map((note) => {
            const isActive = note.id === activeNote?.id;

            return (
              <article
                key={note.id}
                className={isActive ? 'note-item note-item-active' : 'note-item'}
                onClick={() => setActiveId(note.id)}
              >
                <div>
                  <h2>{note.title}</h2>
                  <p>{new Date(note.updatedAt).toLocaleString()}</p>
                </div>
                <button
                  type="button"
                  className="delete-btn"
                  onClick={(event) => {
                    event.stopPropagation();
                    deleteNote(note.id);
                  }}
                >
                  删除
                </button>
              </article>
            );
          })}
        </div>
      </aside>

      <section className="editor-panel">
        <header className="toolbar">
          <button
            type="button"
            className={editor?.isActive('bold') ? 'tool tool-active' : 'tool'}
            onClick={() => editor?.chain().focus().toggleBold().run()}
          >
            粗体
          </button>
          <button
            type="button"
            className={editor?.isActive('italic') ? 'tool tool-active' : 'tool'}
            onClick={() => editor?.chain().focus().toggleItalic().run()}
          >
            斜体
          </button>
          <button
            type="button"
            className={editor?.isActive('heading', { level: 2 }) ? 'tool tool-active' : 'tool'}
            onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
          >
            H2
          </button>
          <button
            type="button"
            className={editor?.isActive('bulletList') ? 'tool tool-active' : 'tool'}
            onClick={() => editor?.chain().focus().toggleBulletList().run()}
          >
            列表
          </button>
          <button
            type="button"
            className={editor?.isActive('codeBlock') ? 'tool tool-active' : 'tool'}
            onClick={() => editor?.chain().focus().toggleCodeBlock().run()}
          >
            代码块
          </button>
          <button type="button" className="tool" onClick={() => editor?.chain().focus().undo().run()}>
            撤销
          </button>
          <button type="button" className="tool" onClick={() => editor?.chain().focus().redo().run()}>
            重做
          </button>
        </header>

        <div className="editor-wrap">
          <EditorContent editor={editor} className="editor-content" />
        </div>

        <section className="markdown-preview">
          <h3>Markdown 预览</h3>
          <pre>{activeNote?.markdown ?? ''}</pre>
        </section>
      </section>
    </main>
  );
}

export default App;
