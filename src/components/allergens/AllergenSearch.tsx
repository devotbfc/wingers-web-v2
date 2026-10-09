"use client";

import { useId } from "react";

interface AllergenSearchProps {
  value: string;
  onChange: (next: string) => void;
}

export function AllergenSearch({ value, onChange }: AllergenSearchProps) {
  const inputId = useId();
  const hasQuery = value.length > 0;

  return (
    <div className="w-full md:max-w-md">
      <label htmlFor={inputId} className="sr-only">
        Search allergens by item name
      </label>
      <div className="relative">
        <input
          id={inputId}
          type="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search the menu"
          autoComplete="off"
          enterKeyHint="search"
          className="h-11 w-full rounded-full border border-brand-black/15 bg-brand-white px-5 pr-12 font-body text-base text-brand-black placeholder:text-brand-black/40 focus:border-brand-black focus:outline-none"
        />
        {hasQuery ? (
          <button
            type="button"
            onClick={() => onChange("")}
            aria-label="Clear search"
            className="absolute right-2 top-1/2 inline-flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-brand-black/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-pink [@media(hover:hover)]:hover:text-brand-black"
          >
            <span aria-hidden="true">×</span>
          </button>
        ) : null}
      </div>
    </div>
  );
}
