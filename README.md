# URL Shortener


Production-ready minimal URL shortener with Node.js, MongoDB and Redis.


## Features
- Shorten long URLs (auto-generated base62 IDs or custom alias)
- Redirect with cache (Redis)
- Click counting (denormalized)
- TTL expiry support
- Docker + Docker Compose for quick local run


## Tech stack
- Node.js + Express
- MongoDB (persistent storage)
- Redis (cache + counter)


## Quick start (Docker)
1. Clone repo
2. `docker-compose up --build`
3. Open `http://localhost:3000`


## Without Docker
1. Start MongoDB and Redis locally
2. `npm install`
3. `node server.js`


## Endpoints
- `POST /api/shorten` - create short URL
- `GET /s/:shortId` - redirect
- `GET /api/info/:shortId` - metadata


## Interview talking points
- ID generation: Redis INCR + Base62 encoder for unique, compact IDs
- Cache-first read path for low-latency redirects
- Async click logging to keep redirect latency low
- Sharding, CDN, rate-limiting and multi-region strategies explained in design notes



