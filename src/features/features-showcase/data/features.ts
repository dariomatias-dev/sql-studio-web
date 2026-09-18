import {
  ClipboardCopy,
  Code,
  Database,
  Languages,
  Lightbulb,
  LayoutDashboard,
  Palette,
  PanelsTopLeft,
  RotateCcw,
  Search,
} from "lucide-react";

import type { LucideIcon } from "lucide-react";

// Order matches messages/{locale}.json's Features.items array.
export const featureIcons: LucideIcon[] = [
  Database,
  Code,
  LayoutDashboard,
  RotateCcw,
  ClipboardCopy,
  Lightbulb,
  PanelsTopLeft,
  Languages,
  Palette,
  Search,
];
