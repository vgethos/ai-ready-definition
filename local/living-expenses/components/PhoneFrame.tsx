export default function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="relative rounded-[40px] overflow-hidden flex-shrink-0"
      style={{
        width: 375,
        height: 812,
        backgroundImage: "linear-gradient(114.789deg, rgb(230, 245, 236) 5.8958%, rgba(235, 240, 249, 0.976) 138.44%)",
        boxShadow: "0px 2px 50px rgba(0, 0, 0, 0.15)",
      }}
    >
      {/* Status bar area */}
      <div className="h-[44px]" />
      {/* Content area */}
      <div className="h-[calc(100%-44px)] overflow-y-auto">{children}</div>
    </div>
  );
}
