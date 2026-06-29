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

A JSON Web Token (JWT) is an open standard (RFC 7519) that defines a compact and self-contained way for securely transmitting information between parties as a JSON object. This information can be verified and trusted because it is digitally signed. JWTs can be signed using a secret (with the HMAC algorithm) or a public/private key pair using RSA or ECDSA.

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

This is a stateless authentication mechanism as the user state is never saved in server memory. The server's protected routes will check for a valid JWT in the Authorization header, and if it's present, the user will be allowed to access protected resources.

## Why Should We Use JSON Web Tokens?

### Compact

Because of their smaller size, JWTs can be sent through a URL, POST parameter, or inside an HTTP header. Additionally, due to the smaller size, transmission is fast.

### Self-Contained

A JWT contains all the necessary information about an entity within itself, avoiding the need to query the database more than once. The payload can contain information about the user, the token's expiration time, the issuer, and more.

### Secure

JWTs can be signed using a secret (with the HMAC algorithm) or a public/private key pair using RSA or ECDSA. This ensures that the token hasn't been tampered with and that the sender is who they claim to be.

## Common Use Cases for JWT

### Authentication

This is the most common scenario for using JWT. Once the user is logged in, each subsequent request will include the JWT, allowing the user to access routes, services, and resources that are permitted with that token.

### Information Exchange

JSON Web Tokens are a good way of securely transmitting information between parties. Because JWTs can be signed — for example, using public/private key pairs — you can be sure the senders are who they say they are. Additionally, as the signature is calculated using the header and the payload, you can also verify that the content hasn't been tampered with.

## Conclusion

JSON Web Tokens are a powerful and flexible way to handle authentication and information exchange in modern web applications. By understanding the structure — Header, Payload, and Signature — and how they work together, you can build secure, stateless authentication systems. Try pasting a JWT into our [free online JWT decoder](/) to see its structure in action.
`,
  "jwt-security-best-practices": `
## Why JWT Security Matters

JSON Web Tokens (JWT) are widely used for authentication and authorization in modern web applications. However, like any security mechanism, JWTs must be used correctly to avoid vulnerabilities. A misconfigured JWT implementation can expose your application to serious security risks, including token theft, privilege escalation, and data breaches.

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

## Conclusion

JWT security is not just about choosing the right algorithm — it's about implementing a comprehensive security strategy that covers the entire token lifecycle. By following these best practices, you can build secure authentication systems that protect your users and your application. Use our [free JWT decoder tool](/) to inspect your tokens and verify that they contain the right claims and security parameters.
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
