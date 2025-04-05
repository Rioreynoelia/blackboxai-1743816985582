# Demplot Infrastructure Hardening Guide

## Server Baseline Configuration
### Operating System
```bash
# Apply CIS benchmarks
sudo apt install cis-hardening
sudo cis-hardening --level 2
```

### Network Security
```bash
# Configure iptables
*filter
:INPUT DROP [0:0]
:FORWARD DROP [0:0]
:OUTPUT ACCEPT [0:0]
-A INPUT -m state --state ESTABLISHED,RELATED -j ACCEPT
-A INPUT -p tcp --dport 443 -j ACCEPT
COMMIT
```

## Container Security
### Docker Hardening
```dockerfile
# Sample secure Dockerfile
FROM node:18-slim
USER node:node
COPY --chown=node:node . .
RUN npm ci --only=production
EXPOSE 3000
HEALTHCHECK --interval=30s CMD curl -f http://localhost:3000/health
```

### Runtime Protection
```bash
# Run with security flags
docker run \
  --read-only \
  --memory=512m \
  --security-opt no-new-privileges \
  demplot-api
```

## Cloud Security
### AWS Best Practices
```terraform
# Secure S3 bucket example
resource "aws_s3_bucket" "logs" {
  bucket = "demplot-logs"
  acl    = "private"

  server_side_encryption_configuration {
    rule {
      apply_server_side_encryption_by_default {
        sse_algorithm = "AES256"
      }
    }
  }

  lifecycle_rule {
    enabled = true
    expiration {
      days = 90
    }
  }
}
```

## Kubernetes Security
### Pod Security Policies
```yaml
apiVersion: policy/v1beta1
kind: PodSecurityPolicy
metadata:
  name: restricted
spec:
  privileged: false
  readOnlyRootFilesystem: true
  runAsUser:
    rule: MustRunAsNonRoot
  seLinux:
    rule: RunAsAny
  supplementalGroups:
    rule: MustRunAs
    ranges:
      - min: 1
        max: 65535
```

## Monitoring & Auditing
### Required Logs
```bash
# Centralized logging setup
fluentd -c /etc/fluentd/fluent.conf
```

### Audit Rules
```bash
# Monitor sensitive files
-a always,exit -F path=/etc/passwd -F perm=wa -k identity
-a always,exit -F path=/etc/shadow -F perm=wa -k identity
```

## Patch Management
### Automated Updates
```bash
# Unattended upgrades
sudo apt install unattended-upgrades
sudo dpkg-reconfigure -plow unattended-upgrades
```

### Verification Script
```bash
#!/bin/bash
# Check for pending updates
apt list --upgradable