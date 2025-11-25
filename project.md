---
slug: github-radio-collector
id: github-radio-collector
title: Build a Minimal Web App for Internet Radio with Docker
repo: justin-napolitano/radio-collector
githubUrl: https://github.com/justin-napolitano/radio-collector
generatedAt: '2025-11-24T21:36:08.165Z'
source: github-auto
summary: >-
  Learn how to create a simple, ad-free web app for streaming internet radio
  using Node.js, React, and Docker.
tags:
  - docker
  - node.js
  - react
  - http-proxy-middleware
  - docker-compose
seoPrimaryKeyword: internet radio web application
seoSecondaryKeywords:
  - docker radio app
  - node.js streaming app
  - react radio player
  - docker-compose setup
  - proxying audio streams
seoOptimized: true
topicFamily: null
topicFamilyConfidence: null
kind: project
entryLayout: project
showInProjects: true
showInNotes: false
showInWriting: false
showInLogs: false
---

Radio Collector is a minimal, ad-free web application for discovering and playing public internet radio streams. It leverages the community-run Radio Browser directory and runs as a single Docker container for easy deployment.

---

## Features

- Search stations by name, genre, or country
- Favorites stored locally in the browser
- Clean, privacy-focused UI with no tracking or ads
- Single container deployment combining Node.js backend and React frontend
- Proxy for Radio Browser API to avoid CORS issues
- Healthcheck endpoint for container monitoring

---

## Tech Stack

- **Backend:** Node.js with Express, http-proxy-middleware, compression, helmet, morgan
- **Frontend:** React, Vite
- **Containerization:** Docker, Docker Compose
- **Proxying:** Configurable reverse proxy support (Traefik, Caddy, Nginx)

---

## Getting Started

### Prerequisites

- Docker and Docker Compose installed
- Node.js >= 18 (for local development)

### Build and Run with Docker

```bash
docker build -t radio-collector .
docker run -d --name radio-collector -p 8080:8080 radio-collector
# Access the app at http://localhost:8080
```

### Using Docker Compose

```bash
docker compose up -d
```

### Development

1. Install dependencies in `web` folder:

```bash
cd web
npm install
```

2. Run frontend dev server:

```bash
npm run dev
```

3. Run backend server:

```bash
npm run dev
```

---

## Project Structure

```
/
├── docker-compose.yml            # Docker Compose config for single container
├── docker-compose.nginx.yml      # Compose config with Nginx reverse proxy
├── Dockerfile                    # Docker image build instructions
├── package.json                  # Backend Node.js dependencies and scripts
├── README.md                    # This file
├── server.js                    # Express server with API proxy and static serving
├── reverse-proxy/               # Reverse proxy configs (e.g., nginx.conf)
├── web/                        # React frontend app
│   ├── package.json
│   ├── vite.config.js
│   └── src/                    # React source code
└── zz_dockerfile                # (Assumed experimental or legacy Dockerfile)
```

---

## Configuration

- `PORT`: Port the server listens on (default `8080`)
- `RADIO_BROWSER_BASE`: Base URL for Radio Browser API mirror (default `https://de1.api.radio-browser.info`)

---

## Future Work / Roadmap

- Add user authentication for syncing favorites across devices
- Support for additional audio codecs and better browser compatibility
- Improve UI/UX with more filters and station metadata
- Add HTTPS support out of the box with automatic certificate management
- Enhance healthchecks and monitoring integration
- Container image size optimization

---

## Notes

- The app does not remove audio ads injected by radio stations.
- Some streams may not play due to browser codec or CORS restrictions.
- The backend proxies only the Radio Browser API; audio streams are played directly from their sources.

