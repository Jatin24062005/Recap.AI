import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Ghost } from "lucide-react";
import Image from "next/image";
import LandingPage from "./LandingPage";
import BackgroundParticles from "@/components/BackgroundParticles";
import Header from "@/components/Header";
import FeaturesSection from "@/components/featuresSection";
import HowItWorks from "@/components/How_it_Works";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="">
      <BackgroundParticles />
      <LandingPage />
      <FeaturesSection />  
      <HowItWorks />
      <Testimonials/>
      <Footer/>
    </div>
  );
}
