FROM node:20.10.0-alpine as build
RUN mkdir /app
WORKDIR /app
COPY server .

FROM node:20.10.0-alpine
WORKDIR /app
COPY --from=build /app .
RUN npm install
EXPOSE 4000
CMD ["npm", "start"]