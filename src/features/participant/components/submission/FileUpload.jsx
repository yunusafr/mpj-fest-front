import { UploadCloud } from "lucide-react";

export default function FileUpload({ file, setFile }) {
  return (
    <div>
      <label className="text-sm font-semibold text-slate-700">
        File Sampul
      </label>

      <label className="mt-3 flex flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-slate-300 bg-gradient-to-b from-slate-50 to-white py-10 cursor-pointer hover:border-emerald-400 hover:bg-emerald-50/40 transition group shadow-sm">
        
        <div className="p-3 rounded-2xl bg-emerald-50 group-hover:bg-emerald-100 transition">
          <UploadCloud className="text-emerald-600" size={32} />
        </div>

        <p className="font-semibold text-slate-800">
          Drag & drop atau klik untuk upload
        </p>

        <p className="text-xs text-slate-500">
          JPG, PNG, PDF (maks 10MB)
        </p>

        {file && (
          <div className="mt-2 text-xs font-medium bg-white border shadow-sm px-3 py-1 rounded-full text-slate-700">
            {file.name}
          </div>
        )}

        <input
          type="file"
          className="hidden"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
      </label>
    </div>
  );
}