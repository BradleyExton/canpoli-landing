'use client';

import { useState } from 'react';

const codeExample = `const response = await fetch(
  \`https://api.canpoli.dev/civic/?lat=\${lat}&lng=\${lng}\`
);

const data = await response.json();

// Access representatives
console.log(data.representatives.federal.name);
// → "Yasir Naqvi"`;

export function HowItWorks() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const plainCode = `const response = await fetch(
  \`https://api.canpoli.dev/civic/?lat=\${lat}&lng=\${lng}\`
);

const data = await response.json();

// Access representatives
console.log(data.representatives.federal.name);`;

    await navigator.clipboard.writeText(plainCode);
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
              A single GET request returns all the political context you need. No API keys required, no complex authentication. Just coordinates in, representatives out.
            </p>
            <a
              href="https://github.com/BradleyExton/canpoli-api#api-endpoints"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-7 py-3.5 bg-[var(--ink)] hover:bg-[#333] text-white font-semibold rounded-[10px] transition-all hover:-translate-y-0.5 hover:shadow-lg"
            >
              View Full Docs
            </a>
          </div>

          {/* Code Block */}
          <div className="bg-[var(--ink)] rounded-2xl overflow-hidden">
            <div className="px-5 py-3 bg-white/5 flex justify-between items-center">
              <span className="font-mono text-xs text-white/50">JavaScript</span>
              <button
                onClick={handleCopy}
                className="px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-md text-xs text-white/70 hover:text-white transition-colors"
              >
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <pre className="p-6 font-mono text-sm leading-[1.7] text-[#E5E5E5] overflow-x-auto">
              <code>
                <span className="text-[#C586C0]">const</span>{' '}
                <span className="text-[#9CDCFE]">response</span> ={' '}
                <span className="text-[#C586C0]">await</span>{' '}
                <span className="text-[#DCDCAA]">fetch</span>(
                {'\n'}
                {'  '}
                <span className="text-[#CE9178]">{`\`https://api.canpoli.dev/civic/?lat=\${lat}&lng=\${lng}\``}</span>
                {'\n'});
                {'\n\n'}
                <span className="text-[#C586C0]">const</span>{' '}
                <span className="text-[#9CDCFE]">data</span> ={' '}
                <span className="text-[#C586C0]">await</span>{' '}
                <span className="text-[#9CDCFE]">response</span>.
                <span className="text-[#DCDCAA]">json</span>();
                {'\n\n'}
                <span className="text-[#6A9955]">{'// Access representatives'}</span>
                {'\n'}
                <span className="text-[#9CDCFE]">console</span>.
                <span className="text-[#DCDCAA]">log</span>(
                <span className="text-[#9CDCFE]">data</span>.
                <span className="text-[#9CDCFE]">representatives</span>.
                <span className="text-[#9CDCFE]">federal</span>.
                <span className="text-[#9CDCFE]">name</span>);
                {'\n'}
                <span className="text-[#6A9955]">{'// → "Yasir Naqvi"'}</span>
              </code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}
