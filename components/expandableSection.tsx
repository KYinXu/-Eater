import React, { useState } from 'react';

interface ExpandableSectionProps {
  title: string;
  children: React.ReactNode;
}

const ExpandableSection: React.FC<ExpandableSectionProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSection = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div
        className="cursor-pointer bg-transparent p-4 flex items-center gap-2"
        onClick={toggleSection}
      >
        <div>
          {isOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>
          )}
        </div>
        <div className="text-lg font-semibold  ml-2">{title}</div>
      </div>
      <div className="border-t border-gray-300 mt-2 mb-2"></div>
      {isOpen && (
        <div>
          <div className="p-4">
            {children}
          </div>
          <div className="border-t border-gray-700 mt-2 mb-2"></div>
        </div>
      )}
    </div>
  );
};

export default ExpandableSection;