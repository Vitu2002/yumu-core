# ── Step 1: Builder (install deps and build)
FROM oven/bun:1 AS builder
WORKDIR /app

# Copy lock files for smart cache and install
COPY package.json bun.lockb* ./
RUN bun install --frozen-lockfile --production

# Copy source
COPY . .

# Bundle and minify source
RUN bun build src/index.ts \
    --outdir dist \
    --target bun \
    --format esm \
    --minify-whitespace --minify-syntax \
    --sourcemap  # opcional, útil para debug

# ── Step 2: Slim Runner
FROM oven/bun:1-slim AS runner

WORKDIR /app

# Copy node_modules and bundle
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
# Copy bundled source
COPY --from=builder /app/src/events      ./src/events
COPY --from=builder /app/src/commands    ./src/commands
COPY --from=builder /app/src/buttons     ./src/buttons
COPY --from=builder /app/src/selects     ./src/selects
COPY --from=builder /app/src/modals      ./src/modals

# Copy settings files (.env, prisma, etc)
COPY --from=builder /app/.env* ./

# Run bundle
CMD ["bun", "run", "dist/index.js"]