import React from 'react';

const HomePage = () => {
  return (
    <div className="flex flex-col items-start min-h-screen bg-white text-black px-16 pt-8">
      <h1 className="text-left text-8xl font-inter font-light leading-tight">
        Анализ тональности<br />комментариев<br />под YouTube-видео
      </h1>

      <input
        type="text"
        placeholder="Вставьте ссылку на видео"
        className="text-center mt-32 w-[500px] h-[80px] px-6 py-4 rounded-full text-2xl bg-gray-200 text-gray-500 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
      />
    </div>
  );
};

export default HomePage;
