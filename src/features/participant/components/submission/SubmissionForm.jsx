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
    initialData?.deskripsi_karya || ""
  );
  const [linkDrive, setLinkDrive] = useState(initialData?.link_drive || "");
  const [file, setFile] = useState(null);

  const status = initialData?.status;
  const isLocked = status === "verified";

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (status === "verified") {
      toast.error("Karya sudah diverifikasi dan tidak bisa diubah");
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

    if (file) formData.append("file_karya", file);

    try {
      await uploadMutation.mutateAsync(formData);

      toast.success(
        isRevisi ? "Revisi berhasil dikirim" : "Karya berhasil dikirim"
      );

      refetch();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Upload gagal");
    }
  };

  return (
    <form className="space-y-8" onSubmit={handleSubmit}>

      {/* ================= HEADER ================= */}
      <div className="space-y-2">
        <h2 className="text-xl font-bold text-slate-900">
          {isRevisi ? "Revisi Karya" : "Upload Karya"}
        </h2>

        <p className="text-sm text-slate-500 leading-relaxed">
          {isRevisi
            ? "Perbarui karya kamu sesuai catatan dari reviewer. Pastikan semua perubahan sudah sesuai sebelum dikirim ulang."
            : "Lengkapi form di bawah untuk mengirim karya kamu. Pastikan link Google Drive dapat diakses oleh panitia."}
        </p>

        {isLocked && (
          <div className="mt-3 p-4 rounded-2xl bg-emerald-50 text-emerald-700 border border-emerald-200 text-sm font-medium">
            Karya sudah diverifikasi. Semua field terkunci dan tidak dapat diubah.
          </div>
        )}
      </div>

      {/* ================= FORM BODY ================= */}
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
            className="mt-2 w-full h-12 px-4 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition disabled:bg-slate-100"
            placeholder="Masukkan judul karya"
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
            className="mt-2 w-full p-4 rounded-xl border border-slate-200  focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition resize-none disabled:bg-slate-100"
            placeholder="Ceritakan konsep, ide, atau proses pembuatan karya kamu..."
          />
        </div>

        {/* LINK */}
        <div>
          <label className="text-sm font-semibold text-slate-700">
            Link Google Drive
          </label>
          <input
            type="url"
            value={linkDrive}
            onChange={(e) => setLinkDrive(e.target.value)}
            disabled={isLocked}
            className="mt-2 w-full h-12 px-4 rounded-xl border border-slate-200  focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition disabled:bg-slate-100"
            placeholder="https://drive.google.com/..."
          />

          <p className="mt-2 text-xs text-slate-500">
            Pastikan file sudah diatur ke mode <span className="font-medium">“Anyone with the link”</span>
          </p>
        </div>

        {/* FILE UPLOAD */}
        <div className={isLocked ? "opacity-60 pointer-events-none" : ""}>
          <label className="text-sm font-semibold text-slate-700">
            File Sampul (Opsional)
          </label>

          <label className="mt-3 flex flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-slate-300 bg-slate-50 py-8 cursor-pointer hover:bg-emerald-50/40 hover:border-emerald-400 transition">

            <UploadCloud className="text-emerald-600" size={32} />

            <p className="font-medium text-slate-800">
              Klik atau drag file ke sini
            </p>

            <p className="text-xs text-slate-500">
              JPG, PNG, atau PDF (opsional)
            </p>

            {file && (
              <span className="mt-2 text-xs bg-white border px-3 py-1 rounded-full  text-slate-700">
                {file.name}
              </span>
            )}

            <input
              type="file"
              className="hidden"
              disabled={isLocked}
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
          </label>
        </div>
      </div>

      {/* ================= FOOTER ================= */}
      <div className="pt-2">
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
          Dengan mengirimkan form ini, kamu menyetujui ketentuan lomba yang berlaku.
        </p>
      </div>
    </form>
  );
}