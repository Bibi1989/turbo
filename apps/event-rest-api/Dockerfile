FROM node:23-alpine3.20 AS build

RUN corepack enable && corepack prepare pnpm@latest --activate

RUN npm install -g npm@11.1.0

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN pnpm install

COPY . .

RUN pnpm run build

FROM node:22-alpine

WORKDIR /app

COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/prisma ./prisma
COPY --from=build /app/start.sh ./start.sh

EXPOSE 5000

RUN chmod +x start.sh

CMD ["sh", "-c", "./start.sh"]