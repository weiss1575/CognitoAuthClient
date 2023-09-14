# pull official base image
FROM node:18-alpine

# set working directory
WORKDIR /app

# install app dependencies
COPY package.json .

RUN npm install 

# add app
COPY . .

EXPOSE 3000

# start app
CMD ["npm", "start"]