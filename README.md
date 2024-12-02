## Introduction

Application developed in NestJS with
the following features:

- Get a paginated list of WiFi hotspots
- Consult the information of a point given its ID
- Get a paginated list of access points given a colony.
- Get a paginated list of WiFi points ordered by proximity to a coordinate given [lat, long]

## Dependencies and Versions

- Docker version 27.3.1
- Docker Compose version v2.29.7

##  First step: Project setup

```bash
$ docker-compose -f docker-compose-localhost up -d --build
```

## Second step: Load data for testing
```bash
$ node init-scripts/import-csv.js
```

## Test endpoint

Get wifi points paginated
- http://localhost:3000/api/v1/wifi-access-points

Get wifi points by id
- http://localhost:3000/api/v1/wifi-access-points/{ID}

Get wifi points by colonia with pagination
- http://localhost:3000/api/v1/wifi-access-points/colonia?colonia=PEÑON DE LOS baños

Get a paginated list of WiFi points sorted by proximity to a coordinate given [lat,long]
- http://localhost:3000/api/v1/wifi-access-points/nearby?lat=19.432707&long=-99.086743&page=1&max_distance=23
