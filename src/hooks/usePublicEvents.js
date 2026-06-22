import { useEffect, useState } from "react";
import { eventApi } from "@/features/event/api/eventApi";

export default function usePublicEvents(festivalId = "all") {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const res = await eventApi.getAll(festivalId);
      setEvents(res.data || []);
    } catch (err) {
      setError(err?.response?.data?.message || "Gagal load events");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [festivalId]);

  return { events, loading, error, refetch: fetchEvents };
}
