"use client";

import React, { useContext, ChangeEvent } from "react";
import {
  CircleUserRound,
  SendHorizontal,
  Video,
  FileQuestionIcon,
  LocateIcon,
  StarsIcon,
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
  isOpen: boolean;
}

const MainContent: React.FC = () => {
  const {
    submit,
    recentPrompts,
    displayResult,
    result,
    input,
    setInput,
    isOpen,
  } = useContext(Context) as ContextType;

  return (
    <div
      className={`flex-1 min-h-[100vh] pb-[15vh] relative bg-black text-white transition-all duration-300 ${
        isOpen ? "pl-0 md:pl-[120px]" : "pl-0"
      }`}
    >
      <div className="md:pr-12 pr-4 pl-14 md:pl-36 m-auto">
        {!displayResult ? (
          <>
            <div className="my-12 font-medium p-5 text-center">
              <p>
                <span className="font-bold text-transparent text-2xl md:text-5xl bg-clip-text bg-gradient-to-l from-indigo-500 via-purple-600 to-pink-400">
                  Hello there, how can I assist you?
                </span>
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
              {[
                {
                  text: "Tell me about the Hanle Dark Sky Reserve in Ladakh.",
                  Icon: LocateIcon,
                },
                {
                  text: "What level is Earth on the Kardashev scale?",
                  Icon: FileQuestionIcon,
                },
                {
                  text: "Visualize the night sky on a planet in a different galaxy?",
                  Icon: Video,
                },
                {
                  text: "Why is the 3753 Cruithne asteroid not considered Earth's second moon?",
                  Icon: StarsIcon,
                },
              ].map(({ text, Icon }, index) => (
                <div
                  key={index}
                  className="h-48 p-4 bg-pink-300 border border-pink-300 rounded-xl shadow-lg hover:shadow-2xl hover:bg-yellow-300 hover:border-pink-600 transition-all duration-300 relative cursor-pointer"
                >
                  <p className="text-lg font-semibold text-black">{text}</p>
                  <Icon
                    size={35}
                    className="p-2 absolute bottom-2 right-2 bg-black text-rose-500 rounded-full shadow-lg"
                  />
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="result rounded-lg p-6 shadow-xl">
            <div className="mb-10 mt-2 flex justify-end items-center gap-5">
              <CircleUserRound size={40} className="text-purple-400" />
              <p className="text-lg text-white">{recentPrompts}</p>
            </div>
            <div className="flex justify-start items-start gap-5">
              <p
                className="text-md font-normal leading-6 text-justify text-white"
                dangerouslySetInnerHTML={{ __html: result }}>
              </p>
            </div>
          </div>
        )}
        <div className="fixed bottom-4 left-2/3 lg:left-[60%] md:left-2/3 transform -translate-x-1/2 w-full max-w-[350px] sm:max-w-[400px] lg:max-w-[700px] xl:max-w-[900px] md:max-w-[500px] pr-16 xl:pr-20">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              submit(input);
            }}
          >
            <div className="border-2 border-[#FF4191] flex items-center justify-center gap-5 bg-[#000000] p-3 rounded-full shadow-lg">
              <input
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setInput(e.target.value)
                }
                value={input}
                type="text"
                className="flex-1 bg-transparent border-none outline-none p-3 text-md text-gray-200"
                placeholder="Enter a prompt here and press enter"
                aria-label="Chat input"
              />
              <button
                type="submit"
                className="p-3 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 hover:bg-gradient-to-r hover:from-pink-500 hover:to-purple-500 transition-all duration-100 ease-in-out"
                aria-label="Send prompt"
              >
                <SendHorizontal size={20} className="text-black" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MainContent;
