import { useState, useRef, MouseEvent } from "react";

interface TiltStyle {
  transform: string;
  transition: string;
}

export const useMouseTilt = <T extends HTMLElement = HTMLDivElement>(
  maxTilt: number = 10
) => {
  const [tiltStyle, setTiltStyle] = useState<TiltStyle>({
    transform: "",
    transition: "",
  });
  const ref = useRef<T>(null);

  const handleMouseMove = (e: MouseEvent<T>) => {
    if (!ref.current) return;

    const card = ref.current;
    const rect = card.getBoundingClientRect();

    // Calculate cursor position relative to card center
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Calculate rotation angles
    const rotateX = ((y - centerY) / centerY) * -maxTilt;
    const rotateY = ((x - centerX) / centerX) * maxTilt;

    setTiltStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`,
      transition: "transform 0.1s ease-out",
    });
  };

  const handleMouseLeave = () => {
    setTiltStyle({
      transform:
        "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
      transition: "transform 0.5s ease-out",
    });
  };

  return {
    ref,
    tiltStyle,
    handleMouseMove,
    handleMouseLeave,
  };
};
