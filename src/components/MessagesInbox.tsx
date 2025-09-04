import { useEffect, useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";

type Recipient = "subject-teacher" | "class-teacher" | "admin";

interface StudentMessage {
  id: string;
  name: string;
  email: string;
  recipient: Recipient;
  subject: string;
  message: string;
  timestamp: string | Date;
  status: "sent" | "read" | "replied";
}

export default function MessagesInbox({ recipient, title }: { recipient: Recipient; title: string }) {
  const [messages, setMessages] = useState<StudentMessage[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const raw = localStorage.getItem("studentMessages") || "[]";
    const parsed: StudentMessage[] = JSON.parse(raw).map((m: any) => ({
      ...m,
      timestamp: new Date(m.timestamp),
    }));
    setMessages(parsed);
  }, []);

  const filtered = useMemo(() => {
    const t = searchTerm.toLowerCase();
    return messages.filter(
      (m) =>
        m.recipient === recipient &&
        (m.name.toLowerCase().includes(t) ||
          m.subject.toLowerCase().includes(t) ||
          m.message.toLowerCase().includes(t))
    );
  }, [messages, recipient, searchTerm]);

  const getStatusBadge = (status: StudentMessage["status"]) => {
    if (status === "sent") return <Badge variant="secondary">Sent</Badge>;
    if (status === "read") return <Badge variant="default">Read</Badge>;
    return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Replied</Badge>;
  };

  const handleClearMessages = () => {
    const confirmed = window.confirm("Are you sure you want to clear all messages for this panel?");
    if (!confirmed) return;
    const raw = localStorage.getItem("studentMessages") || "[]";
    const all: StudentMessage[] = JSON.parse(raw);
    const remaining = all.filter((m) => m.recipient !== recipient);
    localStorage.setItem("studentMessages", JSON.stringify(remaining));
    setMessages((prev) => prev.filter((m) => m.recipient !== recipient));
  };

  return (
    <div className="p-4 sm:p-6 space-y-4">
      {/* Header/Search Bar - mobile friendly */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
        <h1 className="text-xl sm:text-2xl font-semibold leading-tight w-full sm:w-auto">
          {title}
        </h1>
        <div className="flex w-full sm:w-auto items-stretch sm:items-center gap-2">
          <input
            className="border rounded-md px-3 py-2 text-sm w-full sm:w-64"
            placeholder="Search by name, subject, message"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            type="button"
            onClick={handleClearMessages}
            className="px-3 py-2 text-sm rounded-md border bg-destructive text-destructive-foreground hover:opacity-90 whitespace-nowrap"
            title="Clear all messages for this panel"
          >
            Clear Messages
          </button>
        </div>
      </div>

      <div className="grid gap-3">
        {filtered.length === 0 ? (
          <div className="text-sm text-muted-foreground">No messages found.</div>
        ) : (
          filtered
            .sort((a, b) => +new Date(b.timestamp) - +new Date(a.timestamp))
            .map((m) => (
              <div key={m.id} className="border rounded-md p-4 bg-card shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="font-medium text-base sm:text-lg break-words">{m.subject}</div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{new Date(m.timestamp).toLocaleString()}</span>
                    {getStatusBadge(m.status)}
                  </div>
                </div>
                <div className="mt-1 text-sm text-muted-foreground break-words">
                  From: {m.name} ({m.email})
                </div>
                <div className="mt-2 text-sm whitespace-pre-wrap break-words">{m.message}</div>
              </div>
            ))
        )}
      </div>
    </div>
  );
}


