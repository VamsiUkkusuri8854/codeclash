export default function CodeEditor({ value, onChange }) {
  const n = value.split('\n').length;
  const onKey = (e) => {
    if (e.key !== 'Tab') return;
    e.preventDefault(); const t = e.target, p = t.selectionStart;
    onChange(value.slice(0, p) + '    ' + value.slice(t.selectionEnd));
    requestAnimationFrame(() => { t.selectionStart = t.selectionEnd = p + 4; });
  };
  return (
    <div className="editor">
      <pre className="gut">{Array.from({ length: n }, (_, i) => i + 1).join('\n')}</pre>
      <textarea spellCheck={false} wrap="off" value={value} style={{ height: n * 21 + 20 }} onChange={(e) => onChange(e.target.value)} onKeyDown={onKey} />
    </div>
  );
}
