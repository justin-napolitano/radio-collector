---
slug: github-radio-collector
title: 'Radio Collector: Ad-Free Internet Radio Client with CORS Proxy'
repo: justin-napolitano/radio-collector
githubUrl: https://github.com/justin-napolitano/radio-collector
generatedAt: '2025-11-23T09:31:21.132543Z'
source: github-auto
summary: >-
  Technical overview of Radio Collector, a lightweight React and Node.js app providing ad-free
  internet radio with API proxying to resolve CORS issues.
tags:
  - react
  - internet-radio
  - cors-proxy
  - docker
seoPrimaryKeyword: radio collector
seoSecondaryKeywords:
  - internet radio
  - cors proxy
  - react frontend
  - nodejs backend
  - docker deployment
seoOptimized: true
---

# Radio Collector: Technical Overview and Implementation Notes

Radio Collector is a lightweight web application designed to provide an ad-free interface for discovering and playing public internet radio streams. It addresses the problem of cluttered, ad-heavy radio web clients by offering a minimal UI and proxying the Radio Browser API to avoid CORS issues.

## Motivation and Problem

Internet radio directories often rely on community-maintained databases such as Radio Browser. However, many web clients for these services include ads, trackers, or complicated UIs. Additionally, direct client-side access to the Radio Browser API can be hindered by CORS restrictions or preflight request complexities.

Radio Collector solves these problems by:

- Providing a clean, ad-free React frontend.
- Proxying API requests through a Node.js backend to circumvent CORS and simplify client-server interaction.
- Offering a single Docker container deployment for ease of installation and operation.

## Architecture and Technologies

The system is composed of two main parts:

1. **Backend Server (Node.js + Express):**
   - Serves the compiled React frontend as static files.
   - Proxies API requests under `/api` to the Radio Browser API, rewriting paths and setting headers to disable caching.
   - Implements security best practices using Helmet to set HTTP headers, compression for response size reduction, and Morgan for request logging.
   - Provides a `/healthz` endpoint for container health monitoring.

2. **Frontend (React + Vite):**
   - Built with React 18 and bundled using Vite.
   - Supports searching stations by name, country, codec, and ordering by popularity.
   - Stores user favorites locally in browser storage.
   - Plays streams directly via HTML5 audio elements.

## Deployment

The project uses Docker for containerization:

- A `Dockerfile` builds the Node.js server and includes the React build output.
- `docker-compose.yml` defines the service with environment variables for port and API base URL.
- An optional `docker-compose.nginx.yml` provides a setup with an Nginx reverse proxy for production use.
- Reverse proxy labels for Traefik and Caddy are included but commented out for user customization.

## Implementation Details

- The backend disables the `X-Powered-By` header to reduce fingerprinting.
- Content Security Policy is configured to allow images, media, and connections only from self and HTTP/S origins.
- API proxy middleware rewrites `/api/*` requests to `/json/*` on the Radio Browser API.
- The frontend uses a custom React hook to persist favorites in localStorage.
- Audio playback is managed via a React ref to an HTML audio element, with error handling for unsupported streams.

## Practical Considerations

- The app does not attempt to filter or remove audio ads embedded by radio stations.
- Some streams may fail to play due to browser codec support or CORS policies enforced by the stations.
- The proxy only handles API requests, not media streams, which are fetched directly by the client.
- Healthchecks are implemented both in the Docker image and Compose files to ensure container reliability.

## Summary

Radio Collector is a pragmatic solution for users seeking a straightforward, privacy-conscious internet radio client. Its architecture balances simplicity and functionality, leveraging modern JavaScript tooling and containerization to facilitate deployment and maintenance. The proxy approach effectively mitigates common CORS issues without introducing complex backend logic or state management.

This overview serves as a reference for maintenance, enhancement, or troubleshooting, focusing on the core design decisions and operational aspects observed in the codebase and configuration.
