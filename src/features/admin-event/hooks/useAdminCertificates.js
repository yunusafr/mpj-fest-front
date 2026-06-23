import { useEffect, useState } from "react";
import {
  getAdminCertificates,
  getAdminCertificateDetail,
} from "../api/certificateApi";

// LIST ADMIN
export const useAdminCertificates = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAdminCertificates()
      .then(setData)
      .finally(() => setLoading(false));
  }, []);

  return { data, loading };
};

// DETAIL ADMIN
export const useAdminCertificateDetail = (eventId) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!eventId) return;

    getAdminCertificateDetail(eventId)
      .then(setData)
      .finally(() => setLoading(false));
  }, [eventId]);

  return { data, loading };
};
