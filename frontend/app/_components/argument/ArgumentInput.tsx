"use client";

import { useUser } from "@/app/_hooks/useUser";
import { jwtPayload } from "@/app/_types/jwt";
import api from "@/app/axios";
import { useEffect, useState } from "react";

const ArgumentInput = ({ argumentId }: { argumentId: number }) => {

  const [user,setUser] = useState<any>(null)
  const [input, setInput] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(()=>{
    async function fetchUser(){
      const userInfo = await useUser();
      setUser(userInfo)
    };
    fetchUser();
    setMounted(true);
  },[])
  
  if (!mounted || !user) return null;

  async function handleAffirmativeBtn() {
    await api.post(`/comment/affirmative/${argumentId}`, {
      userId: user?.id,
      input,
    });
    setInput("");
  }
  async function handleNegativeBtn() {
    await api.post(`/comment/negative/${argumentId}`, {
      userId: user?.id,
      input,
    });
    setInput("");
  }
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-neutral-950/80 backdrop-blur-xl border-t border-outline-variant/20 py-6 px-6 z-40">
      <div className="max-w-screen-2xl mx-auto flex flex-col md:flex-row items-center gap-6">
        <div className="flex-1 w-full relative">
          <input
            className="w-full bg-surface-container border border-outline-variant/50 focus:border-primary px-6 py-4 font-body text-on-surface placeholder:text-outline/50 transition-all"
            placeholder="Join the Argument..."
            type="text"
            value={input}
            onChange={(e) => setInput(e.currentTarget.value)}
          />
          <div className="hidden absolute right-4 top-1/2 -translate-y-1/2 md:flex items-center gap-3">
            <span className="font-label text-[10px] uppercase text-outline bg-surface-container-high px-2 py-1">
              Shift + Enter to Submit
            </span>
          </div>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <button
            onClick={handleAffirmativeBtn}
            className="flex-1 cursor-pointer md:flex-none border border-primary text-primary hover:bg-primary/10 px-8 py-4 font-label uppercase tracking-widest text-xs transition-all"
          >
            Support Affirmative
          </button>
          <button
            onClick={handleNegativeBtn}
            className="flex-1 cursor-pointer md:flex-none border border-secondary text-secondary hover:bg-secondary/10 px-8 py-4 font-label uppercase tracking-widest text-xs transition-all"
          >
            Support Negative
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArgumentInput;
