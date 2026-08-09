import { useRef, useState } from "react";
import { SendHorizontal, Mic, Square } from "lucide-react";
import useSpeechRecognition from "../../hooks/useSpeechRecognition";

/**
 * Auto-growing textarea. Enter sends, Shift+Enter adds a newline.
 * Disabled while the interviewer is "thinking" or the interview is complete.
 */
export default function ChatInput({ onSend, disabled }) {
  const {
    supported: micSupported,
    listening,
    start,
    stop,
  } = useSpeechRecognition({
    onResult: (transcript) => {
      setValue((prev) => (prev ? `${prev} ${transcript}` : transcript));
    },
  });
  const [value, setValue] = useState("");
  const ref = useRef(null);

  const submit = () => {
    const text = value.trim();
    if (!text || disabled) return;
    onSend(text);
    setValue("");
    if (ref.current) ref.current.style.height = "auto";
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  };

  const onChange = (e) => {
    setValue(e.target.value);
    const el = ref.current;
    if (el) {
      el.style.height = "auto";
      el.style.height = `${Math.min(el.scrollHeight, 160)}px`;
    }
  };

  return (
    <div
      className="relative border-t border-[rgba(186,215,247,0.10)] px-4 py-3 backdrop-blur-xl sm:px-6"
      style={{ background: "rgba(5,6,15,0.72)" }}
    >
      {/* Top light-catching hairline */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(216,236,248,0.18), transparent)",
        }}
      />
      <div className="mx-auto flex max-w-3xl items-end gap-2">
        <textarea
          ref={ref}
          rows={1}
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
          disabled={disabled}
          placeholder={
            disabled
              ? "Please wait…"
              : "Type your answer… (Enter to send, Shift+Enter for a new line)"
          }
          className="max-h-40 flex-1 resize-none rounded-2xl border border-[rgba(186,215,247,0.16)] px-4 py-3 text-[15px] leading-relaxed text-[#d8ecf8] placeholder:text-[#9da7ba] transition-colors duration-300 focus:border-[rgba(102,58,243,0.55)] focus:outline-none focus:ring-2 focus:ring-[#663af3]/40 disabled:opacity-60"
          style={{ background: "rgba(199,211,234,0.05)" }}
        />
        {micSupported && (
          <button
            type="button"
            onClick={listening ? stop : start}
            disabled={disabled}
            aria-label={listening ? "Stop recording" : "Speak your answer"}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50"
            style={
              listening
                ? {
                    color: "#ff8fa3",
                    background: "rgba(255,105,120,0.12)",
                    borderColor: "rgba(255,105,120,0.35)",
                    boxShadow: "0 0 20px rgba(255,105,120,0.30)",
                  }
                : {
                    color: "#c7d3ea",
                    background: "rgba(199,211,234,0.05)",
                    borderColor: "rgba(186,215,247,0.16)",
                  }
            }
          >
            {listening ? (
              <Square className="h-4 w-4 animate-pulse" />
            ) : (
              <Mic className="h-5 w-5" />
            )}
          </button>
        )}
        <button
          type="button"
          onClick={submit}
          disabled={disabled || !value.trim()}
          aria-label="Send answer"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-white transition-all duration-300 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
          style={{
            background: "#663af3",
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.22), 0 8px 24px rgba(102,58,243,0.45)",
          }}
        >
          <SendHorizontal className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
