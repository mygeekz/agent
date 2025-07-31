import React, { useState, useRef, useEffect } from 'react';
import { ChevronDownIcon } from './icons';
import { TaskStatus } from '../types';

interface CustomSelectProps {
  value: TaskStatus;
  onChange: (newStatus: TaskStatus) => void;
  statusStyles: { [key in TaskStatus]: { bg: string; text: string; } };
}

const CustomSelect: React.FC<CustomSelectProps> = ({ value, onChange, statusStyles }) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const options = Object.values(TaskStatus);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);
  
  const handleSelect = (status: TaskStatus) => {
    onChange(status);
    setIsOpen(false);
  };
  
  const currentStyle = statusStyles[value];

  return (
    <div className="relative w-36" ref={wrapperRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between ${currentStyle.bg} ${currentStyle.text} rounded-md px-3 py-1.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all`}
      >
        <span>{value}</span>
        <ChevronDownIcon className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-slate-800/80 backdrop-blur-lg border border-white/20 rounded-md shadow-lg py-1">
          {options.map((status) => (
            <button
              key={status}
              onClick={() => handleSelect(status)}
              className={`w-full text-right px-3 py-1.5 text-sm transition-colors ${statusStyles[status].text} hover:bg-white/10`}
            >
              {status}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
