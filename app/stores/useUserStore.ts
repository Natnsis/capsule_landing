import { create } from 'zustand';
import axios from 'axios';

const API_URL = 'https://my-json-server.typicode.com/typicode/demo/comments';

interface Message {
  id: number;
  body: string;
  postId: number;
}

interface MessageStore {
  messages: Message[],
  getComments: () => Promise<void>
}

export const useMessageStore = create<MessageStore>()((set) => ({
  messages: [],
  getComments: async () => {
    const comments = await axios.get(API_URL);
    set({ messages: comments.data });
  }
}))
