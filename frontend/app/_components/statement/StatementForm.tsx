"use client";
import { DomainClassification } from "@/app/statement/types";
import React, { useEffect, useState } from "react";
import {
  MdEditNote,
  MdFilterList,
  MdMemory,
  MdOutlineAnalytics,
  MdSensors,
} from "react-icons/md";

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

  const [text, setText] = useState("");
  const [selectedDomain, setSelectedDomain] = useState("AI");
  const [loading, setLoading] = useState(false);
  const [eligibility, setEligibility] = useState('');
  const [feedback, setFeedback] = useState('Crux AI is analyzing the semantic integrity of your thesis. Ensure your statement is falsifiable and free of ad hominem triggers for optimal Arena placement.')
  

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  if (!user) return null;

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setEligibility('pending');
    const res = await api.post("/ai/statement", {
      content: text,
      domain: selectedDomain
    })
    setTimeout(()=>{
      setEligibility(res.data.eligibility)
      setFeedback(res.data.feedback)
      setText(res.data.improved)
      setLoading(false);
    },4000)
    // await api.post("/statement", {
    //   user_id: user?.id,
    //   content: text,
    //   domain: selectedDomain,
    // });
    // setEligibility('pass')
    // setLoading(false);
    // router.push("/");
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
                className={`${selectedDomain === e ? "border-primary text-primary bg-primary/5" : "border-outline-variant bg-surface-container"} cursor-pointer border px-4 py-2 font-label text-xs uppercase hover:border-primary hover:text-primary transition-colors `}
                type="button"
                onClick={() => setSelectedDomain(e)}
              >
                {e}
              </button>
            ))}
          </div>
        </div>
        {/* <!-- Statement Textarea --> */}
        <div className="space-y-3">
          <label className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">
              <MdEditNote />
            </span>
            The Statement
          </label>
          <textarea
            className={`w-full focus:outline-none bg-surface-container-highest border-0 focus:ring-1 focus:ring-primary min-h-60 p-6 ${newsreader.className} text-2xl italic placeholder:text-neutral-700 text-on-surface resize-none`}
            placeholder="State your thesis clearly and without ambiguity..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>
          <div className="flex justify-between items-center text-[10px] font-label text-neutral-500 uppercase tracking-tighter">
            <span>Minimum 50 characters for AI validation</span>
            <span>{text.length} / 1200</span>
          </div>
        </div>
        {/* <!-- Action Bar --> */}
        <div className="pt-6 border-t border-outline-variant/30 flex flex-col md:flex-row gap-6 items-center justify-between">
          <div className="flex items-center gap-4 text-on-surface-variant">
            <div className="flex -space-x-1">
              <div className="w-8 h-8 bg-surface-container-high border border-outline-variant flex items-center justify-center">
                <span className="material-symbols-outlined text-xs">
                  <TbGavel />
                </span>
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
            className={`${text.length > 50 ? "cursor-pointer hover:bg-primary-container bg-primary" : "disabled bg-primary cursor-not-allowed"} w-full md:w-auto  text-on-primary font-label text-sm uppercase tracking-[0.2em] px-12 py-4  transition-all active:scale-95 flex items-center justify-center gap-3`}
            type="submit"
          >
            Broadcast Statement
            {(loading || eligibility === 'pending') ? <span className="border-t-2 border-black h-4 w-4 rounded-full animate-spin"></span> : <span className="material-symbols-outlined text-lg"><MdSensors /></span>}
            
          </button>
        </div>
      </form>
      { (eligibility) && 
        <div className="bg-surface-container-high border mt-6 border-outline-variant/50 p-6 relative overflow-hidden">
          <div className="relative z-10 flex flex-col gap-4">
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 border-b border-outline-variant/30 pb-4">
              <h3 className={`${newsreader.className} italic text-2xl text-primary`}>
                CRUX AI Validation
              </h3>
              <div className="flex items-center gap-3 bg-surface-container px-4 py-2 border border-primary/30 shadow-[0_0_15px_rgba(0,209,255,0.1)]">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                <span className="font-label text-[10px] uppercase tracking-widest text-primary">
                  Eligibility: {eligibility}
                </span>
              </div>
            </div>
            <div className="bg-surface-container-lowest p-5 border-l border-primary/50">
              <div className="flex items-start gap-4">
                <span className="material-symbols-outlined text-primary text-lg mt-0.5 animate-pulse">
                  <MdMemory />
                </span>
                <p className="font-label text-xs text-on-surface-variant leading-relaxed">
                  {feedback}
                </p>
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  );
};

export default StatementForm;
