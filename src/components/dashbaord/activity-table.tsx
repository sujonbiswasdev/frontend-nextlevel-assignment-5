export default function ActivityTable() {
    return (
      <div className="bg-[#0F172A] border border-white/10 rounded-xl p-6">
  
        <h3 className="text-lg mb-4">
          Recent Activity
        </h3>
  
        <table className="w-full text-sm">
  
          <thead className="text-gray-400">
            <tr>
              <th className="text-left py-2">User</th>
              <th className="text-left py-2">Event</th>
              <th className="text-left py-2">Status</th>
              <th className="text-left py-2">Date</th>
            </tr>
          </thead>
  
          <tbody className="space-y-2">
            <tr>
              <td className="py-2">John</td>
              <td>Conference</td>
              <td className="text-green-400">Completed</td>
              <td>12 Jan</td>
            </tr>
          </tbody>
  
        </table>
  
      </div>
    )
  }