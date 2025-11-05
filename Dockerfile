# Use the official Node.js 22 image as the base image
FROM node:22

# Set the working directory
WORKDIR /app

# Copy package files for installation
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy backend source code and database schema
COPY server ./server
COPY prisma ./prisma

# Expose port 3000 for the backend
EXPOSE 5000

# Command to run the backend server
CMD ["npm", "run", "server"]
