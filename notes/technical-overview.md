---
slug: github-radio-collector-note-technical-overview
id: github-radio-collector-note-technical-overview
title: Radio Collector
repo: justin-napolitano/radio-collector
githubUrl: https://github.com/justin-napolitano/radio-collector
generatedAt: '2025-11-24T18:44:29.887Z'
source: github-auto
summary: >-
  Radio Collector is a straightforward web app to find and play public internet
  radio streams. It pulls data from the community-driven Radio Browser directory
  and runs seamlessly in a single Docker container.
tags: []
seoPrimaryKeyword: ''
seoSecondaryKeywords: []
seoOptimized: false
topicFamily: null
topicFamilyConfidence: null
kind: note
entryLayout: note
showInProjects: false
showInNotes: true
showInWriting: false
showInLogs: false
---

Radio Collector is a straightforward web app to find and play public internet radio streams. It pulls data from the community-driven Radio Browser directory and runs seamlessly in a single Docker container.

## Key Features
- Search by station name, genre, or country.
- Store your favorites locally in the browser.
- Ad-free and privacy-oriented with a clean UI.
- Node.js backend with a React frontend.
- CORS-friendly proxy for Radio Browser API.

## Getting Started

### Prerequisites
- Docker & Docker Compose installed.

### Run with Docker

```bash
docker build -t radio-collector .
docker run -d --name radio-collector -p 8080:8080 radio-collector
# Open the app at http://localhost:8080
```

### Using Docker Compose

```bash
docker compose up -d
```

## Gotchas
- This app can't filter audio ads from stations.
- Some streams might not play due to CORS issues or codec support.
