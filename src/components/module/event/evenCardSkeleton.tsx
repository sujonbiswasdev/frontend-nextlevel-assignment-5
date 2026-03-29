export default function EventCardSkeleton() {
    return (
      <div className="animate-pulse rounded-2xl border bg-white dark:bg-gray-900 shadow-sm overflow-hidden">
        <div className="h-52 bg-gray-200 dark:bg-gray-800"></div>
  
        <div className="p-5 space-y-3">
          <div className="h-4 w-24 bg-gray-200 dark:bg-gray-800 rounded"></div>
          <div className="h-6 w-full bg-gray-200 dark:bg-gray-800 rounded"></div>
          <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-800 rounded"></div>
  
          <div className="flex gap-2 mt-3">
            <div className="h-5 w-16 bg-gray-200 dark:bg-gray-800 rounded"></div>
            <div className="h-5 w-16 bg-gray-200 dark:bg-gray-800 rounded"></div>
          </div>
  
          <div className="h-8 w-full bg-gray-200 dark:bg-gray-800 rounded mt-4"></div>
        </div>
      </div>
    );
  }