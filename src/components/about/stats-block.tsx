export function StatsBlock() {
  const stats = [
    { value: "3+", label: "Years of Experience" },
    { value: "AI Lab", label: "Research Affiliation" },
    { value: "NLP/ML", label: "Focus Area" },
  ];

  return (
    <div className="grid grid-cols-3 gap-4 sm:gap-6 self-start">
      {stats.map((stat) => (
        <div key={stat.label} className="text-center">
          <div className="text-2xl font-bold text-accent sm:text-3xl">
            {stat.value}
          </div>
          <div className="mt-1 text-xs text-muted-foreground sm:text-sm">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
}
