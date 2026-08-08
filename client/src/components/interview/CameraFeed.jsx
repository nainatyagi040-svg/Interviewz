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
        className={`relative w-28 h-28 sm:w-36 sm:h-36 rounded-full overflow-hidden border-4 shadow-xl transition-all duration-500 ${
          status === "live" ? "border-indigo-500" : "border-gray-300"
        }`}
      >
        {status === "live" && (
          <span className="absolute inset-0 rounded-full ring-4 ring-indigo-400/40 animate-pulse pointer-events-none" />
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
          <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
            {status === "requesting" ? (
              <Video className="w-6 h-6 animate-pulse" />
            ) : (
              <VideoOff className="w-6 h-6" />
            )}
          </div>
        )}
      </div>

      {status === "denied" && (
        <p className="mt-1 text-[10px] text-center text-gray-400 max-w-[130px]">
          Camera access denied — interview still works fine.
        </p>
      )}

      {status === "live" && (
        <button
          onClick={() => setHidden(true)}
          className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-white shadow flex items-center justify-center text-gray-500 hover:text-gray-700"
          aria-label="Hide camera"
        >
          ✕
        </button>
      )}
    </div>
  );
}
