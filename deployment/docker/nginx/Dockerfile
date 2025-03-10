# Use the official nginx image as base
FROM public.ecr.aws/nginx/nginx:1.25-alpine

# Remove the default nginx configuration
RUN rm /etc/nginx/conf.d/default.conf

# Create directory for logs
RUN mkdir -p /var/log/nginx

# Set working directory for frontend
WORKDIR /usr/share/nginx/html

# Copy the frontend build files into the NGINX HTML directory
COPY src/frontend/dist/ /usr/share/nginx/html/

# Copy custom NGINX configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Expose ports
EXPOSE 80 443

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]