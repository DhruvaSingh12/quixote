"use client";

import React, { useContext, ChangeEvent } from "react";
import {
  CircleUserRound,
  Compass,
  Lightbulb,
  Youtube,
  Code,
  SendHorizontal,
} from "lucide-react";
import { Context } from "../../../providers/ContextProvider";

interface ContextType {
  submit: (prompt: string) => Promise<void>;
  recentPrompts: string;
  displayResult: boolean;
  loading: boolean;
  result: string;
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
}

const GeminiBody: React.FC = () => {
  const {
    submit,
    recentPrompts,
    displayResult,
    loading,
    result,
    input,
    setInput,
  } = useContext(Context) as ContextType;

  return (
    <div className="flex-1 min-h-[100vh] pb-[15vh] relative bg-gray-900 text-white">
      <div className="md:pr-12 pr-4 pl-[150px] md:pl-72 m-auto">
        {!displayResult ? (
          <>
            <div className="my-12 font-medium p-5 text-center">
              <p>
                <span className="font-bold text-transparent text-2xl md:text-5xl bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                  Hello there, how can I assist you?
                </span>
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 p-5">
              {[
                {
                  text: "Tell me about the Hanle Dark Sky Reserve in Ladakh.",
                  Icon: Compass,
                },
                {
                  text: "What level is Earth on the Kardashev scale?",
                  Icon: Lightbulb,
                },
                {
                  text: "Visualize the night sky look like on a planet in a different galaxy?",
                  Icon: Youtube,
                },
                {
                  text: "Why is the 3753 Cruithne asteroid not considered Earth's second moon?",
                  Icon: Code,
                },
              ].map(({ text, Icon }, index) => (
                <div
                  key={index}
                  className="h-48 p-4 bg-gray-800 border border-gray-700 rounded-xl shadow-lg hover:shadow-2xl hover:border-purple-400 transition-all duration-300 relative cursor-pointer"
                >
                  <p className="text-lg font-semibold">{text}</p>
                  <Icon
                    size={35}
                    className="p-1 absolute bottom-2 right-2 bg-gray-700 text-purple-400 rounded-full"
                  />
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="result border-t border-gray-700 pt-5">
            <div className="my-10 flex items-center gap-5">
              <CircleUserRound size={40} className="text-purple-400" />
              <p className="text-lg">{recentPrompts}</p>
            </div>
            <div className="flex items-start gap-5">
              <p
                className="text-md font-normal leading-6 text-gray-300"
                dangerouslySetInnerHTML={{ __html: result }}
              ></p>
            </div>
          </div>
        )}
        <div className="fixed bottom-4 left-2/3 lg:left-[60%] md:left-2/3 transform -translate-x-1/2 w-full max-w-[300px] sm:max-w-[400px] lg:max-w-[700px] xl:max-w-[900px] md:max-w-[500px] pr-8 xl:pr-12">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              submit(input);
            }}
          >
            <div className="border-2 border-purple-400 flex items-center justify-center gap-5 bg-gray-800 p-2 rounded-full shadow-lg">
              <input
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setInput(e.target.value)
                }
                value={input}
                type="text"
                className="flex-1 bg-transparent border-none outline-none p-2 text-md text-gray-300"
                placeholder="Enter a prompt here and press enter..."
                aria-label="Chat input"
              />
              <button
                type="submit"
                className="p-2 rounded-full bg-purple-400 hover:bg-purple-500 transition-colors"
                aria-label="Send prompt"
              >
                <SendHorizontal size={20} className="text-white" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default GeminiBody;
