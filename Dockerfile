FROM node:20.15.1-alpine3.20
WORKDIR /dashboard-react
COPY . .
RUN npm install -g npm@10.8.2
RUN npm install
EXPOSE 3000
CMD ["npm","start"]
