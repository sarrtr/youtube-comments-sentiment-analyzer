import React, { useMemo } from "react";
import { useLocation } from "react-router-dom";

import { analyzeComments } from "../services/SentimentUtils";
import { getWordFrequencies } from "../services/WordCloudUtils";
import DonutChart from "../components/DonutChart";
import CustomBarChart from "../components/BarChart";
import DynamicChart from "../components/DynamicChart";
import WordCloudChart from "../components/WordCloudChart";

const ChartsPage = () => {
  const location = useLocation();
  const { comments, title } = location.state || { comments: [], title: "" };

  const {
    sentimentCounts,
    sentimentPercentages,
    dominantSentiment,
    dynamicChartData,
  } = useMemo(() => analyzeComments(comments), [comments]);

  const wordFrequencies = useMemo(
    () => getWordFrequencies(comments),
    [comments]
  );

  return (
    <div className="flex flex-col h-screen w-screen bg-white text-black px-16 pt-16 pb-8 overflow-hidden">
      <h1 className="text-4xl font-bold mb-4">{title}</h1>

      <div className="mt-8 flex flex-row gap-6 flex-grow overflow-hidden">
        {/*first column*/}
        <div className="w-1/3 flex flex-col gap-4">
          
          <div className="h-1/3 flex-grow">
            <h2 className=" text-lg font-semibold">
            Проанализировано комментариев: {comments.length}
          </h2>

          <h2 className="text-lg font-semibold">Превалирующая тональность:</h2>
          <p className="text-xl capitalize font-semibold">
            {dominantSentiment}
          </p>
          </div>

          <div className="h-2/3 flex-grow">
            <DynamicChart data={dynamicChartData} />
          </div>
        </div>

        {/*second column*/}
        <div className="w-1/3 flex flex-col gap-4">
          <div className="flex h-[45%] w-[100%]">
            <DonutChart percentages={sentimentPercentages} />
          </div>
          <div className="flex h-[55%] w-[100%]">
            <CustomBarChart commentsCount={sentimentCounts} />
          </div>
        </div>

        {/*third column*/}
        <div className="w-1/3 flex flex-col gap-4 overflow-hidden">
          <div className="h-1/3">
            <WordCloudChart
              words={wordFrequencies.positive}
              title="Позитивные"
            />
          </div>
          <div className="h-1/3">
            <WordCloudChart
              words={wordFrequencies.neutral}
              title="Нейтральные"
            />
          </div>
          <div className="h-1/3">
            <WordCloudChart
              words={wordFrequencies.negative}
              title="Негативные"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartsPage;
