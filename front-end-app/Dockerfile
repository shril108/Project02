# Start your image with a node base image
FROM node:18-alpine

# The /app directory should act as the main application directory
WORKDIR /app

# Copy the app package and package-lock.json file
COPY package*.json ./

# Install dependencies first to take advantage of Docker layer caching
RUN npm install

# Copy local directories to the current working directory of our docker image (/app)
COPY . .

# Build the app, remove node_modules, and reinstall serve globally
RUN npm run build && rm -fr node_modules && npm install -g serve

# Expose the port the app runs on
EXPOSE 3000

# Start the app using serve command
CMD ["serve", "-s", "dist"]
