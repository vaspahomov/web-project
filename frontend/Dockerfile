FROM node:13

COPY package.json /
RUN npm i

COPY tsconfig.json /
COPY .nvmrc /

COPY src /src
COPY next.config.js next.config.js
COPY /public /public

RUN npm run build

EXPOSE $PORT

CMD npm run start
