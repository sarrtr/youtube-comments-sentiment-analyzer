import React from 'react';
import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
    const navigate = useNavigate();
    const handleGoHome = () => {
        navigate('/');
    };

    return (
    <div className="justify-center flex flex-col items-center min-h-screen bg-white text-black px-16 pt-8">
        <h1 className="text-center text-2xl font-inter font-light leading-tight">
        Ошибка! Пожалуйста, проверьте, что URL ведёт к существующему YouTube-видео.
        </h1>

        <button
        onClick={handleGoHome}
        className="mt-16 w-[500px] h-[80px] px-6 py-3 bg-gray-300 text-2xl text-black rounded-full hover:bg-blue-600 transition"
        >
            Вернуться на главную страницу
        </button>

    </div>

    );
};

export default ErrorPage;
