interface InfoBannerProps {
  message: string;
}

export default function InfoBanner({ message }: InfoBannerProps) {
  return (
    <div className="flex gap-3 p-4 rounded-lg bg-info-bg mb-6">
      {/* Heart icon */}
      <svg
        className="flex-shrink-0 mt-0.5"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
      >
        <path
          d="M10 17.5s-7-4.5-7-9.5A4 4 0 0 1 7 4a4.2 4.2 0 0 1 3 1.5A4.2 4.2 0 0 1 13 4a4 4 0 0 1 4 4c0 5-7 9.5-7 9.5z"
          fill="#244d8a"
        />
      </svg>
      <p className="text-info-text text-[13px] font-sans leading-relaxed">
        {message}
      </p>
    </div>
  );
}
