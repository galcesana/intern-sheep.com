# Use an official Python base image
FROM python:3.9-slim

# Set the working directory inside the container
WORKDIR /app

# Copy all application files into the container
COPY . /app

# Install system dependencies (if needed, e.g., for PDFKit or LaTeX)
RUN apt-get update && apt-get install -y \
    texlive-xetex \
    texlive-fonts-recommended \
    texlive-plain-generic \
    poppler-utils \
    wkhtmltopdf && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Set environment variables
# Avoid exposing sensitive information directly in the Dockerfile
ENV GOOGLE_APPLICATION_CREDENTIALS="/app/service-account-key.json"

# Expose the port the Flask app runs on
EXPOSE 8080

# Command to run the Flask application
CMD ["python", "main.py"]
