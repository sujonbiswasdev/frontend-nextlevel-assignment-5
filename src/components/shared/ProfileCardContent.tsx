"use client";
import { Pencil } from "lucide-react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Status, StatusIndicator, StatusLabel } from "../ui/status";
import { IBaseUser, TUpdateUserInput } from "@/types/user.types";

function ProfileUserInfo({ user }: { user: IBaseUser }) {
  const router = useRouter();
  const [useinfo, setuserinfo] = useState<IBaseUser>({ ...user });
  const [inputvalue, setinputvalue] = useState<Partial<TUpdateUserInput>>({});
  const [editfield, seteditfield] = useState<"" | "image" | "bgimage" | "name" | "phone" | "isActive">("");
  const defaultProfile = "https://images.pexels.com/photos/952670/pexels-photo-952670.jpeg";

  useEffect(() => {
    if (!user) {
      toast.error("user not found", { autoClose: 2000, theme: "colored" });
      router.push("/");
    }
  }, [user]);

  // Color Palette
  const accent = "indigo";
  const accentDark = "indigo-700";
  const inputBorder = "border-neutral-200";
  const labelColor = "text-neutral-600";
  const cardBg = "bg-white";
  const shadow = "shadow-lg";
  const sectionRadius = "rounded-2xl";

  return (
    <section className={`w-full max-w-2xl mx-auto mt-8 mb-8 ${cardBg} ${sectionRadius} ${shadow} border border-neutral-100 transition-all`}>
      {/* Profile Header with Background */}
      <div
        className={`relative min-h-[160px] sm:min-h-[200px] md:min-h-[240px] bg-cover bg-center flex items-end justify-center`}
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(30,41,59,0.17), rgba(255,255,255,0.01)), url(${
            inputvalue.bgimage ||
            useinfo.bgimage ||
            "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=1200&q=80"
          })`,
        }}
      >
        {/* Edit background button */}
        <button
          className="absolute top-6 right-8 bg-white hover:bg-indigo-100 border border-indigo-100 rounded-full p-2 transition z-10 shadow-md"
          onClick={() => seteditfield("bgimage")}
          aria-label="Edit background"
          style={{ display: editfield === "bgimage" ? "none" : undefined }}
        >
          <Pencil className="w-5 h-5 text-indigo-700" />
        </button>
        {editfield === "bgimage" && (
          <div className="absolute top-6 right-8 bg-white p-5 rounded-xl shadow-lg border border-neutral-100 w-[95vw] max-w-md z-30 flex flex-col sm:flex-row gap-4 items-center">
            <Input
              className={`flex-1 min-w-[120px] ${inputBorder}`}
              value={inputvalue.bgimage ?? ""}
              onChange={(e) => setinputvalue({ ...inputvalue, bgimage: e.target.value })}
              placeholder="Paste header image URL"
            />
            <div className="flex gap-2 mt-2 sm:mt-0">
              <button
                className="px-4 py-2 rounded-md bg-neutral-100 hover:bg-neutral-200 text-neutral-700 border border-neutral-200 text-xs font-medium"
                onClick={() => seteditfield("")}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white border border-indigo-700 text-xs font-semibold"
                onClick={() => {
                  setuserinfo((prev) => ({
                    ...prev,
                    bgimage: inputvalue.bgimage ?? "",
                  }));
                  seteditfield("");
                }}
              >
                Save
              </button>
            </div>
          </div>
        )}
        {/* Profile Avatar */}
        <div className="absolute left-1/2 -translate-x-1/2 translate-y-1/2 z-30 flex flex-col items-center">
          <div className="relative group rounded-full bg-white p-2 shadow-xl border-4 border-white">
            <img
              src={useinfo.image || defaultProfile}
              alt="profile"
              className="w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 object-cover rounded-full border-2 border-white ring-2 ring-indigo-200"
            />
            {/* Edit image button */}
            <button
              className="absolute bottom-2 right-2 bg-white hover:bg-indigo-100 border border-indigo-100 rounded-full p-2 shadow-md transition"
              onClick={() => seteditfield("image")}
              aria-label="Edit image"
              style={{ display: editfield === "image" ? "none" : undefined }}
            >
              <Pencil className="w-5 h-5 text-indigo-700" />
            </button>
            {editfield === "image" && (
              <div className="absolute left-1/2 top-[120%] -translate-x-1/2 z-20 flex flex-col bg-white border border-neutral-200 shadow-lg rounded-xl w-72 max-w-xs p-4 gap-3">
                <Input
                  value={inputvalue.image ?? ""}
                  onChange={e => setinputvalue({ ...inputvalue, image: e.target.value })}
                  placeholder="Paste profile image URL"
                  className={`w-full ${inputBorder}`}
                />
                <div className="flex gap-2 justify-end">
                  <button
                    className="px-4 py-2 rounded bg-neutral-100 hover:bg-neutral-200 text-neutral-700 border border-neutral-200 text-xs font-medium"
                    onClick={() => seteditfield("")}
                  >
                    Cancel
                  </button>
                  <button
                    className="px-4 py-2 rounded bg-indigo-600 hover:bg-indigo-700 text-white border-none text-xs font-semibold"
                    onClick={() => {
                      setuserinfo((prev) => ({ ...prev, image: inputvalue.image ?? "" }));
                      seteditfield("");
                    }}
                  >
                    Save
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Details Card */}
      <div className="relative pt-24 pb-10 px-5 sm:px-10 md:px-14 bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
          {/* Name */}
          <div>
            <Label className={`block text-xs font-semibold ${labelColor} uppercase mb-2`}>
              Full Name
            </Label>
            <div className="flex items-center gap-4">
              {editfield !== "name" ? (
                <>
                  <span className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">{useinfo.name}</span>
                  <button
                    className="ml-2 p-2 rounded-full border border-indigo-100 bg-white hover:bg-indigo-50 transition shadow-sm"
                    onClick={() => seteditfield("name")}
                    aria-label="Edit name"
                  >
                    <Pencil className="w-4 h-4 text-indigo-700" />
                  </button>
                </>
              ) : (
                <>
                  <Input
                    value={inputvalue.name ?? ""}
                    onChange={(e) => setinputvalue({ ...inputvalue, name: e.target.value })}
                    placeholder="Enter your name"
                    className={`w-44 ${inputBorder}`}
                  />
                  <div className="flex gap-2 ml-2">
                    <button
                      className="px-4 py-2 rounded bg-neutral-100 hover:bg-neutral-200 text-neutral-700 border border-neutral-200 text-xs font-medium"
                      onClick={() => seteditfield("")}
                    >
                      Cancel
                    </button>
                    <button
                      className="px-4 py-2 rounded bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold"
                      onClick={() => {
                        setuserinfo((prev) => ({ ...prev, name: inputvalue.name ?? "" }));
                        seteditfield("");
                      }}
                    >
                      Save
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
          {/* Email */}
          <div>
            <Label className={`block text-xs font-semibold ${labelColor} uppercase mb-2`}>
              Email Address
            </Label>
            <div className="font-medium text-base text-gray-800 truncate">{user.email}</div>
          </div>
          {/* Phone */}
          <div>
            <Label className={`block text-xs font-semibold ${labelColor} uppercase mb-2`}>
              Phone
            </Label>
            <div className="flex items-center gap-4">
              {editfield !== "phone" ? (
                <>
                  <span className="text-base text-gray-800 font-medium">
                    {useinfo.phone || "017********"}
                  </span>
                  <button
                    className="p-2 rounded-full border border-indigo-100 bg-white hover:bg-indigo-50 transition shadow-sm"
                    onClick={() => seteditfield("phone")}
                    aria-label="Edit phone"
                  >
                    <Pencil className="w-4 h-4 text-indigo-700" />
                  </button>
                </>
              ) : (
                <>
                  <Input
                    type="tel"
                    value={inputvalue.phone ?? ""}
                    onChange={(e) =>
                      setinputvalue({ ...inputvalue, phone: e.target.value })
                    }
                    placeholder="Enter your phone number"
                    className={`w-44 ${inputBorder}`}
                  />
                  <div className="flex gap-2 ml-2">
                    <button
                      className="px-4 py-2 rounded bg-neutral-100 hover:bg-neutral-200 text-neutral-700 border border-neutral-200 text-xs font-medium"
                      onClick={() => seteditfield("")}
                    >
                      Cancel
                    </button>
                    <button
                      className="px-4 py-2 rounded bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold"
                      onClick={() => {
                        setuserinfo((prev) => ({ ...prev, phone: inputvalue.phone ?? "" }));
                        seteditfield("");
                      }}
                    >
                      Save
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
          {/* Role */}
          <div>
            <Label className={`block text-xs font-semibold ${labelColor} uppercase mb-2`}>
              Role
            </Label>
            <span className="font-semibold uppercase text-indigo-700 bg-indigo-100 px-3 py-1.5 rounded text-xs shadow">{user.role as string}</span>
          </div>
          {/* Status */}
          <div>
            <Label className={`block text-xs font-semibold ${labelColor} uppercase mb-2`}>
              Status
            </Label>
            <div className="text-sm mt-1">
              {user.status === "ACTIVE" && (
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-green-100 text-green-700 font-semibold border border-green-200">
                  <span className="w-3 h-3 rounded-full bg-green-500 mr-1"></span>
                  Active
                </span>
              )}
              {user.status === "BLOCKED" && (
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-yellow-100 text-yellow-800 font-semibold border border-yellow-300">
                  <span className="w-3 h-3 rounded-full bg-yellow-400 mr-1"></span>
                  Blocked
                </span>
              )}
              {user.status === "DELETED" && (
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-100 text-red-700 font-semibold border border-red-200">
                  <span className="w-3 h-3 rounded-full bg-red-400 mr-1"></span>
                  Deleted
                </span>
              )}
            </div>
          </div>
          {/* Email Verified */}
          <div>
            <Label className={`block text-xs font-semibold ${labelColor} uppercase mb-2`}>
              Email Verified
            </Label>
            <div>
              {user.emailVerified ? (
                <Status variant="success">
                  <StatusIndicator />
                  <StatusLabel className="text-green-700 font-semibold">Yes</StatusLabel>
                </Status>
              ) : (
                <Status variant="error">
                  <StatusIndicator />
                  <StatusLabel className="text-red-700 font-semibold">No</StatusLabel>
                </Status>
              )}
            </div>
          </div>
          {/* Active */}
          <div>
            <Label className={`block text-xs font-semibold ${labelColor} uppercase mb-2`}>
              Active
            </Label>
            <div className="flex items-center gap-4">
              {editfield !== "isActive" ? (
                <>
                  {useinfo.isActive ? (
                    <Status variant="success">
                      <StatusIndicator className="bg-green-400" />
                      <StatusLabel className="text-green-800 font-bold">Online</StatusLabel>
                    </Status>
                  ) : (
                    <Status variant="error">
                      <StatusIndicator className="bg-red-400" />
                      <StatusLabel className="text-red-700 font-bold">Offline</StatusLabel>
                    </Status>
                  )}
                  <button
                    className="p-2 rounded-full border border-indigo-100 bg-white hover:bg-indigo-50 transition shadow-sm"
                    onClick={() => seteditfield("isActive")}
                    aria-label="Edit active"
                  >
                    <Pencil className="w-4 h-4 text-indigo-700" />
                  </button>
                </>
              ) : (
                <>
                  <label className="inline-flex items-center cursor-pointer gap-3">
                    <span className="text-sm text-gray-900 font-medium">Active?</span>
                    <input
                      type="checkbox"
                      checked={inputvalue.isActive ?? useinfo.isActive ?? false}
                      onChange={e =>
                        setinputvalue((prev: any) => ({
                          ...prev,
                          isActive: e.target.checked,
                        }))
                      }
                      className="accent-indigo-600 w-5 h-5"
                      aria-label="Active status"
                    />
                  </label>
                  <div className="flex gap-2 ml-2">
                    <button
                      className="px-4 py-2 rounded bg-neutral-100 hover:bg-neutral-200 text-neutral-700 border border-neutral-200 text-xs font-medium"
                      onClick={() => seteditfield("")}
                    >
                      Cancel
                    </button>
                    <button
                      className="px-4 py-2 rounded bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold"
                      onClick={() => {
                        setuserinfo((prev) => ({
                          ...prev,
                          isActive: inputvalue.isActive ?? useinfo.isActive ?? false,
                        }));
                        seteditfield("");
                      }}
                    >
                      Save
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        {/* Divider & Footers */}
        <div className="mt-12 flex flex-col md:flex-row items-start md:items-center justify-between border-t pt-8 gap-3">
          <h2 className="text-lg font-semibold text-indigo-900 tracking-wide">
            Profile
          </h2>
          <span className="text-xs text-neutral-400 italic mt-2 md:mt-0">
            Share/profile features coming soon
          </span>
        </div>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between pt-5 pb-2 gap-3">
          <h2 className="text-lg font-semibold text-pink-700 tracking-wide">
            Account
          </h2>
          <span className="text-xs text-neutral-300 italic mt-2 md:mt-0">
            Remove account feature coming soon
          </span>
        </div>
      </div>
    </section>
  );
}

export default ProfileUserInfo;