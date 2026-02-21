# -------- Stage 1: Build --------

FROM node:22-alpine AS builder

WORKDIR /app

# Copy package files and install dependencies

COPY package*.json ./
RUN npm install

# Copy source code

COPY . .

# Build the NestJS application

RUN npm run build

# -------- Stage 2: Production --------

FROM node:22-alpine

WORKDIR /app

# Install only production dependencies

COPY package*.json ./
RUN npm install --omit=dev && npm cache clean --force

# Copy compiled files from builder stage

COPY --from=builder /app/dist ./dist

# Set production environment

ENV NODE_ENV=production

# App runs on port 3000

EXPOSE 3000

# Start the application

CMD ["node", "dist/main.js"]
