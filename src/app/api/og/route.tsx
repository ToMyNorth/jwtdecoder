import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const title = searchParams.get("title") || "JWT Decoder Pro";
    const description =
      searchParams.get("description") ||
      "Free Online JWT Token Parser & Validator";

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#4f46e5",
            backgroundImage:
              "linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #a855f7 100%)",
            padding: "60px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "white",
              borderRadius: "32px",
              padding: "60px 80px",
              width: "1100px",
              height: "530px",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "80px",
                height: "80px",
                backgroundColor: "#4f46e5",
                borderRadius: "20px",
                marginBottom: "30px",
              }}
            >
              <span
                style={{
                  fontSize: "48px",
                  fontWeight: "bold",
                  color: "white",
                }}
              >
                JWT
              </span>
            </div>
            <h1
              style={{
                fontSize: "60px",
                fontWeight: "bold",
                color: "#1f2937",
                textAlign: "center",
                marginBottom: "20px",
                lineHeight: 1.2,
              }}
            >
              {title}
            </h1>
            <p
              style={{
                fontSize: "32px",
                color: "#6b7280",
                textAlign: "center",
                maxWidth: "900px",
              }}
            >
              {description}
            </p>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: "40px",
                fontSize: "24px",
                color: "#4f46e5",
                fontWeight: "600",
              }}
            >
              <span>easyjwt.top</span>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e) {
    return new Response(`Failed to generate image: ${e}`, {
      status: 500,
    });
  }
}
