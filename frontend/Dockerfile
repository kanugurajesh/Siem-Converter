# base image
FROM node:alpine

# set working directory
WORKDIR /app

# copy package.json to working directory
COPY package*.json ./

# install dependencies
RUN npm install

# copy everything to working directory
COPY . .

# expose port
EXPOSE 5173

# start app
CMD ["npm", "run", "dev"]