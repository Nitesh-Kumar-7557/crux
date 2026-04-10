'use client';
import { DomainClassification } from "@/app/statement/types";
import React, { useEffect, useState } from "react";
import { MdEditNote, MdFilterList, MdOutlineAnalytics, MdSensors } from "react-icons/md";

import { Newsreader } from "next/font/google";
import { TbGavel } from "react-icons/tb";
import { useUser } from "@/app/_hooks/useUser";
import { useRouter } from "next/navigation";
import api from "@/app/axios";
const newsreader = Newsreader({
  subsets: ["latin"],
});

const StatementForm = ({ domains }: { domains: DomainClassification }) => {
  
  const router = useRouter();
  const user = useUser();

  const [text,setText] = useState('')
  const [selectedDomain,setSelectedDomain] = useState('AI')

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  if (!user) return null;

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>){
    e.preventDefault();
    await api.post('/statement',{
      user_id: user?.id,
      content: text,
      domain: selectedDomain
    })
    router.push('/');
  }

  return (
    <div className="bg-surface-container-low p-8 relative overflow-hidden">
      <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
        {/* <!-- Category Selection --> */}
        <div className="space-y-3">
          <label className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">
              <MdFilterList />
            </span>
            Domain Classification
          </label>
          <div className=" flex flex-wrap gap-2">
            {domains.map((e, i) => (
              <button
                key={i}
                className={`${selectedDomain === e ? 'border-primary text-primary bg-primary/5':'border-outline-variant bg-surface-container'} cursor-pointer border px-4 py-2 font-label text-xs uppercase hover:border-primary hover:text-primary transition-colors `}
                type="button"
                onClick={()=>setSelectedDomain(e)}
              >
                {e}
              </button>
            ))}
          </div>
        </div>
        {/* <!-- Statement Textarea --> */}
        <div className="space-y-3">
          <label className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant flex items-center gap-2">
            <span className="material-symbols-outlined text-sm"><MdEditNote /></span>
            The Statement
          </label>
          <textarea
            className={`w-full focus:outline-none bg-surface-container-highest border-0 focus:ring-1 focus:ring-primary min-h-60 p-6 ${newsreader.className} text-2xl italic placeholder:text-neutral-700 text-on-surface resize-none`}
            placeholder="State your thesis clearly and without ambiguity..." value={text} onChange={(e)=> setText(e.target.value)}
          ></textarea>
          <div className="flex justify-between items-center text-[10px] font-label text-neutral-500 uppercase tracking-tighter">
            <span>Minimum 80 characters for AI validation</span>
            <span>{text.length} / 1200</span>
          </div>
        </div>
        {/* <!-- Action Bar --> */}
        <div className="pt-6 border-t border-outline-variant/30 flex flex-col md:flex-row gap-6 items-center justify-between">
          <div className="flex items-center gap-4 text-on-surface-variant">
            <div className="flex -space-x-1">
              <div className="w-8 h-8 bg-surface-container-high border border-outline-variant flex items-center justify-center">
                <span className="material-symbols-outlined text-xs"><TbGavel /></span>
              </div>
              <div className="w-8 h-8 bg-surface-container-high border border-outline-variant flex items-center justify-center">
                <span className="material-symbols-outlined text-xs">
                  <MdOutlineAnalytics />
                </span>
              </div>
            </div>
            <span className="font-label text-[10px] uppercase tracking-widest">
              System Ready for Processing
            </span>
          </div>
          <button
            className="cursor-pointer w-full md:w-auto bg-primary text-on-primary font-label text-sm uppercase tracking-[0.2em] px-12 py-4 hover:bg-primary-container transition-all active:scale-95 flex items-center justify-center gap-3"
            type="submit"
          >
            Broadcast Statement
            <span className="material-symbols-outlined text-lg"><MdSensors /></span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default StatementForm;
