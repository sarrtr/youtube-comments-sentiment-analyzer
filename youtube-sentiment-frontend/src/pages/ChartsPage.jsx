import React from 'react';
import { useLocation } from 'react-router-dom';

const ChartsPage = () => {
  const location = useLocation();
  const { comments, title } = location.state || { comments: [], title: '' };

  return (
    <div className="flex flex-col items-start min-h-screen bg-white text-black px-8 pt-8">
      <h1 className="text-left text-3xl font-inter font-light leading-tight">
        {title}
      </h1>
      <div className="flex flex-row items-star">
        <div className="flex flex-col">
          <h1 className="text-center">
            кол-во комментариев
          </h1>

            график-пончик
            
            топ комментариев
        </div>
        <div className="flex flex-col">
          динамический график

          <h1 className="text-center">
            превалирующая тональность
          </h1> 
        </div>
      </div>
    </div>
  );
};

export default ChartsPage;
