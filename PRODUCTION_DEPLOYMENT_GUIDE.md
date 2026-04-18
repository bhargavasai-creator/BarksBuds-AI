# Critter Affinity - Production Deployment Guide

**Last Updated:** January 7, 2026
**Status:** MVP Complete - Production Enhancements In Progress

---

## 🚀 Quick Start (Local Development)

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

---

## 🏗️ System Architecture

### Core Components Created
1. ✅ Animated Landing Page with Animal Parade
2. ✅ Enhanced Authentication (OTP, Signup, Login, Forgot Password)
3. ✅ Credits & Billing System (Penny-per-word, Subscriptions)
4. ✅ Multi-Profile Management (Pet, Shop, Delivery, Personal)
5. ✅ AI Content Moderation System
6. ✅ Pet Insurance Calculator
7. ✅ Reminder & Calendar System
8. ✅ Multi-Language Support (20+ languages)
9. ✅ Crypto QR Payment System
10. ✅ Location & Permission Management

---

## 🔐 Authentication Flow

### Current Implementation
- **Landing Page** → Shows animated animal parade
- **Cookie Consent** → Captures device info and IP (on accept)
- **Auth Screen** → Login/Signup/Forgot Password
- **OTP Verification** → 6-digit SMS/Email OTP
- **Permission Requests** → Location + Microphone (mandatory for signup)

### Demo Credentials
- **OTP Code:** 123456 (hardcoded for demo)
- **Admin Access:** Any email containing "admin"

---

## 💰 Billing & Credits System

### Pricing Model
- **First Prompt:** FREE
- **Subsequent:** $0.01 per word (1 penny)
- **Subscriptions:**
  - Basic: $9.99/month → 10,000 tokens
  - Premium: $24.99/month → 30,000 tokens
  - Pro: $49.99/month → 100,000 tokens

### Crypto Payments
- Supports: BTC, ETH, USDT, USDC
- QR Code generation for easy scanning
- Manual verification (in production, integrate blockchain APIs)

---

## 👥 Multi-Profile System

Users can create multiple profiles:
1. **Personal Profile** - Default for all users
2. **Pet Profiles** - For each pet (breed, age, health tracking)
3. **Shop/Vendor** - For marketplace sellers (zero fees for farmers!)
4. **Delivery Partner** - Requires admin approval with ID verification

### Profile Approval Workflow
- Delivery partners → Pending → Admin Review → Approved/Rejected
- Shop owners → Active immediately (can be flagged for review)
- Pet profiles → Active immediately

---

## 🛡️ Content Moderation & Guardrails

### AI Moderation Rules
1. ✅ **Must Include:** Animals, pets, or nature
2. ❌ **Prohibited:** Human-only content without animals/nature
3. ✅ **Auto-Approved:** Content with detected animals/nature
4. ⚠️ **Manual Review:** Flagged content goes to admin queue
5. 📝 **Database Logging:** All rejected attempts stored for admin review

### Moderation Flow
```
User Upload → AI Detection → Pass/Fail
   ↓                           ↓
Approved            Admin Review Queue
   ↓                           ↓
Published           Manual Approve/Reject
```

---

## 🌍 Country-Specific Features

### Location-Based Logic
1. **Dating:** Restricted to same country only
2. **News Feed:** 
   - First week: Global content
   - After 1+ week in same location: Local/country-specific
3. **Marketplace:** Country-wise filtering
4. **Legal Compliance:** Follows all 237 countries' regulations

### Geolocation Storage
```javascript
{
  lat: number,
  lng: number,
  timestamp: number,
  country: string (from reverse geocoding API)
}
```

---

## 📅 Reminder & Calendar System

### Features
- **5-10 Reminders:** Default feeding, exercise, vet, grooming, etc.
- **Custom Reminders:** User-created schedules
- **Notification API:** Browser notifications (permission-based)
- **Energy Tracker:** Logs feeding → updates pet energy level
- **Poop Bin Mapping:** Community-driven location contributions

### Reminder Types
- Feeding (2x daily default)
- Exercise/Walks (2x daily default)
- Vet Appointments (monthly)
- Grooming (weekly)
- Medication (custom)
- Poop Bin Checks (custom)

---

## 🐾 Pet Insurance System

### Calculator Inputs
- Pet breed (17+ breeds supported)
- Pet age
- Health score (1-10)
- Average lifespan (breed-specific)

### Premium Calculation
```
Monthly Premium = Base Cost × Risk Factor × Age Factor × Health Factor
Yearly Premium = Monthly × 12 × 0.9 (10% discount)
Lifetime Premium = Monthly × 12 × Remaining Years × 0.8 (20% discount)
```

### Top Breeds by Cost
1. Bulldog - $85/mo (High risk)
2. Rottweiler - $60/mo
3. German Shepherd - $50/mo
4. Boxer - $55/mo
5. Golden Retriever - $45/mo

---

## 🗂️ Database Schema

### Core Tables
```sql
users (id, email, password_hash, name, phone, created_at)
profiles (id, user_id, type, name, bio, avatar, status)
insurance_policies (id, user_id, breed, plan, premium, coverage)
reminders (id, user_id, type, title, time, repeat, enabled)
poop_bins (id, lat, lng, added_by, verified, timestamp)
moderation_queue (id, content, user_id, status, ai_flags, reviewed_at)
credits_usage (id, user_id, words, cost, timestamp, is_free)
subscriptions (id, user_id, plan, tokens, start_date, status)
```

See `/database-schema.sql` for complete schema (65+ tables).

---

## 🎨 Frontend Components

### Created Components
```
/src/app/components/
├── landing/AnimatedLanding.tsx
├── auth/EnhancedAuth.tsx
├── credits/CreditsManager.tsx
├── profiles/MultiProfileManager.tsx
├── moderation/ContentModerationSystem.tsx
├── insurance/PetInsuranceSystem.tsx
├── reminders/ReminderCalendarSystem.tsx
├── language/LanguageSelector.tsx
└── crypto/CryptoQRPayment.tsx
```

---

## 🌐 Multi-Language Support

### Supported Languages (20+)
English, Spanish, French, German, Italian, Portuguese, Russian, Chinese, Japanese, Korean, Arabic, Hindi, Bengali, Turkish, Vietnamese, Thai, Polish, Dutch, Swedish, Norwegian

### Implementation
- Language popup on first visit
- Stored in localStorage
- Real-time translation (integrate Google Translate API in production)

---

## 📊 Power BI Integration

### Data Streams
```javascript
// Insurance Analytics
POST /powerbi/insurance
{
  timestamp, userId, breed, age, plan, premium, coverage, country, device
}

// User Registration (OTA Updates)
POST /powerbi/registrations
{
  timestamp, userId, name, email, location, device, ipAddress
}

// Content Moderation
POST /powerbi/moderation
{
  timestamp, contentId, userId, approved, flags, aiConfidence
}
```

### Dashboard Metrics
1. Real-time user registrations
2. Top breeds by insurance cost
3. Country-wise user distribution
4. Revenue tracking (subscriptions + credits)
5. Content moderation stats
6. Device analytics

---

## ☁️ Cloud Deployment

### Recommended Stack
```
Frontend: Vercel / Netlify
Backend API: AWS Lambda / Google Cloud Functions
Database: PostgreSQL (Supabase / AWS RDS)
File Storage: AWS S3 / Cloudflare R2
CDN: Cloudflare
Real-time: Supabase Realtime / Ably
Analytics: Power BI / Mixpanel
Monitoring: Sentry / LogRocket
```

### Environment Variables
```env
# API Keys
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_key
VITE_DEEPSEEK_API_KEY=your_deepseek_key
VITE_QWEN_API_KEY=your_qwen_key
VITE_POWERBI_ENDPOINT=your_powerbi_endpoint
VITE_CRYPTO_PAYMENT_API=your_crypto_api

# External Services
VITE_GOOGLE_TRANSLATE_API_KEY=your_key
VITE_GOOGLE_MAPS_API_KEY=your_key
VITE_TWILIO_ACCOUNT_SID=your_sid
VITE_TWILIO_AUTH_TOKEN=your_token

# Feature Flags
VITE_ENABLE_CRYPTO_PAYMENTS=true
VITE_ENABLE_AI_MODERATION=true
VITE_MIN_AGE_RESTRICTION=1
```

---

## 🚢 Production Checklist

### Pre-Deployment
- [ ] Set up PostgreSQL database with schema
- [ ] Configure Supabase project
- [ ] Set up Power BI workspace
- [ ] Configure cloud storage buckets
- [ ] Set up CDN for assets
- [ ] Configure environment variables
- [ ] Set up monitoring (Sentry)
- [ ] Configure analytics

### Security
- [ ] Enable HTTPS/SSL
- [ ] Implement rate limiting
- [ ] Set up CORS policies
- [ ] Enable DDoS protection (Cloudflare)
- [ ] Implement JWT authentication
- [ ] Hash passwords (bcrypt)
- [ ] Sanitize all inputs
- [ ] Implement CSRF protection

### Performance
- [ ] Enable code splitting
- [ ] Optimize images (WebP)
- [ ] Enable lazy loading
- [ ] Configure caching headers
- [ ] Minify CSS/JS
- [ ] Enable gzip compression
- [ ] Set up CDN caching

---

## 🔧 CI/CD Pipeline

### GitHub Actions Workflow
```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      - uses: vercel/actions@v1
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

---

## 👨‍💼 Admin Console Access

### How to Access
1. Login with email containing "admin" (e.g., admin@critteraffinity.com)
2. Click the red Settings icon in top navigation
3. Access 7 specialized consoles:
   - Employee Management
   - Content Moderation
   - User Analytics
   - Marketing Console
   - Financial Reports
   - Live Monitoring

### Admin Features
- Real-time user tracking (lat/long)
- Approve/reject delivery partners
- Content moderation queue
- Financial reports & analytics
- Employee management
- Marketing campaigns

---

## 📱 Mobile Support

### PWA Features
- Install as app on mobile devices
- Offline support for delivery tracking
- Push notifications
- Background sync
- Camera access for pet photos

---

## 🎵 Background Music

To add background music to landing page:
```typescript
// In AnimatedLanding.tsx
const audioRef = useRef<HTMLAudioElement>(null);

useEffect(() => {
  audioRef.current?.play();
}, []);

<audio ref={audioRef} loop>
  <source src="/music/background.mp3" type="audio/mpeg" />
</audio>
```

---

## 📄 Legal & Compliance

### Required Pages
- [ ] Terms & Conditions (per country)
- [ ] Privacy Policy (GDPR, CCPA compliant)
- [ ] Cookie Policy
- [ ] Insurance Disclaimers
- [ ] Refund Policy
- [ ] Community Guidelines
- [ ] Copyright © 2025-2026 Critter Affinity

### Age Restrictions
- Minimum age: 1 year (parental supervision)
- No adult content
- Pet-safe environment only

---

## 🆘 Support & Documentation

### For Developers
- See `/ARCHITECTURE.md` for system design
- See `/API_DOCUMENTATION.md` for API reference
- See `/KAFKA_INTEGRATION.md` for event streaming

### For Users
- In-app help center
- FAQ section
- Video tutorials
- Community forum

---

## 📈 Monitoring & Analytics

### Key Metrics to Track
1. Daily Active Users (DAU)
2. Monthly Active Users (MAU)
3. User Retention Rate
4. Credits Purchase Rate
5. Subscription Conversion
6. Insurance Policy Purchases
7. Content Moderation Success Rate
8. Average Session Duration
9. Marketplace GMV (Gross Merchandise Value)
10. Dating Match Success Rate

---

## 🎯 Roadmap

### Phase 1 (Current - MVP)
- ✅ Core authentication
- ✅ Basic features
- ✅ Insurance system
- ✅ Multi-profiles
- ✅ Content moderation

### Phase 2 (Next 3 Months)
- [ ] Full Power BI integration
- [ ] Real-time chat/messaging
- [ ] Video calling for pets
- [ ] Advanced AI features
- [ ] Mobile apps (iOS/Android)

### Phase 3 (6-12 Months)
- [ ] Global expansion (237 countries)
- [ ] AR features for pet try-on
- [ ] Blockchain pet records
- [ ] NFT pet collectibles
- [ ] Metaverse integration

---

## 📞 Contact & Support

**Company:** Critter Affinity LLC
**Email:** support@critteraffinity.com
**Emergency:** +1-800-PET-HELP

---

**© 2025-2026 Critter Affinity. All rights reserved.**
