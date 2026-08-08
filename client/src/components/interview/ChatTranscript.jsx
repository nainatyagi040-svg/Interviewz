import { useEffect, useRef, useState } from "react";
import { AlertTriangle, RotateCw, Clock, Repeat } from "lucide-react";
import MessageBubble from "./MessageBubble.jsx";
import TypingIndicator from "./TypingIndicator.jsx";
import { BRAND } from "../../lib/constants.js";

const SLOW_MS = 12_000;

function ErrorRow({ message, onRetry }) {
  return (
    <div className="flex items-start gap-2.5">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-600">
        <AlertTriangle className="h-4 w-4" />
      </div>
      <div className="max-w-[80%] rounded-2xl rounded-bl-md border border-amber-200 bg-amber-50 px-4 py-3 sm:max-w-[70%]">
        <p className="text-sm text-amber-800">
          {message || "Something went wrong."}
        </p>
        <button
          type="button"
          onClick={onRetry}
          className="mt-2 inline-flex items-center gap-1.5 rounded-lg bg-amber-600 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-amber-700"
        >
          <RotateCw className="h-3.5 w-3.5" /> Retry
        </button>
      </div>
    </div>
  );
}

function SlowRow() {
  return (
    <div className="flex items-center justify-center">
      <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3.5 py-1.5 text-xs font-medium text-slate-500">
        <Clock className="h-3.5 w-3.5" /> Still thinking — hang tight, good
        questions take a moment.
      </span>
    </div>
  );
}

export default function ChatTranscript({
  messages,
  status,
  error,
  onRetry,
  questionCount,
}) {
  const endRef = useRef(null);
  const [slow, setSlow] = useState(false);

  const isLoading = status === "loading";
  const isError = status === "error";

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, status]);

  useEffect(() => {
    if (!isLoading) {
      setSlow(false);
      return undefined;
    }
    const id = setTimeout(() => setSlow(true), SLOW_MS);
    return () => clearTimeout(id);
  }, [isLoading, messages.length]);

  return (
    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
      <div className="mx-auto flex max-w-3xl flex-col gap-5">
        <div className="flex items-center justify-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-medium text-slate-500 shadow-soft">
            <Repeat className="h-3.5 w-3.5 text-brand-500" />
            {BRAND.name} interview · Question {Math.max(questionCount, 1)} of
            ~8+
          </span>
        </div>

        {messages.map((msg, i) => (
          <div
            key={i}
            className="animate-[slideUp_0.35s_ease-out]"
            style={{ animationFillMode: "backwards" }}
          >
            <MessageBubble role={msg.role} content={msg.content} />
          </div>
        ))}

        {isLoading && <TypingIndicator />}
        {isLoading && slow && <SlowRow />}
        {isError && <ErrorRow message={error?.message} onRetry={onRetry} />}

        <div ref={endRef} />
      </div>
    </div>
  );
}
