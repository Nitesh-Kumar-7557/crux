import React from "react";

const StatementHeader = () => {
  return (
    <div className="mb-12 border-l-4 border-primary pl-6">
      <span className="font-label text-primary text-xs uppercase tracking-[0.3em] mb-2 block">
        Protocol: Initial Submission
      </span>
      <h1 className="font-headline italic text-5xl md:text-6xl text-on-background tracking-tight">
        Issue a Thesis
      </h1>
      <p className="mt-4 text-on-surface-variant font-body text-lg max-w-xl">
        Every arena begins with a single point of contention. Define your
        position with precision; the Crux AI will select your adversary based on
        the strength of your logic.
      </p>
    </div>
  );
};

export default StatementHeader;
