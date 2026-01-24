import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { usePostValidateDiscountCodeMutation } from "../../redux/DiscountCodes/apiDiscountCodes";

const Game = () => {
  const [cursorPosition, setCursorPosition] = useState(50);
  const [level, setLevel] = useState(1);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [gameState, setGameState] = useState<
    "IDLE" | "PLAYING" | "WON" | "LOST" | "LEVEL_COMPLETE"
  >("IDLE");

  const [validateDiscountCode] = usePostValidateDiscountCodeMutation();
  const [discountInfo, setDiscountInfo] = useState<{
    code: string;
    discount: number;
  } | null>(null);

  useEffect(() => {
    const fetchDiscount = async () => {
      try {
        const response = await validateDiscountCode({
          code: "LIGHTMASTER",
        }).unwrap();
        if (response?.discountCode) {
          setDiscountInfo({
            code: response.discountCode.code,
            discount: response.discountCode.discount,
          });
        }
      } catch (error) {
        console.error("Failed to fetch LIGHTMASTER discount:", error);
      }
    };
    fetchDiscount();
  }, [validateDiscountCode]);

  const requestRef = useRef<number | null>(null);
  const timerRef = useRef<number | null>(null);
  const speedRef = useRef(1.5);
  const positionRef = useRef(0);
  const directionRef = useRef(1);

  // Target Zone Definition
  const TARGET_CENTER = 50;
  const TARGET_WIDTH = 20; // 20%
  const WIN_ZONE_START = TARGET_CENTER - TARGET_WIDTH / 2;
  const WIN_ZONE_END = TARGET_CENTER + TARGET_WIDTH / 2;

  const MAX_LEVELS = 3;

  const startGame = () => {
    setGameState("PLAYING");
    setLevel(1);
    setElapsedTime(0);

    // Reset Physics
    positionRef.current = 0;
    directionRef.current = 1;
    speedRef.current = 1.0;

    startAnimation();
    startTimer();
  };

  const nextLevel = () => {
    if (level >= MAX_LEVELS) {
      finishGame(true);
      return;
    }

    setLevel((prev) => prev + 1);
    setGameState("PLAYING");

    // Reset Physics
    positionRef.current = 0;
    directionRef.current = 1;
    speedRef.current += 1.0;

    startAnimation();
    startTimer();
  };

  const startAnimation = () => {
    if (requestRef.current) cancelAnimationFrame(requestRef.current);
    requestRef.current = requestAnimationFrame(animate);
  };

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    const now = Date.now();
    const baseTime = now - elapsedTime;

    timerRef.current = window.setInterval(() => {
      setElapsedTime(Date.now() - baseTime);
    }, 10);
  };

  const stopTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const animate = () => {
    positionRef.current += speedRef.current * directionRef.current;

    if (positionRef.current >= 100) {
      positionRef.current = 100;
      directionRef.current = -1;
    } else if (positionRef.current <= 0) {
      positionRef.current = 0;
      directionRef.current = 1;
    }

    setCursorPosition(positionRef.current);
    requestRef.current = requestAnimationFrame(animate);
  };

  const stopGame = () => {
    if (gameState !== "PLAYING") return;

    if (requestRef.current) cancelAnimationFrame(requestRef.current);
    stopTimer();

    // Check Win Condition
    const hitPosition = positionRef.current;
    if (hitPosition >= WIN_ZONE_START && hitPosition <= WIN_ZONE_END) {
      if (level < MAX_LEVELS) {
        setGameState("LEVEL_COMPLETE");
        setTimeout(nextLevel, 1000);
      } else {
        finishGame(true);
      }
    } else {
      finishGame(false);
    }
  };

  const finishGame = (won: boolean) => {
    setGameState(won ? "WON" : "LOST");
    stopTimer();
  };

  useEffect(() => {
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const formatTime = (ms: number) => {
    return (ms / 1000).toFixed(2);
  };

  return (
    <section className="relative w-full max-w-7xl mx-auto px-4 py-6 md:py-10 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-(--color-tiger) opacity-5 blur-[100px]" />
      </div>

      <div className="relative z-10 rounded-[2.5rem] p-6 md:p-10 flex flex-col items-center justify-center min-h-[450px] gap-6 bg-white/2 border border-black/3 backdrop-blur-[2px] transition-all duration-500">
        {/* Top Instructions Row */}
        <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-black/5 pb-6">
          <div className="flex flex-col gap-1">
            <h2 className="text-sm font-bold text-(--color-tiger) uppercase tracking-widest">
              How to Play
            </h2>
            <p className="text-xs text-(--color-pakistan)/70 max-w-sm leading-relaxed">
              1. Click <strong>START</strong> to begin.
              <br />
              2. Click <strong>STOP</strong> when the light is within the{" "}
              <strong>Green Zone</strong>.<br />
              3. Complete all <strong>3 Levels</strong> to win your discount!
            </p>
          </div>

          <div className="flex gap-2">
            <div className="text-right">
              <p className="text-[10px] uppercase tracking-widest text-gray-500">
                Total Time
              </p>
              <p className="font-mono font-bold text-xl text-(--color-pakistan)">
                {formatTime(elapsedTime)}s
              </p>
            </div>
          </div>
        </div>

        {/* Main Game Title & Progress */}
        <div className="text-center space-y-2 mt-2">
          <h2 className="text-3xl md:text-5xl font-black text-(--color-pakistan)">
            Stop the <span className="text-(--color-tiger)">Light</span>
          </h2>
          <div className="flex justify-center gap-2 mt-2">
            {[1, 2, 3].map((l) => (
              <div
                key={l}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${l <= level && gameState !== "IDLE" ? "bg-(--color-tiger) scale-110 shadow-lg shadow-(--color-tiger)/50" : "bg-gray-200"}`}
              />
            ))}
          </div>
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400">
            Level {gameState === "IDLE" ? "1" : level} / {MAX_LEVELS}
          </p>
        </div>

        {/* Game Bar Container */}
        <div className="relative w-full max-w-2xl h-14 bg-gray-200/50 rounded-full overflow-hidden border-4 border-white shadow-inner">
          {/* Win Zone Marker */}
          <div
            className={`absolute top-0 bottom-0 border-x-2 transition-all duration-300 ${gameState === "LEVEL_COMPLETE" ? "bg-green-500/20 border-green-500" : "bg-(--color-earth)/20 border-(--color-earth)"}`}
            style={{
              left: `${WIN_ZONE_START}%`,
              width: `${TARGET_WIDTH}%`,
            }}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10px] font-bold text-(--color-earth) uppercase tracking-widest opacity-80 whitespace-nowrap">
              Target
            </div>
          </div>

          {/* The Moving Cursor */}
          <div
            className="absolute top-1 bottom-1 w-4 bg-(--color-tiger) rounded-full shadow-[0_0_15px_rgba(228,168,83,0.8)] z-10"
            style={{ left: `calc(${cursorPosition}% - 8px)` }}
          />
        </div>

        {/* Status Message */}
        <div className="h-6">
          {gameState === "LEVEL_COMPLETE" && (
            <span className="text-green-600 font-bold animate-pulse uppercase tracking-widest text-sm">
              Perfect! Moving to Level {level + 1}...
            </span>
          )}
        </div>

        {/* Controls / Result */}
        <div className="h-28 w-full flex items-center justify-center relative">
          <AnimatePresence mode="wait">
            {gameState === "IDLE" && (
              <motion.button
                key="start"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={startGame}
                className="px-10 py-4 bg-(--color-pakistan) text-white font-bold rounded-full text-lg shadow-xl hover:scale-105 active:scale-95 transition-all w-64 uppercase tracking-widest"
              >
                Start Game
              </motion.button>
            )}

            {(gameState === "PLAYING" || gameState === "LEVEL_COMPLETE") && (
              <motion.button
                key="stop"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={stopGame}
                disabled={gameState === "LEVEL_COMPLETE"}
                className="px-16 py-6 bg-(--color-tiger) text-white font-black rounded-full text-2xl shadow-xl shadow-(--color-tiger)/30 hover:scale-105 active:scale-95 transition-all uppercase tracking-widest w-72 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                STOP!
              </motion.button>
            )}

            {gameState === "WON" && (
              <motion.div
                key="won"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                className="flex flex-col items-center gap-4 w-full"
              >
                <div className="flex flex-col items-center mt-6">
                  <span className="text-lg font-black text-(--color-pakistan) uppercase tracking-widest">
                    Congratulations!
                  </span>
                  <span className="text-xs text-gray-500">
                    You beat all 3 levels!
                  </span>
                </div>

                <div className="flex flex-col md:flex-row items-center gap-6 bg-white/60 p-6 rounded-2xl border border-white shadow-lg">
                  <div className="text-center">
                    <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-1">
                      Your Reward
                    </p>
                    <p className="font-mono font-black text-2xl text-(--color-tiger)">
                      {discountInfo?.code || "LIGHTMASTER"}
                    </p>
                    <p className="text-[10px] font-bold text-green-600 bg-green-100 px-2 py-0.5 rounded-full mt-1 inline-block">
                      {discountInfo?.discount || 5}% Discount
                    </p>
                  </div>
                </div>

                <button
                  onClick={startGame}
                  className="text-sm font-bold text-gray-400 hover:text-(--color-tiger) underline mb-4 uppercase tracking-widest"
                >
                  Play Again
                </button>
              </motion.div>
            )}

            {gameState === "LOST" && (
              <motion.div
                key="lost"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                className="flex flex-col items-center gap-4"
              >
                <div className="flex flex-col items-center">
                  <span className="text-xl font-black text-gray-400 uppercase tracking-widest">
                    Missed!
                  </span>
                  <span className="text-xs text-gray-500">
                    Don't give up, try again!
                  </span>
                </div>
                <button
                  onClick={startGame}
                  className="px-8 py-3  text-sm bg-(--color-pakistan) text-white font-bold rounded-full hover:scale-105 transition-all shadow-lg uppercase tracking-widest"
                >
                  Try Again
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Game;
