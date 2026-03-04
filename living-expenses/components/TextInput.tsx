interface TextInputProps {
  label: string;
  value: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  readOnly?: boolean;
}

export default function TextInput({
  label,
  value,
  placeholder,
  onChange,
  readOnly = false,
}: TextInputProps) {
  return (
    <div className="mb-4">
      <label className="block text-[12px] text-gray-60 mb-1.5 font-sans">
        {label}
      </label>
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange?.(e.target.value)}
        readOnly={readOnly}
        className={`w-full h-[56px] px-4 rounded-lg border border-gray-20 text-gray-100 font-sans text-[16px] outline-none transition-colors focus:border-cypress-100 ${
          readOnly ? "bg-accent-subtle4x text-gray-80" : "bg-white"
        }`}
      />
    </div>
  );
}
