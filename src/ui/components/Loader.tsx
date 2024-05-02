import React from 'react';

interface LoaderProps {
  height?: number;
  width?: number;
  className?: string;
}

export const Loader: React.FC<LoaderProps> = ({ height = 32, width = 32, className = '' }) => {
  return (
    <div
      className={`inline-block animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-primary motion-reduce:animate-[spin_1.5s_linear_infinite] ${className}`}
      style={{ height: `${height}px`, width: `${width}px` }}
      role="status">
      <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
        Loading...
      </span>
    </div>
  );
};
