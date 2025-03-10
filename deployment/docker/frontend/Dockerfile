# Use Node.js 18 (or later) instead of Node.js 16
FROM node:18-alpine as build

WORKDIR /app

# Copy package.json and package-lock.json
COPY ./src/frontend/package.json ./src/frontend/package-lock.json* ./

# Install dependencies
RUN npm install

# Copy source files
COPY ./src/frontend/ ./

# Build the application
RUN npm run build

# Use Nginx for serving the built files
FROM nginx:alpine

# Copy built files from the build stage
COPY --from=build /app/build /usr/share/nginx/html

# Default command
CMD ["nginx", "-g", "daemon off;"]
