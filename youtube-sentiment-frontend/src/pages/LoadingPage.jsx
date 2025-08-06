import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const LoadingPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { videoUrl } = location.state || {};

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/analyze", {
          params: { url: videoUrl },
        });

        if (response.data.success && response.data.comments) {
          navigate("/charts", {
            state: {
              comments: response.data.comments,
              title: response.data.title,
            },
          });
        } else {
          navigate("/error", {
            state: { message: "Анализ не дал результатов" },
          });
        }
      } catch (error) {
        console.error("Ошибка при анализе:", error);
        navigate("/error", {
          state: { message: "Произошла ошибка при анализе видео" },
        });
      }
    };

    if (videoUrl) {
      fetchData();
    } else {
      navigate("/error", {
        state: { message: "URL видео не передан" },
      });
    }
  }, [videoUrl, navigate]);

  return (
    <div className="h-screen flex items-center justify-center">
      <h1 className="text-2xl font-semibold animate-pulse">
        Анализируем видео... ⏳
      </h1>
    </div>
  );
};

export default LoadingPage;
