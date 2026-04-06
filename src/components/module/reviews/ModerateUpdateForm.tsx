"use client";

import { moderateReview } from "@/actions/review.actions";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

interface Props {
  id: string;
  onSuccess: (updated: any) => void;
}

const ModerateUpdateForm = ({ id, onSuccess }: Props) => {
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!status) {
      toast.error("Please select a moderation status");
      return;
    }

    try {
      setLoading(true);
      const toastId = toast.loading("Updating moderation status...");

      const res = await moderateReview(id, {status} );

      toast.dismiss(toastId);

      if (res.success) {
        router.refresh();
        toast.success(res.message || "Review status updated successfully");
        onSuccess(res.data);
      } else {
        toast.error(res.message || "Failed to update review status");
      }
    } catch (err: any) {
      toast.dismiss();
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 px-6 py-6">
      <div>
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Moderation Status
        </label>

        <select
          value={status }
          onChange={(e) => setStatus(e.target.value)}
          className="w-full mt-2 border rounded-md p-2.5 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">Select Status</option>
          <option value="PENDING">PENDING</option>
          <option value="APPROVED">APPROVED</option>
          <option value="REJECTED">REJECTED</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-indigo-600 text-white py-2.5 rounded-md hover:bg-indigo-700 transition"
      >
        {loading ? "Updating..." : "Update Status"}
      </button>
    </form>
  );
};

export default ModerateUpdateForm;