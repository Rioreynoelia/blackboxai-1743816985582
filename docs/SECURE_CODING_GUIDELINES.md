# Demplot Secure Coding Standards

## Core Principles
1. **Zero Trust** - Validate all inputs/outputs
2. **Least Privilege** - Minimal access required
3. **Defense in Depth** - Multiple security layers

## Authentication
### Password Requirements
```javascript
// Using bcrypt with 12+ rounds
const hash = await bcrypt.hash(password, 12);
```

### Session Management
- JWT expiration: 15-60 minutes
- Refresh tokens: 7 day max with rotation
- Invalid after password change

## Input Validation
### Schema Validation
```javascript
// Using Zod for input validation
const UserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(12)
});
```

### SQL Prevention
```javascript
// Using parameterized queries
db.query('SELECT * FROM users WHERE email = ?', [email]);
```

## Data Protection
### Encryption Standards
| Data Type | Method | Key Management |
|-----------|--------|----------------|
| Passwords | bcrypt | Env variables |
| API Keys | AES-256-GCM | KMS |
| PII | AES-256-CBC | Vault |

## Secure Dependencies
1. **Vetting Process**:
   ```bash
   npm audit --production
   snyk test
   ```
2. **Approved Libraries**:
   - Validation: Zod, Joi
   - Crypto: Node crypto, libsodium
   - Auth: Passport, OAuth2

## Error Handling
### Secure Practices
```javascript
// Never expose internals
try {
  // ...
} catch (err) {
  logger.error(err);
  res.status(500).json({ error: 'Request failed' });
}
```

## Security Headers
Required for all responses:
```http
Content-Security-Policy: default-src 'self'
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
```

## Code Review Checklist
1. [ ] Input validation
2. [ ] Output encoding
3. [ ] Error handling
4. [ ] Data protection
5. [ ] Dependency security

## Audit Requirements
- SAST scans in CI pipeline
- Manual review for security-critical code
- Annual penetration testing