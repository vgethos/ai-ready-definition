interface PrimaryButtonProps {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
}

export default function PrimaryButton({
  label,
  onClick,
  disabled = false,
}: PrimaryButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="w-full min-h-[64px] bg-gray-100 text-white font-sans font-medium text-[20px] rounded-lg transition-opacity hover:opacity-90 active:opacity-80 disabled:opacity-40"
    >
      {label}
    </button>
  );
}
