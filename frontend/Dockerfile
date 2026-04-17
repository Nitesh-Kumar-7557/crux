FROM node:24-alpine AS base

# Stage 1
FROM base AS builder

WORKDIR /home/build

COPY package*.json .
COPY tsconfig.json .
COPY next.config* .
COPY postcss.config* .

RUN npm install

COPY app/ app/
COPY public/ public/

ARG NEXT_PUBLIC_API_URL
ARG SERVER_API_URL

ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV SERVER_API_URL=$SERVER_API_URL

RUN npm run build


# Stage 2
FROM base AS runner

WORKDIR /home/app

COPY --from=builder /home/build/.next/standalone .
COPY --from=builder /home/build/.next/static .next/static/
COPY --from=builder /home/build/public public/

ENV NODE_ENV=production
ENV HOSTNAME=0.0.0.0
ENV PORT=3000

CMD ["node","server.js"]

