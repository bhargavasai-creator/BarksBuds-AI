# Critter Affinity - Complete Deployment Guide

## 🚀 Production Deployment Steps

### Prerequisites
- Node.js 18+ installed
- IntelliJ IDEA (or any IDE)
- Git installed
- Cloud account (AWS/Google Cloud/Azure)
- Domain name
- SSL certificate

---

## 📦 1. Local Setup (IntelliJ IDEA)

### Step 1: Clone the Repository
```bash
git clone https://github.com/your-org/critter-affinity.git
cd critter-affinity
```

### Step 2: Open in IntelliJ IDEA
1. Open IntelliJ IDEA
2. File → Open → Select `critter-affinity` folder
3. Wait for indexing to complete

### Step 3: Install Dependencies
```bash
npm install
```

### Step 4: Environment Variables
Create `.env` file in root:
```env
# App Configuration
VITE_APP_NAME=Critter Affinity
VITE_APP_URL=https://critteraffinity.com

# Supabase (if using)
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# AI APIs
VITE_DEEPSEEK_API_KEY=your_deepseek_key
VITE_QWEN_API_KEY=your_qwen_key

# Payment Gateways
VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key
VITE_CRYPTO_WALLET_ADDRESS=your_crypto_wallet

# Power BI Integration
VITE_POWERBI_WORKSPACE_ID=your_powerbi_workspace
VITE_POWERBI_REPORT_ID=your_powerbi_report

# Security
VITE_ENCRYPTION_KEY=your_32_char_encryption_key
VITE_JWT_SECRET=your_jwt_secret

# Feature Flags
VITE_ENABLE_OTA_UPDATES=true
VITE_ENABLE_MUSIC=true
VITE_ENABLE_CRYPTO_PAYMENTS=true
```

### Step 5: Run Development Server
```bash
npm run dev
```

Access at: `http://localhost:5173`

---

## 🎵 2. Adding Background Music

### Install Audio Library
```bash
npm install howler @types/howler
```

### Create Music Component
File: `/src/app/components/audio/BackgroundMusic.tsx`

```typescript
import { Howl } from 'howler';
import { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export function BackgroundMusic() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [sound, setSound] = useState<Howl | null>(null);

  useEffect(() => {
    const bgMusic = new Howl({
      src: ['/music/critter-theme.mp3'],
      loop: true,
      volume: 0.3,
      autoplay: false,
    });
    setSound(bgMusic);
    
    return () => {
      bgMusic.unload();
    };
  }, []);

  const toggleMusic = () => {
    if (!sound) return;
    
    if (isPlaying) {
      sound.pause();
    } else {
      sound.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <button
      onClick={toggleMusic}
      className="fixed bottom-4 right-4 p-4 bg-purple-500 text-white rounded-full shadow-lg hover:bg-purple-600 transition-all z-50"
    >
      {isPlaying ? <Volume2 className="w-6 h-6" /> : <VolumeX className="w-6 h-6" />}
    </button>
  );
}
```

Add royalty-free music file to `/public/music/critter-theme.mp3`

---

## 🔐 3. Admin Console Access

### Creating Admin User

1. **Manual Method (Development)**
```typescript
// In browser console after logging in:
const user = JSON.parse(localStorage.getItem('currentUser'));
user.isAdmin = true;
user.adminRole = 'super_admin';
localStorage.setItem('currentUser', JSON.stringify(user));
location.reload();
```

2. **Database Method (Production)**
```sql
-- In your database:
UPDATE users 
SET is_admin = true, 
    admin_role = 'super_admin'
WHERE email = 'admin@critteraffinity.com';
```

### Admin Console Routes
- **Main Admin Console**: `/admin` (accessible after setting isAdmin flag)
- **Content Moderation**: Click "Admin Console" in app navigation
- **Financial Dashboard**: Power BI embedded
- **User Monitoring**: Real-time user tracking with geolocation

### Admin Roles
- `super_admin`: Full access
- `content_moderator`: Content review only
- `financial_admin`: Finance reports only
- `support_admin`: Customer support tools

---

## ☁️ 4. Cloud Deployment

### Option A: AWS Deployment

#### Install AWS CLI
```bash
npm install -g aws-cli
aws configure
```

#### Build for Production
```bash
npm run build
```

#### Deploy to S3 + CloudFront
```bash
# Create S3 bucket
aws s3 mb s3://critteraffinity-prod

# Upload build
aws s3 sync dist/ s3://critteraffinity-prod --delete

# Create CloudFront distribution
aws cloudfront create-distribution \
  --origin-domain-name critteraffinity-prod.s3.amazonaws.com \
  --default-root-object index.html
```

#### S3 Bucket Policy
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::critteraffinity-prod/*"
    }
  ]
}
```

### Option B: Google Cloud Deployment

```bash
# Install Google Cloud CLI
npm install -g @google-cloud/cli

# Build
npm run build

# Deploy to Firebase Hosting
firebase init hosting
firebase deploy
```

### Option C: Azure Deployment

```bash
# Install Azure CLI
npm install -g @azure/static-web-apps-cli

# Build
npm run build

# Deploy
swa deploy ./dist
```

---

## 🔄 5. OTA (Over-The-Air) Updates

### Service Worker Setup
File: `/public/sw.js`

```javascript
const CACHE_NAME = 'critter-affinity-v1.0.0';

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll([
        '/',
        '/index.html',
        '/manifest.json',
        // Add all assets
      ]);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

// Check for updates every hour
setInterval(async () => {
  const response = await fetch('/version.json');
  const { version } = await response.json();
  
  if (version !== CACHE_NAME) {
    // New version available
    self.registration.update();
    self.clients.matchAll().then(clients => {
      clients.forEach(client => {
        client.postMessage({
          type: 'UPDATE_AVAILABLE',
          version: version
        });
      });
    });
  }
}, 3600000); // Every hour
```

### Version File
File: `/public/version.json`

```json
{
  "version": "1.0.0",
  "buildDate": "2025-01-07",
  "features": ["insurance", "calendar", "multilanguage"]
}
```

---

## 📊 6. Power BI Integration

### Install Power BI Embedded
```bash
npm install powerbi-client powerbi-client-react
```

### Power BI Component
```typescript
import { PowerBIEmbed } from 'powerbi-client-react';

export function FinancialDashboard() {
  const config = {
    type: 'report',
    id: process.env.VITE_POWERBI_REPORT_ID,
    embedUrl: `https://app.powerbi.com/reportEmbed?reportId=${process.env.VITE_POWERBI_REPORT_ID}`,
    accessToken: 'YOUR_ACCESS_TOKEN', // Get from Power BI API
    tokenType: 1, // Embed token
  };

  return (
    <div className="powerbi-container">
      <PowerBIEmbed
        embedConfig={config}
        cssClassName="report-style-class"
      />
    </div>
  );
}
```

### Real-Time Analytics Pipeline

```javascript
// Send analytics to Power BI
function sendToPowerBI(data) {
  fetch('https://api.powerbi.com/v1.0/myorg/datasets/YOUR_DATASET_ID/rows', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${powerBIToken}`
    },
    body: JSON.stringify({
      rows: [{
        userId: data.userId,
        breed: data.breed,
        insurancePrice: data.price,
        paymentType: data.paymentType,
        timestamp: new Date().toISOString(),
        country: data.country,
        deviceType: navigator.userAgent,
      }]
    })
  });
}
```

---

## 🗄️ 7. Database Setup

### Supabase Setup
```sql
-- Run in Supabase SQL Editor

-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  phone TEXT,
  location JSONB,
  credits INTEGER DEFAULT 1,
  tokens INTEGER DEFAULT 0,
  subscription TEXT DEFAULT 'free',
  is_admin BOOLEAN DEFAULT false,
  admin_role TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Pets table
CREATE TABLE pets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  name TEXT NOT NULL,
  breed TEXT NOT NULL,
  species TEXT NOT NULL,
  age INTEGER,
  health_score INTEGER DEFAULT 100,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Insurance policies
CREATE TABLE insurance_policies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  pet_id UUID REFERENCES pets(id),
  breed TEXT NOT NULL,
  age INTEGER NOT NULL,
  health_score INTEGER,
  payment_type TEXT,
  price DECIMAL(10,2),
  status TEXT DEFAULT 'active',
  purchase_date TIMESTAMP DEFAULT NOW(),
  expiry_date TIMESTAMP
);

-- Reminders
CREATE TABLE reminders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  time TIME NOT NULL,
  frequency TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Poop bins (community contributed)
CREATE TABLE poop_bins (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  latitude DECIMAL(10, 8) NOT NULL,
  longitude DECIMAL(11, 8) NOT NULL,
  address TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Content moderation queue
CREATE TABLE moderation_queue (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  content_type TEXT NOT NULL,
  content_url TEXT,
  ai_result JSONB,
  status TEXT DEFAULT 'pending',
  reviewed_by UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_pets_user_id ON pets(user_id);
CREATE INDEX idx_insurance_user_id ON insurance_policies(user_id);
CREATE INDEX idx_reminders_user_id ON reminders(user_id);
CREATE INDEX idx_poop_bins_location ON poop_bins(latitude, longitude);
```

---

## 🔧 8. CI/CD Pipeline

### GitHub Actions Workflow
File: `.github/workflows/deploy.yml`

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run tests
        run: npm test
      
      - name: Build
        run: npm run build
        env:
          VITE_APP_URL: ${{ secrets.APP_URL }}
          VITE_SUPABASE_URL: ${{ secrets.SUPABASE_URL }}
          VITE_SUPABASE_ANON_KEY: ${{ secrets.SUPABASE_ANON_KEY }}
      
      - name: Deploy to AWS S3
        run: aws s3 sync dist/ s3://critteraffinity-prod --delete
        env:
          AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
      
      - name: Invalidate CloudFront
        run: |
          aws cloudfront create-invalidation \
            --distribution-id ${{ secrets.CLOUDFRONT_ID }} \
            --paths "/*"
      
      - name: Notify Slack
        run: |
          curl -X POST ${{ secrets.SLACK_WEBHOOK }} \
            -H 'Content-Type: application/json' \
            -d '{"text":"✅ Critter Affinity deployed successfully!"}'
```

---

## 📱 9. Mobile App (Coming Soon)

### Progressive Web App (PWA) Setup
File: `/public/manifest.json`

```json
{
  "name": "Critter Affinity",
  "short_name": "Critter",
  "description": "Pet social network & health tracking platform",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#10b981",
  "icons": [
    {
      "src": "/icons/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

---

## 🌍 10. Multi-Country Compliance

### GDPR Compliance (EU)
- ✅ Cookie consent after login
- ✅ Right to data access
- ✅ Right to be forgotten
- ✅ Data portability
- ✅ Privacy by design

### CCPA Compliance (California)
- ✅ Do Not Sell My Personal Information
- ✅ Right to know data collected
- ✅ Right to delete data

### Other Regions
- 📋 PIPEDA (Canada)
- 📋 LGPD (Brazil)
- 📋 APPI (Japan)
- 📋 PIPL (China)
- ℹ️ All 237 countries covered

---

## 📈 11. Monitoring & Analytics

### Install Sentry (Error Tracking)
```bash
npm install @sentry/react
```

### Configure Sentry
```typescript
import * as Sentry from '@sentry/react';

Sentry.init({
  dsn: "YOUR_SENTRY_DSN",
  environment: process.env.NODE_ENV,
  tracesSampleRate: 1.0,
});
```

### Google Analytics
```html
<!-- Add to index.html -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

---

## 🎯 12. Performance Optimization

### Build Optimization
```javascript
// vite.config.ts
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['lucide-react', '@radix-ui/react-dialog'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
});
```

### Image Optimization
- Use WebP format
- Lazy load images
- Implement CDN (CloudFlare/AWS CloudFront)

---

## ✅ 13. Pre-Launch Checklist

- [ ] All environment variables configured
- [ ] Database migrations run
- [ ] SSL certificate installed
- [ ] Domain configured
- [ ] Admin users created
- [ ] Payment gateways tested
- [ ] Insurance calculator verified
- [ ] Content moderation AI trained
- [ ] Power BI dashboards connected
- [ ] Multi-language translations complete
- [ ] Privacy policy & terms published
- [ ] GDPR compliance verified
- [ ] Backup system configured
- [ ] Monitoring tools active
- [ ] Load testing completed

---

## 📞 Support

For deployment issues:
- Email: devops@critteraffinity.com
- Slack: #deployment-help
- Documentation: https://docs.critteraffinity.com

---

© 2025 Critter Affinity LLC. All Rights Reserved.
Last Updated: January 7, 2025
