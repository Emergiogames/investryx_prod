# Use Amazon ECR public gallery for nginx image
FROM public.ecr.aws/nginx/nginx:alpine

# Set working directory in Nginx container
WORKDIR /usr/share/nginx/html

# Remove default Nginx static files
RUN rm -rf ./*

# Copy manually built frontend files
COPY ./src/frontend/dist/ ./

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]