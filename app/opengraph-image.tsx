import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt =
  "Landmark Technologies - DevOps E. Degree Training Since 2005";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 128,
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontFamily: "system-ui, sans-serif",
          padding: "80px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "40px",
          }}
        >
          <div
            style={{
              fontSize: 160,
              fontWeight: "bold",
              background: "white",
              color: "#667eea",
              padding: "20px 40px",
              borderRadius: "20px",
            }}
          >
            LT
          </div>
        </div>
        <div
          style={{
            fontSize: 72,
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: "20px",
          }}
        >
          Landmark Technologies
        </div>
        <div
          style={{
            fontSize: 40,
            opacity: 0.9,
            textAlign: "center",
            marginBottom: "20px",
          }}
        >
          DevOps E. Degree Training
        </div>
        <div style={{ fontSize: 32, opacity: 0.8, textAlign: "center" }}>
          Since 2005 • 5,000+ Graduates • 95% Job Placement
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
