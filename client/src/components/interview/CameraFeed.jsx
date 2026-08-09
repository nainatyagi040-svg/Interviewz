import { useEffect, useRef, useState } from "react";
import { Video, VideoOff } from "lucide-react";

export default function CameraFeed() {
  const videoRef = useRef(null);
  const [status, setStatus] = useState("requesting");
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let stream;
    let cancelled = false;

    async function start() {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { width: 320, height: 320, facingMode: "user" },
          audio: false,
        });
        if (cancelled) {
          stream.getTracks().forEach((t) => t.stop());
          return;
        }
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play().catch(() => {});
        }
        setStatus("live");
      } catch (err) {
        setStatus(err?.name === "NotFoundError" ? "unavailable" : "denied");
      }
    }

    start();

    return () => {
      cancelled = true;
      stream?.getTracks().forEach((t) => t.stop());
    };
  }, []);

  if (status === "unavailable" || hidden) return null;

  return (
    <div className="fixed bottom-24 right-6 z-40">
      <div
        className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full overflow-hidden border-2 transition-all duration-500"
        style={{
          borderColor:
            status === "live"
              ? "rgba(102,58,243,0.70)"
              : "rgba(186,215,247,0.20)",
          boxShadow:
            status === "live"
              ? "inset 0 1px 1px rgba(216,236,248,0.16), 0 0 28px rgba(102,58,243,0.45), 0 18px 40px rgba(6,6,14,0.6)"
              : "inset 0 1px 1px rgba(216,236,248,0.12), 0 18px 40px rgba(6,6,14,0.6)",
        }}
      >
        {status === "live" && (
          <span
            className="absolute inset-0 rounded-full animate-pulse pointer-events-none"
            style={{ boxShadow: "0 0 0 4px rgba(102,58,243,0.30)" }}
          />
        )}

        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-full h-full object-cover scale-x-[-1]"
          style={{ display: status === "live" ? "block" : "none" }}
        />

        {status !== "live" && (
          <div
            className="w-full h-full flex items-center justify-center text-[#9da7ba]"
            style={{ background: "rgba(199,211,234,0.06)" }}
          >
            {status === "requesting" ? (
              <Video className="w-6 h-6 animate-pulse" />
            ) : (
              <VideoOff className="w-6 h-6" />
            )}
          </div>
        )}
      </div>

      {status === "denied" && (
        <p className="mt-1 text-[10px] text-center text-[#9da7ba] max-w-[130px]">
          Camera access denied — interview still works fine.
        </p>
      )}

      {status === "live" && (
        <button
          onClick={() => setHidden(true)}
          className="absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-[#c7d3ea] backdrop-blur-xl transition-colors duration-300 hover:text-[#d8ecf8]"
          style={{
            background: "rgba(5,6,15,0.82)",
            border: "1px solid rgba(186,215,247,0.16)",
            boxShadow: "inset 0 1px 0 rgba(216,236,248,0.14)",
          }}
          aria-label="Hide camera"
        >
          ✕
        </button>
      )}
    </div>
  );
}
