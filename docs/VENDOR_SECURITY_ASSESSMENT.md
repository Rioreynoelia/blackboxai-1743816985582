# Demplot Third-Party Vendor Security Assessment

## Assessment Framework
### Risk Tier Classification
| Tier | Criteria | Review Frequency |
|------|----------|------------------|
| High | Data access/processing | Annual + Event-based |
| Medium | Limited data access | Biennial |
| Low | No data access | Questionnaire only |

## Security Questionnaire

### Organizational Security
1. **Certifications**:
   - [ ] SOC 2 Type II
   - [ ] ISO 27001
   - [ ] PCI DSS (if applicable)

2. **Security Training**:
   - Frequency: `________________`
   - Coverage: `_________________`

### Technical Controls
```markdown
- [ ] Encryption in transit (TLS 1.2+)
- [ ] Encryption at rest (AES-256+)
- [ ] MFA for all administrative access
- [ ] SIEM logging implemented
```

### Data Protection
| Aspect | Compliance | Evidence |
|--------|------------|----------|
| Data minimization | GDPR Article 5(1)(c) | `_______________` |
| Right to erasure | GDPR Article 17 | `_______________` |
| Data portability | CCPA Sec. 1798.100 | `_______________` |

## Cloud Security Assessment
### AWS/GCP/Azure Specific
```yaml
# Infrastructure as Code Review
NetworkSecurity:
  - VPC Flow Logs: Enabled
  - Security Groups: Least Privilege
  - Encryption: EBS/EFS/S3

IdentityManagement:
  - IAM Roles: MFA Enforced
  - Permission Boundaries: Configured
  - Root Account: Disabled
```

## Scoring Matrix
### Evaluation Criteria
| Category | Max Points | Weight |
|----------|-----------|--------|
| Data Protection | 30 | 30% |
| Access Control | 25 | 25% |
| Compliance | 20 | 20% |
| Incident Response | 15 | 15% |
| Business Continuity | 10 | 10% |

### Risk Rating
```javascript
// Scoring algorithm
function getRiskLevel(score) {
  if (score >= 85) return 'Low';
  if (score >= 60) return 'Medium';
  return 'High';
}
```

## Remediation Tracking
| Finding | Criticality | Owner | Due Date | Status |
|---------|-------------|-------|----------|--------|
| MFA not enforced | High | Vendor | 2023-12-01 | Open |
| No DR testing | Medium | Vendor | 2024-03-01 | Pending |

## Approval Workflow
1. **Initial Screening**: Security questionnaire
2. **Deep Dive**: Technical assessment for High Risk
3. **Legal Review**: Contract terms alignment
4. **Final Decision**: CISO sign-off

## Continuous Monitoring
- **Annual** attestation for High Risk vendors
- **Quarterly** vulnerability scans
- **Event-based** reassessment after incidents