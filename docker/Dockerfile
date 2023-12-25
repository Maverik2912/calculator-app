FROM node:20.10.0-alpine as build
RUN mkdir /app
WORKDIR /app
COPY server .
RUN npm install

FROM node:20.10.0-alpine
WORKDIR /app
COPY --from=build /app .
EXPOSE 4000
CMD ["npm", "start"]