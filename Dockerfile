# Use a lightweight Node.js image as our base (the "foundation" of our cake)
# This image already has Node.js and npm installed.
FROM node:18-alpine

# Set the working directory inside the container (where our app files will live)
# It's like preparing a clean counter space for baking.
WORKDIR /usr/src/app

# Copy package.json and package-lock.json first to leverage Docker's build cache
# This means if only your code changes, but dependencies don't, Docker can reuse this step.
COPY package*.json ./

# Install application dependencies (installing all ingredients)
# The --production flag means only install dependencies needed for running the app, not development tools.
RUN npm install --production

# Copy the rest of the application code into the container (adding the actual cake batter)
# The first '.' means "everything in the current directory on your machine".
# The second '.' means "to the current working directory inside the container."
COPY . .

# Inform Docker that the container will listen on port 8080 at runtime (setting oven temperature)
# This is more for documentation and networking configuration. Cloud Run *expects* 8080.
EXPOSE 8080

# Define the command to run when the container starts (the "bake" command)
# This tells the container how to launch your application.
CMD ["npm", "start"]