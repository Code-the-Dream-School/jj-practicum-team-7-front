export default function CardWrapper({
  children,
  className = "",
  shadow = "shadow-[0_0_14px_rgba(0,0,0,0.6)]",
}) {
  return (
    <div className={`border rounded-lg bg-white p-8 ${shadow} ${className}`}>
      {children}
    </div>
  );
}