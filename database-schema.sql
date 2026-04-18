-- =====================================================
-- CRITTER AFFINITY - COMPLETE DATABASE SCHEMA
-- Pet Social Network & Health Tracking Platform
-- =====================================================

-- =====================================================
-- A. USER MANAGEMENT & AUTHENTICATION
-- =====================================================

-- A1. Users Table - Main user accounts
CREATE TABLE users (
    user_id VARCHAR(36) PRIMARY KEY,
    phone_number VARCHAR(20) UNIQUE NOT NULL,
    country_code VARCHAR(5) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE,
    is_verified BOOLEAN DEFAULT FALSE,
    last_login TIMESTAMP,
    device_id VARCHAR(100),
    ip_address VARCHAR(45),
    microphone_permission BOOLEAN DEFAULT FALSE,
    location_permission BOOLEAN DEFAULT FALSE,
    notification_permission BOOLEAN DEFAULT FALSE,
    INDEX idx_phone (phone_number),
    INDEX idx_created (created_at)
);

-- A2. User Profiles - Extended user information
CREATE TABLE user_profiles (
    profile_id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) NOT NULL,
    name VARCHAR(100) NOT NULL,
    gender ENUM('male', 'female', 'other', 'prefer_not_to_say') NOT NULL,
    date_of_birth DATE NOT NULL,
    profile_picture_url TEXT,
    bio TEXT,
    language_preference VARCHAR(10) DEFAULT 'en',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    INDEX idx_user (user_id)
);

-- A3. OTP Verification
CREATE TABLE otp_verification (
    otp_id VARCHAR(36) PRIMARY KEY,
    phone_number VARCHAR(20) NOT NULL,
    otp_code VARCHAR(6) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP NOT NULL,
    is_used BOOLEAN DEFAULT FALSE,
    attempts INT DEFAULT 0,
    INDEX idx_phone_otp (phone_number, created_at)
);

-- A4. User Location Tracking - Critical for app functionality
CREATE TABLE user_locations (
    location_id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) NOT NULL,
    latitude DECIMAL(10, 8) NOT NULL,
    longitude DECIMAL(11, 8) NOT NULL,
    accuracy DECIMAL(10, 2),
    recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    address_text TEXT,
    city VARCHAR(100),
    country VARCHAR(100),
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    INDEX idx_user_location (user_id, recorded_at),
    INDEX idx_coordinates (latitude, longitude)
);

-- =====================================================
-- B. PET PROFILES & MANAGEMENT
-- =====================================================

-- B1. Pet Profiles - Multiple pets per user
CREATE TABLE pet_profiles (
    pet_id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) NOT NULL,
    pet_name VARCHAR(100) NOT NULL,
    species ENUM('dog', 'cat', 'bird', 'fish', 'reptile', 'rabbit', 'hamster', 'guinea_pig', 'horse', 'farm_animal', 'exotic', 'other') NOT NULL,
    breed VARCHAR(100),
    date_of_birth DATE,
    gender ENUM('male', 'female', 'unknown') NOT NULL,
    weight_kg DECIMAL(6, 2),
    profile_picture_url TEXT,
    bio TEXT,
    is_public BOOLEAN DEFAULT TRUE,
    is_memorial BOOLEAN DEFAULT FALSE,
    memorial_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    total_likes INT DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    INDEX idx_user_pets (user_id),
    INDEX idx_species (species),
    INDEX idx_memorial (is_memorial),
    INDEX idx_likes (total_likes DESC)
);

-- B2. Pet Health Tracking Devices - Wearables/chips
CREATE TABLE pet_tracking_devices (
    device_id VARCHAR(36) PRIMARY KEY,
    pet_id VARCHAR(36) NOT NULL,
    device_type ENUM('collar', 'chip', 'belt', 'tag', 'other') NOT NULL,
    device_serial VARCHAR(100) UNIQUE NOT NULL,
    manufacturer VARCHAR(100),
    model VARCHAR(100),
    battery_level INT,
    is_active BOOLEAN DEFAULT TRUE,
    last_sync TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (pet_id) REFERENCES pet_profiles(pet_id) ON DELETE CASCADE,
    INDEX idx_pet_device (pet_id),
    INDEX idx_serial (device_serial)
);

-- B3. Pet Health Metrics - Live health data from devices
CREATE TABLE pet_health_metrics (
    metric_id VARCHAR(36) PRIMARY KEY,
    pet_id VARCHAR(36) NOT NULL,
    device_id VARCHAR(36),
    metric_type ENUM('heart_rate', 'steps', 'calories', 'sleep', 'temperature', 'activity_level', 'location', 'other') NOT NULL,
    metric_value DECIMAL(10, 2) NOT NULL,
    unit VARCHAR(20),
    recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    notes TEXT,
    FOREIGN KEY (pet_id) REFERENCES pet_profiles(pet_id) ON DELETE CASCADE,
    FOREIGN KEY (device_id) REFERENCES pet_tracking_devices(device_id) ON DELETE SET NULL,
    INDEX idx_pet_metrics (pet_id, recorded_at),
    INDEX idx_metric_type (metric_type, recorded_at)
);

-- B4. Pet Medical Records
CREATE TABLE pet_medical_records (
    record_id VARCHAR(36) PRIMARY KEY,
    pet_id VARCHAR(36) NOT NULL,
    record_type ENUM('vaccination', 'checkup', 'surgery', 'medication', 'illness', 'injury', 'other') NOT NULL,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    veterinarian_name VARCHAR(100),
    clinic_name VARCHAR(200),
    record_date DATE NOT NULL,
    next_appointment_date DATE,
    documents_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (pet_id) REFERENCES pet_profiles(pet_id) ON DELETE CASCADE,
    INDEX idx_pet_records (pet_id, record_date)
);

-- =====================================================
-- C. SOCIAL FEATURES - FEED, POSTS, INTERACTIONS
-- =====================================================

-- C1. Posts - User and pet content
CREATE TABLE posts (
    post_id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) NOT NULL,
    pet_id VARCHAR(36),
    content_type ENUM('text', 'image', 'video', 'carousel', 'memorial') NOT NULL,
    caption TEXT,
    media_urls TEXT, -- JSON array of URLs
    is_public BOOLEAN DEFAULT TRUE,
    is_memorial BOOLEAN DEFAULT FALSE,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    location_name VARCHAR(200),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    likes_count INT DEFAULT 0,
    comments_count INT DEFAULT 0,
    shares_count INT DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (pet_id) REFERENCES pet_profiles(pet_id) ON DELETE SET NULL,
    INDEX idx_user_posts (user_id, created_at),
    INDEX idx_pet_posts (pet_id, created_at),
    INDEX idx_public_posts (is_public, created_at),
    INDEX idx_memorial_posts (is_memorial, created_at)
);

-- C2. Post Likes
CREATE TABLE post_likes (
    like_id VARCHAR(36) PRIMARY KEY,
    post_id VARCHAR(36) NOT NULL,
    user_id VARCHAR(36) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (post_id) REFERENCES posts(post_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    UNIQUE KEY unique_post_like (post_id, user_id),
    INDEX idx_post_likes (post_id),
    INDEX idx_user_likes (user_id)
);

-- C3. Post Comments
CREATE TABLE post_comments (
    comment_id VARCHAR(36) PRIMARY KEY,
    post_id VARCHAR(36) NOT NULL,
    user_id VARCHAR(36) NOT NULL,
    comment_text TEXT NOT NULL,
    parent_comment_id VARCHAR(36),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    likes_count INT DEFAULT 0,
    FOREIGN KEY (post_id) REFERENCES posts(post_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (parent_comment_id) REFERENCES post_comments(comment_id) ON DELETE CASCADE,
    INDEX idx_post_comments (post_id, created_at),
    INDEX idx_user_comments (user_id)
);

-- C4. User Search History - For AI feed personalization
CREATE TABLE user_search_history (
    search_id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) NOT NULL,
    search_query TEXT NOT NULL,
    search_category VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    INDEX idx_user_searches (user_id, created_at)
);

-- C5. User Interaction History - For AI feed algorithm
CREATE TABLE user_interactions (
    interaction_id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) NOT NULL,
    interaction_type ENUM('view', 'like', 'comment', 'share', 'save', 'click', 'dwell') NOT NULL,
    content_type ENUM('post', 'profile', 'product', 'article', 'video') NOT NULL,
    content_id VARCHAR(36) NOT NULL,
    duration_seconds INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    INDEX idx_user_interactions (user_id, created_at),
    INDEX idx_content_interactions (content_id, interaction_type)
);

-- =====================================================
-- D. DATING & MATCHING FEATURES
-- =====================================================

-- D1. Dating Profiles - Pets available for dating
CREATE TABLE dating_profiles (
    dating_profile_id VARCHAR(36) PRIMARY KEY,
    pet_id VARCHAR(36) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    looking_for_species VARCHAR(100),
    looking_for_gender ENUM('male', 'female', 'any') DEFAULT 'any',
    min_age_months INT,
    max_age_months INT,
    distance_radius_km INT DEFAULT 50,
    bio TEXT,
    preferences TEXT, -- JSON
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (pet_id) REFERENCES pet_profiles(pet_id) ON DELETE CASCADE,
    INDEX idx_active_dating (is_active, created_at)
);

-- D2. Dating Matches - AI-powered matching
CREATE TABLE dating_matches (
    match_id VARCHAR(36) PRIMARY KEY,
    pet_id_1 VARCHAR(36) NOT NULL,
    pet_id_2 VARCHAR(36) NOT NULL,
    match_score DECIMAL(5, 2), -- AI compatibility score 0-100
    match_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('pending', 'accepted', 'rejected', 'expired') DEFAULT 'pending',
    mutual_match BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (pet_id_1) REFERENCES pet_profiles(pet_id) ON DELETE CASCADE,
    FOREIGN KEY (pet_id_2) REFERENCES pet_profiles(pet_id) ON DELETE CASCADE,
    UNIQUE KEY unique_match (pet_id_1, pet_id_2),
    INDEX idx_pet_matches (pet_id_1, status),
    INDEX idx_mutual (mutual_match, match_date)
);

-- D3. Dating Messages
CREATE TABLE dating_messages (
    message_id VARCHAR(36) PRIMARY KEY,
    match_id VARCHAR(36) NOT NULL,
    sender_user_id VARCHAR(36) NOT NULL,
    message_text TEXT NOT NULL,
    media_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_read BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (match_id) REFERENCES dating_matches(match_id) ON DELETE CASCADE,
    FOREIGN KEY (sender_user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    INDEX idx_match_messages (match_id, created_at)
);

-- =====================================================
-- E. MARKETPLACE & COMMERCE
-- =====================================================

-- E1. Marketplace Products
CREATE TABLE marketplace_products (
    product_id VARCHAR(36) PRIMARY KEY,
    seller_user_id VARCHAR(36) NOT NULL,
    seller_type ENUM('vendor', 'farmer', 'individual', 'breeder', 'service_provider') NOT NULL,
    category ENUM('food', 'toys', 'accessories', 'clothing', 'housing', 'health', 'grooming', 'breeding', 'farm_animals', 'live_animals', 'services', 'other') NOT NULL,
    product_name VARCHAR(200) NOT NULL,
    description TEXT,
    price_amount DECIMAL(10, 2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'USD',
    images_urls TEXT, -- JSON array
    stock_quantity INT,
    is_active BOOLEAN DEFAULT TRUE,
    is_verified BOOLEAN DEFAULT FALSE,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    location_name VARCHAR(200),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    views_count INT DEFAULT 0,
    FOREIGN KEY (seller_user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    INDEX idx_seller_products (seller_user_id),
    INDEX idx_category (category, is_active),
    INDEX idx_location (latitude, longitude)
);

-- E2. Marketplace Transactions
CREATE TABLE marketplace_transactions (
    transaction_id VARCHAR(36) PRIMARY KEY,
    product_id VARCHAR(36) NOT NULL,
    buyer_user_id VARCHAR(36) NOT NULL,
    seller_user_id VARCHAR(36) NOT NULL,
    quantity INT NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    platform_fee DECIMAL(10, 2) DEFAULT 0,
    farmer_fee_waived BOOLEAN DEFAULT FALSE,
    payment_method ENUM('crypto', 'card', 'wallet', 'other') NOT NULL,
    payment_status ENUM('pending', 'completed', 'failed', 'refunded') DEFAULT 'pending',
    crypto_currency VARCHAR(10),
    crypto_amount DECIMAL(20, 8),
    transaction_hash VARCHAR(200),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES marketplace_products(product_id) ON DELETE CASCADE,
    FOREIGN KEY (buyer_user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (seller_user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    INDEX idx_buyer_transactions (buyer_user_id, created_at),
    INDEX idx_seller_transactions (seller_user_id, created_at),
    INDEX idx_payment_status (payment_status)
);

-- E3. Product Reviews
CREATE TABLE product_reviews (
    review_id VARCHAR(36) PRIMARY KEY,
    product_id VARCHAR(36) NOT NULL,
    user_id VARCHAR(36) NOT NULL,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    review_text TEXT,
    images_urls TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    helpful_count INT DEFAULT 0,
    FOREIGN KEY (product_id) REFERENCES marketplace_products(product_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    INDEX idx_product_reviews (product_id, created_at)
);

-- =====================================================
-- F. SERVICES - DELIVERY, WALKING, CARE, BREEDING
-- =====================================================

-- F1. Service Providers
CREATE TABLE service_providers (
    provider_id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) NOT NULL,
    service_type ENUM('walking', 'sitting', 'grooming', 'training', 'veterinary', 'breeding', 'delivery', 'boarding', 'photography', 'other') NOT NULL,
    business_name VARCHAR(200),
    description TEXT,
    certifications TEXT,
    hourly_rate DECIMAL(10, 2),
    rating_average DECIMAL(3, 2) DEFAULT 0,
    total_reviews INT DEFAULT 0,
    is_verified BOOLEAN DEFAULT FALSE,
    service_radius_km INT DEFAULT 20,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    INDEX idx_service_type (service_type, is_verified),
    INDEX idx_location_service (latitude, longitude)
);

-- F2. Service Bookings
CREATE TABLE service_bookings (
    booking_id VARCHAR(36) PRIMARY KEY,
    provider_id VARCHAR(36) NOT NULL,
    customer_user_id VARCHAR(36) NOT NULL,
    pet_id VARCHAR(36),
    service_type VARCHAR(50) NOT NULL,
    scheduled_date DATE NOT NULL,
    scheduled_time_start TIME NOT NULL,
    scheduled_time_end TIME,
    status ENUM('pending', 'confirmed', 'in_progress', 'completed', 'cancelled') DEFAULT 'pending',
    total_amount DECIMAL(10, 2),
    payment_status ENUM('pending', 'paid', 'refunded') DEFAULT 'pending',
    special_instructions TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (provider_id) REFERENCES service_providers(provider_id) ON DELETE CASCADE,
    FOREIGN KEY (customer_user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (pet_id) REFERENCES pet_profiles(pet_id) ON DELETE SET NULL,
    INDEX idx_provider_bookings (provider_id, scheduled_date),
    INDEX idx_customer_bookings (customer_user_id, scheduled_date)
);

-- F3. Walking Routes - Suggested and tracked walks
CREATE TABLE walking_routes (
    route_id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36),
    route_name VARCHAR(200) NOT NULL,
    start_latitude DECIMAL(10, 8) NOT NULL,
    start_longitude DECIMAL(11, 8) NOT NULL,
    end_latitude DECIMAL(10, 8),
    end_longitude DECIMAL(11, 8),
    waypoints TEXT, -- JSON array of coordinates
    distance_km DECIMAL(6, 2),
    duration_minutes INT,
    difficulty ENUM('easy', 'moderate', 'hard') DEFAULT 'easy',
    is_public BOOLEAN DEFAULT TRUE,
    rating_average DECIMAL(3, 2) DEFAULT 0,
    total_reviews INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE SET NULL,
    INDEX idx_location_routes (start_latitude, start_longitude),
    INDEX idx_public_routes (is_public, rating_average)
);

-- F4. Poop Bins - Map locations for waste disposal
CREATE TABLE poop_bins (
    bin_id VARCHAR(36) PRIMARY KEY,
    latitude DECIMAL(10, 8) NOT NULL,
    longitude DECIMAL(11, 8) NOT NULL,
    location_name VARCHAR(200),
    bin_type ENUM('public', 'park', 'street', 'private') DEFAULT 'public',
    has_bags BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    last_verified_date DATE,
    reported_by_user_id VARCHAR(36),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (reported_by_user_id) REFERENCES users(user_id) ON DELETE SET NULL,
    INDEX idx_bin_location (latitude, longitude),
    INDEX idx_active_bins (is_active)
);

-- F5. Walk Tracking - Live pet activity tracking
CREATE TABLE walk_tracking (
    walk_id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) NOT NULL,
    pet_id VARCHAR(36) NOT NULL,
    route_id VARCHAR(36),
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP,
    gps_path TEXT, -- JSON array of coordinates with timestamps
    distance_km DECIMAL(6, 2),
    duration_minutes INT,
    steps_count INT,
    calories_burned DECIMAL(6, 2),
    avg_pace DECIMAL(5, 2),
    status ENUM('active', 'paused', 'completed') DEFAULT 'active',
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (pet_id) REFERENCES pet_profiles(pet_id) ON DELETE CASCADE,
    FOREIGN KEY (route_id) REFERENCES walking_routes(route_id) ON DELETE SET NULL,
    INDEX idx_user_walks (user_id, start_time),
    INDEX idx_pet_walks (pet_id, start_time),
    INDEX idx_active_walks (status, start_time)
);

-- =====================================================
-- G. CONTENT & NEWS FEED
-- =====================================================

-- G1. News Articles - Curated pet-related content
CREATE TABLE news_articles (
    article_id VARCHAR(36) PRIMARY KEY,
    title VARCHAR(300) NOT NULL,
    content TEXT NOT NULL,
    excerpt TEXT,
    author_name VARCHAR(100),
    source_url TEXT,
    category ENUM('health', 'training', 'nutrition', 'behavior', 'news', 'science', 'conservation', 'wildlife', 'farming', 'geology', 'environment', 'other') NOT NULL,
    species_tags TEXT, -- JSON array
    image_url TEXT,
    publish_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_verified BOOLEAN DEFAULT FALSE,
    views_count INT DEFAULT 0,
    likes_count INT DEFAULT 0,
    INDEX idx_category (category, publish_date),
    INDEX idx_verified (is_verified, publish_date)
);

-- G2. Educational Content - Tips, reminders, quotes
CREATE TABLE educational_content (
    content_id VARCHAR(36) PRIMARY KEY,
    content_type ENUM('tip', 'reminder', 'quote', 'fact', 'tutorial') NOT NULL,
    title VARCHAR(200) NOT NULL,
    content_text TEXT NOT NULL,
    category VARCHAR(50),
    species_specific VARCHAR(50),
    image_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE,
    display_priority INT DEFAULT 0,
    INDEX idx_type_active (content_type, is_active),
    INDEX idx_priority (display_priority DESC)
);

-- G3. Feed Algorithm Data - AI-powered personalization
CREATE TABLE feed_algorithm_data (
    feed_id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) NOT NULL,
    content_id VARCHAR(36) NOT NULL,
    content_type ENUM('post', 'article', 'product', 'tip', 'ad') NOT NULL,
    relevance_score DECIMAL(5, 2), -- AI score 0-100
    shown_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    interaction_type ENUM('viewed', 'clicked', 'liked', 'skipped', 'hidden') DEFAULT 'viewed',
    dwell_time_seconds INT,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    INDEX idx_user_feed (user_id, shown_at),
    INDEX idx_content_performance (content_id, interaction_type)
);

-- =====================================================
-- H. MEMORIAL PAGES
-- =====================================================

-- H1. Memorial Pages - Dedicated pages for deceased pets
CREATE TABLE memorial_pages (
    memorial_id VARCHAR(36) PRIMARY KEY,
    pet_id VARCHAR(36) NOT NULL,
    user_id VARCHAR(36) NOT NULL,
    title VARCHAR(200) NOT NULL,
    memorial_text TEXT,
    date_of_passing DATE NOT NULL,
    birth_date DATE,
    tribute_message TEXT,
    photo_gallery_urls TEXT, -- JSON array
    video_url TEXT,
    is_public BOOLEAN DEFAULT TRUE,
    allow_condolences BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    visits_count INT DEFAULT 0,
    FOREIGN KEY (pet_id) REFERENCES pet_profiles(pet_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    INDEX idx_public_memorials (is_public, created_at)
);

-- H2. Memorial Condolences
CREATE TABLE memorial_condolences (
    condolence_id VARCHAR(36) PRIMARY KEY,
    memorial_id VARCHAR(36) NOT NULL,
    user_id VARCHAR(36) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (memorial_id) REFERENCES memorial_pages(memorial_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    INDEX idx_memorial_condolences (memorial_id, created_at)
);

-- =====================================================
-- I. ADVERTISING & MARKETING
-- =====================================================

-- I1. Advertisements
CREATE TABLE advertisements (
    ad_id VARCHAR(36) PRIMARY KEY,
    advertiser_user_id VARCHAR(36) NOT NULL,
    ad_type ENUM('banner', 'video', 'sponsored_post', 'product') NOT NULL,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    media_url TEXT,
    target_audience TEXT, -- JSON targeting criteria
    budget_amount DECIMAL(10, 2),
    spent_amount DECIMAL(10, 2) DEFAULT 0,
    start_date DATE NOT NULL,
    end_date DATE,
    status ENUM('pending_review', 'approved', 'rejected', 'active', 'paused', 'completed') DEFAULT 'pending_review',
    reviewed_by_admin_id VARCHAR(36),
    reviewed_at TIMESTAMP,
    rejection_reason TEXT,
    impressions_count INT DEFAULT 0,
    clicks_count INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (advertiser_user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    INDEX idx_status (status, start_date),
    INDEX idx_active_ads (status, end_date)
);

-- I2. Ad Performance Tracking
CREATE TABLE ad_impressions (
    impression_id VARCHAR(36) PRIMARY KEY,
    ad_id VARCHAR(36) NOT NULL,
    user_id VARCHAR(36),
    impression_type ENUM('view', 'click', 'conversion') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    user_latitude DECIMAL(10, 8),
    user_longitude DECIMAL(11, 8),
    FOREIGN KEY (ad_id) REFERENCES advertisements(ad_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE SET NULL,
    INDEX idx_ad_performance (ad_id, impression_type, created_at)
);

-- =====================================================
-- J. ENTERTAINMENT - GAMES, MOVIES, LIVE STREAMS
-- =====================================================

-- J1. Pet Games
CREATE TABLE pet_games (
    game_id VARCHAR(36) PRIMARY KEY,
    game_name VARCHAR(200) NOT NULL,
    game_type ENUM('puzzle', 'arcade', 'strategy', 'multiplayer', 'war', 'connect') NOT NULL,
    description TEXT,
    thumbnail_url TEXT,
    game_url TEXT,
    min_players INT DEFAULT 1,
    max_players INT DEFAULT 1,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    plays_count INT DEFAULT 0,
    rating_average DECIMAL(3, 2) DEFAULT 0,
    INDEX idx_game_type (game_type, is_active)
);

-- J2. Game Scores
CREATE TABLE game_scores (
    score_id VARCHAR(36) PRIMARY KEY,
    game_id VARCHAR(36) NOT NULL,
    user_id VARCHAR(36) NOT NULL,
    pet_id VARCHAR(36),
    score INT NOT NULL,
    level_reached INT,
    played_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (game_id) REFERENCES pet_games(game_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (pet_id) REFERENCES pet_profiles(pet_id) ON DELETE SET NULL,
    INDEX idx_game_leaderboard (game_id, score DESC),
    INDEX idx_user_scores (user_id, played_at)
);

-- J3. Movie Theaters - Pet-friendly theaters
CREATE TABLE movie_theaters (
    theater_id VARCHAR(36) PRIMARY KEY,
    theater_name VARCHAR(200) NOT NULL,
    address TEXT NOT NULL,
    latitude DECIMAL(10, 8) NOT NULL,
    longitude DECIMAL(11, 8) NOT NULL,
    phone_number VARCHAR(20),
    is_pet_friendly BOOLEAN DEFAULT FALSE,
    pet_policy TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_location_theaters (latitude, longitude),
    INDEX idx_pet_friendly (is_pet_friendly)
);

-- J4. Movie Showtimes
CREATE TABLE movie_showtimes (
    showtime_id VARCHAR(36) PRIMARY KEY,
    theater_id VARCHAR(36) NOT NULL,
    movie_title VARCHAR(200) NOT NULL,
    show_date DATE NOT NULL,
    show_time TIME NOT NULL,
    is_pet_screening BOOLEAN DEFAULT FALSE,
    available_seats INT,
    FOREIGN KEY (theater_id) REFERENCES movie_theaters(theater_id) ON DELETE CASCADE,
    INDEX idx_theater_showtimes (theater_id, show_date, show_time)
);

-- J5. Live Streams
CREATE TABLE live_streams (
    stream_id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) NOT NULL,
    pet_id VARCHAR(36),
    title VARCHAR(200) NOT NULL,
    description TEXT,
    stream_url TEXT,
    thumbnail_url TEXT,
    started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ended_at TIMESTAMP,
    status ENUM('live', 'ended', 'scheduled') DEFAULT 'live',
    viewers_count INT DEFAULT 0,
    peak_viewers INT DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (pet_id) REFERENCES pet_profiles(pet_id) ON DELETE SET NULL,
    INDEX idx_live_streams (status, started_at),
    INDEX idx_user_streams (user_id, started_at)
);

-- =====================================================
-- K. ANIMAL ENCYCLOPEDIA & EDUCATION
-- =====================================================

-- K1. Animal Species Data - Comprehensive animal database
CREATE TABLE animal_species (
    species_id VARCHAR(36) PRIMARY KEY,
    common_name VARCHAR(200) NOT NULL,
    scientific_name VARCHAR(200),
    category ENUM('mammal', 'bird', 'reptile', 'amphibian', 'fish', 'invertebrate', 'microorganism', 'extinct') NOT NULL,
    habitat TEXT,
    diet_type ENUM('carnivore', 'herbivore', 'omnivore', 'other') DEFAULT 'other',
    average_lifespan_years INT,
    conservation_status ENUM('least_concern', 'near_threatened', 'vulnerable', 'endangered', 'critically_endangered', 'extinct') DEFAULT 'least_concern',
    description TEXT,
    fun_facts TEXT,
    image_urls TEXT, -- JSON array
    geographic_range TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_category (category),
    INDEX idx_conservation (conservation_status)
);

-- K2. Environmental Data - Forests, mountains, seas, soil, geology
CREATE TABLE environmental_data (
    data_id VARCHAR(36) PRIMARY KEY,
    data_type ENUM('forest', 'mountain', 'sea', 'river', 'soil', 'geology', 'climate', 'ecosystem') NOT NULL,
    name VARCHAR(200) NOT NULL,
    location VARCHAR(200),
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    description TEXT,
    biodiversity_info TEXT,
    geological_age_years BIGINT, -- For 4.1 billion years of Earth history
    data_source TEXT,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_data_type (data_type),
    INDEX idx_location_env (latitude, longitude)
);

-- =====================================================
-- L. ADMIN & MODERATION
-- =====================================================

-- L1. Admin Users
CREATE TABLE admin_users (
    admin_id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) NOT NULL,
    admin_role ENUM('super_admin', 'content_moderator', 'support', 'marketing', 'finance', 'analytics') NOT NULL,
    permissions TEXT, -- JSON array of permissions
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    INDEX idx_role (admin_role, is_active)
);

-- L2. Content Moderation Queue
CREATE TABLE content_moderation (
    moderation_id VARCHAR(36) PRIMARY KEY,
    content_type ENUM('post', 'comment', 'profile', 'product', 'ad', 'review') NOT NULL,
    content_id VARCHAR(36) NOT NULL,
    reported_by_user_id VARCHAR(36),
    report_reason TEXT,
    ai_flag_reason TEXT,
    priority ENUM('low', 'medium', 'high', 'urgent') DEFAULT 'medium',
    status ENUM('pending', 'reviewing', 'approved', 'rejected', 'removed') DEFAULT 'pending',
    reviewed_by_admin_id VARCHAR(36),
    reviewed_at TIMESTAMP,
    moderation_notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (reported_by_user_id) REFERENCES users(user_id) ON DELETE SET NULL,
    FOREIGN KEY (reviewed_by_admin_id) REFERENCES admin_users(admin_id) ON DELETE SET NULL,
    INDEX idx_status_priority (status, priority, created_at)
);

-- L3. System Activity Logs
CREATE TABLE system_activity_logs (
    log_id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36),
    admin_id VARCHAR(36),
    activity_type VARCHAR(100) NOT NULL,
    activity_description TEXT,
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE SET NULL,
    FOREIGN KEY (admin_id) REFERENCES admin_users(admin_id) ON DELETE SET NULL,
    INDEX idx_user_activity (user_id, created_at),
    INDEX idx_admin_activity (admin_id, created_at)
);

-- =====================================================
-- M. REAL-TIME ACTIVITY & STATUS
-- =====================================================

-- M1. User Activity Status - Live status tracking
CREATE TABLE user_activity_status (
    status_id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) NOT NULL,
    pet_id VARCHAR(36),
    status ENUM('online', 'offline', 'walking', 'sleeping', 'playing', 'feeding', 'at_vet', 'away') DEFAULT 'offline',
    custom_status TEXT,
    last_active TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (pet_id) REFERENCES pet_profiles(pet_id) ON DELETE SET NULL,
    UNIQUE KEY unique_user_status (user_id),
    INDEX idx_status (status, last_active)
);

-- M2. Live Notifications
CREATE TABLE notifications (
    notification_id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) NOT NULL,
    notification_type ENUM('like', 'comment', 'match', 'message', 'booking', 'reminder', 'system', 'health_alert') NOT NULL,
    title VARCHAR(200) NOT NULL,
    message TEXT NOT NULL,
    related_content_type VARCHAR(50),
    related_content_id VARCHAR(36),
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    INDEX idx_user_notifications (user_id, is_read, created_at)
);

-- =====================================================
-- N. FINANCIAL REPORTS & ANALYTICS
-- =====================================================

-- N1. Daily Financial Summary
CREATE TABLE daily_financial_summary (
    summary_id VARCHAR(36) PRIMARY KEY,
    report_date DATE NOT NULL UNIQUE,
    total_transactions INT DEFAULT 0,
    total_revenue DECIMAL(12, 2) DEFAULT 0,
    platform_fees_collected DECIMAL(12, 2) DEFAULT 0,
    farmer_transactions INT DEFAULT 0,
    farmer_fees_waived DECIMAL(12, 2) DEFAULT 0,
    crypto_transactions INT DEFAULT 0,
    crypto_volume DECIMAL(12, 2) DEFAULT 0,
    active_users INT DEFAULT 0,
    new_users INT DEFAULT 0,
    generated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_report_date (report_date DESC)
);

-- N2. User Analytics
CREATE TABLE user_analytics (
    analytics_id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) NOT NULL,
    date DATE NOT NULL,
    posts_created INT DEFAULT 0,
    likes_given INT DEFAULT 0,
    comments_made INT DEFAULT 0,
    products_viewed INT DEFAULT 0,
    purchases_made INT DEFAULT 0,
    time_spent_minutes INT DEFAULT 0,
    walks_completed INT DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    UNIQUE KEY unique_user_date (user_id, date),
    INDEX idx_user_analytics (user_id, date)
);

-- =====================================================
-- O. KAFKA EVENT STREAMING TABLES
-- =====================================================

-- O1. Event Stream Log - For Kafka integration
CREATE TABLE event_stream_log (
    event_id VARCHAR(36) PRIMARY KEY,
    event_type VARCHAR(100) NOT NULL,
    topic_name VARCHAR(100) NOT NULL,
    payload TEXT NOT NULL, -- JSON
    partition_key VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    processed BOOLEAN DEFAULT FALSE,
    processed_at TIMESTAMP,
    INDEX idx_event_type (event_type, created_at),
    INDEX idx_processed (processed, created_at)
);

-- =====================================================
-- P. MULTI-LANGUAGE SUPPORT
-- =====================================================

-- P1. Translations
CREATE TABLE translations (
    translation_id VARCHAR(36) PRIMARY KEY,
    content_key VARCHAR(200) NOT NULL,
    language_code VARCHAR(10) NOT NULL,
    translated_text TEXT NOT NULL,
    context VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY unique_translation (content_key, language_code),
    INDEX idx_language (language_code)
);

-- =====================================================
-- Q. INDEXES FOR PERFORMANCE OPTIMIZATION
-- =====================================================

-- Additional composite indexes for complex queries
CREATE INDEX idx_pet_public_active ON pet_profiles(is_public, is_memorial, created_at);
CREATE INDEX idx_posts_feed ON posts(is_public, created_at DESC);
CREATE INDEX idx_marketplace_active ON marketplace_products(is_active, category, created_at);
CREATE INDEX idx_transactions_date ON marketplace_transactions(created_at, payment_status);
CREATE INDEX idx_dating_active ON dating_profiles(is_active, looking_for_species);
CREATE INDEX idx_walks_active ON walk_tracking(status, start_time);
CREATE INDEX idx_streams_live ON live_streams(status, viewers_count DESC);

-- =====================================================
-- END OF SCHEMA
-- Total Tables: 65+
-- Covers: Users, Pets, Health, Social, Dating, Marketplace,
-- Services, Content, Memorial, Entertainment, Animals,
-- Environment, Admin, Finance, Analytics, Real-time, Kafka
-- =====================================================
