## Description

Cylinder Service for calculating area
The application consists of two sub-applications:
1. Api - Rest API Service
2. Math Service - Calculating Service

## Installation

```bash
$ npm install
```

## Running the Api app

```bash
# development
$ npm run start:api

# watch mode
$ npm run start:api:dev

# production mode
$ npm run start:api:prod
```

## Running the Math-Service app

```bash
# development
$ npm run start:math-service

# watch mode
$ npm run start:math-service:dev

# production mode
$ npm run start:math-service:prod
```

# REST API:
```
GET http://localhost:3000/calculate-area/:radius/:height - Return Cylinder Area
```
```
GET http://localhost:3000/metrics - Return promtheus metrics
```
