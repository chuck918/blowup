"use client";

export default function PrintButton() {
  return (
    <button type="button" onClick={() => window.print()} className="btn btn-primary flex-1">
      Save / print
    </button>
  );
}
