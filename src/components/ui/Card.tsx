interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className = '', hover = false }: CardProps) {
  return (
    <div
      className={`
        bg-[var(--surface)]
        border border-[var(--border)]
        rounded-2xl
        ${hover ? 'transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/20 hover:border-[var(--text-secondary)]/30' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
