# ---------- Build stage ----------
FROM node:18-alpine AS builder
WORKDIR /app
COPY package.json ./
RUN npm ci
COPY web ./web
RUN npm run build

# ---------- Runtime stage ----------
FROM node:18-alpine AS runner
ENV NODE_ENV=production
WORKDIR /app
# Install only production deps for server
RUN apk add --no-cache curl
COPY package.json ./
RUN npm ci --omit=dev
# Copy server and built web assets
COPY server.js ./
COPY --from=builder /app/web/dist ./web/dist

EXPOSE 8080
ENV PORT=8080
# Optionally override with another Radio Browser mirror
# ENV RADIO_BROWSER_BASE=https://de1.api.radio-browser.info
CMD ["node", "server.js"]


# Healthcheck hits the built-in /healthz endpoint
HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3       CMD curl -fsS http://localhost:${PORT}/healthz || exit 1
