import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Sparkles,
  Award,
  Palette,
  ImageIcon,
  PenTool,
  Save,
} from "lucide-react";

import { useCertificate, useSaveCertificate } from "../hooks/useCertificate";

export default function CertificateSetupPage() {
  const { eventId } = useParams();

  const apiUrl = import.meta.env.VITE_API_URL || "";
  const baseUrl = apiUrl.replace(/\/api\/?$/, "");

  const jenis = "peserta";

  const { data, isLoading } = useCertificate(eventId, jenis);

  const saveMutation = useSaveCertificate();

  const [form, setForm] = useState({
    jenis: "peserta",
    format_nomor: "",

    primary_color: "#FF5733",
    secondary_color: "#FFFFFF",
    text_color: "#000000",

    logo_paths: [],
    existing_logos: [],

    signer_name: "",
    signer_position: "",

    signature_path: null,
    existing_signature: "",

    custom_text: "",
  });

  useEffect(() => {
    if (!data) return;

    setForm({
      jenis: data.jenis ?? "peserta",
      format_nomor: data.format_nomor ?? "",

      primary_color: data.primary_color ?? "#FF5733",
      secondary_color: data.secondary_color ?? "#FFFFFF",
      text_color: data.text_color ?? "#000000",

      logo_paths: [],
      existing_logos: data.logo_paths ?? [],

      signer_name: data.signer_name ?? "",
      signer_position: data.signer_position ?? "",

      signature_path: null,
      existing_signature: data.signature_path ?? "",

      custom_text: data.custom_text ?? "",
    });
  }, [data]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("jenis", form.jenis);
    formData.append("format_nomor", form.format_nomor);

    formData.append("primary_color", form.primary_color);
    formData.append("secondary_color", form.secondary_color);
    formData.append("text_color", form.text_color);

    formData.append("signer_name", form.signer_name);
    formData.append("signer_position", form.signer_position);
    formData.append("custom_text", form.custom_text);

    if (form.signature_path) {
      formData.append("signature_path", form.signature_path);
    }

    form.logo_paths.forEach((file) => {
      formData.append("logo_paths[]", file);
    });

    saveMutation.mutate({
      eventId,
      payload: formData,
    });
  };

  if (isLoading) {
    return <div className="max-w-5xl mx-auto p-6">Loading...</div>;
  }

  return (
    <div className="space-y-8">
      {/* Hero Header */}
      <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-white" />

        <div className="relative">
          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-200">
            <Sparkles size={12} />
            Certificate Setup
          </span>

          <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900">
            Pengaturan Sertifikat
          </h1>

          <p className="mt-2 text-slate-500">
            Atur tampilan sertifikat, logo, warna, dan penandatangan acara.
          </p>
        </div>
      </div>

      {/* Main Card */}
      <form
        onSubmit={handleSubmit}
        className="rounded-3xl border border-slate-200 bg-white p-6 space-y-8"
      >
        {/* Nomor Sertifikat */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Award size={18} className="text-emerald-600" />
            <h3 className="font-semibold text-slate-900">Nomor Sertifikat</h3>
          </div>

          <input
            type="text"
            placeholder="CERT/EVENT-A/[NOMOR]/VI/2026"
            value={form.format_nomor}
            onChange={(e) =>
              setForm({
                ...form,
                format_nomor: e.target.value,
              })
            }
            className="
            w-full
            rounded-xl
            border
            border-slate-200
            px-4
            py-3
            outline-none
            focus:border-emerald-500
          "
          />

          <p className="mt-2 text-sm text-slate-500">
            Gunakan <b>[NOMOR]</b> sebagai placeholder nomor urut.
          </p>
        </div>

        {/* Warna */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Palette size={18} className="text-emerald-600" />
            <h3 className="font-semibold text-slate-900">Warna Sertifikat</h3>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {[
              {
                label: "Primary Color",
                value: form.primary_color,
                key: "primary_color",
              },
              {
                label: "Secondary Color",
                value: form.secondary_color,
                key: "secondary_color",
              },
              {
                label: "Text Color",
                value: form.text_color,
                key: "text_color",
              },
            ].map((item) => (
              <div
                key={item.key}
                className="rounded-2xl border border-slate-200 p-4"
              >
                <label className="block text-sm font-medium text-slate-600 mb-3">
                  {item.label}
                </label>

                <input
                  type="color"
                  value={item.value}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      [item.key]: e.target.value,
                    })
                  }
                  className="h-12 w-full cursor-pointer"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Logo */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <ImageIcon size={18} className="text-emerald-600" />
            <h3 className="font-semibold text-slate-900">Logo Sertifikat</h3>
          </div>

          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) =>
              setForm({
                ...form,
                logo_paths: Array.from(e.target.files),
              })
            }
            className="
            block
            w-full
            rounded-xl
            border
            border-slate-200
            p-3
          "
          />

          <div className="mt-4 flex flex-wrap gap-3">
            {form.existing_logos?.map((logo, index) => (
              <img
                key={index}
                src={`${baseUrl}${logo}`}
                alt=""
                className="
                h-24
                rounded-2xl
                border
                border-slate-200
                bg-white
                p-2
                object-contain
              "
              />
            ))}

            {form.logo_paths.map((file, index) => (
              <img
                key={index}
                src={URL.createObjectURL(file)}
                alt=""
                className="
                h-24
                rounded-2xl
                border
                border-slate-200
                bg-white
                p-2
                object-contain
              "
              />
            ))}
          </div>
        </div>

        {/* Penandatangan */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <PenTool size={18} className="text-emerald-600" />
            <h3 className="font-semibold text-slate-900">Penandatangan</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Nama Penandatangan"
              value={form.signer_name}
              onChange={(e) =>
                setForm({
                  ...form,
                  signer_name: e.target.value,
                })
              }
              className="
              rounded-xl
              border
              border-slate-200
              px-4
              py-3
              focus:border-emerald-500
              outline-none
            "
            />

            <input
              type="text"
              placeholder="Jabatan Penandatangan"
              value={form.signer_position}
              onChange={(e) =>
                setForm({
                  ...form,
                  signer_position: e.target.value,
                })
              }
              className="
              rounded-xl
              border
              border-slate-200
              px-4
              py-3
              focus:border-emerald-500
              outline-none
            "
            />
          </div>

          <div className="mt-4">
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setForm({
                  ...form,
                  signature_path: e.target.files[0],
                })
              }
              className="
              block
              w-full
              rounded-xl
              border
              border-slate-200
              p-3
            "
            />

            {(form.existing_signature || form.signature_path) && (
              <div className="mt-4">
                <img
                  src={
                    form.signature_path
                      ? URL.createObjectURL(form.signature_path)
                      : `${baseUrl}${form.existing_signature}`
                  }
                  alt=""
                  className="
                  h-28
                  rounded-2xl
                  border
                  border-slate-200
                  bg-white
                  p-2
                  object-contain
                "
                />
              </div>
            )}
          </div>
        </div>

        {/* Custom Text */}
        <div>
          <label className="mb-3 block font-semibold text-slate-900">
            Teks Tambahan
          </label>

          <textarea
            rows={5}
            value={form.custom_text}
            onChange={(e) =>
              setForm({
                ...form,
                custom_text: e.target.value,
              })
            }
            className="
            w-full
            rounded-xl
            border
            border-slate-200
            px-4
            py-3
            outline-none
            focus:border-emerald-500
          "
          />
        </div>

        {/* Save */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saveMutation.isPending}
            className="
            inline-flex
            items-center
            gap-2
            rounded-xl
            bg-gradient-to-r
            from-emerald-500
            to-emerald-600
            px-5
            py-3
            text-sm
            font-semibold
            text-white
            transition-all
            hover:shadow-md
            hover:from-emerald-600
            hover:to-emerald-700
          "
          >
            <Save size={18} />

            {saveMutation.isPending ? "Menyimpan..." : "Simpan Pengaturan"}
          </button>
        </div>
      </form>
    </div>
  );
}
