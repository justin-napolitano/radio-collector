# ---------- Build stage ----------
FROM node:18-alpine AS builder
WORKDIR /app

# Copy manifests first to maximize caching
COPY package.json ./package.json
COPY web/package.json ./web/package.json

# Install deps (root + web) explicitly
RUN npm install && cd web && npm install

# Copy sources
COPY server.js ./server.js
COPY web ./web

# Build the web app
RUN npm run build

# ---------- Runtime stage ----------
FROM node:18-alpine AS runner
ENV NODE_ENV=production
WORKDIR /app

# Install only production deps for server
COPY package.json ./package.json
RUN npm install --omit=dev \
 && apk add --no-cache curl

# Copy server and built assets
COPY server.js ./server.js
COPY --from=builder /app/web/dist ./web/dist

EXPOSE 8080
ENV PORT=8080
# Healthcheck hits the built-in /healthz endpoint
HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
  CMD curl -fsS http://localhost:${PORT}/healthz || exit 1

CMD ["node", "server.js"]
