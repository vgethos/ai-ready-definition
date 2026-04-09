interface CurrencyInputProps {
  label: string;
  value: string;
  placeholder?: string;
  hint?: string;
  onChange?: (value: string) => void;
}

export default function CurrencyInput({
  label,
  value,
  placeholder = "0",
  hint,
  onChange,
}: CurrencyInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Strip non-numeric characters except decimal point
    const raw = e.target.value.replace(/[^0-9]/g, "");
    onChange?.(raw);
  };

  const displayValue = value ? `$${Number(value).toLocaleString()}` : "";

  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-1.5">
        <label className="block text-[12px] text-gray-60 font-sans">
          {label}
        </label>
        {hint && (
          <span className="text-[11px] text-cypress-100 font-sans">{hint}</span>
        )}
      </div>
      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-60 font-sans text-[16px] pointer-events-none">
          $
        </span>
        <input
          type="text"
          inputMode="numeric"
          value={value ? Number(value).toLocaleString() : ""}
          placeholder={placeholder}
          onChange={handleChange}
          className="w-full h-[56px] pl-8 pr-4 rounded-lg border border-gray-20 text-gray-100 font-sans text-[16px] outline-none bg-white transition-colors focus:border-cypress-100"
        />
      </div>
    </div>
  );
}
