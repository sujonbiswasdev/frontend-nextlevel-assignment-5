"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { inviteToEventAction } from "@/actions/invitation.actions";

// TagInput Component
function TagInput({
  tags,
  setTags,
  placeholder = "Enter invitee ID and press Enter or comma",
}: {
  tags: string[];
  setTags: (tags: string[]) => void;
  placeholder?: string;
}) {
  const [input, setInput] = useState("");

  const addTag = (tag: string) => {
    tag = tag.trim();
    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag]);
    }
  };

  const removeTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag(input);
      setInput("");
    } else if (e.key === "Backspace" && input === "" && tags.length > 0) {
      removeTag(tags.length - 1);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-1 border border-gray-300 rounded p-2 min-h-[44px]">
      {tags.map((tag, idx) => (
        <span
          key={tag}
          className="bg-blue-100 text-blue-700 px-2 py-1 rounded flex items-center gap-1"
        >
          {tag}
          <button
            type="button"
            onClick={() => removeTag(idx)}
            className="text-red-600 hover:text-red-700 text-xs"
          >
            &times;
          </button>
        </span>
      ))}
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="flex-1 outline-none min-w-[120px] bg-transparent"
      />
    </div>
  );
}
export default function CreateInvitationForm() {
  const router = useRouter();
  const [eventId, setEventId] = useState("");
  const [inviteeIds, setInviteeIds] = useState<string[]>([]);
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    console.log(eventId,'eventid')
    if (!eventId.trim()) {
      toast.error("Please enter an Event ID");
      return;
    }
    if (inviteeIds.length === 0) {
      toast.error("Please add at least one invitee ID");
      return;
    }

    const toastId = toast.loading("Sending invitation...");
    try {
      const res = await inviteToEventAction({
        eventId,
        inviteeId: inviteeIds,
        message,
      });

      toast.dismiss(toastId);

      if (res.success) {
        toast.success(res.message || "Invitation sent!", { theme: "dark" });
        setInviteeIds([]);
        setMessage("");
        setEventId("");
        router.refresh();
      } else {
        toast.error(res.message || "Failed to send invitation", { theme: "dark" });
      }
    } catch (error: any) {
      toast.dismiss(toastId);
      toast.error(error?.message || "Something went wrong", { theme: "dark" });
    }
  };

  const handleReset = () => {
    setInviteeIds([]);
    setMessage("");
    setEventId("");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 py-6 px-2">
      <Card className="w-full max-w-md shadow-lg rounded-2xl bg-white">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-semibold mb-1">Create Invitation</CardTitle>
          <CardDescription className="text-base text-gray-500">
            Send a new event invitation
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <label className="block mb-2 font-medium" htmlFor="event-id-input">
              Event ID
            </label>
            <Input
              id="event-id-input"
              type="text"
              value={eventId}
              onChange={e => setEventId(e.target.value)}
              placeholder="Enter the event ID"
              className="mb-2"
            />
          </div>
          <div>
            <label className="block mb-2 font-medium">Invitee IDs</label>
            <TagInput tags={inviteeIds} setTags={setInviteeIds} />
            <p className="text-xs text-gray-500 mt-1">
              Add one or more user IDs. Separate by comma or press Enter after each.
            </p>
          </div>
          <div>
            <label className="block mb-2 font-medium">Message (optional)</label>
            <Input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter a message (optional)"
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-2 items-center pt-2">
          <div className="flex w-full gap-2 mt-1">
            <Button variant="outline" onClick={handleReset} className="flex-1">
              Reset
            </Button>
            <Button onClick={handleSubmit} className="flex-1">
              Send Invitation
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}