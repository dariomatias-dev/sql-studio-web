import type { RefObject } from "react";

interface HoneypotFieldProps {
  inputRef: RefObject<HTMLInputElement | null>;
}

export const HoneypotField = ({ inputRef }: HoneypotFieldProps) => (
  <div aria-hidden="true" className="absolute left-[-9999px] h-px w-px overflow-hidden">
    <label htmlFor="company">Company</label>
    <input
      ref={inputRef}
      type="text"
      id="company"
      name="company"
      tabIndex={-1}
      autoComplete="off"
    />
  </div>
);
