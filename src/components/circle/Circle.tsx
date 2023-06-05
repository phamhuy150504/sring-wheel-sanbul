const Circle = ({ colors }: any) => {
  return (
    <>
      
      {Array.from(Array(54)).map((_, index) => {
        const color = colors[index % 4];
        const angle = (360 / 54) * index;
        const radian = (angle * Math.PI) / 180;
        const x = Math.cos(radian) * 230;
        const y = Math.sin(radian) * 230;
        return (
          <div
            key={index}
            style={{
              position: "absolute",
              width: "10px",
              height: "20px",
              backgroundColor: color,
              borderRadius: "4px",
              top: "calc(50% - 10px)",
              left: "calc(50% - 5px)",
              transform: `translate(${x}px, ${y}px) rotate(${angle}deg)`,
            }}
          ></div>
        );
      })}
    </>
  );
};

export default Circle;
