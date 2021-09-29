# Stage 1
FROM node:16.8.0-alpine as build
WORKDIR /app
ENV PATH /app/node/node_modules/.bin:$PATH
COPY package.json ./
COPY package-lock.json ./
RUN npm install
COPY . ./
RUN npm run build

# Stage 2
FROM colpanick/quick_api:latest
COPY --from=build /app/build/*.* /usr/share/quick_api/quick_api/static/
COPY --from=build /app/build/static/css/ /usr/share/quick_api/quick_api/static/css/
COPY --from=build /app/build/static/js/ /usr/share/quick_api/quick_api/static/js/
COPY data.json /usr/share/quick_api/data/data.json

