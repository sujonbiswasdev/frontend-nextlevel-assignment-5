import CopyableId from "@/components/shared/CopyId";

export const createUserColumns = () => [
  {
    key: "id",
    label: "ID",
    render: (row: any) => (
      <CopyableId id={row.id} showShort={row.id?.slice(0, 8)} />
    ),
  },
  {
    key: "name",
    label: "Name",
    render: (row: any) => (
      <span className="font-medium text-indigo-900 dark:text-indigo-100">
        {row.name || <span className="text-gray-400">--</span>}
      </span>
    ),
  },
  {
    key: "email",
    label: "Email",
    render: (row: any) => (
      <span className="text-gray-700 dark:text-gray-300">{row.email}</span>
    ),
  },
  {
    key: "role",
    label: "Role",
    render: (row: any) => {
      let color = "";
      let text = "";
      switch (row.role) {
        case "ADMIN":
          color = "bg-indigo-100 text-indigo-800";
          text = "Admin";
          break;
        case "USER":
          color = "bg-green-100 text-green-800";
          text = "User";
          break;
        default:
          color = "bg-gray-100 text-gray-800";
          text = row.role || "Unknown";
      }
      return (
        <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${color}`}>
          {text}
        </span>
      );
    },
  },
  {
    key: "status",
    label: "Status",
    render: (row: any) => {
      let color = "";
      let text = "";
      switch (row.status) {
        case "ACTIVE":
        case true:
          color = "bg-green-100 text-green-800";
          text = "Active";
          break;
        case "INACTIVE":
        case false:
          color = "bg-gray-100 text-gray-700";
          text = "Inactive";
          break;
        default:
          color = "bg-gray-100 text-gray-800";
          text = row.status || "--";
      }
      return (
        <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${color}`}>
          {text}
        </span>
      );
    },
  },
  {
    key: "emailVerified",
    label: "Verified",
    render: (row: any) => (
      <span
        className={
          row.emailVerified
            ? "bg-green-100 text-green-800 px-2 py-0.5 rounded text-xs font-medium"
            : "bg-red-100 text-red-800 px-2 py-0.5 rounded text-xs font-medium"
        }
      >
        {row.emailVerified ? "Yes" : "No"}
      </span>
    ),
  },
  {
    key: "bgimage",
    label: "Profile Image",
    render: (row: any) =>
      row.bgimage ? (
        <img
          src={row.bgimage}
          alt={row.name || "Profile"}
          className="w-8 h-8 rounded-full object-cover border border-gray-200 dark:border-gray-700"
        />
      ) : (
        <span className="text-gray-400 text-xs">--</span>
      ),
  },
];