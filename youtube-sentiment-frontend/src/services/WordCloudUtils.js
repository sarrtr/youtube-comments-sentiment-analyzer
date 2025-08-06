export function getWordFrequencies(comments) {
  const stopWords = new Set([
    "и",
    "в",
    "во",
    "не",
    "что",
    "он",
    "на",
    "я",
    "с",
    "со",
    "как",
    "а",
    "то",
    "все",
    "она",
    "так",
    "его",
    "но",
    "да",
    "ты",
    "к",
    "у",
    "же",
    "вы",
    "за",
    "бы",
    "по",
    "только",
    "ее",
    "мне",
    "было",
    "вот",
    "от",
    "меня",
    "еще",
    "нет",
    "о",
    "из",
    "ему",
    "теперь",
    "когда",
    "даже",
    "ну",
    "вдруг",
    "ли",
    "если",
    "уже",
    "или",
    "ни",
    "быть",
    "был",
    "него",
    "до",
    "вас",
    "нибудь",
    "опять",
    "уж",
    "вам",
    "ведь",
    "там",
    "потом",
    "себя",
    "ничего",
    "ей",
    "может",
    "они",
    "тут",
    "где",
    "есть",
    "надо",
    "ней",
    "для",
    "мы",
    "тебя",
    "их",
    "чем",
    "была",
    "сам",
    "чтоб",
    "без",
    "будто",
    "чего",
    "раз",
    "тоже",
    "себе",
    "под",
    "будет",
    "ж",
    "тогда",
    "кто",
    "этот",
    "того",
    "потому",
    "этого",
    "это",
  ]);

  const frequencies = {
    positive: {},
    neutral: {},
    negative: {},
  };

  comments.forEach(({ text, sentiment }) => {
    if (!text || !sentiment || !frequencies[sentiment]) return;

    const words = text
      .toLowerCase()
      .replace(/[^\p{L}\s]/gu, "")
      .split(/\s+/)
      .filter((word) => word && !stopWords.has(word));

    words.forEach((word) => {
      frequencies[sentiment][word] = (frequencies[sentiment][word] || 0) + 1;
    });
  });

  const sortAndLimit = (obj) =>
    Object.entries(obj)
      .map(([text, value]) => ({ text, value }))
      .filter((item) => typeof item.value === "number" && !isNaN(item.value))
      .sort((a, b) => b.value - a.value)
      .slice(0, 50);

  console.log("Частоты слов:", frequencies);

  return {
    positive: sortAndLimit(frequencies.positive),
    neutral: sortAndLimit(frequencies.neutral),
    negative: sortAndLimit(frequencies.negative),
  };
}
