import { useNavigate } from "react-router-dom";

import EventForm from "../components/EventForm";

import { useCreateEvent } from "../hooks/useCreateEvent";

export default function CreateEventPage() {
const navigate = useNavigate();

const mutation =
useCreateEvent();

const handleSubmit = (
values
) => {
mutation.mutate(values, {
onSuccess: () => {
navigate(
"/super-admin/events"
);
},
});
};

return ( <div className="max-w-5xl mx-auto px-4 py-8"> <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white/80 backdrop-blur-xl">


    <div className="border-b border-slate-100 p-8">
      <h1 className="text-3xl font-bold text-slate-900">
        Tambah Event
      </h1>

      <p className="mt-2 text-slate-500">
        Buat event baru dan hubungkan ke festival yang sesuai.
      </p>
    </div>

    <div className="p-8">
      <EventForm
        mode="create"
        loading={
          mutation.isPending
        }
        onSubmit={
          handleSubmit
        }
      />
    </div>

  </div>
</div>


);
}
