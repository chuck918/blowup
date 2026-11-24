import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";
import Hero from "@/components/home/Hero";
import Marquee from "@/components/home/Marquee";
import Categories from "@/components/home/Categories";
import UpcomingEvents from "@/components/home/UpcomingEvents";
import HowItWorks from "@/components/home/HowItWorks";
import FAQ from "@/components/home/FAQ";
import Contact from "@/components/home/Contact";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <Marquee />
        <Categories />
        <UpcomingEvents />
        <HowItWorks />
        <FAQ />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}
