FROM node:16

ARG DATABASE_URL
ARG PORT=3000
ENV DATABASE_URL ${DATABASE_URL}

WORKDIR /usr/src/app

COPY package.json yarn.lock ./
COPY db/ ./db/
RUN yarn install --frozen-lockfile
RUN yarn blitz prisma migrate deploy

COPY . .
RUN yarn build

EXPOSE ${PORT}

CMD yarn start -p ${PORT}
