import type { ArchitectureModule } from "./architecture-module.types";

export const architectureModules: ArchitectureModule[] = [
  { name: "database", description: "Catalog, creation, deletion, favoriting, and search." },
  {
    name: "database-visualizer",
    description: "Visual schema view of a database's tables, columns, and relationships.",
  },
  { name: "sql-editor", description: "The code editor, its console, and running queries." },
  {
    name: "sql-suggestions",
    description: "Basic and advanced SQL snippets shown while writing a query.",
  },
  {
    name: "workspace-layout",
    description: "How the editor, console, and visualizer are arranged on screen.",
  },
  { name: "app-version", description: "The app's own version info shown in Settings." },
];
