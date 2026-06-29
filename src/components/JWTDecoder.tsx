"use client";

import { useState, useMemo, useCallback } from "react";
import { decodeJWT, isJWTError, formatDate, getAlgorithmInfo } from "@/lib/jwtUtils";
import type { DecodedJWT, JWTPayload } from "@/lib/jwtUtils";

const SAMPLE_JWT =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjk5OTk5OTk5OTksImlzcyI6Imh0dHBzOi8vZXhhbXBsZS5jb20iLCJhdWQiOiJodHRwczovL2FwaS5leGFtcGxlLmNvbSJ9.signature_placeholder";

const CLAIM_LABELS: Record<string, string> = {
  iss: "Issuer (iss)",
  sub: "Subject (sub)",
  aud: "Audience (aud)",
  exp: "Expiration (exp)",
  iat: "Issued At (iat)",
  nbf: "Not Before (nbf)",
  jti: "JWT ID (jti)",
};

const STANDARD_CLAIMS = ["iss", "sub", "aud", "exp", "iat", "nbf", "jti"];

function formatJson(obj: unknown, indent = 2): string {
  return JSON.stringify(obj, null, indent);
}

function syntaxHighlight(json: string): string {
  return json
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(
      /("(\\u[a-zA-Z0-9]{4}|\\[^u]|\\u0000-\\u007f]|\\[^u]|\\.)*)"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?/g,
      (match) => {
        let cls = "text-amber-700";
        if (/^"/.test(match)) {
          if (/:$/.test(match)) {
            cls = "text-blue-600 font-semibold";
          } else {
            cls = "text-emerald-600";
          }
        } else if (/true|false/.test(match)) {
          cls = "text-purple-600";
        } else if (/null/.test(match)) {
          cls = "text-gray-500";
        }
        return `<span class="${cls}">${match}</span>`;
      }
    );
}

function formatClaimValue(value: unknown): string {
  if (value === null || value === undefined) return "—";
  if (typeof value === "string") return value;
  if (typeof value === "number") return value.toString();
  if (Array.isArray(value)) return value.join(", ");
  return JSON.stringify(value);
}

export default function JWTDecoder() {
  const [token, setToken] = useState("");

  const result = useMemo(() => (token.trim() ? decodeJWT(token) : null), [token]);

  const handleClear = useCallback(() => {
    setToken("");
  }, []);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(token);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = token;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }
  }, [token]);

  const handleSample = useCallback(() => {
    setToken(SAMPLE_JWT);
  }, []);

  const handlePaste = useCallback(async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) setToken(text.trim());
    } catch {
      // Clipboard API not available
    }
  }, []);

  const decoded = result && !isJWTError(result) ? (result as DecodedJWT) : null;
  const error = result && isJWTError(result) ? result : null;

  const algorithmInfo = decoded ? getAlgorithmInfo(decoded.header.alg || "none") : null;

  const claimRows = decoded
    ? STANDARD_CLAIMS.map((key) => {
        const value = (decoded.payload as JWTPayload)[key];
        if (value === undefined) return null;
        let displayValue = formatClaimValue(value);
        if (key === "exp" && typeof value === "number") {
          displayValue = `${value} (${decoded.expiresAt ? formatDate(decoded.expiresAt) : ""})`;
        } else if (key === "iat" && typeof value === "number") {
          displayValue = `${value} (${decoded.issuedAt ? formatDate(decoded.issuedAt) : ""})`;
        } else if (key === "nbf" && typeof value === "number") {
          displayValue = `${value} (${decoded.notBefore ? formatDate(decoded.notBefore) : ""})`;
        }
        return { key, label: CLAIM_LABELS[key], value: displayValue };
      }).filter((row): row is NonNullable<typeof row> => row !== null)
    : [];

  const customClaims = decoded
    ? Object.entries(decoded.payload)
        .filter(([key]) => !STANDARD_CLAIMS.includes(key))
    : [];

  return (
    <div className="w-full">
      {/* Input Section */}
      <div className="relative">
        <textarea
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="Paste your JWT token here to instantly decode and inspect its header, payload, and signature..."
          className="w-full h-40 md:h-48 p-4 md:p-6 rounded-2xl border border-gray-200 bg-white text-gray-800 text-sm md:text-base font-mono leading-relaxed resize-y focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm transition-all"
          aria-label="JWT token input"
          spellCheck={false}
        />
        <div className="absolute bottom-4 right-4 flex flex-wrap gap-2">
          <button
            onClick={handlePaste}
            className="px-3 py-1.5 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Paste
          </button>
          <button
            onClick={handleSample}
            className="px-3 py-1.5 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors"
          >
            Sample
          </button>
          <button
            onClick={handleCopy}
            disabled={!token}
            className="px-3 py-1.5 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Copy
          </button>
          <button
            onClick={handleClear}
            disabled={!token}
            className="px-3 py-1.5 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Clear
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mt-4 p-4 rounded-xl border border-red-200 bg-red-50">
          <div className="flex items-start gap-3">
            <span className="flex-shrink-0 inline-flex items-center justify-center w-6 h-6 rounded-full bg-red-100 text-red-600 text-sm font-bold">
              !
            </span>
            <div>
              <h3 className="text-sm font-semibold text-red-800">Decoding Error</h3>
              <p className="mt-1 text-sm text-red-600">{error.message}</p>
            </div>
          </div>
        </div>
      )}

      {/* Results */}
      {decoded && (
        <div className="mt-6 space-y-4">
          {/* Status Bar */}
          <div className="flex flex-wrap items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold ${
                decoded.isExpired
                  ? "bg-red-100 text-red-700"
                  : "bg-green-100 text-green-700"
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  decoded.isExpired ? "bg-red-500" : "bg-green-500"
                }`}
              />
              {decoded.isExpired ? "Expired" : "Active"}
            </span>
            {algorithmInfo && (
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium bg-indigo-50 text-indigo-700">
                <span className="font-mono font-bold">{decoded.header.alg || "none"}</span>
                <span className="text-indigo-400">•</span>
                <span>{algorithmInfo.type}</span>
              </span>
            )}
            {decoded.payload.exp !== undefined && decoded.expiresAt && (
              <span className="text-xs text-gray-500">
                {decoded.isExpired ? "Expired" : "Expires"}: {formatDate(decoded.expiresAt)}
              </span>
            )}
          </div>

          {/* Two Column Layout: Header + Payload */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Header */}
            <div className="rounded-xl border border-blue-200 bg-blue-50/50 overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 bg-blue-100/60 border-b border-blue-200">
                <span className="inline-flex items-center justify-center w-5 h-5 rounded bg-blue-500 text-white text-xs font-bold">
                  1
                </span>
                <h3 className="text-sm font-bold text-blue-900">Header</h3>
                <span className="text-xs text-blue-500 ml-auto">Base64Url decoded</span>
              </div>
              <pre className="p-4 overflow-x-auto text-xs md:text-sm font-mono leading-relaxed">
                <code
                  dangerouslySetInnerHTML={{
                    __html: syntaxHighlight(formatJson(decoded.header)),
                  }}
                />
              </pre>
            </div>

            {/* Payload */}
            <div className="rounded-xl border border-purple-200 bg-purple-50/50 overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 bg-purple-100/60 border-b border-purple-200">
                <span className="inline-flex items-center justify-center w-5 h-5 rounded bg-purple-500 text-white text-xs font-bold">
                  2
                </span>
                <h3 className="text-sm font-bold text-purple-900">Payload</h3>
                <span className="text-xs text-purple-500 ml-auto">Claims & data</span>
              </div>
              <pre className="p-4 overflow-x-auto text-xs md:text-sm font-mono leading-relaxed max-h-64">
                <code
                  dangerouslySetInnerHTML={{
                    __html: syntaxHighlight(formatJson(decoded.payload)),
                  }}
                />
              </pre>
            </div>
          </div>

          {/* Signature */}
          <div className="rounded-xl border border-green-200 bg-green-50/50 overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 bg-green-100/60 border-b border-green-200">
              <span className="inline-flex items-center justify-center w-5 h-5 rounded bg-green-500 text-white text-xs font-bold">
                3
              </span>
              <h3 className="text-sm font-bold text-green-900">Signature</h3>
              <span className="text-xs text-green-500 ml-auto">Raw Base64Url</span>
            </div>
            <div className="p-4">
              <code className="block text-xs md:text-sm font-mono text-green-800 break-all">
                {decoded.signature || "(empty)"}
              </code>
            </div>
          </div>

          {/* Key Claims Table */}
          {(claimRows.length > 0 || customClaims.length > 0) && (
            <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
              <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
                <h3 className="text-sm font-bold text-gray-800">Claims Overview</h3>
              </div>
              <div className="divide-y divide-gray-100">
                {claimRows.map(
                  (row) =>
                    row && (
                      <div key={row.key} className="flex flex-col md:flex-row md:items-start gap-1 md:gap-4 px-4 py-3">
                        <div className="md:w-48 flex-shrink-0">
                          <code className="text-xs font-mono text-indigo-600 font-semibold">{row.label}</code>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-gray-700 break-all">{row.value}</p>
                        </div>
                      </div>
                    )
                )}
                {customClaims.length > 0 && claimRows.length > 0 && (
                  <div className="px-4 py-2 bg-gray-50/50">
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Custom Claims</span>
                  </div>
                )}
                {customClaims.map(([key, value]) => (
                  <div key={key} className="flex flex-col md:flex-row md:items-start gap-1 md:gap-4 px-4 py-3">
                    <div className="md:w-48 flex-shrink-0">
                      <code className="text-xs font-mono text-gray-600 font-semibold">{key}</code>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-700 break-all">{formatClaimValue(value)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Algorithm Info */}
          {algorithmInfo && (
            <div className="rounded-xl border border-indigo-200 bg-indigo-50/50 p-4">
              <h3 className="text-sm font-bold text-indigo-900 mb-2">Algorithm Details</h3>
              <div className="flex flex-wrap gap-4">
                <div>
                  <span className="text-xs text-indigo-500">Name</span>
                  <p className="text-sm font-medium text-indigo-800">{algorithmInfo.name}</p>
                </div>
                <div>
                  <span className="text-xs text-indigo-500">Type</span>
                  <p className="text-sm font-medium text-indigo-800">{algorithmInfo.type}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Empty State */}
      {!result && !error && !decoded && (
        <div className="mt-6 p-8 rounded-xl border border-dashed border-gray-300 bg-gray-50/50 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-indigo-100 text-indigo-500 mb-3">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>
          <p className="text-sm text-gray-500">
            Paste a JWT token above or click <span className="font-semibold text-indigo-600">Sample</span> to see it decoded in real-time.
          </p>
          <p className="mt-1 text-xs text-gray-400">
            All decoding happens in your browser — your token never leaves your device.
          </p>
        </div>
      )}
    </div>
  );
}
