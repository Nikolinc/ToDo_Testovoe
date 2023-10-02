import { useEffect, useMemo, useRef, useState } from "react";
import "./dashboard.css";

export default function Dashboard() {
  const circle = useRef<SVGCircleElement>(null);
  const [progress, setProgress] = useState(75);

  const radius: number = circle.current?.r.baseVal.value || 0;
  const circumference = 2 * Math.PI * radius;

  if (circle.current) {
    circle.current.style.strokeDasharray = `${circumference} ${circumference}`;
    circle.current.style.strokeDashoffset = `${circumference}`;
  }

  useMemo(() => {
      const offset = circumference - (progress / 100) * circumference;
    if (circle.current) {
      circle.current.style.strokeDashoffset = String(offset);
    }

    console.log("offset", offset);
  }, [circumference, progress]);

  return (
    <div
      className=" component dashboard flex-center"
      onClick={() => setProgress(progress + 1)}
    >
      <svg className="flex-center svg-progress-bar" width="100%" height="100%">
        <circle
          ref={circle}
          className="progress-bar flex-center"
          strokeWidth="2rem"
          cx="160"
          cy="150"
          r="100"
          fill="transparent"
        />
        <text x="115" y="170" fill="var(--text)">
          {progress}%
        </text>
      </svg>
    </div>
  );
}
