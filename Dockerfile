# Base image with NodeJS
FROM node:18-alpine

# Working directory for container
WORKDIR /usr/src/app

#installing netjs client
RUN npm install -g @nestjs/cli

# Dependencies install
COPY package*.json ./
RUN npm install

# Copy all the project
COPY . .

# Exposing port
EXPOSE 3000

# Start application as dev
CMD ["npm", "run", "start:dev"]
