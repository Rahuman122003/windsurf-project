"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface Greeting {
  text: string;
  language: string;
}

const greetings: Greeting[] = [
  { text: "Welcome to Blyn", language: "English" },
  { text: "こんにちは", language: "Japanese" },
  { text: "Bonjour", language: "French" },
  { text: "Hola", language: "Spanish" },
  { text: "안녕하세요", language: "Korean" },
  { text: "Ciao", language: "Italian" },
  { text: "Hallo", language: "German" },
  { text: "Welcome to Blyn", language: "Blyn" },
];

export default function Preloader() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);
  const [preloaderComplete, setPreloaderComplete] = useState(false);

  useEffect(() => {
    if (!isAnimating) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = prevIndex + 1;

        if (nextIndex >= greetings.length) {
          clearInterval(interval);
          setIsAnimating(false);

          // Smoothly exit preloader overlay after completing greetings
          setTimeout(() => {
            setPreloaderComplete(true);
          }, 600);

          return prevIndex;
        }

        return nextIndex;
      });
    }, 240);

    return () => clearInterval(interval);
  }, [isAnimating]);

  if (preloaderComplete) return null;

  const textVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
    exit: { y: -40, opacity: 0 },
  };

  return (
    <AnimatePresence mode="wait">
      {!preloaderComplete && (
        <motion.div
          key="preloader"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#06080b] text-white overflow-hidden pointer-events-auto"
        >
          {/* Background subtle radial bloom */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06)_0%,transparent_70%)] pointer-events-none" />

          <section
            aria-label="Rapid greetings in different languages"
            className="flex items-center justify-center gap-1 p-4 relative z-10"
          >
            <div className="relative flex h-20 w-80 items-center justify-center overflow-visible">
              {isAnimating ? (
                <AnimatePresence mode="popLayout">
                  <motion.div
                    key={currentIndex}
                    initial={textVariants.hidden}
                    animate={textVariants.visible}
                    exit={textVariants.exit}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute flex items-center gap-3 font-display font-bold text-3xl md:text-4xl text-white tracking-tight"
                  >
                    <div
                      aria-hidden="true"
                      className="h-2.5 w-2.5 rounded-full bg-white shadow-[0_0_12px_#fff]"
                    />
                    {greetings[currentIndex].text}
                  </motion.div>
                </AnimatePresence>
              ) : (
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="flex items-center gap-3 font-display font-extrabold text-3xl md:text-5xl text-white tracking-tight"
                >
                  <div
                    aria-hidden="true"
                    className="h-3 w-3 rounded-full bg-white shadow-[0_0_16px_#fff]"
                  />
                  {greetings[currentIndex].text}
                </motion.div>
              )}
            </div>
          </section>

          {/* Progress bar line */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-48 h-1 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-accent via-white to-accent"
              initial={{ width: "0%" }}
              animate={{ width: `${((currentIndex + 1) / greetings.length) * 100}%` }}
              transition={{ duration: 0.2 }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
