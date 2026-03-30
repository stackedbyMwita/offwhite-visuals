import type { MDXComponents } from 'mdx/types'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Headings
    h1: ({ children }) => (
      <h1 className="text-4xl md:text-5xl font-bold font-serif tracking-tight leading-tight mt-12 mb-6 text-foreground">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl md:text-3xl font-bold font-serif tracking-tight mt-10 mb-4 text-foreground border-b border-border/40 pb-3">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-bold font-serif mt-8 mb-3 text-foreground">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-base font-bold mt-6 mb-2 text-foreground">
        {children}
      </h4>
    ),

    // Body
    p: ({ children }) => (
      <p className="text-base text-muted-foreground leading-[1.85] mb-5">
        {children}
      </p>
    ),
    strong: ({ children }) => (
      <strong className="font-bold text-foreground">{children}</strong>
    ),
    em: ({ children }) => (
      <em className="italic text-foreground/80">{children}</em>
    ),

    img: ({ src, alt }) => (
      <span className="block my-8">
        <span className="relative block w-full overflow-hidden rounded-2xl border border-border/30 shadow-md">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src ?? ''}
            alt={alt ?? ''}
            className="w-full h-auto object-cover"
            loading="lazy"
          />
        </span>
        {alt && alt !== '' && (
          <span className="block text-center text-xs text-muted-foreground mt-3 italic">
            {alt}
          </span>
        )}
      </span>
    ),

    // Lists
    ul: ({ children }) => (
      <ul className="my-5 pl-6 flex flex-col gap-2 list-none">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="my-5 pl-6 flex flex-col gap-2 list-decimal">
        {children}
      </ol>
    ),
    li: ({ children }) => (
      <li className="text-base text-muted-foreground leading-relaxed flex gap-3 items-start">
        <span
          className="mt-2 size-1.5 rounded-full shrink-0"
          style={{ backgroundColor: 'oklch(0.78 0.14 196)' }}
        />
        <span>{children}</span>
      </li>
    ),

    // Blockquote
    blockquote: ({ children }) => (
      <blockquote
        className="my-8 pl-6 py-1 border-l-4 italic font-serif text-lg text-foreground/70"
        style={{ borderColor: 'oklch(0.78 0.14 196)' }}
      >
        {children}
      </blockquote>
    ),

    // Code
    code: ({ children }) => (
      <code className="font-code text-sm bg-muted text-primary px-1.5 py-0.5 rounded">
        {children}
      </code>
    ),
    pre: ({ children }) => (
      <pre className="my-6 p-5 rounded-2xl bg-[#1a1a2e] overflow-x-auto text-sm font-mono leading-relaxed border border-white/5">
        {children}
      </pre>
    ),

    // HR
    hr: () => (
      <hr
        className="my-10 border-0 h-px"
        style={{
          background:
            'linear-gradient(90deg, oklch(0.78 0.14 196 / 0.4) 0%, transparent 100%)',
        }}
      />
    ),

    // Links
    a: ({ href, children }) => (
      <a
        href={href}
        target={href?.startsWith('http') ? '_blank' : undefined}
        rel={href?.startsWith('http') ? 'noreferrer' : undefined}
        className="text-primary underline underline-offset-4 decoration-primary/40 hover:decoration-primary transition-colors duration-200"
      >
        {children}
      </a>
    ),

    // Tables
    table: ({ children }) => (
      <div className="my-6 w-full overflow-x-auto rounded-xl border border-border/40">
        <table className="w-full text-sm">{children}</table>
      </div>
    ),
    thead: ({ children }) => (
      <thead className="bg-secondary text-foreground font-semibold">
        {children}
      </thead>
    ),
    tbody: ({ children }) => (
      <tbody className="divide-y divide-border/40">{children}</tbody>
    ),
    tr: ({ children }) => <tr className="hover:bg-secondary/50">{children}</tr>,
    th: ({ children }) => (
      <th className="px-4 py-3 text-left text-xs uppercase tracking-widest">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="px-4 py-3 text-muted-foreground">{children}</td>
    ),

    ...components,
  }
}