import { useEffect, useMemo, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Repeat, X } from "lucide-react";
import CameraFeed from "../components/interview/CameraFeed";
import useSpeechSynthesis from "../hooks/useSpeechSynthesis";
import { useInterviewStore } from "../store/interviewStore.js";
import { BRAND } from "../lib/constants.js";
import CandidatePicker from "../components/interview/CandidatePicker.jsx";
import ChatTranscript from "../components/interview/ChatTranscript.jsx";
import ChatInput from "../components/interview/ChatInput.jsx";
import FeedbackScreen from "../components/interview/FeedbackScreen.jsx";
import AnimatedBackground from "../components/ui/AnimatedBackground.jsx";
import FloatingSparkles from "../components/ui/FloatingSparkles.jsx";

export default function Interview() {
  const {
    candidate,
    messages,
    status,
    feedback,
    error,
    startInterview,
    sendMessage,
    retryLast,
    reset,
  } = useInterviewStore();

  const { speak } = useSpeechSynthesis();
  const spokenCountRef = useRef(0);

  useEffect(() => {
    const interviewerMsgs = messages.filter((m) => m.role === "interviewer");
    if (interviewerMsgs.length > spokenCountRef.current) {
      const latest = interviewerMsgs[interviewerMsgs.length - 1];
      speak(latest?.content);
      spokenCountRef.current = interviewerMsgs.length;
    }
  }, [messages, speak]);

  const questionCount = useMemo(
    () => messages.filter((m) => m.role === "interviewer").length,
    [messages],
  );

  if (!candidate) {
    return <CandidatePicker onSelect={startInterview} />;
  }

  if (status === "complete") {
    return (
      <FeedbackScreen
        feedback={feedback}
        candidate={candidate}
        onRestart={reset}
      />
    );
  }

  const member = candidate.member ?? {};
  return (
    <div className="relative flex h-screen flex-col bg-slate-50/60">
      <AnimatedBackground />
      <FloatingSparkles />
      <CameraFeed />
      <header className="border-b border-slate-200/80 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-3xl items-center gap-3 px-4 py-3 sm:px-6">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-600 text-white">
            <Repeat className="h-4 w-4" />
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-slate-900">
              {member.name ?? "Candidate"}
            </p>
            <p className="truncate text-xs text-slate-500">
              {member.jobRole ?? BRAND.name}
            </p>
          </div>
          <button
            type="button"
            onClick={reset}
            className="ml-auto inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm font-medium text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
          >
            <X className="h-4 w-4" /> End
          </button>
        </div>
      </header>

      <AnimatePresence mode="wait">
        <motion.div
          key="chat"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex min-h-0 flex-1 flex-col"
        >
          <ChatTranscript
            messages={messages}
            status={status}
            error={error}
            onRetry={retryLast}
            questionCount={questionCount}
          />
          <ChatInput onSend={sendMessage} disabled={status === "loading"} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
