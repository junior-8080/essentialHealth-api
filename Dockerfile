# Use an official Node.js runtime as the base image
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
# COPY package*.json ./

COPY . .

# Install application dependencies
RUN npm install

# Copy the rest of the application source code to the container
# COPY ./src ./src

# Expose the port your application will run on (replace 3000 with your app's port)
EXPOSE 3000

# Define the command to start your application (modify as needed)
CMD ["node", "src/app.js"]
