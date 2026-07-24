import { ImageResponse } from "next/og"

export const size = { width: 180, height: 180 }
export const contentType = "image/png"

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0b0d12",
          color: "#f5f5f5",
          fontFamily: "monospace",
          fontSize: 64,
          fontWeight: 700,
          letterSpacing: -3,
        }}
      >
        <div
          style={{
            width: 18,
            height: 18,
            borderRadius: "50%",
            background: "#d7b04c",
            marginRight: 10,
            marginBottom: 4,
          }}
        />
        CZ
      </div>
    ),
    { ...size }
  )
}
