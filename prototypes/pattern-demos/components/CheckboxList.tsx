interface CheckboxListProps {
  items: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
}

export default function CheckboxList({
  items,
  selected,
  onChange,
}: CheckboxListProps) {
  const toggle = (item: string) => {
    if (selected.includes(item)) {
      onChange(selected.filter((s) => s !== item));
    } else {
      onChange([...selected, item]);
    }
  };

  return (
    <div className="space-y-0 mb-6">
      {items.map((item) => {
        const isChecked = selected.includes(item);
        return (
          <button
            key={item}
            onClick={() => toggle(item)}
            className="flex items-center justify-between w-full py-4 border-b border-gray-20 text-left"
          >
            <span className="font-sans text-[16px] text-gray-100">{item}</span>
            <div
              className={`w-[24px] h-[24px] rounded-md border-2 flex items-center justify-center transition-colors ${
                isChecked
                  ? "bg-cypress-100 border-cypress-100"
                  : "border-gray-20 bg-white"
              }`}
            >
              {isChecked && (
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  stroke="white"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M2 7l3.5 3.5L12 4" />
                </svg>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
}
