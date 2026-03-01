'use client'

import React, { useEffect, useRef, useState } from "react";

type Position = {
  x: number;
  y: number;
};

type DirectionKey = "UP" | "DOWN" | "LEFT" | "RIGHT";

const GRID_SIZE = 20;
const INITIAL_SPEED = 120;

const SnakeGameDev: React.FC = () => {
  const initialSnake: Position[] = [
    { x: 10, y: 10 },
    { x: 9, y: 10 },
    { x: 8, y: 10 },
  ];

  const [snake, setSnake] = useState<Position[]>(initialSnake);
  const [food, setFood] = useState<Position>({ x: 5, y: 5 });
  const [direction, setDirection] = useState<Position>({ x: 1, y: 0 });
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [score, setScore] = useState(0);

  const directionRef = useRef<Position>({ x: 1, y: 0 });

  useEffect(() => {
    directionRef.current = direction;
  }, [direction]);

  const generateFood = (snakeBody: Position[]): Position => {
    let newFood: Position;

    do {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
    } while (
      snakeBody.some(
        (segment) => segment.x === newFood.x && segment.y === newFood.y
      )
    );

    return newFood;
  };

  useEffect(() => {
    if (!gameStarted || gameOver) return;

    const interval = setInterval(() => {
      setSnake((prev) => {
        const head = prev[0];

        const newHead: Position = {
          x: head.x + directionRef.current.x,
          y: head.y + directionRef.current.y,
        };

        if (
          newHead.x < 0 ||
          newHead.x >= GRID_SIZE ||
          newHead.y < 0 ||
          newHead.y >= GRID_SIZE ||
          prev.some(
            (seg) => seg.x === newHead.x && seg.y === newHead.y
          )
        ) {
          setGameOver(true);
          return prev;
        }

        const newSnake = [newHead, ...prev];

        if (newHead.x === food.x && newHead.y === food.y) {
          setFood(generateFood(newSnake));
          setScore((s) => s + 1);
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    }, INITIAL_SPEED);

    return () => clearInterval(interval);
  }, [food, gameOver, gameStarted]);

  const handleDirection = (dir: DirectionKey) => {
    switch (dir) {
      case "UP":
        if (directionRef.current.y === 0)
          setDirection({ x: 0, y: -1 });
        break;
      case "DOWN":
        if (directionRef.current.y === 0)
          setDirection({ x: 0, y: 1 });
        break;
      case "LEFT":
        if (directionRef.current.x === 0)
          setDirection({ x: -1, y: 0 });
        break;
      case "RIGHT":
        if (directionRef.current.x === 0)
          setDirection({ x: 1, y: 0 });
        break;
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!gameStarted || gameOver) return;

      switch (e.key) {
        case "ArrowUp":
          handleDirection("UP");
          break;
        case "ArrowDown":
          handleDirection("DOWN");
          break;
        case "ArrowLeft":
          handleDirection("LEFT");
          break;
        case "ArrowRight":
          handleDirection("RIGHT");
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [gameOver, gameStarted]);

  

  const startGame = () => {
    setSnake(initialSnake);
    setDirection({ x: 1, y: 0 });
    directionRef.current = { x: 1, y: 0 };
    setFood({ x: 5, y: 5 });
    setScore(0);
    setGameOver(false);
    setGameStarted(true);
  };

  const restartGame = () => {
    setGameStarted(false);
    setGameOver(false);
  };

  const cellSize = 100 / GRID_SIZE;

  return (
    <div className="min-h-screen text-four flex flex-col items-center px-4 py-6 font-mono">

      <div className="w-full max-w-md bg-two border border-three rounded-sm shadow-xl">

        {/* Header */}
        <div className="px-4 py-2 border-b border-three flex justify-between text-xs text-seven">
          <span>snake-dev@localhost</span>
          <span>v4.0.0</span>
        </div>

        {/* Score */}
        <div className="px-4 py-2 flex justify-between text-sm text-eight">
          <span>Lines of Code: {score}</span>
          <span>
            {!gameStarted
              ? "Idle"
              : gameOver
              ? "Compilation Failed"
              : "Running"}
          </span>
        </div>

        {/* Game Board */}
        <div className="relative w-full aspect-square bg-one overflow-hidden">

          {/* Start Screen */}
          {!gameStarted && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-one z-10">
              <h2 className="text-five mb-4 text-lg">
                Itrix Snake — ISTA Edition
              </h2>
              <button
                onClick={startGame}
                className="px-6 py-2 bg-five text-one rounded-md hover:bg-seven transition"
              >
                Start Game
              </button>
            </div>
          )}

          {/* Snake */}
          {gameStarted &&
            snake.map((segment, index) => (
              <div
                key={`${segment.x}-${segment.y}-${index}`}
                style={{
                  position: "absolute",
                  width: `${cellSize}%`,
                  height: `${cellSize}%`,
                  left: `${segment.x * cellSize}%`,
                  top: `${segment.y * cellSize}%`,
                  backgroundColor:
                    index === 0
                      ? "var(--color-five)"
                      : "var(--color-eight)",
                }}
              />
            ))}

          {/* Food */}
          {gameStarted && (
            <div
              style={{
                position: "absolute",
                width: `${cellSize}%`,
                height: `${cellSize}%`,
                left: `${food.x * cellSize}%`,
                top: `${food.y * cellSize}%`,
                backgroundColor: "var(--color-ten)",
              }}
            />
          )}

          {/* Game Over */}
          {gameOver && (
            <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center">
              <p className="text-ten mb-4">
                Segmentation Fault 💀
              </p>
              <button
                onClick={restartGame}
                className="px-4 py-2 bg-five text-one rounded-md hover:bg-seven transition"
              >
                Back to Menu
              </button>
            </div>
          )}
        </div>

        {/* Mobile Controls */}
        {gameStarted && !gameOver && (
          <div className="p-4 flex flex-col items-center gap-3 select-none">

            <button
              onClick={() => handleDirection("UP")}
              className="w-16 h-16 bg-three text-four rounded-lg active:bg-five transition"
            >
              ↑
            </button>

            <div className="flex gap-6">
              <button
                onClick={() => handleDirection("LEFT")}
                className="w-16 h-16 bg-three text-four rounded-lg active:bg-five transition"
              >
                ←
              </button>

              <button
                onClick={() => handleDirection("DOWN")}
                className="w-16 h-16 bg-three text-four rounded-lg active:bg-five transition"
              >
                ↓
              </button>

              <button
                onClick={() => handleDirection("RIGHT")}
                className="w-16 h-16 bg-three text-four rounded-lg active:bg-five transition"
              >
                →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SnakeGameDev;