interface DateInputProps {
  label: string;
  value: string;
  onChange?: (value: string) => void;
}

export default function DateInput({ label, value, onChange }: DateInputProps) {
  const handleFocus = () => {
    // Auto-populate with a sample date if empty (for demo purposes)
    if (!value && onChange) {
      onChange("01/15/1990");
    }
  };

  return (
    <div className="mb-4">
      <label className="block text-[12px] text-gray-60 mb-1.5 font-sans">
        {label}
      </label>
      <input
        type="text"
        value={value}
        placeholder="mm/dd/yyyy"
        onChange={(e) => onChange?.(e.target.value)}
        onFocus={handleFocus}
        className="w-full h-[56px] px-4 rounded-lg border border-gray-20 text-gray-100 font-sans text-[16px] outline-none bg-white transition-colors focus:border-cypress-100"
      />
    </div>
  );
}
