import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import HowItWorks from "@/components/HowItWorks";
import Pricing from "@/components/Pricing";
import WhyJoin from "@/components/WhyJoin";
import FAQ from "@/components/FAQ";
import Sponsors from "@/components/Sponsors";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <HowItWorks />
        <Pricing />
        <WhyJoin />
        <FAQ />
        <Sponsors />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
