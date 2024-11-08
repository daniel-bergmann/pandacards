# Stage 1: Build the Vite app
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve the app with Nginx
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 8888
CMD ["nginx", "-g", "daemon off;"]
