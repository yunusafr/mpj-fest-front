import { useStaffCertificates } from "../hooks/useStaffCertificates";

export default function StaffCertificatePage() {
  const { data, loading } = useStaffCertificates();

  if (loading) return <p>Loading...</p>;

  return (
    <div className="grid gap-4">
      {data.map((item) => (
        <div key={item.event_id} className="border p-4 rounded-xl">
          <h3 className="font-bold">{item.event_name}</h3>

          <p>Nomor: {item.nomor_sertifikat}</p>

          <span
            className={`px-2 py-1 text-sm rounded ${
              item.status === "issued"
                ? "bg-green-100 text-green-700"
                : item.status === "draft"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-red-100 text-red-700"
            }`}
          >
            {item.status}
          </span>
        </div>
      ))}
    </div>
  );
}
