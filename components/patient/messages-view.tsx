"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import type { Patient } from "@/lib/types";

interface Message {
  id: string;
  content: string;
  sender: "patient" | "bot" | "clinician";
  timestamp: string;
}

interface MessagesViewProps {
  patient: Patient;
}

// Mock messages data
const generateMockMessages = (patientName: string): Message[] => [
  {
    id: "1",
    content: "Good morning! Time for your daily exercises. Ready to get started?",
    sender: "bot",
    timestamp: "9:00 AM",
  },
  {
    id: "2",
    content: "Yes, I'm ready!",
    sender: "patient",
    timestamp: "9:05 AM",
  },
  {
    id: "3",
    content: "Great! Let's start with the stretching exercises. How are you feeling today on a scale of 0-10?",
    sender: "bot",
    timestamp: "9:05 AM",
  },
  {
    id: "4",
    content: "About a 3 today, feeling much better than last week",
    sender: "patient",
    timestamp: "9:08 AM",
  },
  {
    id: "5",
    content: "That's wonderful progress! 🎉 Let's continue with Exercise 1: Shoulder rolls. Do 10 repetitions in each direction.",
    sender: "bot",
    timestamp: "9:08 AM",
  },
  {
    id: "6",
    content: "Done! Those felt good.",
    sender: "patient",
    timestamp: "9:15 AM",
  },
  {
    id: "7",
    content: "Excellent work! Now for Exercise 2: Wall push-ups. Aim for 2 sets of 10.",
    sender: "bot",
    timestamp: "9:15 AM",
  },
  {
    id: "8",
    content: "Is it normal to feel tightness after the stretches?",
    sender: "patient",
    timestamp: "9:20 AM",
  },
  {
    id: "9",
    content: "Some tightness is normal after stretching, especially if you haven't stretched in a while. If the tightness is painful or persists for more than 30 minutes, please let your physiotherapist know.",
    sender: "bot",
    timestamp: "9:20 AM",
  },
  {
    id: "10",
    content: `Hi ${patientName.split(" ")[0]}, I saw your question about tightness. That's completely normal at this stage. Keep up the great work!`,
    sender: "clinician",
    timestamp: "10:30 AM",
  },
];

export function MessagesView({ patient }: MessagesViewProps) {
  const [messages] = useState<Message[]>(() => generateMockMessages(patient.name));
  const [newMessage, setNewMessage] = useState("");

  const handleSend = () => {
    if (!newMessage.trim()) return;
    
    toast({
      title: "Message sent",
      description: `Your message has been sent to ${patient.name}`,
    });
    setNewMessage("");
  };

  return (
    <Card className="flex h-[500px] flex-col">
      {/* Messages List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "flex",
              message.sender === "patient" ? "justify-start" : "justify-end"
            )}
          >
            <div
              className={cn(
                "max-w-[80%] rounded-2xl px-4 py-2",
                message.sender === "patient" &&
                  "bg-muted text-foreground rounded-bl-none",
                message.sender === "bot" &&
                  "bg-primary/10 text-foreground rounded-br-none",
                message.sender === "clinician" &&
                  "bg-primary text-primary-foreground rounded-br-none"
              )}
            >
              {message.sender !== "patient" && (
                <p className={cn(
                  "text-[10px] font-medium uppercase tracking-wide mb-1",
                  message.sender === "clinician" ? "text-primary-foreground/70" : "text-muted-foreground"
                )}>
                  {message.sender === "bot" ? "Pocket Physio" : "Dr. Jane Doe"}
                </p>
              )}
              <p className="text-sm">{message.content}</p>
              <p
                className={cn(
                  "mt-1 text-[10px]",
                  message.sender === "clinician"
                    ? "text-primary-foreground/70"
                    : "text-muted-foreground"
                )}
              >
                {message.timestamp}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Message Input */}
      <div className="border-t border-border p-4">
        <div className="flex gap-2">
          <Input
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            className="flex-1"
          />
          <Button onClick={handleSend} disabled={!newMessage.trim()}>
            <Send className="h-4 w-4" />
            <span className="sr-only">Send message</span>
          </Button>
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          Messages are sent via WhatsApp
        </p>
      </div>
    </Card>
  );
}
