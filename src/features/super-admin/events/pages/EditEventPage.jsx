import {
useParams,
useNavigate,
} from "react-router-dom";

import EventForm from "../components/EventForm";

import { useEvent } from "../hooks/useEvent";
import { useUpdateEvent } from "../hooks/useUpdateEvent";

export default function EditEventPage() {
const { id } =
useParams();

const navigate =
useNavigate();

const {
data,
isLoading,
} = useEvent(id);

const mutation =
useUpdateEvent();

if (isLoading) {
return ( <div className="max-w-5xl mx-auto px-4 py-8"> <div className="animate-pulse rounded-3xl border border-slate-200 bg-white p-8"> <div className="mb-4 h-8 w-48 rounded bg-slate-200" /> <div className="mb-8 h-4 w-72 rounded bg-slate-100" />


      <div className="space-y-4">
        <div className="h-12 rounded-xl bg-slate-100" />
        <div className="h-12 rounded-xl bg-slate-100" />
        <div className="h-12 rounded-xl bg-slate-100" />
        <div className="h-40 rounded-xl bg-slate-100" />
      </div>
    </div>
  </div>
);


}

const handleSubmit = (
payload
) => {
mutation.mutate(
{
id,
payload,
},
{
onSuccess: () => {
navigate(
"/super-admin/events"
);
},
}
);
};

return ( <div className="max-w-5xl mx-auto px-4 py-8"> <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white/80 backdrop-blur-xl">


    <div className="border-b border-slate-100 p-8">
      <h1 className="text-3xl font-bold text-slate-900">
        Edit Event
      </h1>

      <p className="mt-2 text-slate-500">
        Perbarui informasi event dan pastikan data tetap akurat.
      </p>
    </div>

    <div className="p-8">
      <EventForm
        mode="edit"
        defaultValues={
          data?.data
        }
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
