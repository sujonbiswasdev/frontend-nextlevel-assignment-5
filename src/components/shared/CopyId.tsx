import React from "react";
import { toast } from "react-toastify";

interface CopyableIdProps {
  id: string;
  displayLength?: number; // how many chars to show
}

export const CopyableId: React.FC<CopyableIdProps> = ({ id, displayLength = 6 }) => {
  const handleCopy = () => {
    const textToCopy = id;
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(textToCopy)
        .then(() => toast.success("ID copied!"))
        .catch(() => toast.error("Failed to copy ID."));
    } else {
      const textArea = document.createElement("textarea");
      textArea.value = textToCopy;
      textArea.style.position = "fixed";
      textArea.style.left = "-9999px";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand("copy");
        toast.success("ID copied!");
      } catch {
        toast.error("Failed to copy ID.");
      }
      document.body.removeChild(textArea);
    }
  };

  return (
    <span
      className="cursor-pointer text-blue-500 hover:underline"
      onClick={handleCopy}
      title="Click to copy ID"
    >
      {id.slice(0, displayLength)}
    </span>
  );
};