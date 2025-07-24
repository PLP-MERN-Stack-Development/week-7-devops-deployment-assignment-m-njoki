# Monitoring Configuration for MERN Application

## Application Monitoring Stack

### 1. **Performance Monitoring**
- **Tool**: PM2 (Process Manager)
- **Purpose**: Monitor Node.js application performance, memory usage, and uptime
- **Configuration**: `ecosystem.config.js`

### 2. **Error Tracking**
- **Tool**: Sentry
- **Purpose**: Real-time error tracking and performance monitoring
- **Setup**: Configure `SENTRY_DSN` in environment variables

### 3. **Logging**
- **Tool**: Winston
- **Purpose**: Structured logging with different log levels
- **Configuration**: `src/utils/logger.js`

### 4. **Uptime Monitoring**
- **Tool**: UptimeRobot / Pingdom
- **Purpose**: Monitor application availability
- **Endpoint**: `/health`

### 5. **Database Monitoring**
- **Tool**: MongoDB Atlas Built-in Monitoring
- **Purpose**: Database performance and connection monitoring

## Monitoring Endpoints

### Health Check
```
GET /health
```
Returns application health status including:
- Database connection status
- System memory usage
- Application uptime
- Environment information

### API Status
```
GET /api/status
```
Returns API operational status and available endpoints.

## Setting Up Monitoring

### 1. PM2 Setup
```bash
# Install PM2 globally
npm install -g pm2

# Start application with PM2
pm2 start ecosystem.config.js --env production

# Monitor processes
pm2 monit

# View logs
pm2 logs

# Restart application
pm2 restart mern-backend
```

### 2. Sentry Setup
```bash
# Install Sentry
npm install @sentry/node

# Configure in your application
const Sentry = require('@sentry/node');

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
});
```

### 3. Log Management
- Logs are automatically rotated when they reach 5MB
- Maximum of 5 log files are kept
- Logs are stored in `/logs` directory

### 4. Alerts Configuration
Set up alerts for:
- Application downtime (>2 minutes)
- High error rates (>5% in 5 minutes)
- High memory usage (>80%)
- Database connection failures

## Monitoring Dashboards

### Production Checklist
- [ ] PM2 monitoring dashboard configured
- [ ] Sentry error tracking active
- [ ] Log aggregation working
- [ ] Health check endpoint responding
- [ ] Database monitoring enabled
- [ ] Uptime monitoring configured
- [ ] Alert notifications set up

### Key Metrics to Monitor
1. **Performance Metrics**
   - Response time
   - Throughput (requests/second)
   - Memory usage
   - CPU usage

2. **Error Metrics**
   - Error rate
   - Error types
   - Failed requests

3. **Business Metrics**
   - User registrations
   - API usage
   - Feature adoption

## Troubleshooting

### Common Issues
1. **High Memory Usage**
   - Check for memory leaks
   - Monitor database connections
   - Review caching strategies

2. **Slow Response Times**
   - Analyze database queries
   - Check external API calls
   - Review middleware performance

3. **Application Crashes**
   - Check PM2 logs
   - Review error logs
   - Monitor system resources

### Log Analysis
```bash
# View real-time logs
pm2 logs --lines 100

# Filter error logs
pm2 logs --err

# Export logs
pm2 logs --out > application.log
```
