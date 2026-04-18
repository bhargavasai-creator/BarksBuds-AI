# Critter Affinity - API Documentation

**Base URL**: `https://api.critteraffinity.com/v1`  
**Authentication**: JWT Bearer Token  
**Content-Type**: `application/json`

---

## Table of Contents
1. [Authentication](#authentication)
2. [Users](#users)
3. [Pets](#pets)
4. [Feed](#feed)
5. [Dating](#dating)
6. [Health](#health)
7. [Marketplace](#marketplace)
8. [Services](#services)
9. [Maps](#maps)
10. [Memorial](#memorial)
11. [Games](#games)
12. [Encyclopedia](#encyclopedia)
13. [Admin](#admin)

---

## Authentication

### Send OTP
```http
POST /auth/send-otp
Content-Type: application/json

{
  "phoneNumber": "1234567890",
  "countryCode": "+1"
}
```

**Response**:
```json
{
  "success": true,
  "message": "OTP sent successfully",
  "otpId": "otp_abc123",
  "expiresAt": "2026-01-06T10:45:00Z"
}
```

### Verify OTP
```http
POST /auth/verify-otp
Content-Type: application/json

{
  "otpId": "otp_abc123",
  "otpCode": "123456"
}
```

**Response**:
```json
{
  "success": true,
  "isNewUser": true,
  "tempToken": "temp_xyz789"
}
```

### Complete Registration
```http
POST /auth/register
Authorization: Bearer temp_xyz789
Content-Type: application/json

{
  "name": "John Doe",
  "gender": "male",
  "dateOfBirth": "1990-05-15",
  "location": {
    "latitude": 40.7128,
    "longitude": -74.0060
  },
  "permissions": {
    "location": true,
    "microphone": true
  },
  "deviceId": "device_abc123",
  "ipAddress": "192.168.1.1"
}
```

**Response**:
```json
{
  "success": true,
  "user": {
    "userId": "user_12345",
    "name": "John Doe",
    "phoneNumber": "+11234567890",
    "isAdmin": false
  },
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expiresIn": 604800
}
```

### Refresh Token
```http
POST /auth/refresh
Content-Type: application/json

{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

## Users

### Get User Profile
```http
GET /users/{userId}
Authorization: Bearer {accessToken}
```

**Response**:
```json
{
  "userId": "user_12345",
  "name": "John Doe",
  "gender": "male",
  "dateOfBirth": "1990-05-15",
  "profilePicture": "https://...",
  "bio": "Pet lover and outdoor enthusiast",
  "createdAt": "2026-01-01T00:00:00Z",
  "stats": {
    "totalPets": 2,
    "totalPosts": 45,
    "totalLikes": 1234
  }
}
```

### Update User Profile
```http
PATCH /users/{userId}
Authorization: Bearer {accessToken}
Content-Type: application/json

{
  "name": "John Smith",
  "bio": "Updated bio",
  "profilePicture": "https://..."
}
```

### Get User Location
```http
GET /users/{userId}/location
Authorization: Bearer {accessToken}
```

**Response**:
```json
{
  "latitude": 40.7128,
  "longitude": -74.0060,
  "accuracy": 10.5,
  "updatedAt": "2026-01-06T10:30:00Z",
  "address": "New York, NY, USA"
}
```

### Update User Location
```http
POST /users/{userId}/location
Authorization: Bearer {accessToken}
Content-Type: application/json

{
  "latitude": 40.7589,
  "longitude": -73.9851,
  "accuracy": 8.2
}
```

---

## Pets

### Get User's Pets
```http
GET /users/{userId}/pets
Authorization: Bearer {accessToken}
```

**Response**:
```json
{
  "pets": [
    {
      "petId": "pet_67890",
      "name": "Max",
      "species": "dog",
      "breed": "Golden Retriever",
      "dateOfBirth": "2021-03-15",
      "gender": "male",
      "profilePicture": "https://...",
      "bio": "Loves playing fetch!",
      "totalLikes": 2456,
      "isMemorial": false
    }
  ],
  "total": 1
}
```

### Create Pet Profile
```http
POST /pets
Authorization: Bearer {accessToken}
Content-Type: application/json

{
  "name": "Luna",
  "species": "cat",
  "breed": "Persian",
  "dateOfBirth": "2022-06-10",
  "gender": "female",
  "profilePicture": "https://...",
  "bio": "Calm and cuddly"
}
```

### Get Pet Details
```http
GET /pets/{petId}
Authorization: Bearer {accessToken}
```

### Update Pet Profile
```http
PATCH /pets/{petId}
Authorization: Bearer {accessToken}
Content-Type: application/json

{
  "bio": "Updated bio",
  "weight": 4.5
}
```

---

## Feed

### Get Personalized Feed
```http
GET /feed?page=1&limit=20&filter=for_you
Authorization: Bearer {accessToken}
```

**Query Parameters**:
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 20, max: 50)
- `filter`: `for_you` | `trending` | `following`

**Response**:
```json
{
  "posts": [
    {
      "postId": "post_99999",
      "userId": "user_12345",
      "petId": "pet_67890",
      "contentType": "image",
      "caption": "Beautiful day!",
      "mediaUrls": ["https://..."],
      "location": {
        "latitude": 40.7128,
        "longitude": -74.0060,
        "name": "Central Park"
      },
      "likes": 234,
      "comments": 18,
      "shares": 5,
      "aiRelevanceScore": 95.5,
      "isLiked": false,
      "isBookmarked": false,
      "createdAt": "2026-01-06T08:30:00Z",
      "author": {
        "userId": "user_12345",
        "name": "John Doe",
        "profilePicture": "https://..."
      }
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 500,
    "hasMore": true
  }
}
```

### Create Post
```http
POST /posts
Authorization: Bearer {accessToken}
Content-Type: application/json

{
  "petId": "pet_67890",
  "contentType": "image",
  "caption": "Having fun at the park!",
  "mediaUrls": ["https://..."],
  "location": {
    "latitude": 40.7128,
    "longitude": -74.0060
  },
  "isPublic": true
}
```

### Like Post
```http
POST /posts/{postId}/like
Authorization: Bearer {accessToken}
```

### Unlike Post
```http
DELETE /posts/{postId}/like
Authorization: Bearer {accessToken}
```

### Comment on Post
```http
POST /posts/{postId}/comments
Authorization: Bearer {accessToken}
Content-Type: application/json

{
  "text": "So cute!",
  "parentCommentId": null
}
```

### Share Post
```http
POST /posts/{postId}/share
Authorization: Bearer {accessToken}
```

---

## Dating

### Get Dating Matches
```http
GET /dating/matches?limit=10
Authorization: Bearer {accessToken}
```

**Response**:
```json
{
  "matches": [
    {
      "petId": "pet_11111",
      "name": "Bella",
      "species": "dog",
      "breed": "Golden Retriever",
      "age": 3,
      "gender": "female",
      "image": "https://...",
      "bio": "Love long walks...",
      "distance": 2.5,
      "matchScore": 94.5,
      "owner": {
        "userId": "user_54321",
        "name": "Sarah M."
      }
    }
  ],
  "hasMore": true
}
```

### Swipe Action
```http
POST /dating/swipe
Authorization: Bearer {accessToken}
Content-Type: application/json

{
  "petId": "pet_67890",
  "targetPetId": "pet_11111",
  "action": "like" // "like" | "pass" | "super_like"
}
```

**Response**:
```json
{
  "success": true,
  "isMatch": true,
  "matchId": "match_77777",
  "matchScore": 94.5
}
```

### Get My Matches
```http
GET /dating/my-matches
Authorization: Bearer {accessToken}
```

### Send Message
```http
POST /dating/matches/{matchId}/messages
Authorization: Bearer {accessToken}
Content-Type: application/json

{
  "text": "Hi! Would love to arrange a playdate!",
  "mediaUrl": null
}
```

### Get Match Messages
```http
GET /dating/matches/{matchId}/messages
Authorization: Bearer {accessToken}
```

---

## Health

### Get Pet Health Metrics
```http
GET /pets/{petId}/health/metrics?period=7d
Authorization: Bearer {accessToken}
```

**Query Parameters**:
- `period`: `1d` | `7d` | `30d` | `90d`

**Response**:
```json
{
  "currentMetrics": {
    "heartRate": { "value": 85, "unit": "bpm", "status": "normal" },
    "steps": { "value": 8543, "goal": 10000 },
    "calories": { "value": 342, "goal": 450 },
    "sleep": { "value": 7.5, "goal": 8 },
    "temperature": { "value": 38.2, "unit": "°C", "status": "normal" }
  },
  "weeklyTrends": {
    "steps": [8200, 9100, 7800, 10200, 8900, 9500, 8543],
    "heartRate": [82, 85, 80, 88, 83, 86, 85]
  },
  "device": {
    "deviceId": "collar_001",
    "type": "Smart Collar",
    "batteryLevel": 78,
    "lastSync": "2026-01-06T10:28:00Z"
  }
}
```

### Add Health Metric
```http
POST /pets/{petId}/health/metrics
Authorization: Bearer {accessToken}
Content-Type: application/json

{
  "deviceId": "collar_001",
  "metricType": "heart_rate",
  "value": 85,
  "unit": "bpm",
  "recordedAt": "2026-01-06T10:30:00Z"
}
```

### Get Medical Records
```http
GET /pets/{petId}/health/records
Authorization: Bearer {accessToken}
```

### Add Medical Record
```http
POST /pets/{petId}/health/records
Authorization: Bearer {accessToken}
Content-Type: application/json

{
  "recordType": "vaccination",
  "title": "Annual Rabies Vaccination",
  "description": "Rabies vaccine administered",
  "veterinarian": "Dr. Smith",
  "clinic": "City Vet Clinic",
  "recordDate": "2026-01-05",
  "nextAppointment": "2027-01-05"
}
```

---

## Marketplace

### Get Products
```http
GET /marketplace/products?category=food&page=1&limit=20&sort=price_asc
Authorization: Bearer {accessToken}
```

**Query Parameters**:
- `category`: `food` | `toys` | `accessories` | `health` | etc.
- `sellerType`: `farmer` | `vendor` | `individual` | `breeder`
- `minPrice`: Minimum price
- `maxPrice`: Maximum price
- `latitude`: User latitude for distance calculation
- `longitude`: User longitude
- `radius`: Search radius in km
- `sort`: `price_asc` | `price_desc` | `rating` | `distance`

**Response**:
```json
{
  "products": [
    {
      "productId": "prod_88888",
      "name": "Premium Dog Food - Organic",
      "description": "Organic, grain-free dog food",
      "price": 45.99,
      "currency": "USD",
      "seller": {
        "userId": "user_99999",
        "name": "FarmFresh Co.",
        "sellerType": "farmer",
        "verified": true
      },
      "category": "food",
      "images": ["https://..."],
      "rating": 4.8,
      "reviews": 234,
      "stock": 50,
      "distance": 3.2,
      "noFee": true
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 150
  }
}
```

### Create Product Listing
```http
POST /marketplace/products
Authorization: Bearer {accessToken}
Content-Type: application/json

{
  "name": "Interactive Pet Toy",
  "description": "Keeps your pet entertained for hours",
  "category": "toys",
  "price": 29.99,
  "currency": "USD",
  "stock": 20,
  "images": ["https://..."],
  "sellerType": "vendor"
}
```

### Purchase Product
```http
POST /marketplace/purchase
Authorization: Bearer {accessToken}
Content-Type: application/json

{
  "productId": "prod_88888",
  "quantity": 1,
  "paymentMethod": "crypto",
  "cryptoCurrency": "ETH",
  "shippingAddress": {
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001",
    "country": "USA"
  }
}
```

**Response**:
```json
{
  "transactionId": "txn_11111",
  "amount": 45.99,
  "platformFee": 0,
  "total": 45.99,
  "paymentStatus": "pending",
  "cryptoPayment": {
    "currency": "ETH",
    "amount": 0.012,
    "address": "0x..."
  }
}
```

---

## Services

### Get Service Providers
```http
GET /services/providers?type=walking&latitude=40.7128&longitude=-74.0060&radius=10
Authorization: Bearer {accessToken}
```

**Query Parameters**:
- `type`: `walking` | `sitting` | `grooming` | `training` | `veterinary` | etc.
- `latitude`: User latitude
- `longitude`: User longitude
- `radius`: Search radius in km
- `verified`: `true` | `false`

**Response**:
```json
{
  "providers": [
    {
      "providerId": "provider_123",
      "businessName": "Sarah's Pet Care",
      "serviceType": "walking",
      "rating": 4.9,
      "reviews": 156,
      "hourlyRate": 25,
      "distance": 1.2,
      "verified": true,
      "certifications": ["Pet First Aid", "CPR Certified"],
      "availability": {
        "monday": ["09:00-17:00"],
        "tuesday": ["09:00-17:00"]
      }
    }
  ]
}
```

### Book Service
```http
POST /services/bookings
Authorization: Bearer {accessToken}
Content-Type: application/json

{
  "providerId": "provider_123",
  "petId": "pet_67890",
  "serviceType": "walking",
  "scheduledDate": "2026-01-10",
  "startTime": "14:00",
  "endTime": "15:00",
  "specialInstructions": "Max loves the park route"
}
```

### Get My Bookings
```http
GET /services/my-bookings?status=upcoming
Authorization: Bearer {accessToken}
```

---

## Maps

### Get Walking Routes
```http
GET /maps/routes?latitude=40.7128&longitude=-74.0060&radius=5&difficulty=easy
Authorization: Bearer {accessToken}
```

**Response**:
```json
{
  "routes": [
    {
      "routeId": "route_456",
      "name": "Riverside Trail",
      "distance": 3.2,
      "duration": 45,
      "difficulty": "easy",
      "rating": 4.8,
      "reviews": 234,
      "startLocation": {
        "latitude": 40.7128,
        "longitude": -74.0060
      },
      "waypoints": [...],
      "poopBins": 5,
      "description": "Beautiful scenic route..."
    }
  ]
}
```

### Get Poop Bins
```http
GET /maps/poop-bins?latitude=40.7128&longitude=-74.0060&radius=2
Authorization: Bearer {accessToken}
```

**Response**:
```json
{
  "bins": [
    {
      "binId": "bin_789",
      "latitude": 40.7150,
      "longitude": -74.0070,
      "name": "Main Street Park",
      "hasBags": true,
      "lastVerified": "2026-01-04",
      "distance": 0.3
    }
  ]
}
```

### Track Walk
```http
POST /maps/track-walk
Authorization: Bearer {accessToken}
Content-Type: application/json

{
  "petId": "pet_67890",
  "routeId": "route_456",
  "startTime": "2026-01-06T14:00:00Z",
  "gpsPath": [
    { "lat": 40.7128, "lng": -74.0060, "timestamp": "2026-01-06T14:00:00Z" },
    { "lat": 40.7130, "lng": -74.0062, "timestamp": "2026-01-06T14:01:00Z" }
  ]
}
```

---

## Memorial

### Get Memorial Pages
```http
GET /memorials?page=1&limit=20&isPublic=true
Authorization: Bearer {accessToken}
```

### Create Memorial Page
```http
POST /memorials
Authorization: Bearer {accessToken}
Content-Type: application/json

{
  "petId": "pet_67890",
  "title": "In Loving Memory of Max",
  "memorialText": "Max was the best companion...",
  "dateOfPassing": "2025-11-20",
  "photoUrls": ["https://..."],
  "videoUrl": "https://...",
  "isPublic": true,
  "allowCondolences": true
}
```

### Leave Condolence
```http
POST /memorials/{memorialId}/condolences
Authorization: Bearer {accessToken}
Content-Type: application/json

{
  "message": "So sorry for your loss. Max was beautiful."
}
```

### Light Candle
```http
POST /memorials/{memorialId}/candles
Authorization: Bearer {accessToken}
```

---

## Games

### Get Games
```http
GET /games
Authorization: Bearer {accessToken}
```

### Submit Game Score
```http
POST /games/{gameId}/scores
Authorization: Bearer {accessToken}
Content-Type: application/json

{
  "petId": "pet_67890",
  "score": 1234,
  "level": 5
}
```

### Get Leaderboard
```http
GET /games/{gameId}/leaderboard?period=weekly&limit=100
Authorization: Bearer {accessToken}
```

---

## Encyclopedia

### Search Animals
```http
GET /encyclopedia/animals?query=elephant&category=mammal&limit=20
Authorization: Bearer {accessToken}
```

**Response**:
```json
{
  "animals": [
    {
      "speciesId": "species_111",
      "commonName": "African Elephant",
      "scientificName": "Loxodonta africana",
      "category": "mammal",
      "habitat": "Savanna, forests",
      "dietType": "herbivore",
      "averageLifespan": 70,
      "conservationStatus": "endangered",
      "description": "Largest land animal...",
      "funFacts": ["Incredible memory", "Can live up to 70 years"],
      "images": ["https://..."]
    }
  ]
}
```

### Get Environmental Data
```http
GET /encyclopedia/environment?type=forest&limit=20
Authorization: Bearer {accessToken}
```

---

## Admin

### Get Dashboard Stats
```http
GET /admin/dashboard
Authorization: Bearer {adminToken}
```

**Response**:
```json
{
  "stats": {
    "totalUsers": 45234,
    "activeNow": 8456,
    "revenueToday": 12345.67,
    "pendingReviews": 23
  },
  "recentActivity": [...]
}
```

### Get Moderation Queue
```http
GET /admin/moderation?status=pending&priority=high&page=1
Authorization: Bearer {adminToken}
```

### Moderate Content
```http
POST /admin/moderation/{moderationId}/action
Authorization: Bearer {adminToken}
Content-Type: application/json

{
  "action": "approve", // "approve" | "reject" | "remove"
  "notes": "Reviewed - no violations"
}
```

### Get Financial Reports
```http
GET /admin/financial/daily?startDate=2026-01-01&endDate=2026-01-06
Authorization: Bearer {adminToken}
```

### Live User Monitoring
```http
GET /admin/monitoring/live-users
Authorization: Bearer {adminToken}
```

---

## Error Responses

### Standard Error Format
```json
{
  "success": false,
  "error": {
    "code": "INVALID_CREDENTIALS",
    "message": "Invalid phone number or OTP",
    "details": {
      "field": "otpCode",
      "reason": "OTP has expired"
    }
  },
  "timestamp": "2026-01-06T10:30:00Z"
}
```

### Common Error Codes
- `UNAUTHORIZED`: Missing or invalid authentication token
- `FORBIDDEN`: Insufficient permissions
- `NOT_FOUND`: Resource not found
- `VALIDATION_ERROR`: Invalid request data
- `RATE_LIMIT_EXCEEDED`: Too many requests
- `INTERNAL_ERROR`: Server error

---

## Rate Limiting

**Limits**:
- Anonymous: 100 requests per 15 minutes
- Authenticated: 1000 requests per 15 minutes
- Admin: 5000 requests per 15 minutes

**Headers**:
```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 995
X-RateLimit-Reset: 1609459200
```

---

## Pagination

Standard pagination parameters:
- `page`: Page number (1-indexed)
- `limit`: Items per page (max 100)

Response includes:
```json
{
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 500,
    "totalPages": 25,
    "hasMore": true
  }
}
```

---

**API Version**: v1  
**Last Updated**: January 6, 2026  
**Support**: api-support@critteraffinity.com
