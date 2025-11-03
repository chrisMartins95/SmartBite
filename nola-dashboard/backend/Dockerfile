FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Rodar em modo desenvolvimento com ts-node-dev
CMD ["npm", "run", "dev"]
