
#1
FROM node:22-alpine

ARG api_base_url
#2
#creating working directory for docker build which is /app
WORKDIR /app

#3
#need to copy package.json and package-lock.json, this line is how we can do this in one line
# this copies the json files into our current working directory (/app) signified by the "."
COPY package*.json .

#4
# --silent removes some of the logs that occurs during runtime so we are getting rid of the noise
# we are also installing our dependencies with this step
RUN npm i --silent

#5
#now that we have the modules installed by the previous line we can copy our code into our working directory (the first ".")
# which then copies the code to the working directory of our docker image (the second ".")
COPY . .

#6
#We are telling our frontend where to find the API(backend) via the (URL) in env
#Our docker backend is running on port 8088 so we reflect that here
# the "> .env" is us saying that we are overriding the .env file since it is creating one with this step
RUN echo "VITE_API_BASE_URL=${api_base_url}" > .env

#7
#this is the port our front end react application is running on
EXPOSE 5173

#8
#this allows us to rn
CMD ["npm", "run", "dev"]

#This now allows us to create a docker image and from that image we are able to run a container
# in summary, we are packing up our entire react project (called "react") into a container we are going to run based of
#the node image "node:22-alpine". We then copy our react project into the working directory (/app) as well as.
#the package.json files. Then we execute RUN npm install to install dependencies. Then we copy all of our code (ignoring
# node_modules, Dockerfile, and .env. We then create the .env file with our url (step #6). Finally we run our container with
# the command "npm run dev" (step #8)

#
#ARG api_base_url
#FROM node:22-alpine
#WORKDIR /app
#COPY package*.json .
#RUN npm i --silent
#COPY . .
#RUN echo "VITE_API_BASE_URL=${api_base_url}" > .env
#EXPOSE 5173
#CMD ["npm", "run", "dev"]