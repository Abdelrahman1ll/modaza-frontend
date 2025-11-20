export default function Loading() {
  const dots = Array.from({ length: 4 });

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex gap-2">
        {dots.map((_, i) => (
          <span
            key={i}
            className="w-3 h-3 rounded-full bg-[#BC6C25] animate-dot"
            style={{ animationDelay: `${i * 0.15}s` }}
          ></span>
        ))}
      </div>
    </div>
  );
}
