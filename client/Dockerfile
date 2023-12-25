FROM node:20.10.0-alpine as build
WORKDIR /app
COPY . .
RUN npm run build

FROM node:20.10.0-alpine
WORKDIR /app
COPY --from=build /app .
RUN npm install
EXPOSE 3000
CMD ["npm", "start"]


