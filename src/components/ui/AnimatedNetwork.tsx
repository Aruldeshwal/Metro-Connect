"use client";

import React, { useMemo } from "react";

interface AnimatedNetworkProps {
  width?: string | number;
  height?: string | number;
  seed?: number;
}

export default function AnimatedNetwork({
  width = "100%",
  height = 420,
  seed,
}: AnimatedNetworkProps) {
  // Deterministic seeded random
  const rand = (function (s: number = seed ?? 12345) {
    let x = s;
    return function () {
      x ^= x << 13;
      x ^= x >>> 17;
      x ^= x << 5;
      return (x >>> 0) / 4294967295;
    };
  })(seed ?? 12345);

  const curves = useMemo(() => {
  const result: { id: string; d: string; stroke: string; duration: number }[] = [];

  const W = 600;
  const H = 500;

  // 🔴 RED LINE
  const red = (() => {
    const x1 = 40;
    const y1 = 120 + rand() * 80;
    const x2 = W - 40;
    const y2 = 120 + rand() * 80;

    const cx1 = x1 + (rand() * W) / 2;
    const cy1 = y1 + (rand() - 0.5) * 400;
    const cx2 = x2 - (rand() * W) / 2;
    const cy2 = y2 + (rand() - 0.5) * 400;

    const duration = 6 + rand() * 6;

    return {
      id: "curve-red",
      d: `M ${x1},${y1} C ${cx1},${cy1} ${cx2},${cy2} ${x2},${y2}`,
      stroke: "#ff4d4f",
      duration,
      end: { x2, y2 },
    };
  })();

  result.push(red);

  // 🟠 ORANGE LINE — starts top, cuts across, ends bottom
  const orange = (() => {
    const x1 = 120;
    const y1 = 40;
    const x2 = 300 + rand() * 100;
    const y2 = H - 40;

    const cx1 = W / 3;
    const cy1 = H / 3;
    const cx2 = (2 * W) / 3;
    const cy2 = (2 * H) / 3;

    const duration = 10 + rand() * 4;

    return {
      id: "curve-orange",
      d: `M ${x1},${y1} C ${cx1},${cy1} ${cx2},${cy2} ${x2},${y2}`,
      stroke: "#FFA500",
      duration,
    };
  })();

  result.push(orange);

  // 🟡 YELLOW LINE — starts beside red endpoint, goes under orange
  // 🟡 YELLOW LINE — starts higher near top, curves down and left, ends below orange
{
  const x1 = red.end.x2 + 10; // start beside red’s endpoint (right side)
  const y1 = 60; // move start point higher (was ~red.end.y2 - 20)

  const x2 = W / 2 - 60; // end more toward bottom-left
  const y2 = H + 60; // below orange line (unchanged)

  // Control points for upward start & leftward end
  const cx1 = W - 120; // keep curve starting toward the top
  const cy1 = y1 - 80; // arch upward a bit
  const cx2 = W / 3 - 80; // pull end section left
  const cy2 = H - 30; // dip downward near end

  const duration = 8 + rand() * 5;

  result.push({
    id: "curve-yellow",
    d: `M ${x1},${y1} C ${cx1},${cy1} ${cx2},${cy2} ${x2},${y2}`,
    stroke: "#FFD700",
    duration,
  });
}

// 🩵 SKY BLUE LINE — curvy & flowing: yellow(top) → red → yellow(mid) → orange → bottom-left
{
  const x1 = 240;  // start between orange & yellow starts
  const y1 = 70;   // slightly lower to form a soft arc at top

  // More exaggerated control points for fluid motion
  const c1x = 520; // pull far right to intersect yellow near top
  const c1y = 20;  // strong upward arc
  const midx = 480;
  const midy = 160; // gentle dip after first intersection

  // Second segment: swing left deeply to hit red → yellow → orange sequence
  const c2x = 360;
  const c2y = 300; // deep bend crossing red
  const c3x = 180;
  const c3y = 440; // lower bend through yellow/orange zone
  const x2 = 80;
  const y2 = H - 40; // end bottom-left hemisphere

  const duration = 9 + rand() * 4;

  result.push({
    id: "curve-skyblue",
    d: `M ${x1},${y1} 
        C ${c1x},${c1y} ${midx},${midy} ${midx},${midy} 
        C ${c2x},${c2y} ${c3x},${c3y} ${x2},${y2}`,
    stroke: "#87CEEB",
    duration,
  });
}

  

  return result;
}, [rand]);



  return (
    <div
      className="flex items-center justify-center"
      style={{
        width,
        height,
        overflow: "visible",
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox={`0 0 600 500`}
        preserveAspectRatio="xMidYMid meet"
        style={{
          width: "100%",
          height: "100%",
        }}
        aria-hidden="true"
      >
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {curves.map((c) => (
          <g key={c.id}>
            <path
              id={c.id}
              d={c.d}
              fill="none"
              stroke={c.stroke}
              strokeWidth={6}
              strokeOpacity={0.18}
              strokeLinecap="round"
            />

            <path
              d={c.d}
              fill="none"
              stroke={c.stroke}
              strokeWidth={2}
              strokeOpacity={0.95}
              strokeLinecap="round"
            />

            {Array.from({ length: 3 }).map((_, j) => {
              const offset = (j / 3) * (c.duration / 1.5);
              const r = 6 - j;
              return (
                <circle key={j} r={r} fill={c.stroke} filter="url(#glow)" opacity="0">
                  <animate
                    attributeName="opacity"
                    from="0"
                    to="1"
                    dur="0.3s"
                    begin={`${offset + 0.1}s`}   // starts slightly after motion begins
                    fill="freeze"
                  />
                  <animateMotion
                    dur={`${c.duration}s`}
                    repeatCount="indefinite"
                    begin={`${offset}s`}
                    rotate="auto"
                  >
                    <mpath href={`#${c.id}`} />
                  </animateMotion>
                </circle>
              );
            })}

          </g>
        ))}

        <g opacity="0.06">
          {Array.from({ length: 20 }).map((_, i) => (
            <circle
              key={`bg-${i}`}
              cx={20 + (i * 30) % 560}
              cy={30 + ((i * 71) % 460)}
              r={2 + ((i + 3) % 3)}
            />
          ))}
        </g>
      </svg>
    </div>
  );
}

