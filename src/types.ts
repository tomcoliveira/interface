export interface Message {
  id: string;
  content: string;
  type: 'user' | 'assistant';
  timestamp: Date;
}

export interface NotionExport {
  messages: Message[];
  conversation: string;
  timestamp: Date;
}