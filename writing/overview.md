---
slug: github-radio-collector-writing-overview
id: github-radio-collector-writing-overview
title: 'Exploring Radio Collector: Your Go-To Internet Radio App'
repo: justin-napolitano/radio-collector
githubUrl: https://github.com/justin-napolitano/radio-collector
generatedAt: '2025-11-24T17:53:51.497Z'
source: github-auto
summary: >-
  I created the **Radio Collector**, a simple web app for discovering and
  playing public internet radio streams. This isn’t just another bloated app;
  it’s minimalist, ad-free, and respects user privacy. By leveraging the
  community-driven Radio Browser directory, I aimed to provide a straightforward
  way for users to explore radio stations from around the world.
tags: []
seoPrimaryKeyword: ''
seoSecondaryKeywords: []
seoOptimized: false
topicFamily: null
topicFamilyConfidence: null
kind: writing
entryLayout: writing
showInProjects: false
showInNotes: false
showInWriting: true
showInLogs: false
---

I created the **Radio Collector**, a simple web app for discovering and playing public internet radio streams. This isn’t just another bloated app; it’s minimalist, ad-free, and respects user privacy. By leveraging the community-driven Radio Browser directory, I aimed to provide a straightforward way for users to explore radio stations from around the world.

## Why Radio Collector Exists

The internet is full of fantastic radio streams, but sifting through them can be a hassle. I wanted to build a tool that simplifies this process. Radio Collector allows users to easily search for stations by name, genre, or country, all while keeping everything clean and user-friendly. The focus here is on privacy—there’s no tracking, no ads, just pure radio streaming.

## Key Design Decisions

Building Radio Collector involved making some clear choices:

- **Minimalism Over Complexity**: I wanted to avoid unnecessary features that clutter the UI. A clean interface allows users to focus on what matters—listening to their favorite stations.
- **Single Container Deployment**: Using Docker made deployment easy. The app runs as a single container combining a Node.js backend with a React frontend. This decision simplifies things and makes it easier for others to get up and running.
- **Community-Driven API**: Integrating with Radio Browser means tapping into a wide range of stations, and using their API minimizes maintenance on my end.
- **Privacy First**: With no ads and no tracking, users can feel safe using Radio Collector. I wanted to create an app that respects user data and listening habits.

## Tech Stack

Radio Collector is built on several powerful tools:

- **Backend**: Utilizes Node.js with Express. I included libraries like `http-proxy-middleware` for proxying API requests, `compression` for performance, and other middleware to enhance security and logging.
- **Frontend**: Built with React and Vite for a smooth user experience. Vite's fast build times are a huge plus during development.
- **Containerization**: Docker and Docker Compose are essential here. They not only simplify deployment but also ensure consistency across environments.
- **Proxying Options**: I added flexible reverse proxy support for various setups—whether you like Traefik, Caddy, or Nginx, you can easily configure it.

## Trade-offs

While I’m proud of what I built, there are trade-offs to consider:

- **No Audio Ad Removal**: It’s worth noting that audio ads from streams aren’t being filtered out. It’s something to keep in mind if ads are a dealbreaker.
- **CORS Issues**: Some streams might not play due to browser codec or CORS restrictions. This is a limitation inherent to how streams are served.
- **Limited Traditional Features**: While minimalism is a goal, it also means missing out on features like user accounts. This was a deliberate choice to keep things lightweight, but it’s a point of future improvement.

## Future Improvements

I’ve got a roadmap I’m excited about. Here’s what I’m aiming to add:

- **User Authentication**: This would allow users to sync their favorite stations across devices. It’s a pretty common feature, and I want to bring that to Radio Collector.
- **Enhanced Audio Codec Support**: Improving compatibility for various audio codecs will widen usability across devices and browsers.
- **Improved UI/UX**: More filters and station metadata would enrich the user experience, making it easier to find great stations.
- **Automatic HTTPS Support**: Adding HTTPS support out of the box will help secure connections and streamline deployment.
- **Better Health Checks**: Integrating more robust health monitoring can help in maintaining the application’s reliability.
- **Container Optimization**: Reducing the container image size would help with deployment efficiency, especially for those with limited resources.

## Keeping in Touch

I share regular updates about Radio Collector and other projects on my social channels. Follow me on Mastodon, Bluesky, or Twitter/X to stay in the loop.

## Conclusion

Radio Collector is a labor of love—a straightforward approach to explore internet radio in a privacy-focused way. I’m excited about where it’s headed, and I hope you’ll give it a try. Check it out on GitHub, and let me know what you think!
