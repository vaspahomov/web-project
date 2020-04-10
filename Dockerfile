FROM node:13

COPY package.json /
RUN npm i

COPY tsconfig.json /
COPY .nvmrc /
#COPY "@types" /
#COPY config /config
COPY src /src
COPY public /public

RUN npm run build

CMD npm run start
