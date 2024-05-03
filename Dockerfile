#Base image
FROM node:16-alpine

#Create app directory 
WORKDIR /maianh/be_nestjs

#A wildcard is used to ensure both package.json and package-lock.json as copied
COPY package*.json ./

#Install app dependencies
RUN npm install

RUN npm i -g @nestjs/cli@10.3.2

#Bundle app source
COPY . .

#Creates a "dist" folder with production build
RUN npm run build

#Start the server using the production build
CMD ["node","dist/main.js"]

