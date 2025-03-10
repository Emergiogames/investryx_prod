# Use Node.js 18 for building
FROM node:18-alpine AS build

# Set working directory
WORKDIR /app

# Copy package files first for efficient caching
COPY ./src/frontend/package.json ./src/frontend/package-lock.json ./

# Install dependencies
RUN npm ci

# Copy frontend source code
COPY ./src/frontend/ ./

# Build the frontend app
RUN npm run build

# Use lightweight Nginx to serve the built app
FROM nginx:alpine

# Set working directory in Nginx container
WORKDIR /usr/share/nginx/html

# Remove default Nginx static files
RUN rm -rf ./*

# Copy built frontend files from the build stage
COPY --from=build /app/build ./  # Change /build to /dist if using Vite

# Change ownership & permissions
RUN chown -R nginx:nginx /usr/share/nginx/html \
    && chmod -R 755 /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Set user to non-root
USER nginx

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]