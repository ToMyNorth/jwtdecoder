import { blogPosts } from "./siteConfig";

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  readingTime: string;
  content: string;
}

export const blogContent: Record<string, string> = {
  "what-is-jwt": `
## What is a JSON Web Token?

A JSON Web Token (JWT) is an open standard ([RFC 7519](https://datatracker.ietf.org/doc/html/rfc7519)) that defines a compact and self-contained way for securely transmitting information between parties as a JSON object. This information can be verified and trusted because it is digitally signed. JWTs can be signed using a secret (with the HMAC algorithm) or a public/private key pair using RSA or ECDSA.

In simple terms, JWT is like a digital passport. It contains identity claims (who you are), permissions, and other metadata — all packed into a single string that can be verified by the receiving party.

## The Structure of a JWT

A JWT consists of three parts separated by dots (\`.\`):

\`\`\`
header.payload.signature
\`\`\`

Therefore, a JWT typically looks like this:

\`\`\`
xxxxx.yyyyy.zzzzz
\`\`\`

### 1. Header

The header typically consists of two parts: the type of the token, which is JWT, and the signing algorithm being used, such as HMAC SHA256 or RSA.

\`\`\`json
{
  "alg": "HS256",
  "typ": "JWT"
}
\`\`\`

Then, this JSON is Base64Url encoded to form the first part of the JWT.

### 2. Payload

The second part of the token is the payload, which contains the claims. Claims are statements about an entity (typically, the user) and additional data. There are three types of claims: registered, public, and private claims.

- **Registered claims:** These are a set of predefined claims which are not mandatory but recommended, to provide a set of useful, interoperable claims. These include \`iss\` (issuer), \`exp\` (expiration time), \`sub\` (subject), \`aud\` (audience), among others.
- **Public claims:** These can be defined at will by those using JWTs. But to avoid collisions, they should be defined in the IANA JSON Web Token Registry or be a public name.
- **Private claims:** These are custom claims created to share information between parties that agree on using them.

An example payload could be:

\`\`\`json
{
  "sub": "1234567890",
  "name": "John Doe",
  "admin": true,
  "iat": 1516239022,
  "exp": 1516242622
}
\`\`\`

The payload is then Base64Url encoded to form the second part of the JWT.

### 3. Signature

To create the signature part you have to take the encoded header, the encoded payload, a secret, the algorithm specified in the header, and sign that.

For example, if you want to use the HMAC SHA256 algorithm, the signature will be created in the following way:

\`\`\`
HMACSHA256(
  base64UrlEncode(header) + "." +
  base64UrlEncode(payload),
  secret)
\`\`\`

The signature is used to verify that the sender of the JWT is who it says it is and to ensure that the message wasn't changed along the way.

## How Do JSON Web Tokens Work?

In authentication, when the user successfully logs in using their credentials, a JSON Web Token will be returned. Since tokens are credentials, it is important to keep them secure to prevent security issues. In general, you should not keep tokens longer than required.

Whenever the user wants to access a protected route or resource, the user agent should send the JWT, typically in the Authorization header using the Bearer schema. The content of the header should look like the following:

\`\`\`
Authorization: Bearer <token>
\`\`\`

This is a stateless authentication mechanism as the user state is never saved in server memory. The server's protected routes will check for a valid JWT in the Authorization header, and if it's present, the user will be allowed to access protected resources. If you're curious about how this compares to traditional session-based authentication, check out our [JWT vs Session Authentication guide](/blog/jwt-vs-session-authentication).

## Why Should We Use JSON Web Tokens?

### Compact

Because of their smaller size, JWTs can be sent through a URL, POST parameter, or inside an HTTP header. Additionally, due to the smaller size, transmission is fast.

### Self-Contained

A JWT contains all the necessary information about an entity within itself, avoiding the need to query the database more than once. The payload can contain information about the user, the token's expiration time, the issuer, and more.

### Secure

JWTs can be signed using a secret (with the HMAC algorithm) or a public/private key pair using RSA or ECDSA. This ensures that the token hasn't been tampered with and that the sender is who they claim to be. For a deeper dive into securing your JWT implementation, see our [JWT security best practices guide](/blog/jwt-security-best-practices).

## Common Use Cases for JWT

### Authentication

This is the most common scenario for using JWT. Once the user is logged in, each subsequent request will include the JWT, allowing the user to access routes, services, and resources that are permitted with that token.

### Information Exchange

JSON Web Tokens are a good way of securely transmitting information between parties. Because JWTs can be signed — for example, using public/private key pairs — you can be sure the senders are who they say they are. Additionally, as the signature is calculated using the header and the payload, you can also verify that the content hasn't been tampered with.

## Conclusion

JSON Web Tokens are a powerful and flexible way to handle authentication and information exchange in modern web applications. By understanding the structure — Header, Payload, and Signature — and how they work together, you can build secure, stateless authentication systems. You can also use [jwt.io](https://jwt.io), the official JWT debugging tool, to explore token structures interactively. Try pasting a JWT into our [free online JWT decoder](/) to see its structure in action.

For a deeper understanding of JWT security, be sure to read our [JWT security best practices guide](/blog/jwt-security-best-practices) to learn how to protect your tokens against common vulnerabilities.
`,
  "jwt-security-best-practices": `
## Why JWT Security Matters

JSON Web Tokens (JWT) are widely used for authentication and authorization in modern web applications. However, like any security mechanism, JWTs must be used correctly to avoid vulnerabilities. A misconfigured JWT implementation can expose your application to serious security risks, including token theft, privilege escalation, and data breaches. The [OWASP Foundation](https://owasp.org) lists broken authentication as one of the top web application security risks.

If you're new to JWT, start with our [introduction to JSON Web Tokens](/blog/what-is-jwt) before diving into security practices.

In this article, we'll cover the essential security best practices for handling JWT tokens.

## 1. Always Use HTTPS

The most fundamental security practice is to always transmit JWTs over HTTPS. Without HTTPS, tokens can be intercepted by attackers through man-in-the-middle (MITM) attacks. If you're sending JWTs in cookies or Authorization headers, HTTPS ensures that they are encrypted in transit.

- **Never** send tokens over plain HTTP
- Use HSTS (HTTP Strict Transport Security) to enforce HTTPS
- Redirect all HTTP traffic to HTTPS

## 2. Choose the Right Signing Algorithm

The choice of signing algorithm affects both security and performance:

- **RS256 (RSASSA-PKCS1-v1_5):** Asymmetric, widely used, good balance of security and performance
- **ES256 (ECDSA):** Asymmetric, more efficient than RSA, recommended for new applications
- **HS256 (HMAC):** Symmetric, simpler but requires sharing the secret between parties
- **Avoid \`none\`:** Never use the \`none\` algorithm in production. It means the token has no signature and can be forged by anyone

## 3. Set Reasonable Expiration Times

JWTs should have a limited lifespan. The \`exp\` (expiration) claim is critical for security:

- **Access tokens:** Short-lived — typically 15 minutes to 1 hour
- **Refresh tokens:** Longer-lived — typically 7 to 30 days
- **Never** create tokens without an expiration date

Short-lived access tokens limit the window of opportunity for an attacker if a token is compromised.

## 4. Store Tokens Securely

How and where you store JWTs has a significant impact on security:

### Storing in Cookies

- Use the \`HttpOnly\` flag to prevent JavaScript access
- Use the \`Secure\` flag to ensure the cookie is only sent over HTTPS
- Use the \`SameSite\` attribute to prevent CSRF attacks
- This is the **recommended** approach for web applications

### Storing in LocalStorage

- **Not recommended** — tokens are accessible to JavaScript, making them vulnerable to XSS attacks
- If you must use localStorage, ensure your application is protected against XSS
- Consider using a state wrapper or in-memory storage for added security

## 5. Validate Tokens on the Server Side

Never trust a token without proper validation. Always verify:

- The signature is valid
- The token hasn't expired (\`exp\` claim)
- The \`nbf\` (not before) time has passed
- The \`iss\` (issuer) matches the expected value
- The \`aud\` (audience) matches your application
- The signing key or public key is trusted

## 6. Implement Token Revocation

One of the challenges with JWTs is that they are stateless — once issued, they are valid until they expire. To mitigate this:

- Use a token blacklist for revoked tokens
- Implement refresh token rotation — issue a new refresh token with each use
- Consider using short-lived access tokens with longer-lived refresh tokens
- Maintain a token version or session ID that can be invalidated

## 7. Use the \`kid\` (Key ID) Header Parameter

When using multiple signing keys (e.g., during key rotation), include the \`kid\` header parameter so the server knows which key to use for verification. This enables smooth key rotation without downtime.

## 8. Protect Against Algorithm Confusion Attacks

Algorithm confusion attacks exploit implementations that use the algorithm specified in the token header. To prevent this:

- Hard-code the expected algorithm on the server side
- Never allow the \`none\` algorithm
- Don't use the same key for HMAC and RSA
- Always explicitly specify which algorithms are accepted

## 9. Include Only Necessary Claims

Don't put sensitive or unnecessary data in the JWT payload. JWTs are not encrypted — they are only Base64Url encoded. Anyone who intercepts the token can read its contents.

- **Do** include: user ID, roles, expiration, issuer
- **Don't** include: passwords, SSNs, credit card numbers, or any PII that isn't necessary

## 10. Monitor and Log Token Usage

Implement logging and monitoring for JWT-related events:

- Track token issuance and revocation
- Monitor for unusual token usage patterns
- Alert on repeated authentication failures
- Log token validation errors for audit purposes

## Common JWT Vulnerabilities to Avoid

- **Using \`none\` algorithm:** Allows anyone to forge tokens
- **Not validating signatures:** Tokens can be tampered with
- **Storing tokens in localStorage without XSS protection:** Tokens can be stolen
- **Using weak signing keys:** Keys can be brute-forced
- **Not setting expiration:** Stolen tokens are valid forever
- **Using the same key for different algorithms:** Algorithm confusion attacks

For a comprehensive list of known vulnerabilities and attack patterns, refer to the [OWASP JSON Web Token Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/JSON_Web_Token_for_Java_Cheat_Sheet.html), which provides detailed guidance on avoiding common pitfalls.

## Conclusion

JWT security is not just about choosing the right algorithm — it's about implementing a comprehensive security strategy that covers the entire token lifecycle. By following these best practices, you can build secure authentication systems that protect your users and your application. Use our [free JWT decoder tool](/) to inspect your tokens and verify that they contain the right claims and security parameters. You can also use [jwt.io](https://jwt.io) for interactive JWT debugging and verification.
`,
  "jwt-vs-session-authentication": `
## Introduction

Authentication is a critical component of any web application. When it comes to implementing authentication, developers typically choose between two popular approaches: JWT (JSON Web Token) based authentication and traditional session-based authentication. Both methods have their strengths and weaknesses, and the right choice depends on your application's specific requirements.

In this article, we'll compare JWT and session-based authentication to help you make an informed decision.

## How Session-Based Authentication Works

Session-based authentication is the traditional approach used by most web frameworks. Here's how it works:

1. **User logs in:** The user submits their credentials (username and password)
2. **Server creates a session:** The server validates the credentials and creates a session in its memory or database
3. **Server sends a session ID:** A session ID is sent to the client as a cookie
4. **Subsequent requests:** On each subsequent request, the client sends the session ID cookie, and the server looks up the session to identify the user

The key characteristic of session-based authentication is that the server maintains state. The session store holds user information, and the session ID is simply a reference to that state.

## How JWT Authentication Works

JWT-based authentication is a stateless approach. Here's how it works:

1. **User logs in:** The user submits their credentials
2. **Server creates a JWT:** The server validates the credentials and creates a JWT containing the user's information (claims)
3. **Server signs the JWT:** The JWT is signed with a secret or private key
4. **Server sends the JWT:** The signed JWT is sent to the client (in a cookie or as a bearer token)
5. **Subsequent requests:** On each subsequent request, the client sends the JWT, and the server verifies the signature and reads the claims

The key characteristic of JWT authentication is that it is stateless. The server doesn't need to look up any session — all the information is contained within the token itself.

## Comparison: JWT vs Session

### 1. State Management

- **Sessions:** Stateful — the server stores session data. This means the server must look up the session on every request.
- **JWT:** Stateless — all information is contained in the token. The server only needs to verify the signature.

**Winner:** JWT (for scalability and simplicity)

### 2. Scalability

- **Sessions:** Scaling session-based authentication across multiple servers requires a shared session store (like Redis), which adds complexity.
- **JWT:** Since JWTs are self-contained, they work seamlessly across multiple servers without any shared state.

**Winner:** JWT

### 3. Performance

- **Sessions:** Each request requires a database or cache lookup to retrieve session data.
- **JWT:** No database lookup needed — verification is done cryptographically, which is faster.

**Winner:** JWT (but the difference is small with efficient caching)

### 4. Security

- **Sessions:** Session IDs are opaque — they don't contain any user information. Even if intercepted, the attacker can only use them to impersonate the user until they expire. Session data is stored securely on the server.
- **JWT:** JWTs contain user information in the payload. While the payload is signed, it is not encrypted — anyone who intercepts the token can read its contents. However, the signature prevents tampering.

**Winner:** Sessions (slightly — session data is not exposed to the client)

### 5. Revocation

- **Sessions:** Sessions can be easily revoked by deleting them from the session store.
- **JWT:** Revoking a JWT before its expiration is challenging because they are stateless. This requires implementing a blacklist or using short-lived tokens.

**Winner:** Sessions

### 6. Storage

- **Sessions:** Sessions are stored on the server, requiring server memory or database space.
- **JWT:** JWTs are stored on the client, requiring no server-side storage.

**Winner:** JWT

### 7. Mobile and API Friendliness

- **Sessions:** Sessions rely on cookies, which can be tricky with mobile apps and cross-origin APIs. CORS and CSRF issues are common.
- **JWT:** JWTs work well with mobile apps and APIs because they can be sent as bearer tokens in the Authorization header. No cookies required.

**Winner:** JWT

### 8. Complexity

- **Sessions:** Simpler to implement — most frameworks have built-in session support.
- **JWT:** More complex — you need to handle token signing, verification, expiration, and refresh logic.

**Winner:** Sessions (for simplicity)

## When to Use JWT

JWT is a great choice when:

- You're building a **stateless API** or microservices architecture
- You need **cross-domain or cross-service authentication**
- You're building a **mobile app** or single-page application (SPA)
- You need to pass **user information** between services without a database lookup
- You want to **scale horizontally** without a shared session store

## When to Use Session-Based Authentication

Session-based authentication is a great choice when:

- You're building a **traditional server-rendered web application**
- You need to **revoke access** quickly and easily
- You don't want to expose **any user information** in the token
- Your application is **single-server** or uses a simple shared cache
- Security is your **top priority** and you want server-side control over sessions

## Hybrid Approaches

Many modern applications use a hybrid approach:

- **JWT for API access:** Use JWTs for API authentication, especially for mobile apps and SPAs
- **Sessions for web sessions:** Use session-based authentication for browser sessions where revocation and security are critical
- **Refresh tokens:** Combine short-lived JWT access tokens with longer-lived refresh tokens stored in secure cookies

## Summary Comparison Table

| Feature | JWT | Sessions |
|---------|-----|----------|
| State | Stateless | Stateful |
| Scalability | Excellent | Requires shared store |
| Performance | Fast (no lookup) | Requires lookup |
| Security | Payload is readable | Session data is hidden |
| Revocation | Difficult | Easy |
| Storage | Client-side | Server-side |
| Mobile/API | Excellent | Requires cookies |
| Complexity | Higher | Lower |

## Conclusion

Both JWT and session-based authentication have their place in modern web development. JWT excels in stateless, distributed, and API-driven architectures, while sessions are better for traditional web applications that need quick revocation and server-side control. The best choice depends on your application's architecture, security requirements, and scalability needs.

Regardless of which approach you choose, understanding how your tokens work is essential. Use our [free JWT decoder](/) to inspect and analyze your JWT tokens, or read our [JWT security best practices guide](/blog/jwt-security-best-practices) to learn how to keep your tokens secure.
`,
  "jwt-refresh-token": `
## Why Refresh Tokens Matter

Access tokens are designed to be short-lived — typically lasting 15 minutes to one hour. This limits the damage if a token is stolen. But short-lived tokens create a usability problem: users would need to re-authenticate every time their token expires. That's where refresh tokens come in.

A **refresh token** is a long-lived credential (typically 7–30 days) that is used to obtain new access tokens without requiring the user to log in again. When the access token expires, the client sends the refresh token to the authorization server, which issues a new access token. This pattern is formalized in the [OAuth 2.0 RFC 6749](https://datatracker.ietf.org/doc/html/rfc6749#section-1.5) specification.

If you're new to JWT structure, start with our [What is JWT guide](/blog/what-is-jwt) to understand the fundamentals before diving into refresh token flows.

## Access Token vs Refresh Token

Understanding the distinction between these two token types is critical:

| Property | Access Token | Refresh Token |
|----------|-------------|---------------|
| Lifespan | 15 min – 1 hour | 7 – 30 days |
| Purpose | Access protected resources | Obtain new access tokens |
| Storage | Memory or short-lived cookie | Secure HttpOnly cookie |
| Sent to | Resource servers | Authorization server only |
| Scope | Limited permissions | Can request same or lesser scope |

The access token is like a hotel room key — it gives you access for a short period. The refresh token is like your reservation confirmation — it lets you get a new key when the old one expires.

## How Token Rotation Works

Token rotation is a security enhancement where a **new refresh token is issued every time the old one is used**. The previous refresh token is immediately invalidated. This limits the window of opportunity for an attacker who steals a refresh token.

### The Rotation Flow

1. User authenticates → receives access token + refresh token (RT1)
2. Access token expires → client sends RT1 to auth server
3. Auth server validates RT1, issues new access token + new refresh token (RT2)
4. RT1 is invalidated in the database
5. Next refresh → client sends RT2, receives RT3, RT2 is invalidated
6. If an attacker tries to use RT1 after rotation, the server detects reuse and revokes the entire token family

This approach is recommended by the [OWASP token storage guide](https://cheatsheetseries.owasp.org/cheatsheets/JSON_Web_Token_for_Java_Cheat_Sheet.html) because it provides breach detection: if a stolen refresh token is used after the legitimate client has already rotated it, the server knows a breach has occurred.

## Server-Side Implementation with Node.js and Express

Here's a complete implementation of refresh token rotation using Express, jsonwebtoken, and a simple in-memory store (in production, use a database like PostgreSQL or Redis):

\`\`\`javascript
const express = require('express');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const app = express();
app.use(express.json());

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || 'access-secret-key';
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || 'refresh-secret-key';

// In production, use a database instead of this Map
const refreshTokenStore = new Map(); // tokenId -> { userId, family, version, revoked }

function generateAccessToken(user) {
  return jwt.sign(
    { sub: user.id, email: user.email, role: user.role },
    ACCESS_TOKEN_SECRET,
    { expiresIn: '15m', algorithm: 'HS256' }
  );
}

function generateRefreshToken(userId) {
  const tokenId = crypto.randomUUID();
  const family = crypto.randomUUID();
  const token = jwt.sign(
    { sub: userId, jti: tokenId, family, type: 'refresh' },
    REFRESH_TOKEN_SECRET,
    { expiresIn: '7d', algorithm: 'HS256' }
  );
  refreshTokenStore.set(tokenId, { userId, family, version: 1, revoked: false });
  return { token, tokenId, family };
}

// Login endpoint
app.post('/auth/login', async (req, res) => {
  const { email, password } = req.body;
  // Validate credentials against your database
  const user = await authenticateUser(email, password);
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });

  const accessToken = generateAccessToken(user);
  const refreshTokenData = generateRefreshToken(user.id);

  res.json({
    accessToken,
    refreshToken: refreshTokenData.token,
    expiresIn: 900 // 15 minutes in seconds
  });
});

// Refresh endpoint with token rotation
app.post('/auth/refresh', async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) return res.status(400).json({ error: 'Refresh token required' });

  try {
    const decoded = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);
    const stored = refreshTokenStore.get(decoded.jti);

    if (!stored || stored.revoked) {
      // Token reuse detected — possible breach!
      // Revoke entire token family
      for (const [id, entry] of refreshTokenStore) {
        if (entry.family === decoded.family) entry.revoked = true;
      }
      return res.status(401).json({ error: 'Token reuse detected, session revoked' });
    }

    // Mark current token as revoked (rotation)
    stored.revoked = true;

    // Issue new token pair
    const newAccessToken = generateAccessToken({ id: decoded.sub, email: '', role: 'user' });
    const newRefreshData = generateRefreshToken(decoded.sub);

    res.json({
      accessToken: newAccessToken,
      refreshToken: newRefreshData.token,
      expiresIn: 900
    });
  } catch (err) {
    res.status(401).json({ error: 'Invalid or expired refresh token' });
  }
});

app.listen(3000, () => console.log('Auth server running on port 3000'));
\`\`\`\`

This implementation includes token family tracking for breach detection and automatic revocation of the entire family if token reuse is detected.

## Client-Side Auto-Refresh Logic

On the frontend, you need to intercept 401 responses and automatically refresh the access token. Here's a robust implementation using axios:

\`\`\`javascript
import axios from 'axios';

const api = axios.create({ baseURL: 'https://api.example.com' });

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });
  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          originalRequest.headers.Authorization = \`Bearer \${token}\`;
          return api(originalRequest);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = getRefreshToken(); // from secure storage
        const { data } = await axios.post('https://api.example.com/auth/refresh', { refreshToken });
        storeTokens(data.accessToken, data.refreshToken);
        processQueue(null, data.accessToken);
        originalRequest.headers.Authorization = \`Bearer \${data.accessToken}\`;
        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        logoutUser(); // redirect to login
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(error);
  }
);
\`\`\`\`

This pattern queues concurrent requests that fail with 401, refreshes the token once, then retries all queued requests with the new token.

## Secure Storage Strategies

Where you store refresh tokens has major security implications:

### HttpOnly Cookies (Recommended)

The most secure option for web applications. The refresh token is stored in an HttpOnly, Secure, SameSite cookie that JavaScript cannot access:

\`\`\`javascript
// Server-side cookie setting
res.cookie('refreshToken', refreshToken, {
  httpOnly: true,
  secure: true,       // HTTPS only
  sameSite: 'strict', // CSRF protection
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  path: '/auth/refresh' // restrict to refresh endpoint
});
\`\`\`\`

### Mobile Secure Storage

For mobile apps, use platform-specific secure storage:
- **iOS:** Keychain Services
- **Android:** EncryptedSharedPreferences or Keystore

### What to Avoid

Never store refresh tokens in localStorage or sessionStorage — they are accessible to any JavaScript running on the page, making them vulnerable to XSS attacks. For more on this, see our [JWT security best practices](/blog/jwt-security-best-practices).

## Common Pitfalls and How to Avoid Them

### 1. Not Implementing Token Rotation

Without rotation, a stolen refresh token can be used indefinitely. Always issue a new refresh token with each use and invalidate the old one.

### 2. Sharing Secrets Between Access and Refresh Tokens

Use separate secrets for access and refresh tokens. If an attacker compromises one, they shouldn't be able to forge the other.

### 3. Ignoring Clock Skew

Differences in system clocks between client and server can cause valid tokens to appear expired. Add a small clock skew tolerance (30–60 seconds) when validating expiration.

### 4. Not Detecting Token Reuse

If a refresh token that has already been rotated is presented again, it likely means an attacker is using a stolen token. Revoke the entire token family immediately.

## Conclusion

Refresh tokens bridge the gap between security (short-lived access tokens) and usability (not forcing users to re-authenticate). By implementing token rotation, secure storage, and reuse detection, you build a robust authentication system that is both user-friendly and secure. Use our [JWT decoder tool](/) to inspect your tokens and verify they contain the correct claims.
`,
  "jwt-signing-algorithms": `
## Choosing the Right JWT Signing Algorithm

The signing algorithm is one of the most critical security decisions in a JWT implementation. It determines how the token is signed, who can verify it, and how resistant it is to attacks. The three most commonly used algorithms are **HS256**, **RS256**, and **ES256**, each with distinct trade-offs.

The algorithm choice is specified in the JWT header's \`alg\` field. As explained in our [What is JWT guide](/blog/what-is-jwt), the header is the first part of a JWT and tells the verifier how to validate the signature.

## Symmetric vs Asymmetric Signing

Before comparing specific algorithms, it's essential to understand the fundamental difference:

**Symmetric signing** (HS256) uses a single shared secret for both signing and verification. Both the issuer and the verifier must possess the same secret key.

**Asymmetric signing** (RS256, ES256) uses a key pair: a private key for signing and a public key for verification. The private key stays secret on the issuer, while the public key can be distributed to any verifier.

This distinction has major architectural implications — especially in microservices and distributed systems where multiple services need to verify tokens without sharing secrets.

## HS256 — HMAC with SHA-256

HS256 uses HMAC (Hash-based Message Authentication Code) with SHA-256. It's a symmetric algorithm that's fast and simple to implement.

### How It Works

1. Both parties share a secret key (at least 256 bits)
2. The issuer creates a signature: \`HMAC-SHA256(base64url(header) + "." + base64url(payload), secret)\`
3. The verifier recomputes the same HMAC and compares

### Code Example

\`\`\`javascript
const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET; // at least 32 bytes

// Signing
const token = jwt.sign(
  { sub: 'user123', role: 'admin' },
  secret,
  { algorithm: 'HS256', expiresIn: '1h' }
);

// Verification
const decoded = jwt.verify(token, secret, { algorithms: ['HS256'] });
\`\`\`\`

### Pros and Cons

- **Pros:** Fast, simple, small token size, easy to implement
- **Cons:** Shared secret must be distributed to all verifiers, not suitable for multi-party verification, key rotation is complex

## RS256 — RSA Signature with SHA-256

RS256 uses RSA (Rivest–Shamir–Adleman) with SHA-256 and PKCS#1 v1.5 padding. It's an asymmetric algorithm widely used in OAuth 2.0 and OpenID Connect.

### How It Works

1. The issuer generates an RSA key pair (minimum 2048-bit recommended)
2. The issuer signs the token with the private key
3. Any party with the public key can verify the signature

### Code Example

\`\`\`javascript
const jwt = require('jsonwebtoken');
const fs = require('fs');

// Load RSA key pair
const privateKey = fs.readFileSync('private.pem');
const publicKey = fs.readFileSync('public.pem');

// Signing with private key
const token = jwt.sign(
  { sub: 'user123', role: 'admin' },
  privateKey,
  { algorithm: 'RS256', expiresIn: '1h', keyid: 'key-1' }
);

// Verification with public key
const decoded = jwt.verify(token, publicKey, { algorithms: ['RS256'] });
\`\`\`\`

### Generating RSA Keys

\`\`\`bash
# Generate a 2048-bit RSA private key
openssl genrsa -out private.pem 2048

# Extract the public key
openssl rsa -in private.pem -pubout -out public.pem
\`\`\`\`

### Pros and Cons

- **Pros:** Public key can be shared freely, ideal for multi-service architectures, widely supported, key rotation via JWKS
- **Cons:** Slower than HS256, larger token size (~256 bytes for signature), larger key sizes required (2048+ bits)

## ES256 — ECDSA with P-256 and SHA-256

ES256 uses ECDSA (Elliptic Curve Digital Signature Algorithm) with the P-256 curve and SHA-256. It's a modern asymmetric algorithm recommended for new applications.

### How It Works

1. The issuer generates an EC key pair using the P-256 (secp256r1) curve
2. The issuer signs the token with the private key
3. Verification uses the public key — same concept as RSA but with smaller keys and faster operations

### Code Example

\`\`\`javascript
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

// Generate EC key pair
const { privateKey, publicKey } = crypto.generateKeyPairSync('ec', {
  namedCurve: 'P-256',
  privateKeyEncoding: { type: 'pkcs8', format: 'pem' },
  publicKeyEncoding: { type: 'spki', format: 'pem' },
});

// Signing
const token = jwt.sign(
  { sub: 'user123', role: 'admin' },
  privateKey,
  { algorithm: 'ES256', expiresIn: '1h' }
);

// Verification
const decoded = jwt.verify(token, publicKey, { algorithms: ['ES256'] });
\`\`\`\`

### Pros and Cons

- **Pros:** Smaller keys (256-bit vs 2048-bit RSA), faster signing and verification, smaller signatures, modern and recommended by [NIST cryptographic standards](https://csrc.nist.gov/publications/detail/fips/186/5/final)
- **Cons:** Less widely supported than RS256 in older libraries, signature is non-deterministic (two signatures of the same data differ)

## Performance Comparison

| Metric | HS256 | RS256 | ES256 |
|--------|-------|-------|-------|
| Key size | 256 bits | 2048+ bits | 256 bits |
| Signature size | 32 bytes | 256 bytes | 64 bytes |
| Signing speed | ~100K ops/s | ~2K ops/s | ~10K ops/s |
| Verification speed | ~100K ops/s | ~20K ops/s | ~10K ops/s |

*Approximate numbers on modern hardware. Actual performance varies by library and implementation.*

HS256 is the fastest for both signing and verification. RS256 is slowest for signing but fast for verification (which matters more since verification happens on every request). ES256 offers a good balance with small keys and fast operations.

## When to Use Each Algorithm

### Use HS256 When:
- You have a single service that signs and verifies tokens
- The secret can be kept secure and shared safely
- You need maximum performance (e.g., high-throughput APIs)
- You're building a simple monolithic application

### Use RS256 When:
- Multiple services need to verify tokens (microservices, API gateways)
- You're implementing OAuth 2.0 or OpenID Connect
- You need key rotation via [RFC 7518](https://datatracker.ietf.org/doc/html/rfc7518) JWKS endpoints
- You want wide compatibility with existing identity providers

### Use ES256 When:
- You're starting a new project and want modern cryptography
- Token size matters (mobile apps, constrained environments)
- You want faster signing than RSA with equivalent security
- Your identity provider supports it (Auth0, Okta, etc.)

## Algorithm Confusion Attacks

One of the most dangerous JWT vulnerabilities is the **algorithm confusion attack** (also called algorithm switching). Here's how it works:

1. A server expects RS256 tokens and has a public key
2. An attacker changes the token header to \`"alg": "HS256"\`
3. The attacker signs the forged token using the server's **public key** as the HMAC secret
4. If the server blindly trusts the \`alg\` header, it uses HS256 with the public key — which the attacker knows
5. The forged token passes verification

### Prevention

Always hard-code the expected algorithm on the server side:

\`\`\`javascript
// SECURE: explicitly specify accepted algorithms
jwt.verify(token, publicKey, { algorithms: ['RS256'] });

// INSECURE: trusting the algorithm from the token header
jwt.verify(token, publicKey); // vulnerable!
\`\`\`\`

This is one of the key practices covered in our [JWT security best practices guide](/blog/jwt-security-best-practices). Never trust the algorithm specified in the token header — always enforce your expected algorithm server-side.

## Key Management Best Practices

### Key Storage
- Store private keys in a secure vault (AWS KMS, HashiCorp Vault, Google Cloud KMS)
- Never commit private keys to source control
- Use environment variables or secret management services

### Key Rotation
- Use the \`kid\` (Key ID) header parameter to identify which key signed the token
- Publish public keys via a JWKS (JSON Web Key Set) endpoint
- Rotate keys periodically (at least annually) and immediately after a suspected compromise

### Key Length
- HS256: minimum 256-bit (32-byte) secret
- RS256: minimum 2048-bit RSA key (4096 recommended)
- ES256: 256-bit EC key (fixed by the P-256 curve)

## Conclusion

Choosing between HS256, RS256, and ES256 depends on your architecture, security requirements, and performance needs. HS256 is simplest for single-service apps, RS256 offers the widest compatibility for distributed systems, and ES256 provides the best efficiency for new projects. Regardless of your choice, always enforce the algorithm server-side and manage your keys securely. Use our [free JWT decoder](/) to inspect tokens and verify which algorithm is being used.
`,
  "jwt-token-expiration": `
## Understanding JWT Token Expiration

Every JWT should have an expiration time. Without one, a stolen token is valid forever — a massive security risk. The \`exp\` (expiration time) claim is one of the seven registered claims defined in [RFC 7519 Section 4.1.4](https://datatracker.ietf.org/doc/html/rfc7519#section-4.1.4), and it's arguably the most important for security.

In this guide, we'll cover how expiration works, strategies for handling expired tokens gracefully, and how to build auto-refresh flows that keep users authenticated without compromising security. For a broader overview of JWT claims, see our [What is JWT guide](/blog/what-is-jwt).

## The exp Claim Explained

The \`exp\` claim contains a Unix timestamp (NumericDate) representing the expiration time of the token. After this time, the token MUST be rejected by any conforming implementation.

\`\`\`json
{
  "sub": "user123",
  "iat": 1720627200,
  "exp": 1720630800
}
\`\`\`\`

In this example, the token was issued at 1720627200 (July 10, 2024 12:00:00 UTC) and expires at 1720630800 (one hour later). Any verification after the expiration time should fail.

### Other Time-Based Claims

JWT includes several time-related claims that work together:

- **\`iat\` (Issued At):** When the token was created
- **\`nbf\` (Not Before):** The earliest time the token is valid
- **\`exp\` (Expiration Time):** When the token becomes invalid

A token is valid only when: \`nbf <= current_time < exp\`

## Setting Appropriate Token Lifetimes

The right token lifetime balances security and user experience:

### Short-Lived Access Tokens (15 minutes – 1 hour)

- Limit the window of opportunity for stolen tokens
- Reduce the impact of token leakage
- Force more frequent refresh, enabling permission updates

### Medium-Lived Tokens (1 – 24 hours)

- Suitable for internal APIs or trusted environments
- Reduce refresh overhead for long user sessions
- Acceptable when combined with token revocation strategies

### Long-Lived Tokens (days to weeks)

- Only appropriate for refresh tokens or API keys
- Require strong revocation mechanisms
- Should never be used as access tokens for web APIs

The general recommendation is **15 minutes for access tokens** combined with [refresh tokens](/blog/jwt-refresh-token) for seamless session continuation.

## Server-Side Expiration Validation

Always validate expiration on the server. Never trust the client to check token validity.

\`\`\`javascript
const jwt = require('jsonwebtoken');

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET, {
      algorithms: ['HS256'],
      clockTolerance: 30, // 30 seconds tolerance for clock skew
      maxAge: '1h' // reject tokens older than 1 hour even if exp hasn't passed
    });
    return { valid: true, decoded };
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return { valid: false, reason: 'expired', expiredAt: err.expiredAt };
    }
    if (err.name === 'NotBeforeError') {
      return { valid: false, reason: 'not_yet_valid', date: err.date };
    }
    return { valid: false, reason: 'invalid_token' };
  }
}

// Express middleware
function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided' });
  }

  const result = verifyToken(authHeader.split(' ')[1]);
  if (!result.valid) {
    if (result.reason === 'expired') {
      return res.status(401).json({ error: 'Token expired', code: 'TOKEN_EXPIRED' });
    }
    return res.status(401).json({ error: 'Invalid token' });
  }

  req.user = result.decoded;
  next();
}
\`\`\`\`

Notice the \`clockTolerance\` option — this is crucial for handling clock skew between servers.

## Handling Clock Skew

In distributed systems, server clocks are rarely perfectly synchronized. A token that appears expired on one server might still be valid on another. Here's how to handle it:

### Server-Side Strategies

1. **Clock tolerance:** Allow a small grace period (30–60 seconds) when checking expiration
2. **NTP synchronization:** Ensure all servers sync to a reliable time source
3. **Issuer-side padding:** Add a small buffer to the \`exp\` claim when issuing tokens

### Client-Side Strategy

Check expiration locally before sending requests, using a small buffer:

\`\`\`javascript
function isTokenExpiringSoon(token, bufferSeconds = 30) {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const now = Math.floor(Date.now() / 1000);
    return payload.exp - bufferSeconds < now;
  } catch {
    return true; // treat unreadable tokens as expired
  }
}

// Before making an API call
async function apiCall(url, options = {}) {
  let token = getAccessToken();

  if (isTokenExpiringSoon(token)) {
    token = await refreshAccessToken();
  }

  options.headers = {
    ...options.headers,
    Authorization: \`Bearer \${token}\`
  };

  return fetch(url, options);
}
\`\`\`\`

## Graceful Expiration Handling on the Client

When a token does expire, the user experience shouldn't be jarring. Here's a strategy for handling expiration gracefully:

### Proactive Refresh

Instead of waiting for the token to expire, refresh it proactively when it's close to expiring:

\`\`\`javascript
class TokenManager {
  constructor() {
    this.accessToken = null;
    this.refreshTimer = null;
  }

  setToken(accessToken, expiresIn) {
    this.accessToken = accessToken;
    // Refresh 60 seconds before expiration
    const refreshIn = (expiresIn - 60) * 1000;
    this.scheduleRefresh(refreshIn);
  }

  scheduleRefresh(delay) {
    clearTimeout(this.refreshTimer);
    this.refreshTimer = setTimeout(async () => {
      try {
        const data = await this.doRefresh();
        this.setToken(data.accessToken, data.expiresIn);
      } catch (err) {
        console.error('Token refresh failed:', err);
        // Redirect to login
        window.location.href = '/login';
      }
    }, delay);
  }

  async doRefresh() {
    const response = await fetch('/auth/refresh', {
      method: 'POST',
      credentials: 'include' // send refresh cookie
    });
    if (!response.ok) throw new Error('Refresh failed');
    return response.json();
  }

  getToken() {
    return this.accessToken;
  }
}

const tokenManager = new TokenManager();
\`\`\`\`

### Retry on 401

Combine proactive refresh with a 401 retry mechanism (as shown in our [refresh token guide](/blog/jwt-refresh-token)). This ensures that even if proactive refresh fails, the client gets a second chance.

## Grace Period Strategy

A grace period allows a recently expired token to still be accepted for a brief window. This is useful when:

- A request was in-flight when the token expired
- Network latency causes the token to arrive at the server after expiration
- Clock skew makes exact-time expiration unreliable

### Implementation

\`\`\`javascript
const GRACE_PERIOD = 30; // 30 seconds

function verifyWithGracePeriod(token, secret) {
  try {
    // First try standard verification
    return jwt.verify(token, secret, { algorithms: ['HS256'] });
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      const expiredSecondsAgo = Math.floor(Date.now() / 1000) - err.expiredAt.getTime() / 1000;
      if (expiredSecondsAgo <= GRACE_PERIOD) {
        // Token expired within grace period — allow but flag for refresh
        const decoded = jwt.verify(token, secret, {
          algorithms: ['HS256'],
          ignoreExpiration: true
        });
        decoded._gracePeriodUsed = true;
        return decoded;
      }
    }
    throw err;
  }
}
\`\`\`\`

Use grace periods sparingly — they expand the attack window. A 30-second grace period is usually sufficient.

## Short-Lived vs Long-Lived Token Strategy

The most secure and practical approach combines short-lived access tokens with long-lived refresh tokens:

| Aspect | Access Token | Refresh Token |
|--------|-------------|---------------|
| Lifetime | 15 minutes | 7–30 days |
| On expiration | Silently refresh using refresh token | Force re-authentication |
| Storage | Memory (JavaScript variable) | HttpOnly secure cookie |
| Rotation | Not rotated | Rotated on each use |

This strategy ensures that even if an access token is compromised, it's only valid for 15 minutes. The refresh token provides seamless session continuity while being stored more securely. For implementation details, see our [refresh token rotation guide](/blog/jwt-refresh-token) and [security best practices](/blog/jwt-security-best-practices).

## Conclusion

Token expiration is not just a security feature — it's a design decision that affects your entire authentication architecture. Use short-lived access tokens with the \`exp\` claim, handle clock skew with tolerance, refresh proactively on the client, and implement grace periods for edge cases. Use our [JWT decoder](/) to check the expiration claims in your tokens and verify they follow these best practices.
`,
  "jwt-microservices-authentication": `
## The Authentication Challenge in Microservices

Microservices architectures break monolithic applications into independent, deployable services. This introduces a fundamental authentication challenge: how do you verify a user's identity across dozens of services without creating tight coupling or a single point of failure?

JWT is the most popular solution because it's stateless, self-contained, and can be verified by any service without calling a central authentication server on every request. In this guide, we'll explore the patterns, architectures, and implementation details for using JWT in microservices.

For foundational JWT knowledge, see our [JWT security best practices](/blog/jwt-security-best-practices) and [What is JWT](/blog/what-is-jwt) guides.

## API Gateway Pattern

The API Gateway is the most common authentication pattern for microservices. All external requests pass through a single gateway that handles authentication and forwards validated requests to downstream services.

### How It Works

1. Client sends request with JWT to the API Gateway
2. Gateway validates the JWT (signature, expiration, claims)
3. Gateway forwards the request to the appropriate service, optionally enriching the request with user info
4. Downstream services trust the gateway and don't re-validate the JWT

### Gateway Implementation (Node.js / Express)

\`\`\`javascript
const express = require('express');
const jwt = require('jsonwebtoken');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const JWKS_URL = 'https://auth.example.com/.well-known/jwks.json';
const jwksClient = require('jwks-rsa');

const client = jwksClient({ jwksUri: JWKS_URL, cache: true, rateLimit: true });

function getKey(header, callback) {
  client.getSigningKey(header.kid, (err, key) => {
    if (err) return callback(err);
    callback(null, key.getPublicKey());
  });
}

// Authentication middleware on the gateway
function gatewayAuth(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token provided' });

  jwt.verify(token, getKey, {
    algorithms: ['RS256'],
    issuer: 'https://auth.example.com',
    audience: 'https://api.example.com'
  }, (err, decoded) => {
    if (err) return res.status(401).json({ error: 'Invalid token' });
    // Pass user info to downstream services via headers
    req.headers['x-user-id'] = decoded.sub;
    req.headers['x-user-role'] = decoded.role;
    req.headers['x-user-scopes'] = JSON.stringify(decoded.scope || []);
    next();
  });
}

app.use('/api', gatewayAuth);

// Proxy to user service
app.use('/api/users', createProxyMiddleware({
  target: 'http://user-service:3001',
  pathRewrite: { '^/api/users': '/users' }
}));

// Proxy to order service
app.use('/api/orders', createProxyMiddleware({
  target: 'http://order-service:3002',
  pathRewrite: { '^/api/orders': '/orders' }
}));

app.listen(3000);
\`\`\`\`

### Downstream Service (Trusts Gateway)

\`\`\`javascript
// user-service/server.js
const express = require('express');
const app = express();

// Trust gateway headers — no JWT verification needed
app.get('/users/:id', (req, res) => {
  const userId = req.headers['x-user-id'];
  const role = req.headers['x-user-role'];

  if (role !== 'admin' && userId !== req.params.id) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  // Fetch and return user data
  res.json({ id: req.params.id, name: 'John Doe', email: 'john@example.com' });
});

app.listen(3001);
\`\`\`\`

## Shared Secret vs Public Key Verification

When multiple services verify JWTs, you have two options:

### Shared Secret (HS256)

All services share the same HMAC secret. This is simple but risky:
- Every service has the signing key — a breach in any service compromises all tokens
- Key rotation requires updating all services simultaneously
- Not recommended for production microservices

### Public Key (RS256 / ES256) — Recommended

The auth server signs with a private key, and all services verify with the public key:
- Only the auth server can sign tokens
- Public keys are distributed via JWKS endpoints
- Key rotation is seamless — the JWKS endpoint can host multiple keys
- Compromised services cannot forge tokens

### JWKS-Based Verification

\`\`\`javascript
const jwksClient = require('jwks-rsa');
const jwt = require('jsonwebtoken');

const client = jwksClient({
  jwksUri: 'https://auth.example.com/.well-known/jwks.json',
  cache: true,
  cacheMaxAge: 600000, // 10 minutes
  rateLimit: true,
  jwksRequestsPerMinute: 10
});

function verifyServiceToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, (header, callback) => {
      client.getSigningKey(header.kid, (err, key) => {
        if (err) return callback(err);
        callback(null, key.getPublicKey());
      });
    }, {
      algorithms: ['RS256'],
      issuer: 'https://auth.example.com',
      audience: 'https://api.example.com'
    }, (err, decoded) => {
      if (err) reject(err);
      else resolve(decoded);
    });
  });
}
\`\`\`\`

## Service-to-Service JWT Propagation

When services need to call each other, you need a strategy for propagating the user's identity.

### Token Forwarding

The simplest approach: forward the original JWT to the downstream service. This preserves the user's identity and permissions.

\`\`\`javascript
// In order-service, calling inventory-service
async function checkInventory(productId, originalToken) {
  const response = await fetch('http://inventory-service:3003/stock', {
    headers: {
      'Authorization': \`Bearer \${originalToken}\`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ productId })
  });
  return response.json();
}
\`\`\`\`

### Token Exchange

For tighter security, exchange the user's token for a service-specific token with limited scope. This follows the principle of least privilege.

\`\`\`javascript
async function getServiceToken(originalToken, targetService) {
  const response = await fetch('https://auth.example.com/oauth/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: originalToken,
      audience: targetService,
      scope: 'read:inventory'
    })
  });
  const data = await response.json();
  return data.access_token;
}
\`\`\`\`

## Token Scoping and Authorization

In microservices, JWTs should include scope or permission claims so each service can make authorization decisions independently:

\`\`\`json
{
  "sub": "user123",
  "scope": ["read:users", "write:orders"],
  "roles": ["customer"],
  "iss": "https://auth.example.com",
  "aud": "https://api.example.com"
}
\`\`\`\`

Each service checks only the scopes relevant to its endpoints:

\`\`\`javascript
function requireScope(requiredScope) {
  return (req, res, next) => {
    const userScopes = req.user.scope || [];
    if (!userScopes.includes(requiredScope)) {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }
    next();
  };
}

app.get('/orders', requireScope('read:orders'), getOrders);
app.post('/orders', requireScope('write:orders'), createOrder);
\`\`\`\`

## Framework Integrations

Different frameworks offer built-in support for JWT verification in microservices:

- **[Spring Boot](/frameworks/spring-boot):** Use Spring Security with OAuth2 Resource Server for declarative JWT verification
- **[NestJS](/frameworks/nestjs):** Use the @nestjs/jwt package with Passport strategies for guard-based authentication
- **Go (Gin/Echo):** Use middleware libraries like gin-jwt or build custom middleware with golang-jwt

## Conclusion

JWT is the standard for microservice authentication because it's stateless and self-contained. Use an API Gateway for centralized authentication, RS256 with JWKS for distributed verification, and scope-based authorization for fine-grained access control. Use our [JWT decoder](/) to inspect tokens and verify they contain the right claims for your microservice architecture.
`,
  "jwt-token-revocation": `
## Why JWT Revocation Is Hard

JWT's greatest strength — being stateless — is also its greatest weakness when it comes to revocation. Unlike session-based authentication where you simply delete the session from the server, a JWT is valid from the moment it's signed until its \`exp\` claim passes. There's no built-in mechanism to say "this token is no longer valid."

This creates real problems. When a user logs out, changes their password, or gets banned, their existing JWTs remain valid until they expire. In this guide, we'll explore practical strategies for revoking JWTs, their trade-offs, and implementation code. For more on why this matters, see our [JWT security best practices](/blog/jwt-security-best-practices).

## When You Need Token Revocation

Common scenarios that require revoking a JWT before it expires:

- **User logout:** The user's token should be invalidated immediately
- **Password change:** All existing tokens should be revoked
- **Account suspension:** A banned user's tokens must stop working
- **Security breach:** All tokens for a compromised account must be revoked
- **Permission change:** When a user's role changes, old tokens with stale permissions should be invalidated

## Strategy 1: Short-Lived Tokens (No Revocation)

The simplest approach: don't revoke at all. Instead, make access tokens so short-lived (5–15 minutes) that the damage window is minimal.

### How It Works

- Access tokens expire in 5–15 minutes
- Refresh tokens are stored server-side and can be revoked
- On logout or security event, revoke the refresh token
- The access token becomes useless within minutes

### Pros and Cons

- **Pros:** No revocation infrastructure needed, truly stateless
- **Cons:** Up to 15-minute delay before access is cut off, not suitable for immediate revocation needs

This is the default approach in many OAuth 2.0 implementations and is combined with [refresh token strategies](/blog/jwt-refresh-token) for session management.

## Strategy 2: Token Blacklist with Redis

Maintain a server-side list of revoked token IDs (\`jti\` claims). On each request, check if the token's \`jti\` is in the blacklist.

### Implementation

\`\`\`javascript
const redis = require('redis');
const jwt = require('jsonwebtoken');

const client = redis.createClient({ url: process.env.REDIS_URL });

async function blacklistToken(token) {
  const decoded = jwt.decode(token);
  if (!decoded?.jti) throw new Error('Token missing jti claim');

  const ttl = decoded.exp - Math.floor(Date.now() / 1000);
  if (ttl <= 0) return; // already expired, no need to blacklist

  await client.set(\`blacklist:\${decoded.jti}\`, '1', { EX: ttl });
}

async function isTokenBlacklisted(token) {
  const decoded = jwt.decode(token);
  if (!decoded?.jti) return false;
  const exists = await client.exists(\`blacklist:\${decoded.jti}\`);
  return exists === 1;
}

// Middleware
async function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET, { algorithms: ['HS256'] });

    if (await isTokenBlacklisted(token)) {
      return res.status(401).json({ error: 'Token has been revoked' });
    }

    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}

// Logout endpoint
app.post('/auth/logout', authMiddleware, async (req, res) => {
  await blacklistToken(req.headers.authorization.split(' ')[1]);
  res.json({ message: 'Logged out successfully' });
});
\`\`\`\`

### Pros and Cons

- **Pros:** Immediate revocation, TTL matches token lifetime (auto-cleanup), simple implementation
- **Cons:** Adds a Redis lookup to every request (introduces state), requires Redis infrastructure, slightly reduces performance

## Strategy 3: Token Whitelist (Session Store)

Instead of tracking revoked tokens, track **valid** tokens. Only tokens in the whitelist are accepted.

### Implementation

\`\`\`javascript
async function whitelistToken(userId, tokenId, token) {
  const decoded = jwt.decode(token);
  const ttl = decoded.exp - Math.floor(Date.now() / 1000);
  await client.set(\`session:\${userId}:\${tokenId}\`, '1', { EX: ttl });
}

async function isTokenWhitelisted(userId, tokenId) {
  const exists = await client.exists(\`session:\${userId}:\${tokenId}\`);
  return exists === 1;
}

// Revoke all tokens for a user (e.g., on password change)
async function revokeAllUserTokens(userId) {
  const keys = await client.keys(\`session:\${userId}:*\`);
  if (keys.length > 0) await client.del(keys);
}
\`\`\`\`

### Pros and Cons

- **Pros:** Easy to revoke all tokens for a user, full control over active sessions
- **Cons:** Most stateful approach, essentially recreates server sessions, Redis lookup on every request

## Strategy 4: Token Versioning

Add a version number to user records and to tokens. If the token version is older than the current user version, reject it.

### Implementation

\`\`\`javascript
// When issuing a token, include the user's current token version
function issueToken(user) {
  return jwt.sign(
    {
      sub: user.id,
      role: user.role,
      tokenVersion: user.tokenVersion // from database
    },
    process.env.JWT_SECRET,
    { expiresIn: '1h', jwtid: crypto.randomUUID() }
  );
}

// Middleware checks token version against database
async function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET, { algorithms: ['HS256'] });
    const user = await db.users.findById(decoded.sub);

    if (!user || decoded.tokenVersion !== user.tokenVersion) {
      return res.status(401).json({ error: 'Token revoked' });
    }

    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}

// Revoke all tokens: increment version
async function revokeAllTokens(userId) {
  await db.users.update(userId, {
    tokenVersion: { $inc: 1 }
  });
}
\`\`\`\`

### Pros and Cons

- **Pros:** Revoke all tokens for a user with a single database update, no blacklist needed, minimal storage
- **Cons:** Requires a database lookup on every request (can be cached), version must be checked against a store

## Using the jti Claim

The \`jti\` (JWT ID) claim provides a unique identifier for each token. It's essential for blacklist and whitelist strategies. Always include a unique \`jti\` (UUID) when issuing tokens:

\`\`\`json
{
  "sub": "user123",
  "jti": "550e8400-e29b-41d4-a716-446655440000",
  "iat": 1720627200,
  "exp": 1720630800
}
\`\`\`\`

The \`jti\` claim prevents replay attacks and enables precise tracking of individual tokens. See the [OWASP cheat sheet](https://cheatsheetseries.owasp.org/cheatsheets/JSON_Web_Token_for_Java_Cheat_Sheet.html) for more on using \`jti\` for token management.

## Comparing All Strategies

| Strategy | Revocation Speed | Infrastructure | Complexity | State |
|----------|----------------|----------------|------------|-------|
| Short-lived only | Delayed (5-15 min) | None | Low | Stateless |
| Blacklist (Redis) | Immediate | Redis | Medium | Semi-stateful |
| Whitelist (Redis) | Immediate | Redis | Medium | Stateful |
| Token Versioning | Immediate | Database | Low | Semi-stateful |

For most applications, a combination of **short-lived access tokens + refresh token revocation + token versioning** provides the best balance of security, performance, and simplicity.

## Conclusion

JWT revocation requires trade-offs between statelessness and control. For most applications, short-lived access tokens combined with server-side refresh token management and token versioning provide immediate revocation without significant performance impact. Use our [JWT decoder](/) to verify that your tokens include the \`jti\` and \`tokenVersion\` claims needed for revocation strategies. Also check our guide on [handling token expiration](/blog/jwt-token-expiration) for a complete picture of the token lifecycle.
`,
  "oauth2-and-jwt": `
## OAuth 2.0 and JWT: Two Standards That Work Together

OAuth 2.0 and JWT are often mentioned together, but they serve different purposes. **OAuth 2.0** is an authorization framework that defines how applications can obtain access to resources on behalf of a user. **JWT** is a token format — a compact, self-contained way to encode claims. Understanding how they work together is essential for building modern authentication systems.

If you're new to JWT, start with our [What is JWT guide](/blog/what-is-jwt). For a comparison with traditional sessions, see our [JWT vs Session Authentication article](/blog/jwt-vs-session-authentication).

## OAuth 2.0 in a Nutshell

OAuth 2.0 ([RFC 6749](https://datatracker.ietf.org/doc/html/rfc6749)) defines four roles:

- **Resource Owner:** The user who authorizes access
- **Client:** The application requesting access
- **Authorization Server:** Issues tokens after user consent
- **Resource Server:** Hosts protected resources and validates tokens

OAuth 2.0 defines several grant types (authorization flows), but the most relevant for web and mobile apps are:

1. **Authorization Code Flow** — the most secure, recommended for server-side apps
2. **Authorization Code + PKCE** — for mobile apps and SPAs
3. **Client Credentials** — for machine-to-machine communication

## Where JWT Fits in OAuth 2.0

OAuth 2.0 doesn't mandate a specific token format. It defines the flows and interactions, but the actual access token can be opaque (a random string) or structured (a JWT). When JWT is used as the access token format in OAuth 2.0, you get several benefits:

- **Self-contained:** The resource server can verify the token without calling the authorization server
- **Rich claims:** The token carries user identity, scopes, and metadata
- **Standardized structure:** Header, payload, and signature follow [RFC 7519](https://datatracker.ietf.org/doc/html/rfc7519)

## Access Token vs ID Token

A common source of confusion is the difference between access tokens and ID tokens:

| Property | Access Token | ID Token |
|----------|-------------|----------|
| Purpose | Authorize API access | Prove user identity |
| Audience | Resource server | Client application |
| Read by | API / Resource server | Client (frontend) only |
| Contains | Scopes, permissions | User profile claims |
| Sent to | API endpoints | Never sent to APIs |

The **access token** is meant for APIs — it tells the resource server what the user is allowed to do. The **ID token** is meant for the client — it proves who the user is and comes from OpenID Connect.

### Access Token Example

\`\`\`json
{
  "sub": "user123",
  "scope": "read:profile write:orders",
  "iss": "https://auth.example.com",
  "aud": "https://api.example.com",
  "exp": 1720630800
}
\`\`\`\`

### ID Token Example

\`\`\`json
{
  "sub": "user123",
  "name": "John Doe",
  "email": "john@example.com",
  "iss": "https://auth.example.com",
  "aud": "my-client-app-id",
  "exp": 1720630800,
  "nonce": "abc123"
}
\`\`\`\`

## OpenID Connect: Adding Identity to OAuth 2.0

OAuth 2.0 handles authorization, but it doesn't define authentication. That's where **OpenID Connect (OIDC)** comes in. OIDC is a thin layer on top of OAuth 2.0 that adds:

- An **ID Token** (JWT) that proves user identity
- A **UserInfo endpoint** that returns user profile data
- **Discovery** endpoints for automatic configuration

When you "Sign in with Google" or "Login with GitHub", you're using OpenID Connect on top of OAuth 2.0.

## Complete OAuth 2.0 + JWT Flow

Here's a complete implementation of the Authorization Code flow with JWT tokens:

\`\`\`javascript
const express = require('express');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const app = express();

const AUTH_SERVER_URL = 'https://auth.example.com';
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = 'https://myapp.com/callback';

// Step 1: Redirect user to authorization server
app.get('/login', (req, res) => {
  const state = crypto.randomUUID();
  req.session.oauthState = state;

  const params = new URLSearchParams({
    response_type: 'code',
    client_id: CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    scope: 'openid profile email',
    state: state
  });

  res.redirect(\`\${AUTH_SERVER_URL}/authorize?\${params}\`);
});

// Step 2: Handle callback with authorization code
app.get('/callback', async (req, res) => {
  const { code, state } = req.query;

  // Verify state parameter (CSRF protection)
  if (state !== req.session.oauthState) {
    return res.status(403).json({ error: 'Invalid state' });
  }

  // Step 3: Exchange code for tokens
  const tokenResponse = await fetch(\`\${AUTH_SERVER_URL}/oauth/token\`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      grant_type: 'authorization_code',
      code,
      redirect_uri: REDIRECT_URI,
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET
    })
  });

  const tokens = await tokenResponse.json();

  // tokens contains:
  // {
  //   access_token: "eyJ...",     (JWT for API access)
  //   id_token: "eyJ...",        (JWT with user identity)
  //   refresh_token: "rt_...",   (opaque token for refresh)
  //   token_type: "Bearer",
  //   expires_in: 3600
  // }

  // Decode ID token for user info (DO NOT trust without verification)
  const idToken = jwt.decode(tokens.id_token);

  // Store tokens securely
  req.session.accessToken = tokens.access_token;
  res.cookie('refreshToken', tokens.refresh_token, {
    httpOnly: true, secure: true, sameSite: 'strict'
  });

  res.redirect('/dashboard');
});

// Step 4: Use access token to call API
app.get('/api/profile', async (req, res) => {
  const response = await fetch('https://api.example.com/userinfo', {
    headers: { 'Authorization': \`Bearer \${req.session.accessToken}\` }
  });
  const profile = await response.json();
  res.json(profile);
});
\`\`\`\`

## Authorization Server: Issuing JWT Tokens

On the authorization server side, here's how JWT tokens are generated:

\`\`\`javascript
function issueOAuthTokens(user, scope) {
  const now = Math.floor(Date.now() / 1000);

  // Access token — for API access
  const accessToken = jwt.sign(
    {
      sub: user.id,
      scope: scope,
      iss: 'https://auth.example.com',
      aud: 'https://api.example.com',
      iat: now,
      exp: now + 3600,
      jti: crypto.randomUUID()
    },
    privateKey,
    { algorithm: 'RS256', keyid: 'key-1' }
  );

  // ID token — for client authentication
  const idToken = jwt.sign(
    {
      sub: user.id,
      name: user.name,
      email: user.email,
      iss: 'https://auth.example.com',
      aud: CLIENT_ID,
      iat: now,
      exp: now + 3600,
      nonce: user.nonce
    },
    privateKey,
    { algorithm: 'RS256', keyid: 'key-1' }
  );

  // Refresh token — opaque, stored server-side
  const refreshToken = crypto.randomUUID();
  storeRefreshToken(refreshToken, { userId: user.id, scope, createdAt: now });

  return { access_token: accessToken, id_token: idToken, refresh_token: refreshToken, token_type: 'Bearer', expires_in: 3600 };
}
\`\`\`\`

## Common Misunderstandings

### "OAuth 2.0 and JWT are the same thing"

They're not. OAuth 2.0 is a framework for authorization flows. JWT is a token format. You can use OAuth 2.0 without JWT (opaque tokens) and JWT without OAuth 2.0 (custom authentication).

### "ID tokens should be sent to APIs"

Never send ID tokens to APIs. ID tokens are for the client application only. APIs should receive access tokens, which contain authorization scopes, not personal identity claims.

### "JWT tokens in OAuth must be encrypted"

JWT tokens in OAuth 2.0 are typically signed but not encrypted. The claims are readable but tamper-proof. If you need to hide claims, use JWE (JSON Web Encryption) — but this is rarely needed for access tokens.

### "The client should validate the access token"

The client should treat the access token as opaque. Only the resource server validates it. The client should only validate the ID token.

## Conclusion

OAuth 2.0 and JWT are complementary standards. OAuth 2.0 defines how to obtain tokens, and JWT defines the token format. Together with OpenID Connect, they form the foundation of modern authentication. Use our [JWT decoder](/) to inspect your OAuth tokens and understand what claims they contain. For securing your JWT implementation, refer to our [JWT security best practices](/blog/jwt-security-best-practices).
`,
  "jwt-auth-middleware": `
## What Is Authentication Middleware?

Authentication middleware is a layer of code that sits between incoming HTTP requests and your application logic. It intercepts every request, checks for a valid JWT, and either allows the request to proceed or rejects it with a 401 Unauthorized response.

Middleware is the most common pattern for adding JWT authentication to web applications because it centralizes auth logic in one place. Instead of checking tokens in every route handler, you check once in the middleware. For foundational JWT knowledge, see our [What is JWT guide](/blog/what-is-jwt).

## The Middleware Design Pattern

Most web frameworks follow a similar middleware pattern:

\`\`\`
Request → Middleware 1 → Middleware 2 → Route Handler → Response
\`\`\`\`

For JWT authentication, the flow is:

\`\`\`
Request → JWT Middleware (verify token) → Authorization Middleware (check permissions) → Route Handler
\`\`\`\`

Good middleware should:
- Extract the token from the request (Authorization header, cookie, etc.)
- Verify the token's signature, expiration, and claims
- Attach user information to the request object
- Handle errors consistently with proper HTTP status codes
- Be stateless and fast

## Express.js JWT Middleware

Here's a production-ready JWT middleware for [Express.js](/frameworks/express):

\`\`\`javascript
const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');

// JWKS client for fetching public keys
const client = jwksClient({
  jwksUri: process.env.JWKS_URI || 'https://auth.example.com/.well-known/jwks.json',
  cache: true,
  cacheMaxAge: 600000,
  rateLimit: true,
  jwksRequestsPerMinute: 10
});

function getSigningKey(header, callback) {
  client.getSigningKey(header.kid, (err, key) => {
    if (err) return callback(err);
    callback(null, key.getPublicKey());
  });
}

function jwtAuth(options = {}) {
  const {
    algorithms = ['RS256'],
    issuer,
    audience,
    getToken,
    onVerified
  } = options;

  return async (req, res, next) => {
    try {
      // Extract token
      let token;
      if (getToken) {
        token = getToken(req);
      } else {
        const authHeader = req.headers.authorization;
        if (authHeader?.startsWith('Bearer ')) {
          token = authHeader.substring(7);
        } else if (req.cookies?.token) {
          token = req.cookies.token;
        }
      }

      if (!token) {
        return res.status(401).json({
          error: 'Authentication required',
          code: 'NO_TOKEN'
        });
      }

      // Verify token
      jwt.verify(token, getSigningKey, {
        algorithms,
        issuer,
        audience,
        clockTolerance: 30
      }, (err, decoded) => {
        if (err) {
          if (err.name === 'TokenExpiredError') {
            return res.status(401).json({
              error: 'Token expired',
              code: 'TOKEN_EXPIRED'
            });
          }
          return res.status(401).json({
            error: 'Invalid token',
            code: 'INVALID_TOKEN'
          });
        }

        // Attach user to request
        req.user = decoded;

        // Optional callback for additional processing
        if (onVerified) onVerified(req, decoded);

        next();
      });
    } catch (err) {
      console.error('Auth middleware error:', err);
      res.status(500).json({ error: 'Authentication service error' });
    }
  };
}

// Usage
const app = require('express')();

// Protect all /api routes
app.use('/api', jwtAuth({
  issuer: 'https://auth.example.com',
  audience: 'https://api.example.com'
}));

// Authorization middleware (layered on top)
function requireRole(...roles) {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }
    next();
  };
}

app.get('/api/admin/users', requireRole('admin'), getUsers);
app.get('/api/profile', requireRole('user', 'admin'), getProfile);
\`\`\`\`

This middleware supports both Bearer tokens and cookie-based tokens, JWKS-based key rotation, and layered authorization checks.

## Django JWT Middleware

For Django applications, JWT authentication is typically handled through Django REST Framework. Here's a custom middleware approach:

\`\`\`python
import jwt
import json
from django.conf import settings
from django.http import JsonResponse
from jwt import PyJWKClient

jwks_client = PyJWKClient(settings.JWKS_URL)

class JWTAuthenticationMiddleware:
    EXEMPT_PATHS = ['/api/auth/login', '/api/auth/register', '/health']

    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        # Skip exempt paths
        if any(request.path.startswith(p) for p in self.EXEMPT_PATHS):
            return self.get_response(request)

        # Extract token
        auth_header = request.META.get('HTTP_AUTHORIZATION', '')
        if not auth_header.startswith('Bearer '):
            return JsonResponse(
                {'error': 'Authentication required', 'code': 'NO_TOKEN'},
                status=401
            )

        token = auth_header[7:]

        try:
            # Get signing key from JWKS
            signing_key = jwks_client.get_signing_key_from_jwt(token)

            # Verify token
            payload = jwt.decode(
                token,
                signing_key.key,
                algorithms=['RS256'],
                audience=settings.JWT_AUDIENCE,
                issuer=settings.JWT_ISSUER,
                options={'require': ['exp', 'iss', 'sub']}
            )

            # Attach user info to request
            request.user_id = payload['sub']
            request.user_role = payload.get('role', 'user')
            request.jwt_payload = payload

        except jwt.ExpiredSignatureError:
            return JsonResponse(
                {'error': 'Token expired', 'code': 'TOKEN_EXPIRED'},
                status=401
            )
        except jwt.InvalidTokenError as e:
            return JsonResponse(
                {'error': 'Invalid token', 'code': 'INVALID_TOKEN'},
                status=401
            )

        return self.get_response(request)
\`\`\`\`

Add the middleware to your Django settings:

\`\`\`python
# settings.py
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'myapp.middleware.JWTAuthenticationMiddleware',  # Add after security
    # ... other middleware
]

JWT_ISSUER = 'https://auth.example.com'
JWT_AUDIENCE = 'https://api.example.com'
JWKS_URL = 'https://auth.example.com/.well-known/jwks.json'
\`\`\`\`

## FastAPI JWT Dependency Injection

FastAPI uses dependency injection instead of traditional middleware. Here's how to implement JWT auth with FastAPI:

\`\`\`python
from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import jwt, JWTError, ExpiredSignatureError
import httpx

security = HTTPBearer()
JWKS_URL = "https://auth.example.com/.well-known/jwks.json"
ISSUER = "https://auth.example.com"
AUDIENCE = "https://api.example.com"

# Cache JWKS
jwks_cache = None

async def get_jwks():
    global jwks_cache
    if jwks_cache is None:
        async with httpx.AsyncClient() as client:
            resp = await client.get(JWKS_URL)
            jwks_cache = resp.json()
    return jwks_cache

def get_signing_key(kid: str, jwks: dict) -> str:
    for key in jwks['keys']:
        if key['kid'] == kid:
            from jose.utils import base64url_decode
            import json
            # Construct RSA public key from JWK
            return jwt.algorithms.RSAAlgorithm.from_jwk(json.dumps(key))
    raise HTTPException(status_code=401, detail="Signing key not found")

async def verify_jwt(credentials: HTTPAuthorizationCredentials = Depends(security)):
    token = credentials.credentials
    try:
        header = jwt.get_unverified_header(token)
        jwks = await get_jwks()
        public_key = get_signing_key(header.get('kid', ''), jwks)

        payload = jwt.decode(
            token,
            public_key,
            algorithms=['RS256'],
            audience=AUDIENCE,
            issuer=ISSUER,
            options={'require': ['exp', 'iss', 'sub']}
        )
        return payload
    except ExpiredSignatureError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token expired"
        )
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token"
        )

# Usage
app = FastAPI()

@app.get("/api/profile")
async def get_profile(user: dict = Depends(verify_jwt)):
    return {"user_id": user["sub"], "role": user.get("role")}

@app.get("/api/admin")
async def admin_endpoint(user: dict = Depends(verify_jwt)):
    if user.get("role") != "admin":
        raise HTTPException(status_code=403, detail="Forbidden")
    return {"message": "Admin access granted"}
\`\`\`\`

## Middleware Error Handling

Consistent error handling is critical for authentication middleware. Always return structured error responses:

\`\`\`javascript
// Standardized error format
const AuthErrors = {
  NO_TOKEN: { status: 401, code: 'NO_TOKEN', message: 'Authentication required' },
  TOKEN_EXPIRED: { status: 401, code: 'TOKEN_EXPIRED', message: 'Token has expired' },
  INVALID_TOKEN: { status: 401, code: 'INVALID_TOKEN', message: 'Token is invalid' },
  INSUFFICIENT_SCOPE: { status: 403, code: 'INSUFFICIENT_SCOPE', message: 'Insufficient permissions' }
};

function sendAuthError(res, error) {
  res.status(error.status).json({
    error: error.message,
    code: error.code,
    // Include WWW-Authenticate header per RFC 6750
    headers: { 'WWW-Authenticate': 'Bearer error="invalid_token"' }
  });
}
\`\`\`\`

The client can use the error code to decide whether to refresh the token, redirect to login, or show an error message. See our [token expiration guide](/blog/jwt-token-expiration) for handling TOKEN_EXPIRED errors gracefully.

## Performance Optimization

JWT verification is computationally expensive, especially with asymmetric algorithms. Here are optimization strategies:

### 1. Cache JWKS Keys

Fetch public keys from the JWKS endpoint periodically rather than on every request. Most JWKS client libraries handle this automatically.

### 2. Use HS256 for Internal Services

For service-to-service communication within your infrastructure, HS256 is faster than RS256. See our [signing algorithms comparison](/blog/jwt-signing-algorithms) for when to use each.

### 3. Verify at the Gateway Only

If you use an API Gateway, verify JWTs at the gateway and pass user info via headers to downstream services. This avoids redundant verification.

### 4. Choose Token Placement Wisely

For web apps, HttpOnly cookies avoid the overhead of parsing Authorization headers and provide XSS protection. See our [security best practices](/blog/jwt-security-best-practices) for storage recommendations.

## Conclusion

JWT authentication middleware centralizes token verification, keeping your route handlers clean and your auth logic consistent. Whether you're using Express.js, Django, or FastAPI, the core pattern is the same: extract the token, verify it, attach user info, and handle errors consistently. Use our [JWT decoder tool](/) to inspect your tokens and verify they contain the claims your middleware expects.
`,
};

export function getBlogPost(slug: string): BlogPost | null {
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return null;

  return {
    ...post,
    content: blogContent[slug] || "",
  };
}

export function getAllBlogPosts(): BlogPost[] {
  return blogPosts.map((post) => ({
    ...post,
    content: blogContent[post.slug] || "",
  }));
}
