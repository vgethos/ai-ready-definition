interface EthosHeaderProps {
  onBack?: () => void;
  showBack?: boolean;
}

export default function EthosHeader({ onBack, showBack = true }: EthosHeaderProps) {
  return (
    <div className="flex items-center justify-between px-5 py-3">
      {/* Back arrow */}
      <div className="w-[80px]">
        {showBack && (
          <button onClick={onBack} className="p-1" aria-label="Go back">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#272727"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </button>
        )}
      </div>

      {/* ETHOS logo */}
      <span className="font-serif text-[18px] tracking-[0.2em] text-gray-100">
        ETHOS
      </span>

      {/* Help */}
      <div className="w-[80px] text-right">
        <div className="text-[10px] leading-[14px] tracking-[0.6px] uppercase" style={{ color: "#525252" }}>
          NEED HELP?
        </div>
        <div className="text-[14px] leading-5 tracking-[-0.14px]" style={{ color: "#04463e" }}>
          (415) 275-9050
        </div>
      </div>
    </div>
  );
}
