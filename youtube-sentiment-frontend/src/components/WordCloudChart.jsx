import React from "react";

const getRandomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const WordCloudChart = ({ words, title }) => {
  const safeWords = Array.isArray(words)
    ? words.filter(
        (word) => word && typeof word.text === "string" && typeof word.value === "number"
      )
    : [];

  if (safeWords.length === 0) {
    return (
      <div className="p-4 border rounded text-center text-gray-500 text-sm">
        <h3 className="font-semibold mb-2">{title}</h3>
        Нет данных для отображения
      </div>
    );
  }

  return (
    <div className="h-full w-full">
      <h3 className="text-center font-semibold mb-2">{title}</h3>
      <div className="relative w-full h-[200px] overflow-hidden">
        {safeWords.map((word, index) => {
          const fontSize = 10 + (word.value / safeWords[0].value) * 12;
          const x = getRandomInt(10, 90);
          const y = getRandomInt(10, 90);
          const rotation = getRandomInt(-45, 45);

          return (
            <span
              key={index}
              className="absolute  animate-fadeIn"
              style={{
                left: `${x}%`,
                top: `${y}%`,
                fontSize: `${fontSize}px`,
                transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
                whiteSpace: "nowrap",
                fontWeight: 500,
                color: "#333",
              }}
            >
              {word.text}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default WordCloudChart;
