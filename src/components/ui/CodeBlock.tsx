'use client';

import React, { useState } from 'react';

interface CodeBlockProps {
  code: string;
  language: 'bash' | 'typescript' | 'json' | 'javascript';
  title?: string;
  showCopy?: boolean;
}

export function CodeBlock({ code, language, title, showCopy = true }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const highlightCode = (code: string, lang: string) => {
    if (lang === 'bash') {
      return code.split('\n').map((line, i) => {
        if (line.startsWith('#')) {
          return <span key={i} className="text-[#6A9955]">{line}{'\n'}</span>;
        }
        if (line.startsWith('curl')) {
          return (
            <span key={i}>
              <span className="text-[#DCDCAA]">curl</span>
              <span className="text-[#CE9178]">{line.slice(4)}</span>
              {'\n'}
            </span>
          );
        }
        return <span key={i}>{line}{'\n'}</span>;
      });
    }

    if (lang === 'javascript' || lang === 'typescript') {
      // Simple line-by-line highlighting with basic keyword coloring
      return code.split('\n').map((line, i) => {
        // Full line comments
        if (line.trim().startsWith('//')) {
          return <span key={i} style={{ color: '#6A9955' }}>{line}{'\n'}</span>;
        }

        // Simple keyword-based highlighting using word boundaries
        const keywords = ['const', 'let', 'var', 'async', 'await', 'function', 'return', 'import', 'from', 'export'];
        const parts: React.ReactNode[] = [];

        // Split by spaces and special characters while keeping delimiters
        const tokens = line.split(/(\s+|[(){}[\];,.])/);

        tokens.forEach((token, idx) => {
          if (keywords.includes(token)) {
            parts.push(<span key={`${i}-${idx}`} style={{ color: '#C586C0' }}>{token}</span>);
          } else if (token.startsWith('`') || token.startsWith('"') || token.startsWith("'")) {
            parts.push(<span key={`${i}-${idx}`} style={{ color: '#CE9178' }}>{token}</span>);
          } else {
            parts.push(<span key={`${i}-${idx}`}>{token}</span>);
          }
        });

        return <span key={i}>{parts}{'\n'}</span>;
      });
    }

    if (lang === 'json') {
      let result = code;
      result = result.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
      result = result.replace(/"([^"]+)":/g, '<span style="color:#9CDCFE">"$1"</span>:');
      result = result.replace(/: "([^"]+)"/g, ': <span style="color:#CE9178">"$1"</span>');
      result = result.replace(/: (\d+)/g, ': <span style="color:#B5CEA8">$1</span>');
      result = result.replace(/: (null|true|false)/g, ': <span style="color:#569CD6">$1</span>');

      return <span dangerouslySetInnerHTML={{ __html: result }} />;
    }

    return code;
  };

  return (
    <div className="bg-[var(--code-bg)] rounded-xl overflow-hidden border border-[var(--border)]">
      {(title || showCopy) && (
        <div className="flex items-center justify-between px-4 py-2 bg-[var(--surface)] border-b border-[var(--border)]">
          <span className="font-mono text-xs text-[var(--text-secondary)]">
            {title || language}
          </span>
          {showCopy && (
            <button
              onClick={handleCopy}
              className="px-2 py-1 text-xs bg-[var(--border)] hover:bg-[var(--text-secondary)]/30 text-[var(--text-secondary)] hover:text-[var(--text-primary)] rounded transition-colors"
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
          )}
        </div>
      )}
      <pre className="p-4 overflow-x-auto font-mono text-sm leading-relaxed text-[var(--text-primary)]">
        <code>{highlightCode(code, language)}</code>
      </pre>
    </div>
  );
}
