import React, { ReactNode } from 'react';

interface NotFoundItemProps {
  content: string;
  filter?: string;
  emoji?: ReactNode;
}

const NotFoundItem: React.FC<NotFoundItemProps> = ({ content, filter, emoji }) => {
  return (
    <div className="w-full flex justify-center items-center bg-gradient-to-br from-slate-50 to-slate-200">
      <div className="col-span-full text-center py-20 rounded-lg shadow-md bg-white/60 backdrop-blur-sm border border-slate-200 max-w-xl mx-auto">
        <div className="text-5xl mb-4 text-sky-500">
          {emoji ?? '😔'}
        </div>
        <p className="text-2xl font-bold text-slate-800 mb-2">
          {content}
        </p>
        {filter && (
          <p className="text-base text-slate-500">{filter}</p>
        )}
      </div>
    </div>
  );
};

export default NotFoundItem;