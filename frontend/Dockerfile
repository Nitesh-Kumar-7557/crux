FROM node:24-alpine as base

# Stage 1
FROM base as builder

WORKDIR /home/build

COPY package*.json .
COPY tsconfig.json .

RUN npm install

COPY app/ app/
COPY public/ public/
COPY next.config* .
COPY postcss.config* .

RUN npm run build


# Stage 2
FROM base as runner

WORKDIR /home/app

COPY --from=builder /home/build/.next/standalone .
COPY --from=builder /home/build/.next/static .next/static/
COPY --from=builder /home/build/public public/

ENV HOSTNAME=0.0.0.0

CMD ["node","server.js"]

