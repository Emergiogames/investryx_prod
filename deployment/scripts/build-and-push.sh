#!/bin/bash

# Set variables
AWS_REGION="ap-south-1"
AWS_ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
ECR_REGISTRY="${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com"
PROJECT_NAME="investryx"
TAG=$(git rev-parse --short HEAD)  # Use git commit hash as tag

# Login to ECR
aws ecr get-login-password --region ${AWS_REGION} | docker login --username AWS --password-stdin ${ECR_REGISTRY}

# Build and push backend
echo "Building and pushing backend..."
docker build -t ${ECR_REGISTRY}/${PROJECT_NAME}-backend:${TAG} -f deployment/docker/backend/Dockerfile .
docker push ${ECR_REGISTRY}/${PROJECT_NAME}-backend:${TAG}

# Build and push nginx
echo "Building and pushing nginx..."
docker build -t ${ECR_REGISTRY}/${PROJECT_NAME}-nginx:${TAG} -f deployment/docker/nginx/Dockerfile deployment/docker/nginx
docker push ${ECR_REGISTRY}/${PROJECT_NAME}-nginx:${TAG}

# For Redis, pull and push official image
echo "Pushing Redis to ECR..."
docker pull redis:6-alpine
docker tag redis:6-alpine ${ECR_REGISTRY}/${PROJECT_NAME}-redis:${TAG}
docker push ${ECR_REGISTRY}/${PROJECT_NAME}-redis:${TAG}

# Tag as latest
docker tag ${ECR_REGISTRY}/${PROJECT_NAME}-backend:${TAG} ${ECR_REGISTRY}/${PROJECT_NAME}-backend:latest
docker tag ${ECR_REGISTRY}/${PROJECT_NAME}-nginx:${TAG} ${ECR_REGISTRY}/${PROJECT_NAME}-nginx:latest
docker tag ${ECR_REGISTRY}/${PROJECT_NAME}-redis:${TAG} ${ECR_REGISTRY}/${PROJECT_NAME}-redis:latest

# Push latest tags
docker push ${ECR_REGISTRY}/${PROJECT_NAME}-backend:latest
docker push ${ECR_REGISTRY}/${PROJECT_NAME}-nginx:latest
docker push ${ECR_REGISTRY}/${PROJECT_NAME}-redis:latest

echo "Successfully built and pushed images with tag: ${TAG}"
