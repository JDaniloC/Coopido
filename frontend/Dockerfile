FROM node:17-alpine

WORKDIR /usr/app
COPY package.json package-lock.json ./
RUN npm install --ignore-scripts --legacy-peer-deps
COPY . .
RUN npm install @angular/cli -g

CMD ng serve --host 0.0.0.0 --port 4200 --poll 1

EXPOSE 4200