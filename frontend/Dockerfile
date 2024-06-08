# Stage 1: Build the React application
FROM node:18-alpine as build

# Set the working directory
WORKDIR /frontend

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application source code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Serve the React application using a lightweight HTTP server
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy the built React application from the previous stage
COPY --from=build /frontend/dist .

# Install a lightweight HTTP server
RUN npm install -g serve

# Expose port 5173
EXPOSE 5173

# Command to serve the React application
CMD ["serve", "-s", ".", "-p", "5173"]
