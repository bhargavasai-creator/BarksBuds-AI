# Apache Kafka Integration Guide - Critter Affinity

## Overview

Critter Affinity uses Apache Kafka for real-time event streaming, enabling live features like health monitoring, location tracking, and instant notifications.

## Kafka Topics Structure

### 1. user-events

**Purpose**: Track all user actions and state changes

**Events**:

```json
{
  "eventType": "user_login",
  "userId": "user_12345",
  "timestamp": "2026-01-06T10:30:00Z",
  "metadata": {
    "deviceId": "device_abc",
    "ipAddress": "192.168.1.1",
    "location": { "lat": 40.7128, "lng": -74.0060 }
  }
}
```

**Key**: `userId`  
**Partitions**: 12  
**Retention**: 7 days

### 2. pet-health-metrics

**Purpose**: Real-time health data from wearable devices

**Events**:

```json
{
  "eventType": "health_metric",
  "petId": "pet_67890",
  "deviceId": "collar_001",
  "metricType": "heart_rate",
  "value": 85,
  "unit": "bpm",
  "timestamp": "2026-01-06T10:30:15Z",
  "alert": null
}
```

**Key**: `petId`  
**Partitions**: 24  
**Retention**: 30 days

### 3. location-updates

**Purpose**: GPS tracking for pets and users

**Events**:

```json
{
  "eventType": "location_update",
  "userId": "user_12345",
  "petId": "pet_67890",
  "latitude": 40.7589,
  "longitude": -73.9851,
  "accuracy": 10.5,
  "activity": "walking",
  "timestamp": "2026-01-06T10:30:30Z"
}
```

**Key**: `userId`  
**Partitions**: 24  
**Retention**: 14 days

### 4. content-events

**Purpose**: Social interactions (posts, likes, comments)

**Events**:

```json
{
  "eventType": "post_created",
  "postId": "post_99999",
  "userId": "user_12345",
  "petId": "pet_67890",
  "contentType": "image",
  "timestamp": "2026-01-06T10:31:00Z",
  "metadata": {
    "caption": "Beautiful walk today!",
    "mediaUrls": ["https://..."],
    "location": { "lat": 40.7128, "lng": -74.0060 }
  }
}
```

**Key**: `userId`  
**Partitions**: 16  
**Retention**: 14 days

### 5. transaction-events

**Purpose**: Marketplace purchases and payments

**Events**:

```json
{
  "eventType": "transaction_completed",
  "transactionId": "txn_11111",
  "buyerId": "user_12345",
  "sellerId": "user_54321",
  "productId": "prod_88888",
  "amount": 45.99,
  "currency": "USD",
  "paymentMethod": "crypto",
  "cryptoCurrency": "ETH",
  "cryptoAmount": 0.012,
  "timestamp": "2026-01-06T10:32:00Z"
}
```

**Key**: `transactionId`  
**Partitions**: 8  
**Retention**: 90 days (financial data)

### 6. matching-events

**Purpose**: Dating swipes, matches, messages

**Events**:

```json
{
  "eventType": "match_created",
  "matchId": "match_77777",
  "petId1": "pet_11111",
  "petId2": "pet_22222",
  "matchScore": 94.5,
  "timestamp": "2026-01-06T10:33:00Z",
  "algorithm": "ai_v2",
  "factors": {
    "dobSimilarity": 0.95,
    "locationProximity": 0.88,
    "activityMatch": 0.92
  }
}
```

**Key**: `matchId`  
**Partitions**: 8  
**Retention**: 30 days

### 7. admin-actions

**Purpose**: All admin/moderation activities

**Events**:

```json
{
  "eventType": "content_moderated",
  "adminId": "admin_555",
  "contentId": "post_99999",
  "contentType": "post",
  "action": "approved",
  "reason": "No violations found",
  "timestamp": "2026-01-06T10:34:00Z"
}
```

**Key**: `adminId`  
**Partitions**: 4  
**Retention**: 365 days (audit log)

## Kafka Consumers

### 1. Feed Service Consumer

**Subscribes to**: All topics  
**Purpose**: Build personalized feed  
**Consumer Group**: `feed-service-group`

```javascript
// Pseudocode
consumer.subscribe(['user-events', 'content-events', 'pet-health-metrics']);

consumer.on('message', (message) => {
  const event = JSON.parse(message.value);

  // Update feed relevance scores
  if (event.eventType === 'post_created') {
    calculateRelevance(event);
    updateUserFeed(event.userId);
  }

  // Update AI model
  trainRecommendationModel(event);
});
```

### 2. Notification Service Consumer

**Subscribes to**: `matching-events`, `content-events`, `pet-health-metrics`  
**Purpose**: Send push notifications  
**Consumer Group**: `notification-service-group`

```javascript
consumer.subscribe(['matching-events', 'content-events', 'pet-health-metrics']);

consumer.on('message', (message) => {
  const event = JSON.parse(message.value);

  switch(event.eventType) {
    case 'match_created':
      sendPushNotification(event.petId1, `You have a new match! 💕`);
      sendPushNotification(event.petId2, `You have a new match! 💕`);
      break;

    case 'health_alert':
      sendUrgentNotification(event.userId, `Health alert for ${event.petName}!`);
      break;

    case 'post_liked':
      sendNotification(event.postOwnerId, `${event.likerName} liked your post`);
      break;
  }
});
```

### 3. Analytics Service Consumer

**Subscribes to**: All topics  
**Purpose**: Real-time analytics and metrics  
**Consumer Group**: `analytics-service-group`

```javascript
consumer.subscribe(['user-events', 'content-events', 'transaction-events']);

consumer.on('message', (message) => {
  const event = JSON.parse(message.value);

  // Update real-time metrics
  incrementMetric(`events.${event.eventType}`);

  // Update dashboards
  if (event.eventType === 'transaction_completed') {
    updateRevenueDashboard(event.amount);
  }

  // Store for historical analysis
  saveToTimeSeries(event);
});
```

### 4. AI/ML Service Consumer

**Subscribes to**: `content-events`, `user-events`, `matching-events`  
**Purpose**: Train recommendation models  
**Consumer Group**: `ml-service-group`

```javascript
consumer.subscribe(['content-events', 'user-events', 'matching-events']);

const batchBuffer = [];

consumer.on('message', (message) => {
  const event = JSON.parse(message.value);
  batchBuffer.push(event);

  // Batch processing for efficiency
  if (batchBuffer.length >= 1000) {
    trainModel(batchBuffer);
    batchBuffer.length = 0;
  }
});
```

### 5. Backup Service Consumer

**Subscribes to**: All topics  
**Purpose**: Archive events for disaster recovery  
**Consumer Group**: `backup-service-group`

```javascript
consumer.subscribe(['user-events', 'content-events', /* all topics */]);

consumer.on('message', (message) => {
  const event = JSON.parse(message.value);

  // Store in S3/Azure Blob for long-term retention
  archiveToStorage(event);

  // Also store in data warehouse for analytics
  saveToDataWarehouse(event);
});
```

## Kafka Producers

### User Service

```javascript
// When user logs in
producer.send({
  topic: 'user-events',
  key: userId,
  value: JSON.stringify({
    eventType: 'user_login',
    userId,
    timestamp: new Date().toISOString(),
    metadata: { deviceId, ipAddress, location }
  })
});
```

### Health Tracking Service

```javascript
// When device syncs health data
producer.send({
  topic: 'pet-health-metrics',
  key: petId,
  value: JSON.stringify({
    eventType: 'health_metric',
    petId,
    deviceId,
    metricType: 'heart_rate',
    value: 85,
    unit: 'bpm',
    timestamp: new Date().toISOString()
  })
});
```

### Location Tracking Service

```javascript
// Every 30 seconds during walks
setInterval(() => {
  producer.send({
    topic: 'location-updates',
    key: userId,
    value: JSON.stringify({
      eventType: 'location_update',
      userId,
      petId,
      latitude,
      longitude,
      accuracy,
      activity: 'walking',
      timestamp: new Date().toISOString()
    })
  });
}, 30000);
```

## Kafka Configuration

### broker.properties

```properties
# Broker settings
broker.id=0
listeners=PLAINTEXT://localhost:9092
advertised.listeners=PLAINTEXT://localhost:9092
log.dirs=/var/kafka-logs

# Topic defaults
num.partitions=8
default.replication.factor=3
min.insync.replicas=2

# Retention
log.retention.hours=168  # 7 days default
log.retention.bytes=-1   # No size limit
log.segment.bytes=1073741824  # 1GB

# Performance
num.network.threads=8
num.io.threads=8
socket.send.buffer.bytes=102400
socket.receive.buffer.bytes=102400
socket.request.max.bytes=104857600

# Replication
replica.fetch.max.bytes=1048576
```

### Producer Configuration

```javascript
const producerConfig = {
  clientId: 'critter-affinity-api',
  brokers: ['kafka-1:9092', 'kafka-2:9092', 'kafka-3:9092'],
  retry: {
    initialRetryTime: 100,
    retries: 8
  },
  compression: 'gzip',  // Reduce network usage
  idempotent: true,     // Exactly-once semantics
  maxInFlightRequests: 5,
  acks: -1,             // Wait for all replicas
  timeout: 30000
};
```

### Consumer Configuration

```javascript
const consumerConfig = {
  clientId: 'critter-affinity-api',
  brokers: ['kafka-1:9092', 'kafka-2:9092', 'kafka-3:9092'],
  groupId: 'feed-service-group',
  sessionTimeout: 30000,
  heartbeatInterval: 3000,
  maxBytesPerPartition: 1048576,
  retry: {
    retries: 10
  },
  autoCommit: false,  // Manual commit for reliability
  fromBeginning: false
};
```

## Stream Processing with Kafka Streams

### Real-time Health Monitoring

```java
StreamsBuilder builder = new StreamsBuilder();

KStream<String, HealthMetric> healthStream = builder.stream("pet-health-metrics");

// Detect anomalies
healthStream
  .filter((key, metric) -> metric.getMetricType().equals("heart_rate"))
  .filter((key, metric) -> metric.getValue() > 120 || metric.getValue() < 60)
  .to("health-alerts");

// Calculate averages
healthStream
  .groupByKey()
  .windowedBy(TimeWindows.of(Duration.ofMinutes(5)))
  .aggregate(
    () -> new MetricAggregate(),
    (key, metric, aggregate) -> aggregate.add(metric),
    Materialized.as("health-averages-store")
  )
  .toStream()
  .to("health-averages");
```

### Live Feed Scoring

```java
KStream<String, ContentEvent> contentStream = builder.stream("content-events");
KTable<String, UserProfile> userTable = builder.table("user-profiles");

// Join content with user preferences
contentStream
  .join(userTable,
    (content, user) -> calculateRelevance(content, user),
    Joined.with(Serdes.String(), contentSerde, userSerde)
  )
  .to("feed-scores");
```

## Monitoring & Metrics

### Kafka Metrics to Track

- **Producer metrics**:
  - `record-send-rate`: Messages sent per second
  - `record-error-rate`: Failed sends
  - `request-latency-avg`: Average latency
- **Consumer metrics**:
  - `records-consumed-rate`: Messages processed per second
  - `records-lag`: Consumer lag
  - `commit-latency-avg`: Offset commit latency

- **Broker metrics**:
  - `MessagesInPerSec`: Incoming message rate
  - `BytesInPerSec`: Incoming data rate
  - `UnderReplicatedPartitions`: Replication health

### Monitoring Tools

- **Kafka Manager**: UI for cluster management
- **Prometheus + Grafana**: Metrics visualization
- **Burrow**: Consumer lag monitoring
- **Kafka Exporter**: Export metrics to Prometheus

## Disaster Recovery

### Backup Strategy

1. **Kafka Connect**: Stream to S3/Azure Blob
2. **Mirror Maker**: Replicate to secondary cluster
3. **Snapshot**: Daily topic snapshots
4. **Retention**: 90 days for critical topics

### Recovery Procedures

```bash
# Stop consumers
kafka-consumer-groups.sh --bootstrap-server localhost:9092 --group feed-service-group --reset-offsets --to-earliest --execute --all-topics

# Restore from backup
kafka-console-producer.sh --broker-list localhost:9092 --topic user-events < backup/user-events.json

# Restart consumers
systemctl restart critter-affinity-feed-service
```

## Security

### Authentication (SASL)

```properties
# server.properties
listeners=SASL_SSL://localhost:9093
security.inter.broker.protocol=SASL_SSL
sasl.mechanism.inter.broker.protocol=PLAIN
sasl.enabled.mechanisms=PLAIN

# Client config
security.protocol=SASL_SSL
sasl.mechanism=PLAIN
sasl.jaas.config=org.apache.kafka.common.security.plain.PlainLoginModule required username="admin" password="secret";
```

### Encryption (TLS)

```properties
ssl.keystore.location=/var/private/ssl/kafka.server.keystore.jks
ssl.keystore.password=keystore-password
ssl.key.password=key-password
ssl.truststore.location=/var/private/ssl/kafka.server.truststore.jks
ssl.truststore.password=truststore-password
```

### ACLs

```bash
# Create ACL for feed-service
kafka-acls.sh --authorizer-properties zookeeper.connect=localhost:2181 \
  --add --allow-principal User:feed-service \
  --operation Read --operation Describe \
  --topic user-events,content-events,pet-health-metrics
```

## Performance Optimization

### Producer Optimizations

- **Batching**: Increase `linger.ms` to 10-100ms
- **Compression**: Use `gzip` or `snappy`
- **Idempotence**: Enable for exactly-once semantics
- **Partitioning**: Use consistent key for ordering

### Consumer Optimizations

- **Parallelism**: Scale consumers = number of partitions
- **Batch size**: Increase `max.poll.records`
- **Commit strategy**: Manual commit in batches
- **Connection pooling**: Reuse connections

### Topic Optimizations

- **Partitioning**: More partitions = more parallelism
- **Replication**: 3 replicas for production
- **Retention**: Based on business needs
- **Compaction**: Use for stateful data (user profiles)

---

## Example: End-to-End Flow

### Scenario: User posts a photo

1. **API receives POST request**

```javascript
POST /api/posts
{
  "userId": "user_12345",
  "petId": "pet_67890",
  "caption": "Beautiful day!",
  "mediaUrls": ["https://..."]
}
```

2. **API produces Kafka event**

```javascript
producer.send({
  topic: 'content-events',
  key: 'user_12345',
  value: JSON.stringify({
    eventType: 'post_created',
    postId: 'post_99999',
    userId: 'user_12345',
    petId: 'pet_67890',
    timestamp: new Date().toISOString()
  })
});
```

3. **Multiple consumers react**:
   - **Feed Service**: Adds to followers' feeds
   - **Notification Service**: Notifies followers
   - **Analytics Service**: Updates user activity metrics
   - **AI Service**: Updates recommendation model
   - **Backup Service**: Archives event

4. **Real-time updates pushed to clients**

```javascript
// WebSocket notification to followers
followers.forEach(follower => {
  wss.send(follower.socketId, {
    type: 'new_post',
    post: postData
  });
});
```

---

**Kafka Version**: 3.6.0+  
**Last Updated**: January 6, 2026