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
    <div className="flex flex-col h-screen w-screen bg-white text-black px-16 py-16 overflow-hidden">
      <h1 className="text-4xl font-bold mb-4">{title}</h1>

      <div className="mt-12 flex flex-row gap-6 flex-grow overflow-hidden">
        {/*left column*/}
        <div className="w-1/2 flex flex-col gap-4">
          <h2 className=" text-lg font-semibold">
            Проанализировано комментариев: {comments.length}
          </h2>

          <h2 className="text-lg font-semibold">Превалирующая тональность:</h2>
          <p className="text-xl capitalize font-semibold">
            {dominantSentiment}
          </p>

          <div className="flex-grow">
            <DynamicChart data={dynamicChartData} />
          </div>
        </div>

        {/*right column*/}
        <div className="w-1/2 flex flex-col gap-4">
          {/*upper part*/}
          <div className="h-1/2 flex flex-row">
            <div className="flex h-[100%] w-[100%]">
              <DonutChart percentages={sentimentPercentages} />
            </div>

            <div className="flex h-[100%] w-[100%]">
              <CustomBarChart commentsCount={sentimentCounts} />
            </div>
            {/*lower part*/}
            {/* <div className="h-1/2 flex flex-row gap-4 overflow-hidden">
              <div className="w-1/3">
                <WordCloudChart
                  words={wordFrequencies.positive}
                  title="Позитивные"
                />
              </div>
              <div className="w-1/3">
                <WordCloudChart
                  words={wordFrequencies.neutral}
                  title="Нейтральные"
                />
              </div>
              <div className="w-1/3">
                <WordCloudChart
                  words={wordFrequencies.negative}
                  title="Негативные"
                />
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartsPage;
