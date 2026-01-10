interface BadgeProps {
  level: 'federal' | 'provincial' | 'municipal';
  children: React.ReactNode;
}

const levelStyles = {
  federal: 'bg-[var(--federal)]/20 text-[var(--federal)] border-[var(--federal)]/30',
  provincial: 'bg-[var(--provincial)]/20 text-[var(--provincial)] border-[var(--provincial)]/30',
  municipal: 'bg-[var(--municipal)]/20 text-[var(--municipal)] border-[var(--municipal)]/30',
};

export function Badge({ level, children }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${levelStyles[level]}`}
    >
      {children}
    </span>
  );
}
