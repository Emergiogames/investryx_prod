# Use AWS public ECR mirror instead of Docker Hub
FROM public.ecr.aws/docker/library/python:3.11-slim

# Set the working directory in the container
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    python3-dev \
    default-libmysqlclient-dev \
    libpq-dev \
    pkg-config \
    && rm -rf /var/lib/apt/lists/*

# Copy the backend directory into the container at /app
COPY ./src/backend/ /app/

# Copy the requirements.txt from the correct location
COPY ./deployment/docker/backend/requirements.txt /app/requirements.txt

# Set up the virtual environment
RUN python -m venv /app/venv

# Install dependencies in the virtual environment
RUN /app/venv/bin/pip install --upgrade pip && \
    /app/venv/bin/pip install -r /app/requirements.txt

# Expose the port that the app runs on
EXPOSE 8000

# Command to run the application
CMD ["/app/venv/bin/python", "manage.py", "runserver", "0.0.0.0:8000"]
