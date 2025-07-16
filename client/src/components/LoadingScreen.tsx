import { Building } from "lucide-react";

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
      <div className="text-center">
        <div className="relative mb-8">
          <Building className="text-primary text-6xl mx-auto animate-pulse" />
          <div className="absolute -inset-2 border-4 border-primary/20 rounded-full animate-spin border-t-primary"></div>
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Pipe Factory</h2>
        <p className="text-slate-600">Loading industrial solutions...</p>
      </div>
    </div>
  );
}