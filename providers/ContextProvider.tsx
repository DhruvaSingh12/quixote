"use client";

import runChat from "@/actions/Gemini";
import React, {
  createContext,
  useState,
  ReactNode,
  useCallback,
  useMemo,
} from "react";

interface ContextType {
  submit: (prompt: string) => Promise<void>;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  input: string;
  result: string;
  loading: boolean;
  displayResult: boolean;
  recentPrompts: string;
  setRecentPrompts: React.Dispatch<React.SetStateAction<string>>;
  setPrevPrompts: React.Dispatch<React.SetStateAction<string[]>>;
  prevPrompts: string[];
  setDisplayResult: React.Dispatch<React.SetStateAction<boolean>>;
}

interface ContextProviderProps {
  children: ReactNode;
}

export const Context = createContext<ContextType | null>(null);

const ContextProvider: React.FC<ContextProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState("dark");
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [recentPrompts, setRecentPrompts] = useState("");
  const [displayResult, setDisplayResult] = useState(false);
  const [prevPrompts, setPrevPrompts] = useState<string[]>([]);

  const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  const paragraphDelay = useCallback(
    async (words: string[], signal: AbortSignal) => {
      for (const word of words) {
        if (signal.aborted) return;
        setResult((prev) => prev + word + " ");
        await delay(70);
      }
    },
    []
  );

  const submit = useCallback(
    async (prompt: string) => {
      try {
        setLoading(true);
        setResult("");
        setDisplayResult(true);
        const query = input || prompt;
        setRecentPrompts(query);

        if (query) {
          setPrevPrompts((prev) => [...prev, query]);
        }

        const controller = new AbortController();
        const signal = controller.signal;

        const response = await runChat(query);

        if (!response) {
          throw new Error("Failed to fetch response. Please try again.");
        }

        const formattedResponse = response
          .split("**")
          .map((text, index) => (index % 2 === 1 ? `<b>${text}</b>` : text))
          .join("")
          .replace(/\*/g, "<br>");

        const wordsArray = formattedResponse.split(" ");
        await paragraphDelay(wordsArray, signal);

        setLoading(false);
      } catch (error) {
        console.error("Error in submit:", error);
        setResult("An error occurred while fetching the response. Please try again later.");
        setLoading(false);
      } finally {
        setInput("");
      }
    },
    [input, paragraphDelay]
  );

  const contextValue = useMemo(
    () => ({
      submit,
      setInput,
      input,
      result,
      loading,
      displayResult,
      recentPrompts,
      setRecentPrompts,
      setPrevPrompts,
      prevPrompts,
      setDisplayResult,
    }),
    [
      submit,
      input,
      result,
      loading,
      displayResult,
      recentPrompts,
      prevPrompts,
    ]
  );

  return (
    <Context.Provider value={contextValue}>
      <div className={theme}>{children}</div>
    </Context.Provider>
  );
};

export default ContextProvider;
