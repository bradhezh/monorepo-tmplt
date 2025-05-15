FROM node:22

WORKDIR /usr/app

RUN corepack enable && corepack prepare pnpm@latest --activate

COPY . .

RUN pnpm i --frozen-lockfile
RUN pnpm build
RUN pnpm prune --prod

USER node

CMD ["pnpm", "start"]
