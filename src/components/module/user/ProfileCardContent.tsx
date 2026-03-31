"use client";

import { IBaseUser, TUpdateUserInput } from "@/types/user.types";
import { updateUserSchema } from "@/validations/user.validation";
import { Pencil, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import InfoRow from "../../shared/InfoRow";
import { Status, StatusIndicator, StatusLabel } from "../../ui/status";
import { deleteuserown, updateUserProfileAction } from "@/actions/user.actions";
import ShareProfileButton from "./profileshare";

function ProfileModal({ user }: { user: IBaseUser }) {
  const router = useRouter();
  const [useinfo, setuserinfo] = useState<IBaseUser>({ ...user })
  const [inputvalue, setinputvalue] = useState<Partial<TUpdateUserInput>>({});
  const [editfield, seteditfield] = useState<
    string | boolean | "bgimage" | "name" | "phone" | "isActive"
  >("");
  if (!user) {
    toast("user not found", { autoClose: 2000, theme: "colored" });
    router.push("/");
  }
  const defaultProfile =
    "https://images.pexels.com/photos/952670/pexels-photo-952670.jpeg";
  const handleUpdateUser = async <k extends keyof IBaseUser>(
    field: k,
    value: IBaseUser[k],
  ) => {
    if (value == null) {
      toast.error("please provide a value", {
        theme: "colored",
        position: "bottom-right",
        autoClose: 2000,
      });
      return;
    }
    const parseData = updateUserSchema.safeParse({ [field]: value });
    if (!parseData.success) {
      const errors = parseData.error.flatten().fieldErrors;

      Object.values(errors).forEach((err) => {
        if (err) {
          toast.error(err[1], {
            position: "bottom-right",
            autoClose: 2000,
          });
        }
      });
      return;
    }
    try {
      const toastid = toast.loading(`"user ${field} updating...."`, {
        theme: "dark",
        position: "bottom-right",
        autoClose: 2000,
      });
      const res = await updateUserProfileAction({ [field]: value });
      if (res.error || !res.success) {
        toast.dismiss(toastid);
        toast.error(res.message || `"user ${field} update failed"`, {
          theme: "dark",
          position: "bottom-right",
          autoClose: 2000,
        });
        return;
      }
      toast.dismiss(toastid);
      toast.success(res.result?.message || `"user ${field} update successfully"`, {
        theme: "dark",
        position: "bottom-right",
        autoClose: 2000,
      });
      setuserinfo((prev) => ({ ...prev, [field]: value }));
    } catch (error: any) {
      toast.error(`someting went wrong please try again`);
    }
  };
  const handleDelete = async () => {
    const toastid = toast.loading("user deleting....");
    const res = await deleteuserown();
    if (res.error) {
      toast.dismiss(toastid);
      toast.error( res.message||"user account delete fail");
      return;
    }
    toast.dismiss(toastid);
    toast.success(res.result?.message||"user account delete successfully");
    router.refresh();
    window.location.reload();
  };
  return (
    <div className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl mx-auto">
      {/* Header */}
      <div
        className="flex items-center justify-between border-b p-6 max-w-full bg-cover bg-center"
        style={{
          backgroundImage: `url(${useinfo.bgimage})`,
        }}
      >
        <div className="flex items-center gap-4">
          {editfield !== "image" ? (
            <div className="flex items-center justify-between px-6 py-4">
              <div className="flex gap-1 pr-1">
                <img
                  src={useinfo.image || defaultProfile}
                  alt="profile"
                  className="w-[100px] h-[100px] object-cover rounded-full shadow-sm border-2"
                />
                <button
                  className="w-[5px] -ml-3 -mt-4"
                  onClick={() => seteditfield("image")}
                >
                  <Pencil className="bg-gray-100 text-blue-800 shadow-sm p-1 rounded-md  text-[5px]" />
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between gap-1 bg-blue-200 rounded-sm">
              <Input
                className="focus:ring-2 placeholder:text-black"
                onChange={(e) =>
                  setinputvalue({ ...inputvalue, image: e.target.value })
                }
                placeholder="Enter your image url"
              />
              <button
                className="w-[5px] -ml-3 -mt-4"
                onClick={() => {
                  handleUpdateUser("image", inputvalue.image as string);
                  seteditfield("");
                }}
              >
                Save
              </button>
            </div>
          )}
        </div>
        <div>
          <div className="flex items-center gap-4">
            {editfield !== "bgimage" ? (
              <div className="flex items-center justify-between px-6 py-4">
                <div className="flex gap-1 pr-1">
                  <button
                    className="w-[5px] ml-30 -mt-30"
                    onClick={() => seteditfield("bgimage")}
                  >
                    <Pencil className="bg-gray-100 text-blue-800 shadow-sm p-1 rounded-md  text-[5px]" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between gap-1 bg-blue-200 rounded-sm">
                <Input
                  className="focus:ring-2 placeholder:text-black"
                  onChange={(e) =>
                    setinputvalue({ ...inputvalue, bgimage: e.target.value })
                  }
                  placeholder="Enter your image url"
                />
                <button
                  className="w-[5px] -ml-3 -mt-4"
                  onClick={() => {
                    handleUpdateUser("bgimage", inputvalue.bgimage as string);
                    seteditfield("");
                  }}
                >
                  {/* Uncommented update call button */}
                  Save
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Details */}
      <div className="divide-y">
        {editfield !== "name" ? (
          <div className="flex items-center justify-between px-6 py-4">
            <Label className="text-gray-600">Name</Label>
            <div className="flex gap-1 pr-1">
              <p className="text-gray-900">{useinfo?.name}</p>
              <button className="w-[5px]" onClick={() => seteditfield("name")}>
                <Pencil className="text-green-800 text-[5px]" />
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between px-6 py-4 gap-1">
            <Input
              onChange={(e) =>
                setinputvalue({ ...inputvalue, name: e.target.value })
              }
              placeholder="Enter your name"
            />
            <button
              onClick={() => {
                handleUpdateUser("name", inputvalue.name as string);
                seteditfield("");
              }}
            >
              Save
            </button>
          </div>
        )}

        <InfoRow label="Email Address" value={user.email} />

        {/* Phone */}
        {editfield !== "phone" ? (
          <div className="flex items-center justify-between px-6 py-4">
            <Label className="text-gray-600">phone</Label>
            <div className="flex gap-1 pr-1">
              <p className="text-gray-900">
                {useinfo?.phone || "017********"}
              </p>
              <button className="w-[5px]" onClick={() => seteditfield("phone")}>
                <Pencil className="text-green-800 text-[5px]" />
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between px-6 py-4 gap-1">
            <Input
              onChange={(e) =>
                setinputvalue({ ...inputvalue, phone: e.target.value })
              }
              placeholder="Enter your phone number"
            />
            <button
              onClick={() => {
                handleUpdateUser("phone", inputvalue.phone as string);
                seteditfield("");
              }}
            >
              Save
            </button>
          </div>
        )}

        {/* Role (info only) */}
        <InfoRow label="Role" value={user.role as string} />

        {/* Status */}
        <div className="flex items-center justify-between px-6 py-4">
          <Label className="text-gray-600">Status</Label>
          <h4>
            {/* Show a tag for each possible user status, with relevant data */}
            {user.status === "ACTIVE" ? (
              <span className="inline-flex items-center px-2 py-1 rounded bg-green-100 text-green-800 text-xs font-medium">
                Active
                <span className="ml-2 text-gray-500">
                  {user.status}
                </span>
              </span>
            ) : user.status === "BLOCKED" ? (
              <span className="inline-flex items-center px-2 py-1 rounded bg-yellow-100 text-yellow-800 text-xs font-medium">
                Blocked
                <span className="ml-2 text-gray-500">
                  {user.status}
                </span>
              </span>
            ) : user.status === "DELETED" ? (
              <span className="inline-flex items-center px-2 py-1 rounded bg-red-100 text-red-800 text-xs font-medium">
                Deleted
                <span className="ml-2 text-gray-500">
                  {user.status}
                </span>
              </span>
            ) : (
              <span className="inline-flex items-center px-2 py-1 rounded bg-gray-100 text-gray-800 text-xs font-medium">
                Unknown
                <span className="ml-2 text-gray-500">
                  {user.status}
                </span>
              </span>
            )}
          </h4>
        </div>

        {/* Email Verified */}
        <div className="flex items-center justify-between px-6 py-4">
          <Label className="text-gray-600">Email Verified</Label>
          <h4>
            {user.emailVerified ? (
              <div>
                <Status variant="success">
                  <StatusIndicator />
                  <StatusLabel className="text-gray-900">Yes</StatusLabel>
                </Status>
              </div>
            ) : (
              <>
                <Status variant="error">
                  <StatusIndicator />
                  <StatusLabel className="text-gray-900">No</StatusLabel>
                </Status>
              </>
            )}
          </h4>
        </div>

        <div className="flex items-center justify-between px-6 py-4">
          <Label className="text-gray-600">isActive</Label>

          {editfield !== "isActive" ? (
            <div className="flex gap-1">
              <h4>
                {useinfo.isActive ? (
                  <div className="">
                    <Status variant="success">
                      <StatusIndicator />
                      <StatusLabel className="text-gray-900">
                        online
                      </StatusLabel>
                    </Status>
                  </div>
                ) : (
                  <>
                    <Status variant="error">
                      <StatusIndicator />
                      <StatusLabel className="text-gray-900">
                        offline
                      </StatusLabel>
                    </Status>
                  </>
                )}
              </h4>
              <button
                className="w-[5px]"
                onClick={() => seteditfield("isActive")}
              >
                <Pencil className="text-green-800 text-[5px]" />
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-between px-6 py-4 gap-1">
              <Input
                type="checkbox"
                checked={(inputvalue.isActive as boolean) || false}
                onChange={(e) =>
                  setinputvalue((prev: any) => ({
                    ...prev,
                    isActive: e.target.checked,
                  }))
                }
              />
              <button
                onClick={() => {
                  handleUpdateUser("isActive", inputvalue.isActive as boolean);
                  seteditfield("");
                }}
              >
                Save
              </button>
            </div>
          )}
        </div>
     <InfoRow
          label="createdAt"
          value={user.createdAt.toLocaleString().slice(0, 10)}
        /> 
        <div className="flex items-center justify-between px-6 py-4">
          <h2 className="text-sm font-semibold text-gray-600">Profile</h2>
          <ShareProfileButton userId={user.id} userName={user.name} />
        </div>
        <div className="flex items-center justify-between px-6 py-4">
          <h2 className="text-sm font-semibold text-gray-600">account</h2>

          <button
            onClick={handleDelete}
            className="px-4 flex items-center gap-1 py-2 bg-red-600 text-white rounded-md shadow-sm"
          >
            <Trash2 /> remove
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfileModal;