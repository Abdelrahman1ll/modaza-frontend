export default function Loading() {
  return (
    <div className="fixed inset-0 flex flex-col justify-center items-center z-9999 bg-[#FEFAE0]/95 backdrop-blur-3xl transition-all duration-700 full-screen-loader overflow-hidden">
      {/* Central Section: The Liquid Orb */}
      <div className="relative mb-32 flex items-center justify-center">
        {/* Echo Rings for depth */}
        <div className="absolute w-24 h-24 rounded-full border border-[#BC6C25]/20 animate-echo-ring"></div>
        <div
          className="absolute w-24 h-24 rounded-full border border-[#BC6C25]/10 animate-echo-ring"
          style={{ animationDelay: "1s" }}
        ></div>

        {/* The 80px Premium Orb */}
        <div className="relative w-20 h-20 animate-orb-float">
          <div
            className="w-full h-full bg-linear-to-tr from-[#BC6C25] via-[#DDA15E] to-[#BC6C25] shadow-2xl animate-orb-morph animate-orb-glow relative overflow-hidden"
            style={{
              boxShadow: `0 25px 50px -12px rgba(188, 108, 37, 0.4)`,
            }}
          >
            {/* Inner Sheen/Liquid Effect */}
            <div className="absolute inset-x-0 top-0 h-1/2 bg-white/20 blur-sm rounded-t-full transform -translate-y-2"></div>
            <div className="absolute inset-0 bg-linear-to-b from-white/10 to-transparent"></div>
          </div>
        </div>

        {/* Ground Shadow */}
        <div className="absolute -bottom-12 w-20 h-4 bg-[#283618]/10 rounded-[100%] blur-[10px] animate-pulse"></div>
      </div>

      {/* Brand & Loading Info */}
      <div className="flex flex-col items-center gap-6 animate-in fade-in slide-in-from-bottom-8 duration-1000">
        <div className="flex flex-col items-center">
          <h2 className="text-[#283618] font-bold tracking-[0.8em] uppercase text-xl select-none bg-linear-to-r from-[#BC6C25] via-[#283618] to-[#BC6C25] bg-clip-text">
            MODAZA
          </h2>
          <div className="h-0.5 w-12 bg-linear-to-r from-transparent via-[#BC6C25] to-transparent mt-2"></div>
        </div>

        <p className="text-[#BC6C25] text-sm font-medium tracking-widest uppercase opacity-70 animate-pulse">
          Crafting Excellence
        </p>
      </div>

      {/* Background Accents */}
      <div className="absolute top-[-20%] left-[-20%] w-[80%] h-[80%] bg-[#DDA15E]/10 rounded-full blur-[180px] animate-pulse"></div>
      <div
        className="absolute bottom-[-20%] right-[-20%] w-[80%] h-[80%] bg-[#606C38]/10 rounded-full blur-[180px] animate-pulse"
        style={{ animationDelay: "2s" }}
      ></div>
    </div>
  );
}
