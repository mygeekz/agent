export enum TaskStatus {
  Todo = 'برای انجام',
  InProgress = 'در حال انجام',
  Done = 'انجام شده',
}

export interface Task {
  id: number;
  title: string;
  status: TaskStatus;
}

export interface AttachedFile {
  name: string;
  type: string;
  // base64 data or a url
  data: string; 
}

export interface ChatMessage {
  id: string; // use string for IDs
  text: string;
  sender: 'user' | 'model';
  timestamp: string;
  file?: AttachedFile;
  isLoading?: boolean; // For showing typing indicator on a specific message
}

export interface Notification {
  id: number;
  message: string;
  read: boolean;
}

export interface UploadedFile {
    name: string;
    size: number;
    type: string;
}
