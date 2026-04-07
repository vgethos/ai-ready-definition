export default function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="relative rounded-[40px] overflow-hidden flex-shrink-0"
      style={{
        width: 375,
        height: 812,
        backgroundColor: "#ffffff",
        boxShadow: "0px 2px 50px rgba(0, 0, 0, 0.15)",
      }}
    >
      {children}
    </div>
  );
}
