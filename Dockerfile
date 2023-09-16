# Use an official Node.js runtime as the base image
FROM node:18.17.1

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of your application code to the container
COPY . .

# Expose the port your app runs on (if necessary)
EXPOSE 3000

# Command to run your application (use "npm run dev" instead of "npm start")
CMD ["npm", "run", "dev"]