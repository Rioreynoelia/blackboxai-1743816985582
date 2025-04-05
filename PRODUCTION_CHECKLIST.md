# Demplot Production Verification Checklist

## Pre-Deployment Checks
- [ ] All tests passing (`npm test`)
- [ ] Security scan clean (npm audit, snyk)
- [ ] Environment variables validated
- [ ] Database migrations applied

## Security Verification
- [ ] HTTPS enforced (redirect HTTP→HTTPS)
- [ ] Security headers present (check with curl -I)
- [ ] Rate limiting active (test with siege/ab)
- [ ] Authentication required for protected routes
- [ ] API documentation access controlled

## Reliability Tests
- [ ] Graceful shutdown (kill -SIGTERM)
- [ ] Database reconnection after failure
- [ ] Maintenance mode activation
- [ ] Health check endpoint (/health)
- [ ] Load handling (100+ concurrent users)

## Monitoring Setup
- [ ] Application logs centralized
- [ ] Error tracking (Sentry/ELK)
- [ ] Performance metrics (Prometheus)
- [ ] Alerting configured (PagerDuty/Slack)

## Post-Deployment
- [ ] Smoke tests passed
- [ ] Backup verification
- [ ] Rollback procedure tested
- [ ] Documentation updated

## Verification Commands
```bash
# Security headers
curl -I https://api.demplot.com/health

# Rate limiting
ab -n 300 -c 20 https://api.demplot.com/

# Shutdown test
kill -SIGTERM $(pgrep -f "node server")

# Maintenance mode
node scripts/maintenance.js enable "Planned maintenance" "30 minutes"