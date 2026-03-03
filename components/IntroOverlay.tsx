"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState,useRef } from "react";

type IntroOverlayProps = {
  onComplete: () => void;
};

type TerminalStep = {
  text: string;
  dotLoader?: boolean;
  pauseAfter?: number;
};

const STORAGE_KEY = "itrix_intro_played";
const TYPE_SPEED_MS = 34;
const DOT_SPEED_MS = 240;

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default function IntroOverlay({ onComplete }: IntroOverlayProps) {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [completedLines, setCompletedLines] = useState<string[]>([]);
  const [activeLine, setActiveLine] = useState("");
  const [showBootCard, setShowBootCard] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [mobileStatus, setMobileStatus] = useState("Booting iTRIX'26");
  const [mobileDotCount, setMobileDotCount] = useState(0);
  const [typingOnPrompt, setTypingOnPrompt] = useState(false);
  const hasStarted =useRef(false);
  const sequence = useMemo<TerminalStep[]>(
    () => [
      { text: "Launching iTRIX'26...", pauseAfter: 140 },
      { text: "Initializing modules", dotLoader: true, pauseAfter: 80 },
      { text: "Loading components", dotLoader: true, pauseAfter: 80 },
      { text: "Application started successfully.", pauseAfter: 140 },
      { text: "", pauseAfter: 70 },

    ],
    []
  );

  useEffect(() => {
    setMounted(true);
    if (typeof window === "undefined") {
      return;
    }

    const alreadyPlayed = sessionStorage.getItem(STORAGE_KEY) === "true";
    if (alreadyPlayed) {
      onComplete();
      return;
    }

    const updateMobile = () => setIsMobile(window.innerWidth < 800);
    updateMobile();

    window.addEventListener("resize", updateMobile);
    setVisible(true);

    return () => window.removeEventListener("resize", updateMobile);
  }, [onComplete]);

  useEffect(() => {
    if (!visible || !isMobile) {
      return;
    }

    const dotTimer = window.setInterval(() => {
      setMobileDotCount((prev) => (prev + 1) % 4);
    }, 320);

    return () => window.clearInterval(dotTimer);
  }, [visible, isMobile]);

  useEffect(() => {
    if (!visible ) {
      return;
    }
    
    let cancelled = false;

    const finish = async () => {
      if (cancelled) {
        return;
      }

      sessionStorage.setItem(STORAGE_KEY, "true");
      setIsExiting(true);
      await sleep(720);

      if (!cancelled) {
        onComplete();
      }
    };

    const runDesktopBoot = async () => {
      setCompletedLines([
        "Microsoft Windows [Version 10.0.22621.1]",
        "(c) Microsoft Corporation. All rights reserved.",
        "",
      ]);
      await sleep(260);

      setTypingOnPrompt(true);
      for (const ch of " code .") {
        if (cancelled) {
          return;
        }
        setActiveLine((prev) => prev + ch);
        await sleep(TYPE_SPEED_MS);
      }

      setCompletedLines((prev) => [...prev, "C:\\Users\\Developer> code ."]);
      setActiveLine("");
      setTypingOnPrompt(false);
      await sleep(350);

      for (const step of sequence) {
        if (cancelled) {
          return;
        }

        if (!step.text) {
          setCompletedLines((prev) => [...prev, ""]);
          await sleep(step.pauseAfter ?? 220);
          continue;
        }

        if (step.dotLoader) {
          for (const ch of step.text) {
            if (cancelled) {
              return;
            }
            setActiveLine((prev) => prev + ch);
            await sleep(TYPE_SPEED_MS);
          }

          for (let dots = 1; dots <= 3; dots += 1) {
            if (cancelled) {
              return;
            }
            setActiveLine(`${step.text}${".".repeat(dots)}`);
            await sleep(DOT_SPEED_MS);
          }

          setCompletedLines((prev) => [...prev, `${step.text}...`]);
          setActiveLine("");
          await sleep(step.pauseAfter ?? 240);
          continue;
        }

        for (const ch of step.text) {
          if (cancelled) {
            return;
          }

          setActiveLine((prev) => prev + ch);
          await sleep(TYPE_SPEED_MS);
        }

        setCompletedLines((prev) => [...prev, step.text]);
        setActiveLine("");
        await sleep(step.pauseAfter ?? 320);
      }

      if (cancelled) {
        return;
      }

      setShowBootCard(true);
      for (let value = 0; value <= 100; value += 2) {
        if (cancelled) {
          return;
        }

        setProgress(value);
        await sleep(26);
      }

      await finish();
    };

    const runMobileBoot = async () => {
      const checkpoints = [
        { threshold: 12, status: "Booting iTRIX'26" },
        { threshold: 30, status: "Checking system integrity" },
        { threshold: 52, status: "Initializing secure modules" },
        { threshold: 76, status: "Loading app workspace" },
        { threshold: 92, status: "Finalizing startup" },
      ];

      for (let value = 0; value <= 100; value += 2) {
        if (cancelled) {
          return;
        }

        const checkpoint = checkpoints.find((item) => value <= item.threshold) ?? checkpoints[checkpoints.length - 1];
        setMobileStatus(checkpoint.status);
        setProgress(value);
        await sleep(42);
      }

      await sleep(240);
      await finish();
    };

    if (isMobile) {
      runMobileBoot();
    } else {
      runDesktopBoot();
    }

    return () => {
      cancelled = true;
    };
  }, [isMobile, onComplete, sequence, visible]);

  if (!mounted) {
    return null;
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-[#05070d] via-[#0d1322] to-[#05060a] px-4"
          initial={{ opacity: 1, scale: 1 }}
          animate={{ opacity: isExiting ? 0 : 1, scale: isExiting ? 0.985 : 1 }}
          transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
        >
          {isMobile ? (
            <motion.div
              className="w-full max-w-sm overflow-hidden rounded-[32px] border border-[#2b3550] bg-[#060c19]/95 p-6 shadow-[0_20px_70px_rgba(0,0,0,0.72)]"
              initial={{ y: 24, opacity: 0, scale: 0.985 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              transition={{ duration: 0.42, ease: "easeOut" }}
            >
              <div className="mx-auto h-1.5 w-20 rounded-full bg-[#303a52]" />

              <div className="mt-10 flex flex-col items-center">
                <motion.div
                  className="flex h-20 w-20 items-center justify-center rounded-2xl border border-[#364766] bg-gradient-to-br from-[#152139] to-[#101a2f] text-xl font-semibold text-[#cfe2ff]"
                  animate={{
                    scale: [1, 1.06, 1],
                    boxShadow: [
                      "0 0 0 rgba(80,180,255,0)",
                      "0 0 28px rgba(80,180,255,0.26)",
                      "0 0 0 rgba(80,180,255,0)",
                    ],
                  }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                >
                  iX
                </motion.div>

                <p className="mt-6 font-mono text-xl font-semibold tracking-wide text-[#d5e6ff]">iTRIX'26</p>
                <p className="mt-3 font-mono text-xs text-[#9cb4dc]">
                  {mobileStatus}
                  {".".repeat(mobileDotCount)}
                </p>
              </div>

              <div className="mt-10 h-2 w-full overflow-hidden rounded-full bg-[#1a253d]">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-[#2f7dd2] via-[#50b4ff] to-[#67fca7]"
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.1, ease: "linear" }}
                />
              </div>

              <div className="mt-2 flex items-center justify-between font-mono text-[11px] text-[#8fa8d2]">
                <span>Secure Boot</span>
                <span>{progress}%</span>
              </div>
            </motion.div>
          ) : (
            <>
              <motion.div
                className="w-full max-w-2xl overflow-hidden rounded-md border border-[#1f2937] bg-[#030508]/95 shadow-[0_30px_80px_rgba(0,0,0,0.7)]"
                initial={{ y: 24, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
              >
                <div className="flex items-center justify-between border-b border-[#1f2937] bg-[#0a0f1e] px-4 py-2 text-[11px] text-[#97a8c7]">
                  <span>Command Prompt</span>
                  <span>itrix-terminal.exe</span>
                </div>

                <div className="h-[340px] overflow-hidden bg-black/90 p-4 font-mono text-[13px] leading-relaxed text-[#5BFF8F] sm:text-sm">
                  {completedLines.map((line, index) => (
                    <div key={`${line}-${index}`} className="min-h-[1.25rem] whitespace-pre-wrap break-words">
                      {line}
                    </div>
                  ))}

                  {!showBootCard && (
                    <div className="min-h-[1.25rem] whitespace-pre-wrap break-words">
                      {typingOnPrompt ? `C:\\Users\\Developer>${activeLine}` : activeLine}
                      <motion.span
                        className="inline-block align-middle"
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut" }}
                      >
                        _
                      </motion.span>
                    </div>
                  )}
                </div>
              </motion.div>

              {showBootCard && (
                <motion.div
                  className="pointer-events-none absolute left-1/2 top-1/2 w-[94%] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg border border-[#2a3448] bg-[#0d1424]/95 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.68)]"
                  initial={{ opacity: 0, y: 16, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                >
                  <p className="font-mono text-base font-semibold tracking-[0.12em] text-[#c8d8f2]">iTRIX'26</p>
                  <p className="mt-2 font-mono text-sm text-[#8ea2c7]">Starting iTRIX'26</p>
                  <p className="mt-1 font-mono text-[11px] text-[#8fa8d2]">© ISTA</p>

                  <div className="mt-4 h-2 w-full overflow-hidden rounded bg-[#1a2131]">
                    <motion.div
                      className="h-full rounded bg-gradient-to-r from-[#2f7dd2] via-[#50b4ff] to-[#67fca7]"
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.1, ease: "linear" }}
                    />
                  </div>

                  <p className="mt-2 text-right font-mono text-[11px] text-[#9cb4dc]">{progress}%</p>
                </motion.div>
              )}
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

