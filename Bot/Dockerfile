FROM node:20-alpine

# Install required system dependencies for canvas
RUN apk add --no-cache \
  cairo-dev \
  jpeg-dev \
  pango-dev \
  giflib-dev \
  librsvg-dev \
  pixman-dev \
  pangomm-dev \
  libjpeg-turbo-dev \
  freetype-dev

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Install globally typeorm
RUN npm install -g typeorm

# Bundle app source
COPY . .

# Build the app
RUN npm run build

# Purge unnecessary files
RUN npm prune --production

# Run the app
CMD ["npm", "run", "start-prod"]
