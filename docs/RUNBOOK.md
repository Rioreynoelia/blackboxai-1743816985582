# Demplot Production Runbook

## Incident Severity Levels
| Level      | Response Time | Example                      |
|------------|---------------|------------------------------|
| Critical   | 15 minutes    | Full outage, data corruption |
| High       | 1 hour        | Major feature failure        |
| Medium     | 4 hours       | Partial degradation          |
| Low        | 24 hours      | Minor UI issues              |

## Incident Response Procedures

### API Errors (5xx)
1. **Verify**: Check `/health` endpoint and error logs
2. **Contain**: Enable maintenance mode if needed
3. **Diagnose**: Review recent changes and metrics
4. **Resolve**: Rollback or hotfix as appropriate

### Database Issues
```bash
# Check connection status
node scripts/checkDatabase.js

# Verify backups
ls -lh backups/

# Restore if needed (DR scenario)
node scripts/restoreDatabase.js backups/latest.gz
```

### Performance Degradation
1. Check CPU/Memory usage
2. Review slow queries: `db.currentOp({"secs_running": {$gt: 5}})`
3. Analyze request metrics
4. Scale horizontally if needed

## Maintenance Procedures

### Scheduled Maintenance
```bash
# 1. Notify users
node scripts/sendMaintenanceAlert.js

# 2. Enable maintenance mode
node scripts/maintenance.js enable "Scheduled maintenance" "1 hour"

# 3. Perform maintenance tasks
npm run migrate

# 4. Verify and disable
node scripts/maintenance.js disable
```

### Emergency Patch
```bash
# 1. Create backup
node scripts/backupDatabase.js

# 2. Apply hotfix
git pull origin hotfix/xyz

# 3. Restart services
pm2 restart all --update-env
```

## Operational Checks
```bash
# Daily verification
node scripts/verifyProduction.js

# Log review
grep -E 'ERROR|WARN' logs/*.log

# Capacity planning
df -h /  # Disk space
free -m  # Memory
```

## Post-Incident Process
1. Document timeline
2. Identify root cause
3. Implement preventive measures
4. Update runbook with lessons learned