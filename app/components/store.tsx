import { create } from "zustand";

const useMessagesStore = create((set) => ({
  messages: [],

  addMessage: (message: any, callback: any) =>
    set((state: any) => {
      const updatedMessages = [...state.messages, message];
      callback && callback(updatedMessages);
      return { messages: updatedMessages };
    }),
  updateAssistantMessage: (text: any) =>
    set((state: any) => {
      const lastMessage = state.messages[state.messages.length - 1];
      if (lastMessage && lastMessage.role === "assistant") {
        lastMessage.content += text;
        return { messages: [...state.messages] };
      } else {
        return {
          messages: [...state.messages, { role: "assistant", content: text }],
        };
      }
    }),
}));

export default useMessagesStore;
