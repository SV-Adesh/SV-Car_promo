import { Hero } from "@/components/sections/hero";
import { Car } from "@/components/sections/car";
import { Services } from "@/components/sections/services";
import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Car />
      <Services />
      <About />
      <Contact />
    </main>
  );
}
