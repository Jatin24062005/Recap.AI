import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Ghost } from "lucide-react";
import Image from "next/image";
import LandingPage from "./LandingPage";
import BackgroundParticles from "@/components/BackgroundParticles";
import Header from "@/components/Header";
import FeaturesSection from "@/components/featuresSection";

export default function Home() {
  return (
    <div className="">
      <BackgroundParticles />
      <LandingPage />
      <FeaturesSection />
    </div>
  );
}
