# Base image
FROM node:18

# Create app directory
WORKDIR /app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY multitenant-k8-example/package.json ./
COPY multitenant-k8-example/tsconfig.json ./
COPY multitenant-k8-example/tsconfig.build.json ./

# Install app dependencies
RUN npm install

# Bundle app source
COPY . .

# Creates a "dist" folder with the production build
RUN npm run build

EXPOSE 3000

# Start the server using the production build
CMD [ "node", "dist/main.js" ]