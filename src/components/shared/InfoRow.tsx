function InfoRow({ label, value }: { label: string; value: string }) {
    return (
    <div className="flex items-center justify-between shadow-sm px-6 py-4">
    <span className="text-sm text-gray-600 font-semibold">{label}</span>
    <span className="text-sm font-medium text-gray-900">{value}</span>
    </div>
    );
    }
    export default InfoRow