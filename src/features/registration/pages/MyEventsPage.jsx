import {
  useMyRegistrations,
}
from "../hooks/useMyRegistrations";

import RegistrationCard
from "../components/RegistrationCard";

export default function MyEventsPage() {

  const {
    data,
    isLoading,
  } =
    useMyRegistrations();

  if (isLoading) {
    return (
      <div>
        Loading...
      </div>
    );
  }

  const registrations =
    data?.data ?? [];

    if (!registrations.length) {
  return (
    <div
      className="
      rounded-3xl
      border
      bg-white
      p-10
      text-center
      "
    >
      <h2
        className="
        text-xl
        font-bold
        "
      >
        Belum Ada Event
      </h2>

      <p
        className="
        mt-2
        text-slate-500
        "
      >
        Anda belum mendaftar event apapun.
      </p>
    </div>
  );
}

  return (
    <div>

      <h1
        className="
        text-3xl
        font-black
        mb-6
        "
      >
        Event Saya
      </h1>

      <div
        className="
        grid
        md:grid-cols-2
        gap-6
        "
      >
        {registrations.map(
          (registration) => (
            <RegistrationCard
              key={
                registration.id
              }
              registration={
                registration
              }
            />
          )
        )}
      </div>

    </div>
  );
  
}