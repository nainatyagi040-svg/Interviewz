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
    <div className="border-t border-slate-200/80 bg-white/80 px-4 py-3 backdrop-blur sm:px-6">
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
          className="max-h-40 flex-1 resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 text-[15px] leading-relaxed text-slate-800 placeholder:text-slate-400 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100 disabled:bg-slate-50"
        />
        {micSupported && (
          <button
            type="button"
            onClick={listening ? stop : start}
            disabled={disabled}
            aria-label={listening ? "Stop recording" : "Speak your answer"}
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border transition disabled:cursor-not-allowed disabled:opacity-50 ${
              listening
                ? "border-red-300 bg-red-50 text-red-600 animate-pulse"
                : "border-slate-200 bg-white text-slate-500 hover:bg-slate-50"
            }`}
          >
            {listening ? (
              <Square className="h-4 w-4" />
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
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-brand-600 text-white transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <SendHorizontal className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
