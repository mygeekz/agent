import React from 'react';

// Using Phosphor Icons style for a modern look.

export const ChatIcon = ({ className = "w-7 h-7" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 256 256" className={className}><path d="M216,48H40A16,16,0,0,0,24,64V224L56.32,192H216a16,16,0,0,0,16-16V64A16,16,0,0,0,216,48ZM40,176V64H216v96H64a15.86,15.86,0,0,0-10.7,4.08L40,176Z"></path></svg>
);

export const TasksIcon = ({ className = "w-7 h-7" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 256 256" className={className}><path d="M224,64H184V48a16,16,0,0,0-16-16H88A16,16,0,0,0,72,48v16H32A16,16,0,0,0,16,80V208a16,16,0,0,0,16,16H224a16,16,0,0,0,16-16V80A16,16,0,0,0,224,64ZM88,48H168V80H88ZM224,208H32V80H72v16a8,8,0,0,0,16,0V80H168v16a8,8,0,0,0,16,0V80h40ZM116,128a8,8,0,0,1,8-8h48a8,8,0,0,1,0,16H124A8,8,0,0,1,116,128Zm0,40a8,8,0,0,1,8-8h48a8,8,0,0,1,0,16H124A8,8,0,0,1,116,168Z"></path></svg>
);

export const PaperclipIcon = ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 256 256" className={className}><path d="M208.33,184.43a8,8,0,0,1-11.33,0l-64-64a8,8,0,0,1,11.32-11.32l64,64A8,8,0,0,1,208.33,184.43ZM152,120a8,8,0,0,0-8,8v72a40,40,0,0,1-80,0V88a56,56,0,0,1,112,0v96a24,24,0,0,1-48,0V96a8,8,0,0,0-16,0v88a40,40,0,0,0,80,0V88a72,72,0,0,0-144,0v112a56,56,0,0,0,112,0V128A8,8,0,0,0,152,120Z" transform="rotate(45 128 128)"></path></svg>
);

export const SendIcon = ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 256 256" className={className}><path d="M232.48,208.43,42.41,43.34A16,16,0,0,0,20.59,40,16,16,0,0,0,16,56.46l31.05,145a16,16,0,0,0,31.09,2.1L98,138.83l64.73,56.12a15.9,15.9,0,0,0,11,4.5,16.14,16.14,0,0,0,5.21-.83A16,16,0,0,0,192.4,185l14.47-58.12L248,141.4a16,16,0,0,0,20.09-20.74l-28-64A16,16,0,0,0,232.48,208.43ZM179.8,172.1,118,119.22l20.15-80.61L221.3,56.1Z"></path></svg>
);

export const PlusIcon = ({ className = "w-5 h-5" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 256 256" className={className}><path d="M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z"></path></svg>
);

export const TrashIcon = ({ className = "w-5 h-5" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 256 256" className={className}><path d="M216,48H176V40a24,24,0,0,0-24-24H104A24,24,0,0,0,80,40v8H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM96,40a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96ZM192,208H64V64H192Zm-80-104v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm48,0v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Z"></path></svg>
);

export const UserIcon = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 256 256" className={className}><path d="M230.92,212c-15.23-26.33-38.7-45.21-66.09-54.16a72,72,0,1,0-73.66,0C63.78,166.78,40.31,185.66,25.08,212a8,8,0,1,0,13.85,8c18.84-32.56,52.14-52,89.07-52s70.23,19.44,89.07,52a8,8,0,1,0,13.85-8ZM72,96a56,56,0,1,1,56,56A56.06,56.06,0,0,1,72,96Z"></path></svg>
);

export const LogoutIcon = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 256 256" className={className}><path d="M112,216a8,8,0,0,1-8,8H48a16,16,0,0,1-16-16V48A16,16,0,0,1,48,32h56a8,8,0,0,1,0,16H56V208h48A8,8,0,0,1,112,216Zm111.56-83.56-48-48a8,8,0,0,0-11.31,11.31L196.69,128H88a8,8,0,0,0,0,16h108.69l-32.44,32.44a8,8,0,0,0,11.31,11.31l48-48A8,8,0,0,0,223.56,132.44Z"></path></svg>
);

export const Spinner = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`${className} animate-spin`}>
      <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
  </svg>
);

export const ChevronDownIcon = ({ className = "w-4 h-4" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 256 256" className={className}><path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"></path></svg>
);

// --- Icons added to fix errors ---

export const DashboardIcon = ({ className = "w-7 h-7" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 256 256" className={className}><path d="M112,48H48A16,16,0,0,0,32,64v64a16,16,0,0,0,16,16h64a16,16,0,0,0,16-16V64A16,16,0,0,0,112,48Zm0,64H48V64h64Zm96-64H144a16,16,0,0,0-16,16v64a16,16,0,0,0,16,16h64a16,16,0,0,0,16-16V64A16,16,0,0,0,208,48Zm0,64H144V64h64Zm-96,40H48a16,16,0,0,0-16,16v64a16,16,0,0,0,16,16h64a16,16,0,0,0,16-16V176A16,16,0,0,0,112,152Zm0,64H48V176h64Zm96-64H144a16,16,0,0,0-16,16v64a16,16,0,0,0,16,16h64a16,16,0,0,0,16-16V176A16,16,0,0,0,208,152Zm0,64H144V176h64Z"></path></svg>
);

export const FilesIcon = ({ className = "w-7 h-7" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 256 256" className={className}><path d="M216,48H136L112.59,28.14A16,16,0,0,0,100.22,24H40A16,16,0,0,0,24,40V208a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V64A16,16,0,0,0,216,48ZM40,40h60.22l23.4,20H216V80H40ZM216,208H40V96H216Z"></path></svg>
);

export const BellIcon = ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 256 256" className={className}><path d="M221.8,175.94C216.25,166.38,208,139.33,208,104a80,80,0,1,0-160,0c0,35.34-8.25,62.38-13.8,71.94A16,16,0,0,0,48,200H88.81a40,40,0,0,0,78.38,0H208a16,16,0,0,0,13.8-24.06ZM128,216a24,24,0,0,1-22.62-16h45.24A24,24,0,0,1,128,216ZM48.74,184c6-10.84,15.26-34.14,15.26-80a64,64,0,1,1,128,0c0,45.86,9.29,69.16,15.26,80Z"></path></svg>
);

export const FileGenericIcon = ({ className = "w-8 h-8" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 256 256" className={className}><path d="M216,88V208a16,16,0,0,1-16,16H56a16,16,0,0,1-16-16V48A16,16,0,0,1,56,32h96l64,56Zm-16,0H136V48H56V208H200Z"></path></svg>
);

export const FileImageIcon = ({ className = "w-8 h-8" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 256 256" className={className}><path d="M216,88V208a16,16,0,0,1-16,16H56a16,16,0,0,1-16-16V48A16,16,0,0,1,56,32h96l64,56ZM136,48v40h40ZM90.34,162.34a8,8,0,0,0-10.68.05l-24,23.83A8,8,0,0,0,56,192v16H200V128H176a8,8,0,0,0-5.66,2.34l-26.68,26.69-14.35-14.34a8,8,0,0,0-11.31,0L90.34,166.34ZM116,124a12,12,0,1,0-12-12A12,12,0,0,0,116,124Z"></path></svg>
);

export const FilePdfIcon = ({ className = "w-8 h-8" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 256 256" className={className}><path d="M216,88V208a16,16,0,0,1-16,16H56a16,16,0,0,1-16-16V48A16,16,0,0,1,56,32h96l64,56ZM136,48v40h40ZM96,144v48a8,8,0,0,0,16,0v-8h16a24,24,0,0,0,0-48H104A8,8,0,0,0,96,144Zm16,32h16a8,8,0,0,1,0,16H112Zm68-32h-4a8,8,0,0,0-8,8v40a8,8,0,0,0,16,0V168h4a8,8,0,0,0,0-16v-8A8,8,0,0,0,180,144Zm-24,8h4v8h-4Zm-48-8H72a8,8,0,0,0,0,16h24v16H80a8,8,0,0,0,0,16h16v16H72a8,8,0,0,0,0,16H96a8,8,0,0,0,8-8V144A8,8,0,0,0,96,136Z"></path></svg>
);

export const UploadIcon = ({ className = "w-10 h-10 mx-auto text-slate-500 mb-3" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 256 256" className={className}><path d="M240,132a8,8,0,0,1-8,8H200.55a52,52,0,0,1-100.83,16.75,80,80,0,1,1,78.2-108.66,8,8,0,1,1,8.16,13.82,64,64,0,1,0-62.67,86.59,8,8,0,0,1,7.63,8.3A36,36,0,0,0,200.55,192H232a8,8,0,0,1,8,8ZM133.66,133.66a8,8,0,0,0,11.31,0l32-32a8,8,0,0,0-11.31-11.32L144,112.69V48a8,8,0,0,0-16,0v64.69L106.34,90.34a8,8,0,0,0-11.31,11.32Z"></path></svg>
);