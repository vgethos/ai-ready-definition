interface SelectDropdownProps {
  label: string;
  value: string;
  options: string[];
  placeholder?: string;
  onChange?: (value: string) => void;
}

export default function SelectDropdown({
  label,
  value,
  options,
  placeholder,
  onChange,
}: SelectDropdownProps) {
  return (
    <div className="mb-4">
      <label className="block text-[12px] text-gray-60 mb-1.5 font-sans">
        {label}
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          className="w-full h-[56px] px-4 pr-10 rounded-lg border border-gray-20 text-gray-100 font-sans text-[16px] outline-none bg-white appearance-none transition-colors focus:border-cypress-100"
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        {/* Chevron */}
        <svg
          className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          stroke="#727272"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 6l4 4 4-4" />
        </svg>
      </div>
    </div>
  );
}
