import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { LeadForm } from "@/components/LeadForm";
import { BentoSection } from "@/components/BentoSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <LeadForm />
        <BentoSection />
      </main>
      <Footer />
    </>
  );
}
