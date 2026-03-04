export default function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="relative bg-white rounded-[40px] overflow-hidden flex-shrink-0"
      style={{
        width: 375,
        height: 812,
        boxShadow: "0px 2px 50px rgba(0, 0, 0, 0.15)",
      }}
    >
      {/* Status bar area */}
      <div className="h-[47px] bg-white" />
      {/* Content area */}
      <div className="h-[calc(100%-47px)] overflow-y-auto">{children}</div>
    </div>
  );
}
