// components/Seo.jsx
import { Helmet } from "react-helmet-async";

export default function Seo({ title }) {
  return (
    <Helmet>
      <title>{title} | MPJ Festival</title>
    </Helmet>
  );
}