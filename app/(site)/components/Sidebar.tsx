"use client";
import React, { useContext } from "react";
import { Menu, Plus, MessageSquare } from "lucide-react";
import { Context } from "../../../providers/ContextProvider";

interface ContextType {
  setDisplayResult: (value: boolean) => void;
  setInput: (value: string) => void;
  prevPrompts: string[];
  setRecentPrompts: (prompt: string) => void;
  submit: (prompt: string) => void;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

const Sidebar: React.FC = () => {
  const { setDisplayResult, setInput, prevPrompts, setRecentPrompts, submit, isOpen, setIsOpen } = useContext(Context) as ContextType;

  const loadPrompt = (prompt: string) => {
    setRecentPrompts(prompt);
    submit(prompt);
  };

  return (
    <div
      className={`fixed top-0 left-0 h-screen flex flex-col bg-neutral-950 justify-between py-4 px-2 pl-2 z-50 ${
        isOpen ? "w-36 md:w-64" : "w-14"
      }`}
    >
      <div>
        <div className="ml-2">
          <Menu
            size={25}
            onClick={() => setIsOpen(!isOpen)} 
            className="cursor-pointer text-white hover-opacity-100"
          />
        </div>
        <div
          className="mt-8 inline-flex p-2 items-center gap-[6px] hover:bg-neutral-500/20 border-2 rounded-lg text-md text-gray-400 cursor-pointer"
          onClick={() => {
            setDisplayResult(false);
            setInput("");
          }}
        >
          <Plus size={20} className="cursor-pointer" />
          {isOpen ? <p className="pr-1">New chat</p> : null}
        </div>
        {isOpen ? (
          <div className="h-full w-full overflow-auto">
            <div className="flex flex-col overflow-y-auto mt-8">
              <p className="mb-3 ml-1 text-white text-[18px]">Recent chats</p>
              {prevPrompts?.map((item: string, index: number) => (
                <div
                  key={index}
                  onClick={() => loadPrompt(item)}
                  className="my-2 flex items-center bg-gray-800 gap-2 w-[120px] md:w-[200px] rounded-lg text-gray-200 cursor-pointer hover:bg-gray-300 hover:text-black p-2"
                >
                  <MessageSquare size={24} className="cursor-pointer" />
                  <p>{item.length > 17 ? `${item.slice(0, 17)}...` : item}</p>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Sidebar;
