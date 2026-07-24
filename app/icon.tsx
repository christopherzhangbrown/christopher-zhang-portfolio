import { ImageResponse } from "next/og"

export const size = { width: 32, height: 32 }
export const contentType = "image/png"

export default function Icon() {
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
          fontSize: 16,
          fontWeight: 700,
          letterSpacing: -1,
        }}
      >
        <div
          style={{
            width: 5,
            height: 5,
            borderRadius: "50%",
            background: "#d7b04c",
            marginRight: 3,
            marginBottom: 1,
          }}
        />
        CZ
      </div>
    ),
    { ...size }
  )
}
