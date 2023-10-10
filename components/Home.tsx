"use client";
import { Editor, useMonaco } from "@monaco-editor/react";
import { useEffect, useMemo, useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { useDebounce } from "use-debounce";

import { useAnsiblePlaybookChat } from "@/hooks/useAnsiblePlaybookChat";

export default function page() {
  const monaco = useMonaco();
  const editorReady = useMemo(() => !!monaco, [monaco]);

  const [editorState, setEditorState] = useState<"INSERT" | "OVERWRITE">("OVERWRITE");
  const [editorContent, setEditorContent] = useState<string | undefined>(
    "# Get started by entering your idea for a playbook...",
  );
  const {
    messages,
    input,
    stop,
    append,
    handleSubmit,
    handleInputChange,
    isLoading: _isLoading,
  } = useAnsiblePlaybookChat();
  const [isLoading] = useDebounce(_isLoading, 1000);

  const userMessages = useMemo(() => messages.filter(({ role }) => role === "user"), [messages]);

  // Cancel the current stream
  useHotkeys("esc", () => stop(), [stop]);

  useEffect(() => {
    console.log(isLoading);
  }, [isLoading]);

  useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    if (lastMessage && lastMessage.role === "assistant") {
      setEditorContent(lastMessage.content);
    }
  }, [messages]);

  return (
    <main className="flex min-h-screen flex-col overflow-hidden">
      <header className="w-full flex items-center bg-purple-800 h-16 shadow-md px-4">
        <h1 className="text-white text-2xl">Ansible AI Playbooks</h1>
        <div className="ml-auto">Editor: {editorState}</div>
      </header>

      <div className="flex flex-grow w-full h-full min-h-0">
        <aside className="flex flex-col bg-[#1f1f1f] w-1/4 p-6 rounded-lg shadow-lg">
          <h2 className="mb-6 font-light text-xl text-white">Current Chat</h2>
          {userMessages.map(m => (
            <div key={m.id} className="flex flex-col mb-4 p-2 bg-[#2f2f2f] rounded shadow-sm">
              {/* Uncomment if you want to show roles: <p className="text-sm text-gray-400 mb-1">{m.role === "user" ? "User: " : "AI: "}</p> */}
              <p className="text-white">{m.content}</p>
            </div>
          ))}
        </aside>

        <main className="flex-grow flex flex-col min-h-0 p-4">
          <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
            <input
              value={input}
              disabled={!editorReady}
              onChange={handleInputChange}
              className="p-2 border rounded text-black flex-grow"
              placeholder="Initialize a system for php development"
            />
            <button
              type="submit"
              className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:border-blue-700 focus:ring focus:ring-blue-200 active:bg-blue-700"
            >
              Submit
            </button>
            {/* <button
              className="p-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:border-green-700 focus:ring focus:ring-green-200 active:bg-green-700"
              onClick={e => {
                e.preventDefault();
                toggleEditorState();
              }}
            >
              Toggle Mode
            </button> */}
          </form>
          <div className="flex-grow min-h-0 bg-gray-900">
            <Editor
              height="100%"
              width="100%"
              theme="vs-dark"
              defaultLanguage={isLoading ? "plaintext" : "yaml"}
              value={editorContent}
              onChange={setEditorContent}
              loading={<>Initializing Editor...</>}
            />
          </div>
          <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
            Press{" "}
            <code className="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500">
              Esc
            </code>{" "}
            at any time to cancel the current response.
          </div>
        </main>
      </div>
    </main>
  );
}
