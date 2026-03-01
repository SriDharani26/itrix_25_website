"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Direction = "up" | "down" | "left" | "right";
type Cell = { x: number; y: number };
type DeviceMode = "mobile" | "desktop";
type MobileGame = "Swipe Snake" | "Target Drift" | "Reflex Chain";
type DesktopGame = "2048" | "Orbital Dodge" | "Advanced Reaction Game";
type GameName = MobileGame | DesktopGame;

const neon = "rgba(6,130,165,1)";
const mobileGames: MobileGame[] = ["Swipe Snake", "Target Drift", "Reflex Chain"];
const desktopGames: DesktopGame[] = ["2048", "Orbital Dodge", "Advanced Reaction Game"];
const rand = (n: number) => Math.floor(Math.random() * n);

const panelClass =
  "h-full min-h-[calc(100vh-4rem)] w-full bg-[#1e1e1e] text-gray-100 border border-gray-700 rounded-sm overflow-y-auto";
const cardClass = "rounded-sm border border-gray-700 bg-[#252526] p-3";

const pickRandomGame = (mode: DeviceMode): GameName => {
  if (mode === "desktop") return desktopGames[rand(desktopGames.length)];
  return mobileGames[rand(mobileGames.length)];
};

const isDesktopWidth = () => (typeof window !== "undefined" ? window.innerWidth >= 1024 : false);

const SwipeSnake = () => {
  const [snake, setSnake] = useState<Cell[]>([
    { x: 4, y: 5 },
    { x: 3, y: 5 },
    { x: 2, y: 5 },
  ]);
  const [food, setFood] = useState<Cell>({ x: 8, y: 5 });
  const [running, setRunning] = useState(true);
  const [score, setScore] = useState(0);
  const [status, setStatus] = useState("Running");
  const directionRef = useRef<Direction>("right");
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  const newFood = (body: Cell[]) => {
    while (true) {
      const next = { x: rand(12), y: rand(12) };
      if (!body.some((cell) => cell.x === next.x && cell.y === next.y)) return next;
    }
  };

  const updateDirection = (next: Direction) => {
    const current = directionRef.current;
    if ((current === "up" && next === "down") || (current === "down" && next === "up")) return;
    if ((current === "left" && next === "right") || (current === "right" && next === "left")) return;
    directionRef.current = next;
  };

  const reset = () => {
    const initial = [
      { x: 4, y: 5 },
      { x: 3, y: 5 },
      { x: 2, y: 5 },
    ];
    setSnake(initial);
    setFood(newFood(initial));
    directionRef.current = "right";
    setRunning(true);
    setScore(0);
    setStatus("Running");
  };

  useEffect(() => {
    if (!running) return;
    const tick = setInterval(() => {
      setSnake((prev) => {
        const head = prev[0];
        const next = { x: head.x, y: head.y };
        const dir = directionRef.current;
        if (dir === "up") next.y -= 1;
        if (dir === "down") next.y += 1;
        if (dir === "left") next.x -= 1;
        if (dir === "right") next.x += 1;

        const hitWall = next.x < 0 || next.x > 11 || next.y < 0 || next.y > 11;
        const hitSelf = prev.some((cell) => cell.x === next.x && cell.y === next.y);
        if (hitWall || hitSelf) {
          setRunning(false);
          setStatus("Game Over");
          return prev;
        }

        const ate = next.x === food.x && next.y === food.y;
        const moved = [next, ...prev];
        if (!ate) moved.pop();
        if (ate) {
          setScore((s) => s + 1);
          setFood(newFood(moved));
        }
        return moved;
      });
    }, 140);

    return () => clearInterval(tick);
  }, [food.x, food.y, running]);

  const onTouchStart: React.TouchEventHandler<HTMLDivElement> = (e) => {
    const touch = e.touches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
  };

  const onTouchMove: React.TouchEventHandler<HTMLDivElement> = (e) => {
    if (!touchStartRef.current) return;
    const touch = e.touches[0];
    const dx = touch.clientX - touchStartRef.current.x;
    const dy = touch.clientY - touchStartRef.current.y;
    if (Math.abs(dx) < 12 && Math.abs(dy) < 12) return;
    if (Math.abs(dx) > Math.abs(dy)) {
      updateDirection(dx > 0 ? "right" : "left");
    } else {
      updateDirection(dy > 0 ? "down" : "up");
    }
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
  };

  return (
    <div className="space-y-3">
      <div className={cardClass}>
        <p className="text-sm text-gray-300">Swipe to steer. Touch-only controls.</p>
        <p className="mt-1 text-xs text-gray-400">Score: {score} | {status}</p>
      </div>
      <div onTouchStart={onTouchStart} onTouchMove={onTouchMove} className="touch-none">
        <div className="mx-auto max-w-[360px] grid grid-cols-12 gap-1 rounded-sm border border-gray-700 bg-[#252526] p-2">
          {Array.from({ length: 144 }).map((_, idx) => {
            const x = idx % 12;
            const y = Math.floor(idx / 12);
            const snakePart = snake.some((cell) => cell.x === x && cell.y === y);
            const isFood = food.x === x && food.y === y;
            return (
              <div
                key={idx}
                className={`aspect-square rounded-[2px] ${
                  snakePart ? "bg-cyan-500" : isFood ? "bg-pink-500" : "bg-[#1e1e1e]"
                }`}
              />
            );
          })}
        </div>
      </div>
      <button
        type="button"
        onTouchStart={reset}
        className="rounded-sm px-4 py-2 text-sm text-white"
        style={{ backgroundColor: neon }}
      >
        Restart
      </button>
    </div>
  );
};

const TargetDrift = () => {
  const [pos, setPos] = useState({ x: 50, y: 45 });
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(20);
  const [running, setRunning] = useState(true);

  useEffect(() => {
    if (!running) return;
    const move = setInterval(() => {
      setPos({ x: 10 + rand(80), y: 15 + rand(70) });
    }, 750);
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => {
      clearInterval(move);
      clearInterval(timer);
    };
  }, [running]);

  const start = () => {
    setScore(0);
    setTimeLeft(20);
    setRunning(true);
    setPos({ x: 50, y: 45 });
  };

  return (
    <div className="space-y-3">
      <div className={cardClass}>
        <p className="text-sm text-gray-300">Tap the drifting target.</p>
        <p className="mt-1 text-xs text-gray-400">Score: {score} | Time: {timeLeft}s</p>
      </div>
      <div className="relative h-[48vh] min-h-[260px] max-h-[420px] rounded-sm border border-gray-700 bg-[#252526]">
        <button
          type="button"
          onTouchStart={() => running && setScore((s) => s + 1)}
          className="absolute h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-400 bg-cyan-500/20"
          style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
        />
      </div>
      <button
        type="button"
        onTouchStart={start}
        className="rounded-sm px-4 py-2 text-sm text-white"
        style={{ backgroundColor: neon }}
      >
        {running ? "Restart" : "Play Again"}
      </button>
    </div>
  );
};

const ReflexChain = () => {
  const [sequence, setSequence] = useState<number[]>([]);
  const [index, setIndex] = useState(0);
  const [flash, setFlash] = useState<number | null>(null);
  const [phase, setPhase] = useState<"idle" | "show" | "input" | "fail">("idle");
  const [level, setLevel] = useState(0);

  const start = () => {
    const first = [rand(6), rand(6)];
    setSequence(first);
    setIndex(0);
    setLevel(1);
    setPhase("show");
  };

  useEffect(() => {
    let cancelled = false;
    if (phase !== "show") return;

    const run = async () => {
      for (const item of sequence) {
        setFlash(item);
        await new Promise((r) => setTimeout(r, 300));
        if (cancelled) return;
        setFlash(null);
        await new Promise((r) => setTimeout(r, 150));
        if (cancelled) return;
      }
      setIndex(0);
      setPhase("input");
    };
    void run();

    return () => {
      cancelled = true;
    };
  }, [phase, sequence]);

  const tap = (value: number) => {
    if (phase !== "input") return;
    if (value !== sequence[index]) {
      setPhase("fail");
      return;
    }
    const nextIndex = index + 1;
    if (nextIndex === sequence.length) {
      setSequence((prev) => [...prev, rand(6)]);
      setLevel((l) => l + 1);
      setPhase("show");
      return;
    }
    setIndex(nextIndex);
  };

  return (
    <div className="space-y-3">
      <div className={cardClass}>
        <p className="text-sm text-gray-300">Repeat the touch pattern.</p>
        <p className="mt-1 text-xs text-gray-400">Level: {level}</p>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {Array.from({ length: 6 }).map((_, idx) => (
          <button
            key={idx}
            type="button"
            onTouchStart={() => tap(idx)}
            className={`aspect-[1.1] rounded-sm border transition-colors ${
              flash === idx ? "border-cyan-400 bg-cyan-500/25" : "border-gray-700 bg-[#252526]"
            }`}
          />
        ))}
      </div>
      <button
        type="button"
        onTouchStart={start}
        className="rounded-sm px-4 py-2 text-sm text-white"
        style={{ backgroundColor: neon }}
      >
        {phase === "idle" ? "Start" : phase === "fail" ? "Retry" : "Restart"}
      </button>
      {phase === "fail" ? <p className="text-xs text-red-300">Pattern mismatch.</p> : null}
    </div>
  );
};

const slideAndMergeRow = (row: number[]) => {
  const compact = row.filter((n) => n !== 0);
  const merged: number[] = [];
  let score = 0;
  for (let i = 0; i < compact.length; i += 1) {
    if (compact[i] === compact[i + 1]) {
      const value = compact[i] * 2;
      merged.push(value);
      score += value;
      i += 1;
    } else {
      merged.push(compact[i]);
    }
  }
  while (merged.length < 4) merged.push(0);
  return { row: merged, score };
};

const spawn = (board: number[][]) => {
  const empty: Array<[number, number]> = [];
  board.forEach((row, y) => row.forEach((cell, x) => cell === 0 && empty.push([y, x])));
  if (empty.length === 0) return board;
  const [y, x] = empty[rand(empty.length)];
  const next = board.map((r) => [...r]);
  next[y][x] = Math.random() < 0.9 ? 2 : 4;
  return next;
};

const moveBoard = (board: number[][], dir: Direction) => {
  let gained = 0;
  const rotateRight = (b: number[][]) => b[0].map((_, c) => b.map((r) => r[c]).reverse());
  const rotateLeft = (b: number[][]) => b[0].map((_, c) => b.map((r) => r[b.length - 1 - c]));
  const reverseRows = (b: number[][]) => b.map((r) => [...r].reverse());

  let working = board.map((r) => [...r]);
  if (dir === "up") working = rotateLeft(working);
  if (dir === "down") working = rotateRight(working);
  if (dir === "right") working = reverseRows(working);

  const moved = working.map((row) => {
    const { row: merged, score } = slideAndMergeRow(row);
    gained += score;
    return merged;
  });

  let restored = moved;
  if (dir === "right") restored = reverseRows(restored);
  if (dir === "up") restored = rotateRight(restored);
  if (dir === "down") restored = rotateLeft(restored);

  const changed = restored.some((row, y) => row.some((cell, x) => cell !== board[y][x]));
  return { board: changed ? spawn(restored) : board, gained, changed };
};

const Game2048 = () => {
  const [board, setBoard] = useState<number[][]>(() => spawn(spawn(Array.from({ length: 4 }, () => [0, 0, 0, 0]))));
  const [score, setScore] = useState(0);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const mapping: Record<string, Direction | undefined> = {
        ArrowUp: "up",
        ArrowDown: "down",
        ArrowLeft: "left",
        ArrowRight: "right",
      };
      const dir = mapping[e.key];
      if (!dir) return;
      e.preventDefault();
      setBoard((prev) => {
        const next = moveBoard(prev, dir);
        if (next.changed) setScore((s) => s + next.gained);
        return next.board;
      });
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const reset = () => {
    setBoard(spawn(spawn(Array.from({ length: 4 }, () => [0, 0, 0, 0]))));
    setScore(0);
  };

  return (
    <div className="space-y-3">
      <div className={cardClass}>
        <p className="text-sm text-gray-300">Use arrow keys to merge tiles.</p>
        <p className="mt-1 text-xs text-gray-400">Score: {score}</p>
      </div>
      <div className="mx-auto max-w-[420px] grid grid-cols-4 gap-2 rounded-sm border border-gray-700 bg-[#252526] p-3">
        {board.flat().map((cell, idx) => (
          <div key={idx} className="aspect-square rounded-sm border border-gray-700 bg-[#1f1f1f] flex items-center justify-center text-sm">
            {cell === 0 ? "" : cell}
          </div>
        ))}
      </div>
      <button type="button" onClick={reset} className="rounded-sm px-4 py-2 text-sm text-white" style={{ backgroundColor: neon }}>
        Reset
      </button>
    </div>
  );
};

const OrbitalDodge = () => {
  const [running, setRunning] = useState(true);
  const [time, setTime] = useState(0);
  const [hit, setHit] = useState(false);
  const areaRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!running) return;
    const timer = setInterval(() => setTime((t) => t + 1), 100);
    return () => clearInterval(timer);
  }, [running]);

  const hazardStyle = useMemo(() => {
    const phase = time / 6;
    const radius = 36;
    const x = 50 + radius * Math.cos(phase);
    const y = 50 + radius * Math.sin(phase * 1.2);
    return { left: `${x}%`, top: `${y}%` };
  }, [time]);

  const reset = () => {
    setTime(0);
    setRunning(true);
    setHit(false);
  };

  return (
    <div className="space-y-3">
      <div className={cardClass}>
        <p className="text-sm text-gray-300">Keep cursor inside zone and avoid moving orb.</p>
        <p className="mt-1 text-xs text-gray-400">Survival: {(time / 10).toFixed(1)}s</p>
      </div>
      <div ref={areaRef} className="relative h-[340px] rounded-sm border border-gray-700 bg-[#252526]" onMouseLeave={() => setRunning(false)}>
        <div className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-400/50" />
        <div
          className="absolute h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/30 border border-cyan-300"
          style={hazardStyle}
          onMouseEnter={() => {
            setHit(true);
            setRunning(false);
          }}
        />
      </div>
      <p className="text-xs text-gray-400">{hit ? "Collision detected." : running ? "Running" : "Paused"}</p>
      <button type="button" onClick={reset} className="rounded-sm px-4 py-2 text-sm text-white" style={{ backgroundColor: neon }}>
        Restart
      </button>
    </div>
  );
};

const AdvancedReactionGame = () => {
  const [phase, setPhase] = useState<"idle" | "prep" | "go" | "result" | "penalty">("idle");
  const [reaction, setReaction] = useState<number | null>(null);
  const startRef = useRef(0);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, []);

  const begin = () => {
    if (timerRef.current) window.clearTimeout(timerRef.current);
    setReaction(null);
    setPhase("prep");
    timerRef.current = window.setTimeout(() => {
      startRef.current = performance.now();
      setPhase("go");
    }, 1000 + rand(2500));
  };

  const clickPanel = () => {
    if (phase === "idle" || phase === "result" || phase === "penalty") {
      begin();
      return;
    }
    if (phase === "prep") {
      if (timerRef.current) window.clearTimeout(timerRef.current);
      setPhase("penalty");
      return;
    }
    if (phase === "go") {
      const ms = Math.max(1, Math.round(performance.now() - startRef.current));
      setReaction(ms);
      setPhase("result");
    }
  };

  return (
    <div className="space-y-3">
      <div className={cardClass}>
        <p className="text-sm text-gray-300">Rule: click only when panel says FIRE.</p>
        <p className="mt-1 text-xs text-gray-400">
          {phase === "result" && reaction ? `Reaction: ${reaction} ms` : phase === "penalty" ? "Penalty: early click." : "Ready"}
        </p>
      </div>
      <button
        type="button"
        onClick={clickPanel}
        className={`h-56 w-full rounded-sm border text-sm ${
          phase === "go" ? "border-cyan-400 bg-cyan-500/20" : "border-gray-700 bg-[#252526]"
        }`}
      >
        {phase === "idle" && "Click to Start"}
        {phase === "prep" && "Hold"}
        {phase === "go" && "FIRE"}
        {phase === "result" && "Click to Retry"}
        {phase === "penalty" && "Too Early. Click to Retry"}
      </button>
    </div>
  );
};

const ArcadePanel = () => {
  const [mode, setMode] = useState<DeviceMode>(isDesktopWidth() ? "desktop" : "mobile");
  const [game, setGame] = useState<GameName>(() => pickRandomGame(isDesktopWidth() ? "desktop" : "mobile"));

  useEffect(() => {
    const onResize = () => {
      const nextMode: DeviceMode = window.innerWidth >= 1024 ? "desktop" : "mobile";
      setMode((prev) => {
        if (prev !== nextMode) {
          setGame(pickRandomGame(nextMode));
          return nextMode;
        }
        return prev;
      });
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const reroll = () => setGame(pickRandomGame(mode));

  return (
    <div className={panelClass}>
      <div className="border-b border-gray-700 bg-[#252526] px-4 py-3">
        <p className="text-sm font-semibold tracking-wide text-cyan-400">VS Code Arcade</p>
        <p className="mt-1 text-xs text-gray-400">{mode === "desktop" ? "Desktop Mode" : "Mobile Mode"}</p>
      </div>
      <div className="border-b border-gray-700 px-4 py-2 flex items-center justify-between">
        <p className="text-xs text-gray-300">{game}</p>
        <button type="button" onClick={reroll} className="rounded-sm border border-gray-700 px-2 py-1 text-xs hover:border-cyan-500">
          Randomize
        </button>
      </div>
      <div className="p-4">
        {game === "Swipe Snake" && <SwipeSnake />}
        {game === "Target Drift" && <TargetDrift />}
        {game === "Reflex Chain" && <ReflexChain />}
        {game === "2048" && <Game2048 />}
        {game === "Orbital Dodge" && <OrbitalDodge />}
        {game === "Advanced Reaction Game" && <AdvancedReactionGame />}
      </div>
    </div>
  );
};

export default ArcadePanel;
