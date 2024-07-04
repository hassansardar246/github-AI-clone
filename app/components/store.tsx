import { create } from "zustand";

const useMessagesStore = create((set) => ({
  messages: [],

  addMessage: (message: any, callback: any) =>
    set((state: any) => {
      const updatedMessages = [...state.messages, message];
      callback && callback(updatedMessages);
      return { messages: updatedMessages };
    }),
}));

export default useMessagesStore;
