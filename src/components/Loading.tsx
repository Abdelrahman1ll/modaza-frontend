export default function Loading() {
  return (
    <div className="fixed inset-0 flex flex-col justify-center items-center z-9999 bg-(--color-cornsilk) backdrop-blur-3xl transition-all duration-1000 overflow-hidden">
      {/* Background Subtle Gradient */}
      <div className="absolute inset-0 bg-linear-to-b from-white via-[#FEFAE0]/20 to-white opacity-50" />

      {/* Main Content Container */}
      <div className="relative flex flex-col items-center gap-10 max-w-xs w-full px-6">
        {/* Branding Section */}
        <div className="flex flex-col items-center">
          <h2 className="shimmer-text text-4xl md:text-5xl font-black tracking-[0.8em] uppercase select-none mr-[-0.8em]">
            MODAZA
          </h2>
        </div>

        {/* Dots Loader */}
        <div className="flex gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <span
              key={i}
              className="w-3 h-3 rounded-full bg-(--color-tiger) animate-dot"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>

        {/* Subtitle */}
        <div className="opacity-40">
          <p className="text-[#BC6C25] text-[10px] font-black tracking-[0.6em] uppercase mr-[-0.6em]">
            Crafting Excellence
          </p>
        </div>
      </div>

      {/* Atmospheric Accents */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#BC6C25]/5 rounded-full blur-[120px] animate-pulse" />
      <div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#283618]/5 rounded-full blur-[120px] animate-pulse"
        style={{ animationDelay: "1s" }}
      />
    </div>
  );
}
