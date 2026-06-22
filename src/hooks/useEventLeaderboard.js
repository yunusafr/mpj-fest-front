import { useEffect, useState } from "react";
import { eventApi } from "@/features/event/api/eventApi";

export default function useEventLeaderboard(eventId) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLeaderboard = async () => {
    try {
      setLoading(true);
      const res = await eventApi.getLeaderboard(eventId);
      setData(res.data || []);
    } catch (err) {
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (eventId) fetchLeaderboard();
  }, [eventId]);

  return { data, loading, refetch: fetchLeaderboard };
}
