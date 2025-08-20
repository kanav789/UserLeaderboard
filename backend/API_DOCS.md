# 🚀 Rank Leaderboard API Documentation

## Base URL

```
http://localhost:4000/api
```

## 📋 API Endpoints

### 1. User Management

#### Create User

```http
POST /api/user/add
```

**Request Body:**

```json
{
  "username": "Player1"
}
```

**Response (201):**

```json
{
  "success": true,
  "message": "User created successfully",
  "data": {
    "id": "64f8a1b2c3d4e5f6a7b8c9d0",
    "username": "Player1",
    "totalPoints": 0
  }
}
```

#### Get All Users

```http
GET /api/user/all
```

**Query Parameters:**

```
?page=1&limit=10&sortBy=totalPoints&sortOrder=desc&search=Player
```

**Response (200):**

```json
{
  "success": true,
  "message": "Users fetched successfully",
  "data": {
    "users": [
      {
        "username": "Player1",
        "totalPoints": 150,
        "currentScore": 25,
        "highestScore": 50,
        "gamesPlayed": 5,
        "rank": 1,
        "level": 3,
        "lastGameDate": "2024-01-01T10:30:00.000Z"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 5,
      "totalUsers": 50,
      "limit": 10,
      "hasNextPage": true,
      "hasPrevPage": false
    }
  }
}
```

#### Get User by ID

```http
GET /api/user/get/:id
```

**Path Parameters:**

```
id: 64f8a1b2c3d4e5f6a7b8c9d0
```

**Response (200):**

```json
{
  "success": true,
  "message": "User fetched successfully",
  "data": {
    "username": "Player1",
    "totalPoints": 150,
    "currentScore": 25,
    "highestScore": 50,
    "gamesPlayed": 5,
    "rank": 1,
    "level": 3,
    "lastGameDate": "2024-01-01T10:30:00.000Z"
  }
}
```

#### Get Top Players (Leaderboard)

```http
GET /api/user/topPlayers
```

**Query Parameters:**

```
?limit=20
```

**Response (200):**

```json
{
  "success": true,
  "message": "Top players fetched successfully",
  "data": {
    "players": [
      {
        "username": "Player1",
        "totalPoints": 150,
        "currentScore": 25,
        "highestScore": 50,
        "rank": 1,
        "level": 3,
        "gamesPlayed": 5
      }
    ],
    "total": 1
  }
}
```

### 2. Points & Claims

#### Claim Daily Points

```http
POST /api/user/claim
```

**Request Body:**

```json
{
  "userId": "64f8a1b2c3d4e5f6a7b8c9d0"
}
```

**Response (200):**

```json
{
  "success": true,
  "message": "Successfully claimed 7 points!",
  "data": {
    "claimedPoints": 7,
    "newTotalPoints": 157,
    "claimperson": "Player1"
  }
}
```

### 3. Root Endpoint

#### Health Check

```http
GET /
```

**Response (200):**

```
🚀 Rank Leaderboard Backend is running!
```

## 📊 Query Parameters Reference

### Pagination

- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)

### Sorting

- `sortBy` - Field to sort by (default: totalPoints)
- `sortOrder` - Sort direction: `asc` or `desc` (default: desc)

### Search

- `search` - Search term for username (case-insensitive)

### Examples

```
GET /api/user/all?page=2&limit=20&sortBy=highestScore&sortOrder=desc
GET /api/user/all?search=Player&page=1&limit=5
GET /api/user/topPlayers?limit=50
```

## 🚨 Error Responses

### 400 Bad Request

```json
{
  "success": false,
  "message": "Username is required"
}
```

### 404 Not Found

```json
{
  "success": false,
  "message": "User not found"
}
```

### 409 Conflict

```json
{
  "success": false,
  "message": "Username already exists"
}
```

### 500 Internal Server Error

```json
{
  "success": false,
  "message": "Internal server error"
}
```

## 🔧 Testing Examples

### Using cURL

```bash
# Create user
curl -X POST http://localhost:4000/api/user/add \
  -H "Content-Type: application/json" \
  -d '{"username": "Player1"}'

# Get all users
curl "http://localhost:4000/api/user/all?page=1&limit=10"

# Get user by ID
curl "http://localhost:4000/api/user/get/64f8a1b2c3d4e5f6a7b8c9d0"

# Get top players
curl "http://localhost:4000/api/user/topPlayers?limit=20"

# Claim points
curl -X POST http://localhost:4000/api/user/claim \
  -H "Content-Type: application/json" \
  -d '{"userId": "64f8a1b2c3d4e5f6a7b8c9d0"}'

# Health check
curl "http://localhost:4000/"
```

### Using Postman/Insomnia

1. Set base URL: `http://localhost:4000/api`
2. Use the endpoints above with appropriate HTTP methods
3. Include request bodies for POST requests
4. Add query parameters for GET requests
