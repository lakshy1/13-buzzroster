import type { ReactNode } from "react";

type Conversation = {
  name: string;
  preview: string;
  time: string;
  unread?: string;
  tone: string;
  status: string;
  active?: boolean;
};

type ChatBubble = {
  side: "left" | "right";
  message: string;
  time: string;
};

const conversations: Conversation[] = [
  {
    name: "Ananya Sharma",
    preview: "Hey! Loved the brief. I'd love to collab...",
    time: "2m",
    unread: "1",
    tone: "from-[#f2c1b5] via-[#f8d7cf] to-[#d7a1b7]",
    status: "#86efac",
    active: true,
  },
  {
    name: "Rahul Verma",
    preview: "Sure, I can deliver by next week.",
    time: "1h",
    tone: "from-[#8b5cf6] via-[#a78bfa] to-[#c4b5fd]",
    status: "#fbbf24",
  },
  {
    name: "Kritika Mehta",
    preview: "Can you share more details?",
    time: "3h",
    tone: "from-[#f2c1b5] via-[#e9b9d6] to-[#cc90bb]",
    status: "#f472b6",
  },
  {
    name: "Aditya Iyer",
    preview: "Thanks! Looking forward to it.",
    time: "1d",
    tone: "from-[#5f4030] via-[#a77b61] to-[#d3b18d]",
    status: "#86efac",
  },
  {
    name: "Neha Kapoor",
    preview: "Okay, sounds good.",
    time: "2d",
    tone: "from-[#d8b39c] via-[#c99f84] to-[#f3d0b8]",
    status: "#f59e0b",
  },
];

const messages: ChatBubble[] = [
  {
    side: "right",
    message: "Hey Ananya! Loved your content. Would you be interested in our upcoming campaign?",
    time: "10:30 AM",
  },
  {
    side: "left",
    message: "Hey! Loved the brief. I'd love to collaborate.",
    time: "10:32 AM",
  },
  {
    side: "right",
    message: "Great! Let's connect on a quick call.",
    time: "10:33 AM",
  },
];

function Avatar({
  name,
  tone,
  dotColor = "#84cc16",
}: {
  name: string;
  tone: string;
  dotColor?: string;
}) {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <span
      className={`relative flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br ${tone} text-[0.85rem] font-semibold text-white shadow-[0_10px_24px_rgba(0,0,0,0.22)]`}
    >
      <span className="relative z-10">{initials}</span>
      <span
        className="absolute -right-0.5 -bottom-0.5 h-3.5 w-3.5 rounded-full border-2 border-[#101014]"
        style={{ backgroundColor: dotColor }}
      />
    </span>
  );
}

function IconButton({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full text-foreground/70 transition-colors hover:bg-black/[0.04] hover:text-foreground dark:text-white/80 dark:hover:bg-white/[0.05] dark:hover:text-white"
    >
      {children}
    </button>
  );
}

function SearchIcon({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className={className}>
      <path d="m20 20-4.2-4.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="10.5" cy="10.5" r="5.75" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function PhoneIcon({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M8.5 4.5c.7-.7 1.8-.7 2.5 0l1.7 1.7c.5.5.6 1.2.3 1.8l-1 2.1c-.2.5-.1 1 .3 1.4l2.7 2.7c.4.4.9.5 1.4.3l2.1-1c.6-.3 1.3-.2 1.8.3l1.7 1.7c.7.7.7 1.8 0 2.5l-1.3 1.3c-.9.9-2.3 1.2-3.5.7-2.9-1.1-5.7-2.8-8.3-5.4-2.6-2.6-4.3-5.4-5.4-8.3-.5-1.2-.2-2.6.7-3.5L8.5 4.5Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function VideoIcon({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="3.75" y="6" width="12.5" height="12" rx="2.25" stroke="currentColor" strokeWidth="1.8" />
      <path d="m16.25 10 4-2.75v9.5l-4-2.75" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  );
}

function MoreIcon({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="5" cy="12" r="1.6" fill="currentColor" />
      <circle cx="12" cy="12" r="1.6" fill="currentColor" />
      <circle cx="19" cy="12" r="1.6" fill="currentColor" />
    </svg>
  );
}

function PaperclipIcon({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M15 8.5 9.7 13.8a2.75 2.75 0 1 0 3.9 3.9l6-6a5.25 5.25 0 0 0-7.42-7.42L5.8 10.65a7.5 7.5 0 1 0 10.61 10.61l4.16-4.16"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SmileIcon({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="12" r="8.25" stroke="currentColor" strokeWidth="1.8" />
      <path d="M9 14.2c.8 1 1.8 1.5 3 1.5s2.2-.5 3-1.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M9 10h.01M15 10h.01" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

function ArrowRightIcon({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M5 12h11" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
      <path d="m12 7 5 5-5 5" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function MessagesPage() {
  return (
    <div className="flex h-full min-h-[calc(100vh-8rem)] w-full">
      <section className="flex h-full min-h-0 w-full overflow-hidden rounded-[2rem] border border-border/70 bg-[linear-gradient(180deg,rgba(245,244,246,0.96),rgba(234,232,236,0.98))] shadow-[0_24px_70px_rgba(20,20,35,0.06)] dark:border-white/10 dark:bg-[linear-gradient(180deg,rgba(7,7,8,0.98),rgba(9,9,11,0.96))] dark:shadow-[0_28px_90px_rgba(0,0,0,0.62)]">
        <div className="grid h-full min-h-0 w-full lg:grid-cols-[390px_minmax(0,1fr)]">
          <aside className="flex min-h-0 flex-col border-b border-white/50 bg-[linear-gradient(180deg,rgba(248,247,249,0.98),rgba(239,237,241,0.98))] lg:border-b-0 lg:border-r dark:border-white/10 dark:bg-[#08080a]">
            <div className="flex items-center justify-between px-6 py-5">
              <h1 className="text-[1.9rem] font-semibold tracking-[-0.05em] text-white drop-shadow-[0_1px_0_rgba(0,0,0,0.12)] dark:text-white">
                Messages
              </h1>
              <button
                type="button"
                aria-label="Search messages"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/45 bg-white/55 text-white/80 shadow-[0_10px_24px_rgba(20,20,35,0.06)] transition-colors hover:bg-white/75 hover:text-white dark:border-white/10 dark:bg-transparent dark:text-white/85 dark:hover:bg-white/[0.05] dark:hover:text-white"
              >
                <SearchIcon className="h-5 w-5" />
              </button>
            </div>

            <div className="border-y border-white/50 px-5 py-4 dark:border-white/10">
              <div className="flex h-14 items-center gap-3 rounded-[1.15rem] border border-white/65 bg-white/48 px-4 text-white/70 shadow-[0_10px_24px_rgba(20,20,35,0.04)] backdrop-blur-sm dark:border-white/6 dark:bg-white/[0.03] dark:text-white/35">
                <SearchIcon className="h-5 w-5 shrink-0" />
                <span className="text-[0.98rem] font-medium">Search conversations...</span>
              </div>
            </div>

            <div className="flex flex-1 flex-col justify-between px-3 py-3">
              <div className="space-y-1">
                {conversations.map((conversation) => (
                  <button
                    key={conversation.name}
                    type="button"
                    className={`flex w-full items-center gap-3 rounded-[1.25rem] px-3.5 py-3.5 text-left transition-all ${
                      conversation.active
                        ? "bg-[linear-gradient(135deg,rgba(123,92,214,0.78),rgba(49,43,67,0.98))] shadow-[0_16px_34px_rgba(109,68,236,0.18)] dark:bg-[linear-gradient(135deg,rgba(92,46,225,0.3),rgba(20,16,28,0.9))] dark:shadow-[0_16px_34px_rgba(88,44,216,0.16)]"
                        : "hover:bg-white/50 dark:hover:bg-white/[0.04]"
                    }`}
                  >
                    <Avatar name={conversation.name} tone={conversation.tone} dotColor={conversation.status} />

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-3">
                        <span className="truncate text-[0.98rem] font-semibold tracking-[-0.02em] text-white">
                          {conversation.name}
                        </span>
                        <span className="shrink-0 text-[0.78rem] text-white/45">{conversation.time}</span>
                      </div>
                      <p className="mt-1 truncate text-[0.92rem] leading-6 text-white/55">
                        {conversation.preview}
                      </p>
                    </div>

                    {conversation.unread ? (
                      <span className="flex h-7 min-w-7 items-center justify-center rounded-full bg-[#6f3df4] px-2 text-[0.72rem] font-semibold text-white shadow-[0_0_18px_rgba(124,58,237,0.28)]">
                        {conversation.unread}
                      </span>
                    ) : null}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          <div className="flex min-h-0 flex-1 flex-col bg-[linear-gradient(180deg,rgba(232,229,234,0.98),rgba(220,218,224,0.98))] dark:bg-[#09090b]">
            <header className="flex items-center justify-between border-b border-black/5 px-6 py-5 sm:px-7 dark:border-white/10">
              <div className="flex items-center gap-4">
                <Avatar name="Ananya Sharma" tone="from-[#f4cec5] via-[#f3d7d0] to-[#e7bfc4]" dotColor="#86efac" />
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-[1.15rem] font-semibold tracking-[-0.03em] text-white drop-shadow-[0_1px_0_rgba(0,0,0,0.12)] dark:text-white">
                      Ananya Sharma
                    </h2>
                    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#6f3df4] text-[0.65rem] font-semibold text-white shadow-[0_0_10px_rgba(111,61,244,0.35)]">
                      ✓
                    </span>
                  </div>
                  <p className="mt-0.5 text-[0.95rem] font-medium text-[#77cb72]">Active now</p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-white/80">
                <IconButton label="Call">
                  <PhoneIcon className="h-5 w-5" />
                </IconButton>
                <IconButton label="Video call">
                  <VideoIcon className="h-5 w-5" />
                </IconButton>
                <IconButton label="More options">
                  <MoreIcon className="h-5 w-5" />
                </IconButton>
              </div>
            </header>

            <div className="flex min-h-0 flex-1 flex-col px-5 py-6 sm:px-7">
              <div className="flex flex-1 flex-col justify-center gap-12 py-8">
                {messages.map((message, index) => {
                  if (message.side === "right") {
                    return (
                      <div key={`${message.time}-${index}`} className="ml-auto flex max-w-[72%] flex-col items-end gap-2">
                        <div className="rounded-[1.65rem] rounded-br-[0.6rem] bg-[linear-gradient(135deg,#5d22e6_0%,#6e28ee_58%,#7f3bf3_100%)] px-7 py-5 text-[1.02rem] leading-[1.6] tracking-[-0.01em] text-white shadow-[0_18px_38px_rgba(92,46,225,0.28)]">
                          {message.message}
                        </div>
                        <div className="pr-1 text-[0.82rem] text-white/35 dark:text-white/38">
                          {message.time} &rarr;
                        </div>
                      </div>
                    );
                  }

                  return (
                    <div key={`${message.time}-${index}`} className="flex max-w-[72%] items-end gap-3">
                      <Avatar name="Ananya Sharma" tone="from-[#f4cec5] via-[#f3d7d0] to-[#e7bfc4]" dotColor="#86efac" />
                      <div className="flex flex-col gap-2">
                        <div className="rounded-[1.65rem] rounded-bl-[0.6rem] bg-[#17181b] px-7 py-5 text-[1.02rem] leading-[1.6] tracking-[-0.01em] text-white/90 shadow-[0_14px_28px_rgba(0,0,0,0.24)] dark:bg-[#19191d] dark:text-white/88 dark:shadow-[0_14px_28px_rgba(0,0,0,0.32)]">
                          {message.message}
                        </div>
                        <div className="pl-2 text-[0.82rem] text-white/30 dark:text-white/32">
                          {message.time}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 rounded-[1.65rem] border border-black/5 bg-[#111114] px-4 py-4 shadow-[0_18px_40px_rgba(20,20,35,0.08)] dark:border-white/8 dark:bg-[#0d0d10] dark:shadow-[0_18px_40px_rgba(0,0,0,0.35)]">
                <div className="flex items-center gap-4">
                  <input
                    aria-label="Type a message"
                    placeholder="Type a message..."
                    className="min-w-0 flex-1 bg-transparent text-[1rem] text-white outline-none placeholder:text-white/30"
                  />
                  <div className="flex items-center gap-1.5 text-white/80">
                    <button
                      type="button"
                      aria-label="Attach file"
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-white/[0.06] hover:text-white"
                    >
                      <PaperclipIcon className="h-5 w-5" />
                    </button>
                    <button
                      type="button"
                      aria-label="Emoji picker"
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-white/[0.06] hover:text-white"
                    >
                      <SmileIcon className="h-5 w-5" />
                    </button>
                    <button
                      type="button"
                      aria-label="Send message"
                      className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-[linear-gradient(135deg,#7c3aed_0%,#9333ea_100%)] text-white shadow-[0_16px_28px_rgba(124,58,237,0.38)] transition-transform hover:-translate-y-0.5"
                    >
                      <ArrowRightIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
