# Radio Collector (Ad‑free client)

A minimal, ad‑free web app for discovering and playing public internet radio streams. It uses the community-run Radio Browser directory. Runs as a single Docker container on your server.

## Features
- Search by name/genre/country (proxied via `/api/*` to Radio Browser)
- Favorites stored locally in the browser
- Clean UI, no tracking, no banners
- Single container (Node + static React build)

## Quick start

```bash
# Build and run with Docker
docker build -t radio-collector .
docker run -d --name radio-collector -p 8080:8080 radio-collector
# Open http://localhost:8080
```

or with Compose:

```bash
docker compose up -d
```

## Environment

- `PORT` (default `8080`)
- `RADIO_BROWSER_BASE` (default `https://de1.api.radio-browser.info`)
  - You may switch to another mirror from https://api.radio-browser.info/ to suit your region.

## Notes

- The app **does not** remove audio ads that stations inject into their streams. It only provides an ad‑free UI.
- Some stations may not play in certain browsers due to codec support (e.g., AAC/OGG) or CORS settings controlled by the station.
- This container serves static files and proxies only the Radio Browser **API**—it does not relay the audio media.


## Healthchecks

- The container exposes `/healthz`. The image includes a Docker **HEALTHCHECK** using `curl`.
- `docker-compose.yml` also defines a healthcheck you can tweak.

## Reverse proxy options

### Traefik (labels)
Uncomment and edit the Traefik labels in `docker-compose.yml`:
```yaml
labels:
  - "traefik.enable=true"
  - "traefik.http.routers.radio-collector.rule=Host(`radio.example.com`)"
  - "traefik.http.routers.radio-collector.entrypoints=websecure"
  - "traefik.http.routers.radio-collector.tls.certresolver=letsencrypt"
  - "traefik.http.services.radio-collector.loadbalancer.server.port=8080"
```

### Caddy (labels)
If you use **caddy-docker-proxy**, uncomment and edit:
```yaml
labels:
  - "caddy=radio.example.com"
  - "caddy.encode=gzip zstd"
  - "caddy.reverse_proxy={{upstreams 8080}}"
```

### Nginx (compose override)
Use the provided `docker-compose.nginx.yml` to run an Nginx proxy in front:
```bash
docker compose -f docker-compose.nginx.yml up -d
# Nginx listens on :80 and forwards to the app on :8080
```
To add TLS, bind-mount your certs into `reverse-proxy/certs` and enable the HTTPS server block shown in `reverse-proxy/nginx.conf`.
