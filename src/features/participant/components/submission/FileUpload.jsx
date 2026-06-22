import { UploadCloud } from "lucide-react";

export default function FileUpload({
  file,
  setFile,
  initialData,
  isLocked = false,
}) {
  const currentCover = initialData?.file_url;

  const handleFileChange = (e) => {
    const selected = e.target.files?.[0];

    if (!selected) return;

    if (selected.size > 1024 * 1024) {
      alert("Ukuran gambar maksimal 1 MB");
      return;
    }

    setFile(selected);
  };

  return (
    <div>
      <label className="text-sm font-semibold text-slate-700">
        File Sampul
      </label>

      {currentCover && (
        <div className="mb-4">
          <p className="text-sm font-semibold text-slate-700 mb-2">
            Sampul Saat Ini
          </p>

          <img
            src={currentCover}
            alt="Cover karya"
            className="w-full max-w-xs rounded-xl border object-cover"
          />
        </div>
      )}

      <label className="mt-3 flex flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-slate-300 bg-gradient-to-b from-slate-50 to-white py-10 cursor-pointer hover:border-emerald-400 hover:bg-emerald-50/40 transition group shadow-sm">
        <div className="p-3 rounded-2xl bg-emerald-50 group-hover:bg-emerald-100 transition">
          <UploadCloud className="text-emerald-600" size={32} />
        </div>

        <p className="font-semibold text-slate-800">
          Drag & drop atau klik untuk upload
        </p>

        <p className="text-xs text-slate-500">
          JPG, JPEG, PNG, WEBP (maks 1 MB)
        </p>

        {file && (
          <div className="mt-2 text-xs font-medium bg-white border shadow-sm px-3 py-1 rounded-full text-slate-700">
            {file.name}
          </div>
        )}

        <input
          type="file"
          accept=".jpg,.jpeg,.png,.webp,image/*"
          className="hidden"
          disabled={isLocked}
          onChange={handleFileChange}
        />
      </label>
    </div>
  );
}
