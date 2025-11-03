# Use the official Node.js 20 image as the base image
FROM node:18 AS builder

# Set the working directory
WORKDIR /app

# Copy relevant files for installation
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire application source code to the container
COPY . .

# Build the frontend using Vite
RUN npm run build

# Final stage: Use a lightweight base image for production
FROM node:18 AS production

# Set the working directory
WORKDIR /app

# Copy the built frontend and node modules from the builder stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY package.json ./

# Expose port 3000 for the backend
EXPOSE 3000

# Command to run the backend server
CMD ["npm", "run", "server"]
