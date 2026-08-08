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
          video: {
            width: 320,
            height: 320,
            facingMode: "user",
          },
          audio: false,
        });

        if (cancelled) {
          stream.getTracks().forEach((t) => t.stop());
          return;
        }

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }

        setStatus("live");
      } catch (err) {
        console.error("Camera error:", err);
        alert(`${err.name}: ${err.message}`);
        setStatus(err?.name === "NotFoundError" ? "unavailable" : "denied");
      }
    }

    start();

    return () => {
      cancelled = true;
      stream?.getTracks().forEach((t) => t.stop());
    };
  }, []);

  if (status === "unavailable" || hidden) {
    return null;
  }

  return (
    <div className="fixed bottom-5 right-5 z-40">
      <div
        className={`relative w-28 h-28 sm:w-36 sm:h-36 rounded-full overflow-hidden border-4 shadow-xl ${
          status === "live" ? "border-indigo-500" : "border-gray-300"
        }`}
      >
        {status === "live" ? (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover scale-x-[-1]"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
            {status === "requesting" ? (
              <Video className="w-8 h-8 animate-pulse" />
            ) : (
              <VideoOff className="w-8 h-8" />
            )}
          </div>
        )}
      </div>

      {status === "denied" && (
        <p className="mt-2 text-xs text-center text-red-500">
          Camera access denied
        </p>
      )}

      {status === "live" && (
        <button
          onClick={() => setHidden(true)}
          className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-white shadow flex items-center justify-center"
        >
          ✕
        </button>
      )}
    </div>
  );
}
