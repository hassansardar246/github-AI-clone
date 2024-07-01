import React, { useState, useRef, useEffect } from "react";

const ChatPage = () => {
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [input, setInput] = useState("");
  const [inputAssistant, setInputAssistant] = useState("");
  const [messages, setMessages] = useState<{ role: string; content: string }[]>(
    []
  );
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // useEffect(() => {
  //   scrollToBottom();
  // }, [messages]);

  // const scrollToBottom = () => {
  //   messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  // };
  const CustomPrompt = `you have to respond with only one sentence "Sometimes It whispers to my soul....".
`;
  useEffect(() => {
    let initialResponseFetched = false;

    const handleScroll = () => {
      if (messagesEndRef.current && !initialResponseFetched) {
        const bottom = messagesEndRef.current.getBoundingClientRect().bottom;
        const isChatInView = bottom <= window.innerHeight;
        if (isChatInView && inputAssistant == "") {
          getInitialResponse();
          initialResponseFetched = true;
        }
      }
    };

    const getInitialResponse = async () => {
      try {
        const res = await fetch("/api/vision", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt: CustomPrompt }),
        });
        if (!res.ok) {
          throw new Error("Failed to fetch response");
        }
        const data = await res.json();
        setInputAssistant(data.text);
        setMessages((prevMessages) => [
          ...prevMessages,
          { role: "assistant", content: data.text },
        ]);
      } catch (error) {
        console.error("Error fetching initial response:", error);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!prompt.trim()) {
      alert("Prompt cannot be empty");
      return;
    }
    setPrompt("");
    setMessages((prevMessages) => [
      ...prevMessages,
      { role: "user", content: prompt },
    ]);
    setInput(prompt);
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/vision", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      if (!res.ok) {
        throw new Error("Failed to fetch response");
      }

      const data = await res.json();

      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "assistant", content: data?.text },
      ]);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
      setPrompt("");
    }
  };

  return (
    <div className="flex flex-col w-full px-2 lg:px-0 lg:w-[50%] bg-dark py-5 m-auto min-h-[600px]">
      <div className="flex-1 p-4 overflow-y-auto">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`text-${message.role === "user" ? "right" : "left"}`}
          >
            <div
              className={`px-4 my-3 py-2 rounded-lg ${
                message.role === "user"
                  ? " text-white rounded-br-none"
                  : "text-white flex items-start gap-3 rounded-bl-none"
              }`}
            >
              <span
                className={` ${
                  message.role === "user"
                    ? "bg-[#2F2F2F] rounded-lg p-2"
                    : "w-full"
                }`}
              >
                {message.role === "assistant" && loading && (
                  <p className="text-center py-2">Loading...</p>
                )}
                {message.content}
              </span>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex items-center mx-auto w-full lg:w-[90%] relative justify-between"
      >
        <input
          type="text"
          className="w-full px-5 py-4 text-white bg-[#2F2F2F]  rounded-full outline-none"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Type your message..."
          disabled={loading}
        />
        <button
          type="submit"
          className="ml-2 absolute right-2 bg-[#676767] text-white rounded-full transition duration-300 focus:outline-none"
          disabled={loading}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="none"
            viewBox="0 0 32 32"
            className="icon-2xl"
          >
            <path
              fill="currentColor"
              fill-rule="evenodd"
              d="M15.192 8.906a1.143 1.143 0 0 1 1.616 0l5.143 5.143a1.143 1.143 0 0 1-1.616 1.616l-3.192-3.192v9.813a1.143 1.143 0 0 1-2.286 0v-9.813l-3.192 3.192a1.143 1.143 0 1 1-1.616-1.616z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </button>
      </form>

      {error && <p className="text-center text-red-500 py-2">{error}</p>}
    </div>
  );
};

export default ChatPage;
