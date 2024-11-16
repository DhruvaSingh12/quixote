"use client";
import React, { useContext, useState } from "react";
import {
  Menu,
  Plus,
  MessageSquare,
} from "lucide-react";
import { Context } from "../../../providers/ContextProvider";

interface ContextType {
  setDisplayResult: (value: boolean) => void;
  setInput: (value: string) => void;
  prevPrompts: string[];
  setRecentPrompts: (prompt: string) => void;
  submit: (prompt: string) => void;
}

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const {
    setDisplayResult,
    setInput,
    prevPrompts,
    setRecentPrompts,
    submit,
  } = useContext(Context) as ContextType;

  const loadPrompt = (prompt: string) => {
    setRecentPrompts(prompt);
    submit(prompt);
  };

  return (
    <div
  className={`fixed top-0 left-0 h-screen w-72 flex flex-col justify-between py-6 px-4 z-50 ${
    isOpen ? "w-72" : "w-[70px]"
  } ${isOpen ? "pr-[100px] md:pr-4" : "pr-0"}`}
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
              className="my-2 flex items-center gap-2 w-[100px] md:w-[200px] rounded-lg text-white cursor-pointer hover:bg-gray-300 hover:text-black p-2"
            >
              <MessageSquare size={20} className="cursor-pointer" />
              <p>{item.length > 20 ? `${item.slice(0, 17)}...` : item}</p>
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
