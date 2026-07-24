import { ImageResponse } from "next/og"

export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px 90px",
          background: "#0b0d12",
          backgroundImage:
            "radial-gradient(circle at 78% 28%, rgba(215,176,76,0.16), transparent 55%)",
          color: "#f5f5f5",
          fontFamily: "monospace",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            color: "#8b93a1",
            fontSize: 22,
            letterSpacing: 4,
            textTransform: "uppercase",
            marginBottom: 28,
          }}
        >
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: "#d7b04c",
            }}
          />
          CZ / Portfolio
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 96,
            fontWeight: 700,
            lineHeight: 1.02,
            letterSpacing: -3,
          }}
        >
          <span>Christopher</span>
          <span>Zhang.</span>
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 36,
            fontSize: 28,
            color: "#8b93a1",
            letterSpacing: 0.5,
          }}
        >
          Software Engineer — Brown University
        </div>
      </div>
    ),
    { ...size }
  )
}
