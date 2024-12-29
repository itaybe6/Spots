# Dockerfile (frontend)

# Use Node.js image
FROM node:20

# Set working directory to /usr/src
WORKDIR /usr/src

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy public folder (index.html)
COPY public ./public

# Copy all source files (בלי לשים בתוך src כפול)
COPY . /usr/src/src
# Build the app
RUN npm run build
