# Build stage
FROM node:16-alpine as build

WORKDIR /app

# Copy package.json first (create it if it doesn't exist)
COPY ./src/frontend/package.json ./src/frontend/package-lock.json* ./
# If package.json doesn't exist yet, create a basic one
RUN if [ ! -f package.json ]; then \
    echo '{ "name": "investryx-frontend", "version": "1.0.0", "private": true, "scripts": { "start": "react-scripts start", "build": "react-scripts build" }, "dependencies": { "react": "^18.2.0", "react-dom": "^18.2.0", "react-router-dom": "^6.10.0", "react-scripts": "5.0.1" } }' > package.json; \
    fi

# Install dependencies
RUN npm install

# Copy source files
COPY ./src/frontend/ ./

# Build the application
RUN npm run build

# Final production image
FROM nginx:alpine

# Copy built files from build stage
COPY --from=build /app/build /usr/share/nginx/html

# Default command
CMD ["nginx", "-g", "daemon off;"]