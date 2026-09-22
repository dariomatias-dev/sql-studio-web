import { AlertTriangle } from "lucide-react";

interface NoJsWarningProps {
  message: string;
}

export const NoJsWarning = ({ message }: NoJsWarningProps) => (
  <noscript>
    <div className="mb-6 flex items-center gap-2 rounded-lg border border-amber-200 bg-amber-50 p-3 text-amber-700">
      <AlertTriangle className="h-5 w-5 shrink-0" />
      <span className="text-sm font-medium">{message}</span>
    </div>
  </noscript>
);
