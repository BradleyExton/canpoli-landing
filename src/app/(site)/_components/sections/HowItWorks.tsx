"use client";

import { useState } from "react";
import { API_BASE_URL } from "@/lib/api";

const codeExample = `const response = await fetch(
  \`${API_BASE_URL}/v1/representatives/lookup?lat=\${lat}&lng=\${lng}\`
);

const data = await response.json();

// Access the MP and riding
console.log(data.name);
console.log(data.riding?.name);`;

export function HowItWorks() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(codeExample);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-24">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <h2 className="font-serif text-4xl font-bold tracking-tight mb-5">
              Simple Integration
            </h2>
            <p className="text-[var(--stone)] text-lg mb-8">
              A single GET request returns the current federal MP for any coordinates. No API
              keys required. Just lat/lng in, MP out.
            </p>
            <a
              href="https://github.com/BradleyExton/canpoli-api#api-endpoints"
              target="_blank"
              rel="noopener noreferrer"
              data-track-event="github_click"
              data-track-location="how_it_works"
              className="inline-block px-7 py-3.5 bg-[var(--ink)] hover:bg-[#333] text-white font-semibold rounded-[10px] transition-all hover:-translate-y-0.5 hover:shadow-lg"
            >
              View Full Docs
            </a>
          </div>

          {/* Code Block */}
          <div className="bg-[var(--ink)] rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(28,28,28,0.35)]">
            <div className="px-5 py-3 bg-white/5 flex justify-between items-center">
              <span className="font-mono text-xs text-white/50">JavaScript</span>
              <button
                onClick={handleCopy}
                data-track-event="code_copy"
                data-track-context="how_it_works_example"
                className="px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-md text-xs text-white/70 hover:text-white transition-colors"
              >
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <pre className="p-6 font-mono text-sm leading-[1.7] text-[var(--code-base)] overflow-x-auto">
              <code>
                <span className="text-[var(--code-keyword)]">const</span>{' '}
                <span className="text-[var(--code-key)]">response</span> ={' '}
                <span className="text-[var(--code-keyword)]">await</span>{' '}
                <span className="text-[var(--code-function)]">fetch</span>(
                {'\n'}
                {'  '}
                <span className="text-[var(--code-string)]">{`\`${API_BASE_URL}/v1/representatives/lookup?lat=\${lat}&lng=\${lng}\``}</span>
                {'\n'});
                {'\n\n'}
                <span className="text-[var(--code-keyword)]">const</span>{' '}
                <span className="text-[var(--code-key)]">data</span> ={' '}
                <span className="text-[var(--code-keyword)]">await</span>{' '}
                <span className="text-[var(--code-key)]">response</span>.
                <span className="text-[var(--code-function)]">json</span>();
                {'\n\n'}
                <span className="text-[var(--code-comment)]">{'// Access the MP and riding'}</span>
                {'\n'}
                <span className="text-[var(--code-key)]">console</span>.
                <span className="text-[var(--code-function)]">log</span>(
                <span className="text-[var(--code-key)]">data</span>.
                <span className="text-[var(--code-key)]">name</span>);
                {'\n'}
                <span className="text-[var(--code-key)]">console</span>.
                <span className="text-[var(--code-function)]">log</span>(
                <span className="text-[var(--code-key)]">data</span>.
                <span className="text-[var(--code-key)]">riding</span>?.
                <span className="text-[var(--code-key)]">name</span>);
              </code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}
