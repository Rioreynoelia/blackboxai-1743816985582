const winston = require('winston');
const { Loggly } = require('winston-loggly-bulk');
const promClient = require('prom-client');

// Configure logging
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' })
  ]
});

// Loggly integration for cloud logging
if (process.env.LOGGLY_TOKEN) {
  logger.add(new Loggly({
    token: process.env.LOGGLY_TOKEN,
    subdomain: "demplot",
    tags: ["NodeJS"],
    json: true
  }));
}

// Prometheus metrics configuration
const collectDefaultMetrics = promClient.collectDefaultMetrics;
collectDefaultMetrics({ timeout: 5000 });

const httpRequestDurationMicroseconds = new promClient.Histogram({
  name: 'http_request_duration_ms',
  help: 'Duration of HTTP requests in ms',
  labelNames: ['method', 'route', 'code'],
  buckets: [50, 100, 200, 500, 1000]
});

const databaseQueryDuration = new promClient.Histogram({
  name: 'db_query_duration_ms',
  help: 'Duration of database queries in ms',
  labelNames: ['operation', 'model'],
  buckets: [5, 10, 25, 50, 100]
});

// Middleware to track request metrics
const requestMetrics = (req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    httpRequestDurationMicroseconds
      .labels(req.method, req.path, res.statusCode)
      .observe(duration);
  });
  next();
};

module.exports = {
  logger,
  metrics: {
    httpRequestDurationMicroseconds,
    databaseQueryDuration
  },
  requestMetrics
};