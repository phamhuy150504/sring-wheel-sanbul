import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import bgImage from "../assets/./bgcp.jpg";
import Circle from "./circle/Circle";

interface CircleProps {
  colors: string[];
}

const CircleComponent: React.FC<CircleProps> = ({ colors }) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [currentColor, setCurrentColor] = useState("");


  const intervalRef = useRef<any>(null);
  const [milliseconds, setMilliseconds] = useState(18000);

  useEffect(() => {
    intervalRef.current = window.setInterval(() => {
      setMilliseconds((prevMilliseconds) => prevMilliseconds - 10);
    }, 10);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (milliseconds === 0) {
      clearInterval(intervalRef.current);
      // Xử lý khi đếm ngược hoàn thành
    }
  }, [milliseconds]);

  const formatTime = (time: number): string => {
    const seconds = Math.floor(time / 1000);
    const milliseconds = time % 1000;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    const formattedMilliseconds = String(milliseconds)
      .padStart(3, "0")
      .slice(0, 2);
    return `${formattedSeconds}.${formattedMilliseconds}`;
  };

  const displayTime = formatTime(milliseconds);

  const startRotation = () => {
    if (isSpinning) return;
    setIsSpinning(true);
  };

  const handleRotationComplete = () => {
    setCurrentColor(colors[2]);
  };

  const handleRotationUpdate = (value: any) => {
    const angle = value.rotate % 360;
    const segment = Math.floor((angle / 360) * colors.length);
    setCurrentColor(colors[segment]);
  };

  useEffect(() => {
    if (displayTime === "00.00") {
      startRotation();
    }
  }, [displayTime]);


  return (
    <div
      style={{
        position: "relative",
        width: "830px",
        height: "640px",
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          bottom: 0,
          overflow: "hidden",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          transform: "translateY(50px)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
          }}
        >
          <motion.div
            style={{
              width: "450px",
              height: "450px",
              position: "absolute",
            }}
            animate={{ rotate: isSpinning ? 1080 : 0 }}
            transition={{
              duration: isSpinning ? 7 : 0,
              ease: [0.2, 0.2, 0.2, 1],
            }}
            onAnimationComplete={handleRotationComplete}
            onUpdate={handleRotationUpdate}
          >
            {/* Tạo các nét đứt */}
            <Circle colors={colors} />
          </motion.div>
        </div>
      </div>

      <div
        style={{
          fontSize: "25px",
          fontWeight: "bold",
          color: "red",
          width: "20px",
          height: "20px",
          position: "absolute",
          bottom: "25%",
          left: "calc(50% - 40px)",
        }}
      >
        {displayTime}
      </div>

      {/* Màu trên mũi kim */}
      <motion.div
        style={{
          width: "40px",
          height: "40px",
          position: "absolute",
          bottom: "12%",
          left: "calc(50% - 27px)",
          transform: "rotate(45deg)",
          backgroundColor: currentColor,
          clipPath: "polygon(100% 0%, 0% 100%, 100% 100%)",
          transformOrigin: "bottom bottom",
        }}
      ></motion.div>
    </div>
  );
};

export default CircleComponent;
