import React, { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

import DonutChart from '../components/DonutChart';
import DynamicChart from '../components/DynamicChart';
import TopComments from '../components/TopComments';
import { analyzeComments } from '../services/SentimentUtils';

const ChartsPage = () => {
  const location = useLocation();
  const { comments, title } = location.state || { comments: [], title: '' };

  const {
    sentimentPercentages,
    dominantSentiment,
    topComments,
    dynamicChartData
  } = useMemo(() => analyzeComments(comments), [comments]);

  return (
<div className="flex flex-col h-screen w-screen bg-white text-black px-6 py-16 overflow-hidden">
  <h1 className="text-4xl font-bold mb-4">
    {title}
    </h1>

  <div className="flex flex-row gap-6 flex-grow overflow-hidden">
    {/* Левая колонка */}
    <div className="w-1/3 flex flex-col gap-4 overflow-hidden">
      <h2 className="text-center text-lg font-semibold">
        Проанализировано комментариев: {comments.length}
      </h2>

      {/* Ограничим высоту: 40% на круговую диаграмму */}
      <div className="h-[40%]">
        <DonutChart percentages={sentimentPercentages} />
      </div>

      {/* Остальное — топ комментарии */}
      <div className="flex-grow overflow-y-auto">
        <TopComments comments={topComments} />
      </div>
    </div>

    {/* Правая колонка */}
    <div className="w-2/3 flex flex-col gap-4 overflow-hidden">
      {/* Верхняя часть — график, около 70% высоты */}
      <div className="flex-grow">
        <DynamicChart data={dynamicChartData} />
      </div>

      {/* Нижняя часть — текст */}
      <div className="h-[20%]">
        <h2 className="text-lg font-semibold">Превалирующая тональность:</h2>
        <p className="text-xl capitalize font-semibold">{dominantSentiment}</p>
      </div>
    </div>
  </div>
</div>

  );
};

export default ChartsPage;
