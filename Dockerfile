# Use the specific Node.js version as the base image
FROM node:20.11.0-alpine

# Install the specific version of pnpm
RUN npm install -g pnpm@8.15.4

# Create and change to the app directory
WORKDIR /usr/src/app

# Copy package.json and pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install

# Copy the rest of the application code
COPY . .

# Build the NestJS application
RUN pnpm run build

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["pnpm", "run", "start:prod"]
