import React, { useEffect, useRef } from "react";

const Silk = ({ speed = 5, scale = 1, color = "#7B7481", rotation = 0 }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Set CSS custom properties for animation
    container.style.setProperty("--animation-speed", `${speed}s`);
    container.style.setProperty("--scale", scale);
    container.style.setProperty("--color", color);
    container.style.setProperty("--rotation", `${rotation}deg`);
  }, [speed, scale, color, rotation]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 -z-10 w-full h-full overflow-hidden"
      style={{
        background: `
          radial-gradient(circle at 20% 80%, ${color}15 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, ${color}10 0%, transparent 50%),
          radial-gradient(circle at 40% 40%, ${color}08 0%, transparent 50%),
          linear-gradient(45deg, ${color}05 0%, transparent 50%, ${color}03 100%)
        `,
      }}
    >
      {/* Animated background elements */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: `
            repeating-linear-gradient(
              45deg,
              transparent,
              transparent 10px,
              ${color}05 10px,
              ${color}05 20px
            )
          `,
          animation: `silk-move var(--animation-speed, 5s) linear infinite`,
        }}
      />

      <div
        className="absolute inset-0 opacity-20"
        style={{
          background: `
            repeating-linear-gradient(
              -45deg,
              transparent,
              transparent 15px,
              ${color}03 15px,
              ${color}03 30px
            )
          `,
          animation: `silk-move-reverse calc(var(--animation-speed, 5s) * 1.5) linear infinite`,
        }}
      />

      {/* Floating particles effect */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full opacity-20"
            style={{
              background: color,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes silk-move {
          0% {
            transform: translateX(-50%) translateY(-50%) rotate(0deg);
          }
          100% {
            transform: translateX(50%) translateY(50%) rotate(360deg);
          }
        }

        @keyframes silk-move-reverse {
          0% {
            transform: translateX(50%) translateY(50%) rotate(0deg);
          }
          100% {
            transform: translateX(-50%) translateY(-50%) rotate(-360deg);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) scale(1);
            opacity: 0.2;
          }
          50% {
            transform: translateY(-20px) scale(1.2);
            opacity: 0.4;
          }
        }
      `}</style>
    </div>
  );
};

export default Silk;
