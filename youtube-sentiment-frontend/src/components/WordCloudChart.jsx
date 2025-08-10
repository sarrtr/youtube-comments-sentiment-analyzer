import React from "react";

export default function WordCloudChart({ words, title }) {
  const colorPalettes = {
    positive: ["#59FF00", "#4BD501", "#53C914", "#94FF5A", "#71E732"],
    negative: ["#FBCFE8", "#F9A8D4", "#F472B6", "#EC4899", "#DB2777"],
    neutral: ["#00BFFF", "#099ACB", "#5DD7FF", "#5AC3E6", "#95E5FF"],
  };

  const paletteMap = {
    Позитивные: "positive",
    Нейтральные: "neutral",
    Негативные: "negative",
  };

  const palette = colorPalettes[paletteMap[title]];

  return (
    <div className="flex flex-wrap gap-3 p-4 bg-white rounded-lg shadow">
      {words.map((word, index) => {
        const bgColor = palette[Math.floor(Math.random() * 5)];
        return (
          <span
            key={index}
            className="px-4 py-2 text-sm font-medium rounded-full text-white whitespace-nowrap shadow-sm"
            style={{ backgroundColor: bgColor }}
          >
            {word.text}
          </span>
        );
      })}
    </div>
  );
}
