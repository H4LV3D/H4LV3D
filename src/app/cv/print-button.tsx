"use client";

export function PrintButton({ children }: { children: React.ReactNode }) {
  return (
    <button type="button" className="cv-button" onClick={() => window.print()}>
      {children}
    </button>
  );
}
