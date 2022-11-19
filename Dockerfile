FROM node:16

WORKDIR /app

COPY package*.json ./

COPY ./ ./

EXPOSE 3001

RUN npm install

CMD ["npm", "run", "start:win"]