"use client";

import { useState } from "react";

export const CopyrightYear = () => {
  const [year] = useState(() => new Date().getFullYear());

  return <>{year}</>;
};
