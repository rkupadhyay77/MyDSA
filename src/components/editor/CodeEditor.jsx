import { useState, useRef } from 'react';
import { SUPPORTED_LANGUAGES } from '../../curriculum/curriculumData.js';

/**
 * Interactive Code Editor Component
 *
 * Supports:
 * - Language selector (Swift, Python, Java, C++, JavaScript)
 * - Synchronised line numbers
 * - Tab key 4-space indentation
 * - Copy to clipboard & Reset to starter template
 * - Font size zoom (+/-)
 * - Explicit execution status badge
 */
export default function CodeEditor({
  language,
  onLanguageChange,
  code,
  onChange,
  onReset,
  onLoadReference,
  readOnly = false,
}) {
  const [copied, setCopied] = useState(false);
  const [fontSize, setFontSize] = useState(14);
  const textareaRef = useRef(null);
  const lineNumbersRef = useRef(null);

  const lines = (code || '').split('\n');
  const currentLangMeta =
    SUPPORTED_LANGUAGES.find((l) => l.id === language) || SUPPORTED_LANGUAGES[0];

  const handleScroll = (e) => {
    if (lineNumbersRef.current) {
      lineNumbersRef.current.scrollTop = e.target.scrollTop;
    }
  };

  const handleKeyDown = (e) => {
    if (readOnly) return;
    if (e.key === 'Tab') {
      e.preventDefault();
      const target = e.target;
      const start = target.selectionStart;
      const end = target.selectionEnd;
      const indent = '    ';
      const nextCode = code.substring(0, start) + indent + code.substring(end);
      onChange(nextCode);
      requestAnimationFrame(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart = start + indent.length;
          textareaRef.current.selectionEnd = start + indent.length;
        }
      });
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="code-editor-shell">
      {/* Editor Toolbar */}
      <div className="code-editor-toolbar">
        <div className="editor-lang-group">
          <label htmlFor="editor-lang-select" className="sr-only">
            Programming Language
          </label>
          <select
            id="editor-lang-select"
            className="editor-lang-select"
            value={language}
            onChange={(e) => onLanguageChange(e.target.value)}
          >
            {SUPPORTED_LANGUAGES.map((lang) => (
              <option key={lang.id} value={lang.id}>
                {lang.name} ({lang.version})
              </option>
            ))}
          </select>
          <span className="editor-env-badge" title="Real compiler sandbox connects in Phase 2">
            ⚡ {currentLangMeta.name}: Prototype Static Runner
          </span>
        </div>

        <div className="editor-actions-group">
          <button
            type="button"
            className="btn btn-ghost btn-xs"
            onClick={() => setFontSize((f) => Math.max(12, f - 1))}
            title="Decrease font size"
          >
            A-
          </button>
          <button
            type="button"
            className="btn btn-ghost btn-xs"
            onClick={() => setFontSize((f) => Math.min(20, f + 1))}
            title="Increase font size"
          >
            A+
          </button>
          <button
            type="button"
            className="btn btn-secondary btn-xs"
            onClick={handleCopy}
          >
            {copied ? '✓ Copied' : 'Copy'}
          </button>
          {onReset && (
            <button
              type="button"
              className="btn btn-secondary btn-xs"
              onClick={onReset}
              title="Reset to starter code template"
            >
              ↺ Reset
            </button>
          )}
          {onLoadReference && (
            <button
              type="button"
              className="btn btn-secondary btn-xs"
              onClick={onLoadReference}
              title="Load optimal reference code into editor to test 10/10 rubric"
            >
              ★ Load Reference
            </button>
          )}
        </div>
      </div>

      {/* Main Editor Body with Line Numbers */}
      <div className="code-editor-body" style={{ fontSize: `${fontSize}px` }}>
        <div className="code-line-numbers" ref={lineNumbersRef} aria-hidden="true">
          {lines.map((_, idx) => (
            <div key={idx} className="code-line-num">
              {idx + 1}
            </div>
          ))}
        </div>

        <textarea
          ref={textareaRef}
          className="code-textarea"
          value={code}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          onScroll={handleScroll}
          readOnly={readOnly}
          spellCheck={false}
          autoCapitalize="off"
          autoComplete="off"
          autoCorrect="off"
          aria-label="Source code editor"
        />
      </div>

      <div className="code-editor-footer">
        <span>Lines: {lines.length}</span>
        <span>Tab = 4 spaces</span>
        <span>Language: {currentLangMeta.name}</span>
      </div>
    </div>
  );
}
