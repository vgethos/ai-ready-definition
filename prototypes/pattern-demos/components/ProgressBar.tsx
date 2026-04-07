interface ProgressBarProps {
  progress: number; // 0–100
}

export default function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <div className="px-5 pb-2">
      <div className="h-[8px] rounded-full bg-accent-subtle4x overflow-hidden">
        <div
          className="h-full rounded-full bg-cypress-100 transition-all duration-300 ease-out"
          style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
        />
      </div>
    </div>
  );
}
