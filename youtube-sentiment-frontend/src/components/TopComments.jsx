import React from 'react';

const TopComments = ({ comments }) => {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-xl font-semibold">Топ комментариев:</h2>
      <ul className="list-disc list-inside">
        {comments.map((comment, i) => (
          <li key={i}>
            <p className="font-light">{comment.text}</p>
            <p className="text-sm text-gray-600">Лайки: {comment.likes}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopComments;
