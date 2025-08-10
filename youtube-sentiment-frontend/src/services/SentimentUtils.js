import { parseISO, differenceInDays, addDays, format } from "date-fns";

export function analyzeComments(comments, intervalCount = 5) {
  const counts = { positive: 0, neutral: 0, negative: 0 };
  comments.forEach((c) => {
    if (counts[c.sentiment] !== undefined) counts[c.sentiment]++;
  });

  const total = comments.length;

  let positive = total ? (counts.positive / total) * 100 : 0;
  let neutral = total ? (counts.neutral / total) * 100 : 0;
  let negative = total ? (counts.negative / total) * 100 : 0;

  positive = parseFloat(positive.toFixed(1));
  neutral = parseFloat(neutral.toFixed(1));
  negative = parseFloat((100 - positive - neutral).toFixed(1));

  const percentages = { positive, neutral, negative };

  const dominant = Object.keys(counts).reduce((a, b) =>
    counts[a] > counts[b] ? a : b
  );

  const dates = comments.map((c) => parseISO(c.date));
  const minDate = dates.length ? new Date(Math.min(...dates)) : new Date();
  const maxDate = dates.length ? new Date(Math.max(...dates)) : new Date();

  const totalDays = differenceInDays(maxDate, minDate) || 1;
  const intervalLength = Math.ceil(totalDays / intervalCount);
  const bins = [];

  for (let i = 0; i < intervalCount; i++) {
    const start = addDays(minDate, i * intervalLength);
    const end = addDays(minDate, (i + 1) * intervalLength - 1);

    const binComments = comments.filter((c) => {
      const date = parseISO(c.date);
      return date >= start && date <= end;
    });

    const binCounts = { positive: 0, neutral: 0, negative: 0 };
    binComments.forEach((c) => {
      if (binCounts[c.sentiment] !== undefined) binCounts[c.sentiment]++;
    });

    bins.push({
      name: `${format(start, "dd-MM-yy")}`,
      positive: binCounts.positive,
      neutral: binCounts.neutral,
      negative: binCounts.negative,
    });
  }

  return {
    sentimentCounts: counts,
    sentimentPercentages: percentages,
    dominantSentiment: dominant,
    dynamicChartData: bins,
  };
}
