FROM node:18.16.0-alpine3.17
WORKDIR /dashboard-react
COPY . .
RUN npm install
CMD ["npm", "start"]
EXPOSE 3000
