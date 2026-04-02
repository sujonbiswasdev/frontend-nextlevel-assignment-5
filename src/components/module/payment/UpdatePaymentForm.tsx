"use client";

import { updatePaymentStatus } from "@/actions/payment.actions";
<<<<<<< HEAD
import { useRouter } from "next/navigation";
=======
>>>>>>> 2df5e7a (handle update payment)
import { useState } from "react";
import { toast } from "react-toastify";

interface Props {
  id: string;
<<<<<<< HEAD
  onSuccess: (updated: any) => void;
}

const UpdatePaymentStatusForm = ({ id, onSuccess }: Props) => {
  const [status, setStatus] = useState<string>( "");
  const [loading, setLoading] = useState(false);
  const router=useRouter()
=======
  currentStatus: string;
  onSuccess: (updated: any) => void;
}

const UpdatePaymentStatusForm = ({ id, currentStatus, onSuccess }: Props) => {
  const [status, setStatus] = useState<string>(currentStatus || "");
  const [loading, setLoading] = useState(false);
>>>>>>> 2df5e7a (handle update payment)

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!status) {
      toast.error("Please select a status");
      return;
    }

    try {
      setLoading(true);
      const toastId = toast.loading("Updating status...");

      const res = await updatePaymentStatus(id, status);

      toast.dismiss(toastId);

      if (res.success) {
<<<<<<< HEAD
        router.refresh()
        toast.success(res.message || "Status updated successfully");
        onSuccess(res.data);
=======
        toast.success(res.message || "Status updated successfully");
        onSuccess(res.data); // ✅ return updated payment
>>>>>>> 2df5e7a (handle update payment)
      } else {
        toast.error(res.message || "Failed to update status");
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
          Payment Status
        </label>

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full mt-2 border rounded-md p-2.5 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">Select Status</option>
          <option value="PAID">PAID</option>
          <option value="UNPAID">UNPAID</option>
          <option value="FREE">FREE</option>
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

export default UpdatePaymentStatusForm;