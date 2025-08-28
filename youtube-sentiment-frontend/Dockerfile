FROM node:20

WORKDIR /app

COPY youtube-sentiment-frontend/ /app/

RUN npm install

EXPOSE 5173
CMD ["npm", "run", "start"]
