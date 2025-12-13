# FROM node:24-alpine

# WORKDIR /app

# COPY package*.json .

# RUN npm install

# COPY . .

# RUN npm run build

# EXPOSE 5000

# CMD ["npm", "run", "preview"]



FROM node:24-alpine AS build

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

RUN npm run build

FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

COPY nginx.conf /nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]