# Critter Affinity - Complete Architecture Documentation

## 🌟 Project Overview

**Critter Affinity** is a comprehensive pet social network and health tracking platform designed to connect pets, pet owners, and the broader animal community. The platform celebrates all life on Earth, from pets to wildlife, spanning 4.1 billion years of evolutionary history.

## 🏗️ System Architecture

### Technology Stack

#### Frontend (Web MVP)
- **Framework**: React 18.3.1 with TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: Custom components + Radix UI primitives
- **Icons**: Lucide React
- **Build Tool**: Vite

#### Recommended Production Stack
- **Mobile App**: Flutter
- **Admin Console**: JavaFX (Java desktop application)
- **Backend**: Node.js with Express or NestJS
- **Database**: PostgreSQL with PostGIS for geospatial data
- **Cache**: Redis for session management and real-time features
- **Message Queue**: Apache Kafka for event streaming
- **Storage**: AWS S3 or Azure Blob Storage for media files
- **Maps**: Microsoft Maps API
- **AI/ML**: Integration with Qwen or DeepSeek APIs
- **Real-time**: WebSocket for live features
- **Payment**: Crypto wallets (MetaMask, WalletConnect) + Stripe

### Database Schema

See `database-schema.sql` for complete schema with 65+ tables covering:
- User management and authentication
- Pet profiles and health tracking
- Social features (posts, likes, comments)
- Dating and matching algorithms
- Marketplace and transactions
- Services (walking, grooming, etc.)
- Memorial pages
- Entertainment (games, streams)
- Animal encyclopedia
- Admin and moderation
- Financial reporting
- Real-time activity tracking

## 🎯 Core Features

### 1. Authentication & User Management
- **OTP-based phone authentication** (no email/social login)
- **Required permissions on first launch**:
  1. Location access (CRITICAL - Rule #1)
  2. Microphone access (CRITICAL - Rule #2 - for safety features)
- **User data collection**:
  - Phone number with country code
  - Name, gender, date of birth
  - Device ID and IP address
  - Real-time location (latitude/longitude)
- **Multi-pet profiles** per account

### 2. AI-Powered News Feed
- Personalized content based on:
  - User search history
  - Interaction patterns (likes, comments, dwell time)
  - Pet species and preferences
  - Location-based content
- Integration with Qwen or DeepSeek API for:
  - Content relevance scoring
  - Trend prediction
  - Spam detection
- Content types:
  - User posts (text, images, videos)
  - News articles (fact-checked, pet-related only)
  - Educational tips and reminders
  - Memorial tributes
  - Marketplace featured items

### 3. Health Tracking & Wearables
- **Device integration**:
  - Smart collars
  - Tracking chips
  - Health monitoring belts
  - GPS tags
- **Real-time metrics**:
  - Heart rate
  - Steps/activity level
  - Calories burned
  - Sleep patterns
  - Body temperature
  - Location tracking
- **Health alerts**:
  - Abnormal vitals
  - Low battery warnings
  - Geofence violations
- **Medical records**:
  - Vaccination history
  - Vet visits
  - Medications
  - Allergies

### 4. Dating & Matching
- **AI-powered matching algorithm** based on:
  - Date of birth similarity (DOB >= <= matching)
  - Species compatibility
  - Breed preferences
  - Geographic proximity
  - Owner compatibility
  - Activity levels
- **Match score**: 0-100% compatibility
- **Features**:
  - Swipe interface (like/pass/super like)
  - In-app messaging
  - Video calls for meet-ups
  - Safety tips and guidelines

### 5. Marketplace
- **Categories**:
  - Food and treats
  - Toys and accessories
  - Clothing and costumes
  - Housing and bedding
  - Health and grooming products
  - Live animals (breeding)
  - Farm animals
  - Services
- **Fee structure**:
  - **0% fees for registered farmers** (100% to farmer)
  - Standard platform fees for other sellers
  - AI-powered fraud detection
- **Payment methods**:
  - Cryptocurrency (BTC, ETH, USDT, etc.)
  - Traditional payments
  - Escrow system for high-value items
- **Features**:
  - Location-based search
  - AI-powered recommendations
  - Reviews and ratings
  - Secure transactions

### 6. Services Platform
- **Service types**:
  - Dog walking
  - Pet sitting
  - Grooming
  - Training
  - Veterinary (bookings)
  - Breeding services
  - Photography
  - Boarding
  - Delivery (pet food, supplies)
- **Provider verification**:
  - Background checks
  - Certifications
  - Reviews and ratings
  - Insurance verification
- **Booking system**:
  - Real-time availability
  - Calendar integration
  - Automated reminders
  - Payment processing

### 7. Maps & Walking Routes
- **Microsoft Maps integration**
- **Features**:
  - **Walking routes**: Community-curated paths
  - **Poop bins**: Live database of waste disposal locations
  - **Pet-friendly places**: Parks, cafes, hotels
  - **Real-time tracking**: Monitor pets during walks
  - **Route suggestions**: Based on distance, difficulty, and ratings
  - **Waypoint tracking**: GPS path recording
- **Safety features**:
  - Emergency contacts
  - Lost pet alerts
  - Safe zone geofencing

### 8. Memorial Pages
- **Tribute features**:
  - Photo galleries
  - Video tributes
  - Life story timeline
  - Condolence messages
  - Virtual candle lighting
- **Privacy options**:
  - Public or private pages
  - Selective sharing
  - Download memories
- **Community support**:
  - Pet loss groups
  - Grief resources
  - Memorial events

### 9. Entertainment
- **Pet games**:
  - Single-player puzzles
  - Multiplayer battles (Animal War)
  - Connect games
  - Leaderboards and achievements
- **Live streams**:
  - Pet cam feeds
  - Training sessions
  - Adoption center streams
  - Wildlife cameras
- **Movies & theaters**:
  - Pet-friendly movie showtimes
  - Nearby theater listings
  - Special pet screenings

### 10. Animal Encyclopedia
- **Comprehensive database**:
  - 4.1 billion years of life on Earth
  - Mammals, birds, reptiles, amphibians, fish
  - Invertebrates and microorganisms
  - Extinct species
- **Environmental data**:
  - Forests and ecosystems
  - Mountains and geological formations
  - Seas and oceans
  - Rivers and wetlands
  - Soil composition
  - Climate zones
- **Conservation status**:
  - IUCN Red List integration
  - Endangered species alerts
  - Conservation organizations

## 🔐 Admin Console System

### Multiple Specialized Consoles

#### 1. Main Dashboard
- Real-time platform statistics
- Active user monitoring
- Revenue tracking
- Quick action shortcuts

#### 2. Employee Management Console
- **Features**:
  - Add/remove employees
  - Role-based access control (RBAC)
  - Permission management
  - Activity logging
- **Roles**:
  - Super Admin
  - Content Moderator
  - Marketing Manager
  - Finance Analyst
  - Support Agent
  - Analytics Specialist

#### 3. Content Moderation Console
- **Queue management**:
  - AI-flagged content
  - User-reported content
  - Priority-based review
- **Actions**:
  - Approve/reject content
  - Ban users
  - Issue warnings
  - Content editing
- **AI integration**:
  - Automated spam detection
  - Inappropriate content flagging
  - Sentiment analysis

#### 4. Marketing Console
- **Campaign management**:
  - Create/edit campaigns
  - Audience targeting
  - Budget allocation
- **Analytics**:
  - Impressions and reach
  - Click-through rates
  - Conversion tracking
  - ROI calculation
- **Ad approval**:
  - Review advertiser submissions
  - Verify advertiser identity
  - Ensure compliance

#### 5. Financial Console
- **Daily reports**:
  - Revenue breakdown
  - Transaction counts
  - Platform fees collected
  - Farmer fee waivers
- **Payment tracking**:
  - Crypto transactions
  - Fiat payments
  - Refunds and disputes
- **Export features**:
  - PDF reports
  - CSV data exports
  - Tax documentation

#### 6. Live Monitoring Console
- **Real-time tracking**:
  - Active user locations (lat/lng)
  - Current activities (walking, sleeping, playing)
  - Device status
  - Health alerts
- **Map visualization**:
  - Microsoft Maps integration
  - User density heatmaps
  - Activity zones
- **Emergency response**:
  - SOS alerts
  - Lost pet notifications
  - Safety incident tracking

#### 7. Analytics Console
- **User analytics**:
  - Growth metrics
  - Engagement rates
  - Retention analysis
  - Churn prediction
- **Content analytics**:
  - Popular posts
  - Trending topics
  - Share metrics
- **Feature usage**:
  - Screen time per feature
  - User journey mapping
  - Conversion funnels

## 📊 Data Flow & Kafka Integration

### Event Streaming with Kafka

#### Topics:
1. **user-events**: Login, logout, profile updates
2. **pet-health**: Real-time health metrics from devices
3. **location-updates**: GPS coordinates, activity status
4. **content-events**: Posts, likes, comments
5. **transaction-events**: Purchases, payments
6. **matching-events**: Swipes, matches, messages
7. **admin-actions**: Moderation, approvals

#### Consumers:
- **Feed Service**: Consumes all events for personalization
- **Notification Service**: Sends push notifications
- **Analytics Service**: Processes metrics
- **AI Service**: Trains recommendation models
- **Backup Service**: Archives events for disaster recovery

## 🌍 Multi-Language Support

- **Supported languages**: All major languages
- **Implementation**:
  - Translation API integration (Google Translate, DeepL)
  - User language preference storage
  - Dynamic content translation
  - Locale-specific formatting (dates, numbers, currency)
- **Content moderation**:
  - Language detection
  - Cross-language spam detection

## 🔒 Privacy & Security

### Data Protection
- **Location data**: Encrypted at rest and in transit
- **Health data**: HIPAA-compliant storage
- **Payment data**: PCI DSS compliance
- **Personal information**: GDPR/CCPA compliance

### User Safety
- **Microphone access**: Only for emergency features
  - Voice-activated SOS
  - Distress detection
  - Pet sound monitoring
- **Content moderation**: AI + human review
- **Reporting system**: Easy user reporting
- **Blocking and privacy controls**

## 🚀 Deployment Architecture

### Recommended Infrastructure

```
┌─────────────────────────────────────────────────────────┐
│                     Load Balancer                        │
│                    (AWS ELB / Azure)                     │
└─────────────────────────────────────────────────────────┘
                            │
        ┌───────────────────┼───────────────────┐
        │                   │                   │
   ┌────▼────┐         ┌────▼────┐        ┌────▼────┐
   │  Web    │         │   API   │        │  Admin  │
   │ Servers │         │ Servers │        │ Console │
   │ (Nginx) │         │(Node.js)│        │(JavaFX) │
   └────┬────┘         └────┬────┘        └────┬────┘
        │                   │                   │
        └───────────────────┼───────────────────┘
                            │
        ┌───────────────────┼───────────────────┐
        │                   │                   │
   ┌────▼────┐         ┌────▼────┐        ┌────▼────┐
   │Database │         │  Redis  │        │  Kafka  │
   │(Postgres│         │ (Cache) │        │(Streaming)│
   │ +PostGIS)│         │         │        │         │
   └────┬────┘         └─────────┘        └─────────┘
        │
   ┌────▼────┐
   │   S3    │
   │(Storage)│
   └─────────┘
```

### Scalability Considerations
- **Horizontal scaling**: Auto-scaling groups
- **Database sharding**: By geographic region
- **CDN**: CloudFront or Azure CDN for media
- **Caching**: Redis cluster for session management
- **Message queues**: Kafka cluster for event processing

## 📱 Flutter App Structure (Recommended)

```
lib/
├── main.dart
├── app/
│   ├── routes/
│   ├── themes/
│   └── config/
├── features/
│   ├── auth/
│   ├── feed/
│   ├── dating/
│   ├── health/
│   ├── marketplace/
│   ├── services/
│   ├── maps/
│   ├── memorial/
│   ├── games/
│   └── encyclopedia/
├── core/
│   ├── api/
│   ├── models/
│   ├── services/
│   └── utils/
└── shared/
    ├── widgets/
    └── constants/
```

## 🖥️ JavaFX Admin Console Structure

```
src/
├── com/critteraffinity/admin/
│   ├── Main.java
│   ├── controllers/
│   │   ├── DashboardController.java
│   │   ├── EmployeeController.java
│   │   ├── ContentController.java
│   │   ├── MarketingController.java
│   │   ├── FinancialController.java
│   │   └── MonitoringController.java
│   ├── models/
│   ├── services/
│   ├── views/
│   │   └── *.fxml
│   └── utils/
└── resources/
    ├── css/
    ├── images/
    └── fxml/
```

## 🔄 API Endpoints (Backend)

### Authentication
- `POST /api/auth/send-otp` - Send OTP to phone
- `POST /api/auth/verify-otp` - Verify OTP
- `POST /api/auth/register` - Complete registration
- `POST /api/auth/logout` - Logout user

### Feed
- `GET /api/feed` - Get personalized feed
- `POST /api/posts` - Create post
- `POST /api/posts/:id/like` - Like post
- `POST /api/posts/:id/comment` - Comment on post

### Health
- `GET /api/pets/:id/health` - Get health metrics
- `POST /api/pets/:id/health` - Add health data
- `GET /api/devices/:id` - Get device info
- `POST /api/devices/:id/sync` - Sync device data

### Dating
- `GET /api/dating/profiles` - Get potential matches
- `POST /api/dating/swipe` - Swipe action
- `GET /api/dating/matches` - Get matches
- `POST /api/dating/message` - Send message

### Marketplace
- `GET /api/marketplace/products` - List products
- `POST /api/marketplace/products` - Create listing
- `POST /api/marketplace/purchase` - Buy product
- `GET /api/marketplace/transactions` - Get transactions

### Maps
- `GET /api/maps/routes` - Get walking routes
- `GET /api/maps/poop-bins` - Get poop bin locations
- `POST /api/maps/track-walk` - Record walk

### Admin
- `GET /api/admin/dashboard` - Dashboard stats
- `GET /api/admin/users` - List users
- `GET /api/admin/moderation` - Moderation queue
- `POST /api/admin/moderate` - Moderate content
- `GET /api/admin/financials` - Financial reports

## 📈 Future Enhancements

1. **AR Features**: Augmented reality for pet try-ons
2. **Voice Commands**: Voice-controlled app navigation
3. **Smart Home Integration**: IoT device connectivity
4. **Blockchain**: NFTs for pet ownership verification
5. **Telemedicine**: Video vet consultations
6. **DNA Testing**: Breed identification and health predictions
7. **Social Impact**: Donation platform for shelters
8. **API Platform**: Third-party integrations

## 📄 License & Legal

- Platform Name: Critter Affinity™
- Privacy Policy: Required (PII collection notice)
- Terms of Service: Required
- Cookie Policy: Required
- GDPR Compliance: Required for EU users
- COPPA Compliance: No users under 13
- Animal Welfare Standards: Ethical guidelines

## 🌱 Environmental Mission

**"For Pets, Animals, Nature & Conservation"**

Critter Affinity celebrates all life on Earth, from beloved pets to wildlife, ecosystems, and the geological history of our planet spanning 4.1 billion years. We are committed to:
- Promoting responsible pet ownership
- Supporting wildlife conservation
- Educating about biodiversity
- Connecting people with nature
- Preserving Earth's natural heritage

---

**Version**: 1.0.0  
**Last Updated**: January 6, 2026  
**Documentation Maintained By**: Critter Affinity Engineering Team
