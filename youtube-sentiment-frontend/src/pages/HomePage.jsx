import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const HomePage = () => {
  const [url, setUrl] = useState('');
  const navigate = useNavigate();

  const handleKeyDown = async (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();

      if (url.trim() !== '') {
        try {
          const response = await axios.get(`http://localhost:8000/analyze/`, {
            params: { url }
          });

          console.log('Ответ от сервера:', response.data);

          if (response.data.success) {
            navigate('/charts', {
              state: {
              comments: response.data.comments,
              title: response.data.title 
              }
            });
          } else {
            navigate('/error');
          }

        } catch (error) {
          console.error('Ошибка при анализе:', error);
          navigate('/error');
        }
      }
    }
  };

  return (
    <div className="flex flex-col items-start min-h-screen bg-white text-black px-16 pt-16">
      <h1 className="text-left text-8xl font-inter font-light leading-tight">
        Анализ тональности<br />комментариев<br />под YouTube-видео
      </h1>

      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Вставьте ссылку на видео"
        className="text-center mt-24 w-[500px] h-[80px] px-6 py-4 rounded-full text-2xl bg-gray-200 text-gray-500 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
      />
    </div>
  );
};

export default HomePage;
