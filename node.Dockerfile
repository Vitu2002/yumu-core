# ── Step 1: Builder (install deps and build)
FROM node:20-alpine AS builder
WORKDIR /app

# Copy lock files for smart cache and install
COPY package.json package-lock.json* yarn.lock* pnpm-lock.yaml* ./
RUN npm install --production=false

# Copy source
COPY . .

# Build TypeScript
RUN npm run build:node

# ── Step 2: Slim Runner
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Copy node_modules and build output
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

# Copy runtime source folders (if dynamically required)
COPY --from=builder /app/src/events      ./src/events
COPY --from=builder /app/src/commands    ./src/commands
COPY --from=builder /app/src/buttons     ./src/buttons
COPY --from=builder /app/src/selects     ./src/selects
COPY --from=builder /app/src/modals      ./src/modals

# Copy env/config files
COPY --from=builder /app/.env* ./

# Run app
CMD ["node", "dist/index.js"]
