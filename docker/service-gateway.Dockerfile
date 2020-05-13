FROM node:14 AS builder
WORKDIR /app
COPY ../package.json ./
RUN yarn global add rimraf
RUN yarn
COPY . .
RUN yarn build


FROM node:14-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
CMD ["node", "dist/apps/service-gateway/main.js"]