# Use official Node.js LTS image
FROM node:22-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install --production

# Copy source files
COPY . .

# Build the NestJS app
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["node", "dist/main.js"]
