export interface JWTHeader {
  alg: string;
  typ: string;
  [key: string]: unknown;
}

export interface JWTPayload {
  iss?: string;
  sub?: string;
  aud?: string | string[];
  exp?: number;
  nbf?: number;
  iat?: number;
  jti?: string;
  [key: string]: unknown;
}

export interface DecodedJWT {
  header: JWTHeader;
  payload: JWTPayload;
  signature: string;
  isExpired: boolean;
  expiresAt: Date | null;
  issuedAt: Date | null;
  notBefore: Date | null;
}

export interface JWTError {
  type: "invalid_format" | "invalid_base64" | "invalid_json" | "empty";
  message: string;
}

function base64UrlDecode(str: string): string {
  // Replace URL-safe characters
  let base64 = str.replace(/-/g, "+").replace(/_/g, "/");
  // Add padding
  const pad = base64.length % 4;
  if (pad) {
    base64 += "=".repeat(4 - pad);
  }
  try {
    return decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
  } catch {
    throw new Error("Invalid base64url encoding");
  }
}

export function decodeJWT(token: string): DecodedJWT | JWTError {
  const trimmed = token.trim();

  if (!trimmed) {
    return { type: "empty", message: "Please enter a JWT token" };
  }

  const parts = trimmed.split(".");
  if (parts.length !== 3) {
    return {
      type: "invalid_format",
      message: `Invalid JWT format: expected 3 parts separated by dots, got ${parts.length}`,
    };
  }

  let header: JWTHeader;
  let payload: JWTPayload;

  try {
    const headerJson = base64UrlDecode(parts[0]);
    header = JSON.parse(headerJson);
  } catch {
    return { type: "invalid_base64", message: "Failed to decode JWT header: invalid base64url or JSON" };
  }

  try {
    const payloadJson = base64UrlDecode(parts[1]);
    payload = JSON.parse(payloadJson);
  } catch {
    return { type: "invalid_json", message: "Failed to decode JWT payload: invalid base64url or JSON" };
  }

  const now = Math.floor(Date.now() / 1000);
  const isExpired = payload.exp ? payload.exp < now : false;
  const expiresAt = payload.exp ? new Date(payload.exp * 1000) : null;
  const issuedAt = payload.iat ? new Date(payload.iat * 1000) : null;
  const notBefore = payload.nbf ? new Date(payload.nbf * 1000) : null;

  return {
    header,
    payload,
    signature: parts[2],
    isExpired,
    expiresAt,
    issuedAt,
    notBefore,
  };
}

export function isJWTError(result: DecodedJWT | JWTError): result is JWTError {
  return "type" in result && "message" in result;
}

export function formatDate(date: Date): string {
  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZoneName: "short",
  });
}

export function getAlgorithmInfo(alg: string): { name: string; type: string } {
  const algorithms: Record<string, { name: string; type: string }> = {
    HS256: { name: "HMAC using SHA-256", type: "Symmetric" },
    HS384: { name: "HMAC using SHA-384", type: "Symmetric" },
    HS512: { name: "HMAC using SHA-512", type: "Symmetric" },
    RS256: { name: "RSASSA-PKCS1-v1_5 using SHA-256", type: "Asymmetric" },
    RS384: { name: "RSASSA-PKCS1-v1_5 using SHA-384", type: "Asymmetric" },
    RS512: { name: "RSASSA-PKCS1-v1_5 using SHA-512", type: "Asymmetric" },
    ES256: { name: "ECDSA using P-256 and SHA-256", type: "Asymmetric" },
    ES384: { name: "ECDSA using P-384 and SHA-384", type: "Asymmetric" },
    ES512: { name: "ECDSA using P-521 and SHA-512", type: "Asymmetric" },
    PS256: { name: "RSASSA-PSS using SHA-256", type: "Asymmetric" },
    PS384: { name: "RSASSA-PSS using SHA-384", type: "Asymmetric" },
    PS512: { name: "RSASSA-PSS using SHA-512", type: "Asymmetric" },
    none: { name: "No digital signature", type: "None" },
  };
  return algorithms[alg] || { name: alg, type: "Unknown" };
}
