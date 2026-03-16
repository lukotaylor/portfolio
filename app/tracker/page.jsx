"use client";

import { useState, useEffect, useRef } from "react";
import { useTheme } from "../components/ui/ThemeProvider";
import { themeModes } from "../data/themes";
import ToolkitBackLink from "../components/ui/ToolkitBackLink";

const STORAGE_KEY = "portfolio-launch-todos";

const DIFFICULTY_COLORS = {
  1: { bg: "rgba(134, 239, 172, 0.15)", color: "#4ade80" },
  2: { bg: "rgba(253, 186, 116, 0.15)", color: "#fb923c" },
  3: { bg: "rgba(252, 165, 165, 0.15)", color: "#f87171" },
};

export default function TrackerPage() {
  const { theme, setTheme } = useTheme();
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  const [sortByDifficulty, setSortByDifficulty] = useState(false);
  const [dragId, setDragId] = useState(null);
  const [dragOver, setDragOver] = useState(null);
  const editRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Migrate old format (done: bool) to new (status: string)
        setTodos(parsed.map(t => ({
          ...t,
          status: t.status ?? (t.done ? "done" : "todo"),
        })));
      }
    } catch {
      setTodos([]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    if (editingId !== null && editRef.current) {
      editRef.current.focus();
      const len = editRef.current.value.length;
      editRef.current.setSelectionRange(len, len);
    }
  }, [editingId]);

  const progressItems = todos.filter(t => t.status !== "backlog");
  const doneCount = todos.filter(t => t.status === "done").length;
  const total = progressItems.length;
  const progress = total === 0 ? 0 : Math.round((doneCount / total) * 100);

  function addTodo() {
    const text = input.trim();
    if (!text) return;
    setTodos(prev => [...prev, { id: Date.now(), text, status: "todo", difficulty: null }]);
    setInput("");
    inputRef.current?.focus();
  }

  function toggleDone(id) {
    setTodos(prev => prev.map(t => {
      if (t.id !== id) return t;
      if (t.status === "done") return { ...t, status: "todo" };
      return { ...t, status: "done" };
    }));
  }

  function moveItem(id, newStatus) {
    setTodos(prev => prev.map(t => t.id === id ? { ...t, status: newStatus } : t));
  }

  function deleteTodo(id) {
    setTodos(prev => prev.filter(t => t.id !== id));
  }

  function startEdit(todo) {
    setEditingId(todo.id);
    setEditText(todo.text);
  }

  function commitEdit(id) {
    const text = editText.trim();
    if (text) setTodos(prev => prev.map(t => t.id === id ? { ...t, text } : t));
    setEditingId(null);
  }

  function setDifficulty(id, level) {
    setTodos(prev => prev.map(t => t.id === id ? { ...t, difficulty: t.difficulty === level ? null : level } : t));
  }

  function handleDragStart(e, id) {
    setDragId(id);
    e.dataTransfer.effectAllowed = "move";
  }

  function handleDragOver(e, sectionKey) {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setDragOver(sectionKey);
  }

  function handleDrop(e, sectionKey) {
    e.preventDefault();
    if (dragId !== null) moveItem(dragId, sectionKey);
    setDragId(null);
    setDragOver(null);
  }

  function handleDragEnd() {
    setDragId(null);
    setDragOver(null);
  }

  const todoItems = (() => {
    const list = todos.filter(t => t.status === "todo");
    if (!sortByDifficulty) return list;
    return [...list].sort((a, b) => (a.difficulty ?? 99) - (b.difficulty ?? 99));
  })();
  const doneItems = todos.filter(t => t.status === "done");
  const backlogItems = todos.filter(t => t.status === "backlog");

  const sharedRowProps = { editingId, editText, editRef, onToggle: toggleDone, onDelete: deleteTodo, onStartEdit: startEdit, onCommitEdit: commitEdit, onEditTextChange: setEditText, onEditKeyDown: (e, id) => { if (e.key === "Enter") commitEdit(id); if (e.key === "Escape") setEditingId(null); }, onSetDifficulty: setDifficulty, onDragStart: handleDragStart, onDragEnd: handleDragEnd, dragId };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "var(--color-bg-primary)", color: "var(--color-text-primary)", fontFamily: "inherit" }}>

      {/* Top bar */}
      <div style={{ position: "sticky", top: 0, zIndex: 100, padding: "16px 32px", borderBottom: "1px solid var(--color-border)", backgroundColor: "var(--color-bg-primary)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <ToolkitBackLink />
      </div>

      <div style={{ padding: "48px 24px" }}>
      <div style={{ maxWidth: 600, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ marginBottom: 40 }}>
          <p style={{ fontSize: "0.75rem", color: "var(--color-accent)", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", margin: "0 0 8px" }}>Launch Tracker</p>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 600, margin: "0 0 4px", color: "var(--color-text-primary)" }}>Portfolio Launch</h1>
          <p style={{ fontSize: "0.875rem", color: "var(--color-text-tertiary)", margin: 0 }}>{doneCount} of {total} tasks complete</p>
        </div>

        {/* Progress bar */}
        <div style={{ marginBottom: 40 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <span style={{ fontSize: "0.8125rem", color: "var(--color-text-secondary)", fontWeight: 500 }}>Progress</span>
            <span style={{ fontSize: "0.8125rem", color: "var(--color-accent)", fontWeight: 600 }}>{progress}%</span>
          </div>
          <div style={{ width: "100%", height: 6, borderRadius: 99, backgroundColor: "var(--color-button-tonal-bg)", overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${progress}%`, borderRadius: 99, backgroundColor: "var(--color-accent)", transition: "width 0.4s ease" }} />
          </div>
        </div>

        {/* Add input */}
        <div style={{ display: "flex", gap: 8, marginBottom: 40 }}>
          <input ref={inputRef} value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && addTodo()} placeholder="Add a task..." style={{ flex: 1, padding: "10px 14px", borderRadius: 10, border: "1px solid var(--color-border)", backgroundColor: "var(--color-bg-card)", color: "var(--color-text-primary)", fontSize: "0.875rem", outline: "none", fontFamily: "inherit" }} />
          <button onClick={addTodo} style={{ padding: "10px 18px", borderRadius: 10, border: "none", backgroundColor: "var(--color-accent)", color: "var(--color-button-primary-text)", fontSize: "0.875rem", fontWeight: 600, cursor: "pointer", fontFamily: "inherit", whiteSpace: "nowrap" }}>Add</button>
        </div>

        {/* To Do */}
        <Section
          sectionKey="todo"
          label="To do"
          count={todoItems.length}
          isDragOver={dragOver === "todo"}
          onDragOver={e => handleDragOver(e, "todo")}
          onDrop={e => handleDrop(e, "todo")}
          onDragLeave={() => setDragOver(null)}
          headerRight={
            <button onClick={() => setSortByDifficulty(v => !v)} style={{ fontSize: "0.6875rem", fontWeight: 600, fontFamily: "inherit", cursor: "pointer", border: "none", borderRadius: 6, padding: "3px 8px", backgroundColor: sortByDifficulty ? "var(--color-accent)" : "var(--color-button-tonal-bg)", color: sortByDifficulty ? "var(--color-button-primary-text)" : "var(--color-text-tertiary)", transition: "all 0.15s ease" }}>
              Easy first
            </button>
          }
        >
          {todoItems.map(todo => (
            <TodoRow key={todo.id} todo={todo} {...sharedRowProps} />
          ))}
        </Section>

        {/* Done */}
        <Section
          sectionKey="done"
          label="Done"
          count={doneItems.length}
          isDragOver={dragOver === "done"}
          onDragOver={e => handleDragOver(e, "done")}
          onDrop={e => handleDrop(e, "done")}
          onDragLeave={() => setDragOver(null)}
        >
          {doneItems.map(todo => (
            <TodoRow key={todo.id} todo={todo} {...sharedRowProps} />
          ))}
        </Section>

        {/* Backlog */}
        <Section
          sectionKey="backlog"
          label="Backlog"
          count={backlogItems.length}
          isDragOver={dragOver === "backlog"}
          onDragOver={e => handleDragOver(e, "backlog")}
          onDrop={e => handleDrop(e, "backlog")}
          onDragLeave={() => setDragOver(null)}
          muted
        >
          {backlogItems.map(todo => (
            <TodoRow key={todo.id} todo={todo} {...sharedRowProps} />
          ))}
        </Section>

        {todos.length === 0 && (
          <p style={{ textAlign: "center", color: "var(--color-text-tertiary)", fontSize: "0.875rem", marginTop: 40 }}>No tasks yet. Add one above.</p>
        )}

      </div>
      </div>
    </div>
  );
}

function Section({ sectionKey, label, count, isDragOver, onDragOver, onDrop, onDragLeave, headerRight, muted, children }) {
  return (
    <div style={{ marginBottom: 32 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
        <p style={{ fontSize: "0.75rem", fontWeight: 600, color: muted ? "var(--color-text-tertiary)" : "var(--color-text-tertiary)", letterSpacing: "0.06em", textTransform: "uppercase", margin: 0 }}>
          {label} · {count}
        </p>
        {headerRight}
      </div>
      <div
        onDragOver={onDragOver}
        onDrop={onDrop}
        onDragLeave={onDragLeave}
        style={{
          minHeight: 40,
          borderRadius: 12,
          outline: isDragOver ? "2px dashed var(--color-accent)" : "2px dashed transparent",
          outlineOffset: 4,
          transition: "outline-color 0.15s ease",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {children}
        </div>
        {count === 0 && (
          <p style={{ textAlign: "center", fontSize: "0.75rem", color: "var(--color-text-tertiary)", margin: "8px 0", opacity: isDragOver ? 1 : 0.5 }}>
            {isDragOver ? "Drop here" : "Empty"}
          </p>
        )}
      </div>
    </div>
  );
}

function TodoRow({ todo, editingId, editText, editRef, onToggle, onDelete, onStartEdit, onCommitEdit, onEditTextChange, onEditKeyDown, onSetDifficulty, onDragStart, onDragEnd, dragId }) {
  const [hovered, setHovered] = useState(false);
  const isEditing = editingId === todo.id;
  const isDragging = dragId === todo.id;
  const isDone = todo.status === "done";

  return (
    <div
      draggable
      onDragStart={e => onDragStart(e, todo.id)}
      onDragEnd={onDragEnd}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "10px 12px",
        borderRadius: 10,
        backgroundColor: isDragging ? "var(--color-button-tonal-bg)" : hovered ? "var(--color-bg-card)" : "transparent",
        opacity: isDragging ? 0.4 : 1,
        cursor: "grab",
        transition: "background-color 0.15s ease, opacity 0.15s ease",
      }}
    >
      {/* Checkbox */}
      <button
        onClick={() => onToggle(todo.id)}
        aria-label={isDone ? "Mark incomplete" : "Mark complete"}
        style={{ flexShrink: 0, alignSelf: "flex-start", marginTop: 2, width: 18, height: 18, borderRadius: 5, border: isDone ? "none" : "1.5px solid var(--color-border)", backgroundColor: isDone ? "var(--color-accent)" : "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: 0 }}
      >
        {isDone && (
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M1.5 5L3.8 7.5L8.5 2.5" stroke="var(--color-button-primary-text)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </button>

      {/* Text + difficulty */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 8, minWidth: 0 }}>
        {isEditing ? (
          <input ref={editRef} value={editText} onChange={e => onEditTextChange(e.target.value)} onKeyDown={e => onEditKeyDown(e, todo.id)} onBlur={() => onCommitEdit(todo.id)} style={{ flex: 1, background: "none", border: "none", borderBottom: "1px solid var(--color-accent)", color: "var(--color-text-primary)", fontSize: "0.875rem", fontFamily: "inherit", outline: "none", padding: "0 0 2px" }} />
        ) : (
          <span onDoubleClick={() => onStartEdit(todo)} style={{ fontSize: "0.875rem", color: isDone ? "var(--color-text-tertiary)" : "var(--color-text-primary)", textDecoration: isDone ? "line-through" : "none", cursor: "text", lineHeight: 1.5 }}>
            {todo.text}
          </span>
        )}

        {/* Difficulty bars */}
        <div style={{ display: "flex", alignItems: "flex-end", gap: 2, height: 14, flexShrink: 0, opacity: hovered || todo.difficulty ? 1 : 0, transition: "opacity 0.15s ease" }}>
          {[1, 2, 3].map(level => {
            const filled = todo.difficulty !== null && level <= todo.difficulty;
            const color = filled ? DIFFICULTY_COLORS[todo.difficulty].color : "var(--color-border)";
            const barHeight = level === 1 ? 6 : level === 2 ? 10 : 14;
            return (
              <button key={level} onClick={() => onSetDifficulty(todo.id, level)} aria-label={`Difficulty ${level}`} style={{ width: 6, height: barHeight, borderRadius: 2, border: "none", backgroundColor: color, cursor: "pointer", padding: 0, transition: "background-color 0.15s ease" }} />
            );
          })}
        </div>
      </div>

      {/* Actions */}
      <div style={{ display: "flex", gap: 4, opacity: hovered ? 1 : 0, transition: "opacity 0.15s ease" }}>
        <button onClick={() => onStartEdit(todo)} aria-label="Edit" style={{ width: 28, height: 28, borderRadius: 7, border: "none", backgroundColor: "var(--color-button-tonal-bg)", color: "var(--color-text-secondary)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: 0 }}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M8.5 1.5L10.5 3.5L4 10H2V8L8.5 1.5Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <button onClick={() => onDelete(todo.id)} aria-label="Delete" style={{ width: 28, height: 28, borderRadius: 7, border: "none", backgroundColor: "var(--color-button-tonal-bg)", color: "var(--color-text-secondary)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: 0 }}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 3H10M4.5 3V2h3v1M4 3l.5 7h3L8 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
      </div>
    </div>
  );
}
