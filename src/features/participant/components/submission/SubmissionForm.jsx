import { useState } from "react";
import { toast } from "sonner";
import { UploadCloud } from "lucide-react";

export default function SubmissionForm({
  registrationId,
  uploadMutation,
  refetch,
  initialData,
  isRevisi = false,
}) {
  const [judul, setJudul] = useState(initialData?.judul_karya || "");
  const [deskripsi, setDeskripsi] = useState(
    initialData?.deskripsi_karya || "",
  );
  const [linkDrive, setLinkDrive] = useState(initialData?.link_drive || "");
  const [file, setFile] = useState(null);

  const status = initialData?.status;
  const isLocked = status === "verified";

  const apiUrl = import.meta.env.VITE_API_URL;

  const baseUrl = apiUrl.replace("/api/", "");

  const currentCover = initialData?.file_url
    ? `${baseUrl}${initialData.file_url}`
    : null;

  const handleFileChange = (e) => {
    const selected = e.target.files?.[0];

    if (!selected) return;

    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

    if (!allowedTypes.includes(selected.type)) {
      toast.error("Format gambar harus JPG, PNG, atau WEBP");
      return;
    }

    if (selected.size > 1024 * 1024) {
      toast.error("Ukuran gambar maksimal 1 MB");
      return;
    }

    setFile(selected);
  };

  const previewUrl = file ? URL.createObjectURL(file) : null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (status === "verified") {
      toast.error("Karya sudah diverifikasi dan tidak bisa diubah");
      return;
    }

    if (!judul.trim()) {
      toast.error("Judul karya wajib diisi");
      return;
    }

    if (!linkDrive.trim()) {
      toast.error("Link Google Drive wajib diisi");
      return;
    }

    const formData = new FormData();

    formData.append("registration_id", registrationId);
    formData.append("judul_karya", judul);
    formData.append("deskripsi_karya", deskripsi);
    formData.append("link_drive", linkDrive);

    if (file) {
      formData.append("file_karya", file);
    }

    try {
      await uploadMutation.mutateAsync(formData);

      toast.success(
        isRevisi ? "Revisi berhasil dikirim" : "Karya berhasil dikirim",
      );

      refetch();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Upload karya gagal");
    }
  };

  return (
    <form className="space-y-8" onSubmit={handleSubmit}>
      {/* HEADER */}{" "}
      <div className="space-y-2">
        {" "}
        <h2 className="text-xl font-bold text-slate-900">
          {isRevisi ? "Revisi Karya" : "Upload Karya"}{" "}
        </h2>
        <p className="text-sm text-slate-500 leading-relaxed">
          {isRevisi
            ? "Perbarui karya sesuai catatan reviewer dan kirim ulang."
            : "Lengkapi form berikut untuk mengirim karya."}
        </p>
        {isLocked && (
          <div className="mt-3 p-4 rounded-2xl bg-emerald-50 text-emerald-700 border border-emerald-200 text-sm font-medium">
            Karya sudah diverifikasi dan tidak dapat diubah.
          </div>
        )}
      </div>
      {/* FORM */}
      <div className="space-y-6">
        {/* JUDUL */}
        <div>
          <label className="text-sm font-semibold text-slate-700">
            Judul Karya
          </label>

          <input
            value={judul}
            onChange={(e) => setJudul(e.target.value)}
            disabled={isLocked}
            placeholder="Masukkan judul karya"
            className="mt-2 w-full h-12 px-4 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition disabled:bg-slate-100"
          />
        </div>

        {/* DESKRIPSI */}
        <div>
          <label className="text-sm font-semibold text-slate-700">
            Deskripsi Karya
          </label>

          <textarea
            rows={5}
            value={deskripsi}
            onChange={(e) => setDeskripsi(e.target.value)}
            disabled={isLocked}
            placeholder="Deskripsikan karya kamu..."
            className="mt-2 w-full p-4 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition resize-none disabled:bg-slate-100"
          />
        </div>

        {/* LINK DRIVE */}
        <div>
          <label className="text-sm font-semibold text-slate-700">
            Link Google Drive
          </label>

          <input
            type="url"
            value={linkDrive}
            onChange={(e) => setLinkDrive(e.target.value)}
            disabled={isLocked}
            placeholder="https://drive.google.com/..."
            className="mt-2 w-full h-12 px-4 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition disabled:bg-slate-100"
          />

          <p className="mt-2 text-xs text-slate-500">
            Pastikan file sudah diatur ke{" "}
            <span className="font-medium">Anyone with the link</span>
          </p>
        </div>

        {/* COVER SAAT INI */}
        {currentCover && (
          <div>
            <label className="text-sm font-semibold text-slate-700">
              Sampul Saat Ini
            </label>

            <img
              src={currentCover}
              alt="Cover karya"
              className="mt-3 w-full max-w-xs rounded-xl shadow-sm"
            />
          </div>
        )}

        {/* UPLOAD COVER */}
        <div className={isLocked ? "opacity-60 pointer-events-none" : ""}>
          <label className="text-sm font-semibold text-slate-700">
            Sampul Karya (Opsional)
          </label>

          <label className="mt-3 flex flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-slate-300 bg-slate-50 py-8 cursor-pointer hover:bg-emerald-50/40 hover:border-emerald-400 transition">
            <UploadCloud className="text-emerald-600" size={32} />

            <p className="font-medium text-slate-800">
              Klik untuk memilih gambar
            </p>

            <p className="text-xs text-slate-500">
              JPG, JPEG, PNG, WEBP (maks 1 MB)
            </p>

            {file && (
              <span className="mt-2 text-xs bg-white border px-3 py-1 rounded-full text-slate-700">
                {file.name}
              </span>
            )}

            <input
              type="file"
              accept=".jpg,.jpeg,.png,.webp,image/*"
              className="hidden"
              disabled={isLocked}
              onChange={handleFileChange}
            />
          </label>

          {previewUrl && (
            <div className="mt-4">
              <p className="text-sm font-semibold text-slate-700 mb-2">
                Preview Sampul Baru
              </p>

              <img
                src={previewUrl}
                alt="Preview"
                className="w-full max-w-xs rounded-xl border shadow-sm"
              />
            </div>
          )}
        </div>
      </div>
      {/* FOOTER */}
      <div>
        <button
          type="submit"
          disabled={uploadMutation.isPending || isLocked}
          className="w-full h-12 rounded-xl bg-gradient-to-r from-emerald-600 to-green-600 text-white font-semibold shadow-md hover:shadow-lg hover:scale-[1.01] active:scale-[0.99] transition disabled:opacity-60"
        >
          {uploadMutation.isPending
            ? "Mengupload..."
            : isLocked
              ? "Terkunci"
              : isRevisi
                ? "Kirim Revisi"
                : "Kirim Karya"}
        </button>

        <p className="mt-3 text-center text-xs text-slate-400">
          Dengan mengirimkan karya, kamu menyetujui ketentuan yang berlaku.
        </p>
      </div>
    </form>
  );
}
