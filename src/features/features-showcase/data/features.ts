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

import type { Feature } from "./feature.types";

export const features: Feature[] = [
  {
    icon: Database,
    title: "Offline SQLite Databases",
    description:
      "A catalog of local databases, each with its own schema and seed data, ready to query immediately.",
  },
  {
    icon: Code,
    title: "SQL Editor",
    description:
      "Write and run SQL with syntax highlighting, a fullscreen mode, and a console showing query results and errors.",
  },
  {
    icon: LayoutDashboard,
    title: "Database Visualizer",
    description:
      "Inspect a database's tables, columns, and structure visually, without writing SQL.",
  },
  {
    icon: RotateCcw,
    title: "Reset Database",
    description: "Restore any database to its original schema and seed data at any time.",
  },
  {
    icon: ClipboardCopy,
    title: "Copy Schema & Seed",
    description: "Copy a database's schema, seed data, or both to the clipboard.",
  },
  {
    icon: Lightbulb,
    title: "SQL Suggestions",
    description:
      "Basic and advanced SQL snippets to speed up writing common queries, toggled from Settings.",
  },
  {
    icon: PanelsTopLeft,
    title: "Configurable Workspace Layout",
    description: "Choose how the editor, console, and visualizer are arranged on screen.",
  },
  {
    icon: Languages,
    title: "Multiple Languages",
    description: "Full app UI in English, Portuguese (Brazil), and Spanish.",
  },
  {
    icon: Palette,
    title: "Theme Selection",
    description: "Light, dark, or system theme.",
  },
  {
    icon: Search,
    title: "Database Search",
    description: "Filter the databases list by name.",
  },
];
