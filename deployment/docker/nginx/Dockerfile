# Use the official nginx image as base
FROM nginx:1.25-alpine

# Remove the default nginx configuration
RUN rm /etc/nginx/conf.d/default.conf

# Create nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Create directory for logs
RUN mkdir -p /var/log/nginx

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
