import React from "react";
import ReactWordcloud from "react-wordcloud";

const WordCloudChart = ({ words, title }) => {
  const options = {
    rotations: 2,
    rotationAngles: [-90, 0],
    fontSizes: [12, 36],
  };

  if (!Array.isArray(words)) {
  console.warn("words не массив:", words);
}
   console.log("Words массив:", words); 

  const safeWords = Array.isArray(words)
    ? words.filter(word => word && typeof word.text === 'string' && typeof word.value === 'number')
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
      <div style={{ height: "200px", width: "100%" }}>
        <ReactWordcloud words={safeWords} options={options} />
      </div>
    </div>
  );
};

export default WordCloudChart;