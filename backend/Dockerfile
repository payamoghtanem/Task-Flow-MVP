FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev

FROM node:20-alpine AS runtime
WORKDIR /app
RUN addgroup -S taskflow && adduser -S taskflow -G taskflow
COPY --from=deps /app/node_modules ./node_modules
COPY src/ ./src/
COPY package.json ./
USER taskflow
EXPOSE 3001
ENV NODE_ENV=production
CMD ["node", "src/index.js"]
