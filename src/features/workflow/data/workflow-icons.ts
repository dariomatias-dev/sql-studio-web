import { Database, LayoutDashboard, RotateCcw, Terminal } from "lucide-react";

import type { LucideIcon } from "lucide-react";

// Order matches messages/{locale}.json's Workflow.steps array.
export const stepIcons: LucideIcon[] = [Database, Terminal, LayoutDashboard, RotateCcw];

export const stepColors: string[] = [
  "from-blue-500 to-cyan-500",
  "from-cyan-500 to-teal-400",
  "from-teal-400 to-emerald-400",
  "from-emerald-400 to-green-500",
];
