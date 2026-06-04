import HeroSection from "@/features/landing/components/HeroSection";
import { Helmet } from "react-helmet-async";


export default function LandingPage() {
  return (
    <>
    <Helmet>
            <title>Homepage | MPJ Fest</title>
          </Helmet>
      <HeroSection />
    </>
  );
}