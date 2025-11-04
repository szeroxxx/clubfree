# Use the official Node.js 20 image as the base image
FROM node:22 AS builder

# Set the working directory
WORKDIR /app

# Copy relevant files for installation
COPY package*.json ./

# Clean install dependencies
RUN rm -rf node_modules package-lock.json && \
    npm install 

# Copy the entire application source code to the container
COPY . .

# Build the frontend using Vite
RUN npm run build

# Final stage: Use a lightweight base image for production
FROM node:22 AS production

# Set the working directory
WORKDIR /app

# Copy the built frontend and node modules from the builder stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/server ./server
COPY --from=builder /app/prisma ./prisma
COPY package.json ./

# Expose port 3000 for the backend
EXPOSE 3000

# Command to run the backend server
CMD ["npm", "run", "server"]
