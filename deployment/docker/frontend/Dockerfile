# Use Node.js 18 (or later) for building
FROM node:18-alpine AS build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json first for caching
COPY ./src/frontend/package.json ./src/frontend/package-lock.json ./ 

# Install dependencies
RUN npm install --only=production

# Copy the entire frontend source code
COPY ./src/frontend/ ./

# Build the React app
RUN npm run build

# Use lightweight Nginx for serving the built application
FROM nginx:alpine

# Set working directory in Nginx container
WORKDIR /usr/share/nginx/html

# Remove default Nginx static files
RUN rm -rf ./*

# Copy built files from the build stage
COPY --from=build /app/build ./

# Change ownership to non-root user
RUN chown -R nginx:nginx /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Set user to non-root
USER nginx

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
