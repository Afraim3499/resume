import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Rizwanul Islam (Afraim) - Venture Architect & Systems Orchestrator";
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
                    background: "linear-gradient(to bottom right, #0f172a, #000000)",
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "80px",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        width: "60%",
                    }}
                >
                    <div
                        style={{
                            fontSize: 32,
                            color: "#10b981", // Emerald-500
                            marginBottom: 20,
                            textTransform: "uppercase",
                            letterSpacing: 4,
                            fontWeight: 700,
                        }}
                    >
                        Venture Architect
                    </div>
                    <div
                        style={{
                            fontSize: 72,
                            color: "white",
                            fontWeight: 900,
                            lineHeight: 1.1,
                            marginBottom: 20,
                        }}
                    >
                        Rizwanul Islam (Afraim)
                    </div>
                    <div
                        style={{
                            fontSize: 36,
                            color: "#94a3b8", // Slate-400
                            lineHeight: 1.4,
                        }}
                    >
                        Orchestrating Intelligent Futures & Advanced Systems.
                    </div>
                </div>

                {/* Decorator Circle / Image Placeholder */}
                <div
                    style={{
                        width: "400px",
                        height: "400px",
                        borderRadius: "50%",
                        background: "linear-gradient(45deg, #10b981, #0ea5e9)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        opacity: 0.2,
                        position: "absolute",
                        right: "-50px",
                        bottom: "-50px",
                    }}
                />

                {/* Actual Image if we could load it, but for reliability we use a styled card first. 
            If valid, we can overlay. For now, a clean typographic card is safer and better than "shit".
        */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "300px",
                        height: "300px",
                        borderRadius: "50%",
                        border: "8px solid rgba(255,255,255,0.1)",
                        background: "#1e293b",
                        color: "white",
                        fontSize: 80,
                        fontWeight: "bold",
                    }}
                >
                    RI
                </div>
            </div>
        ),
        {
            ...size,
        }
    );
}
