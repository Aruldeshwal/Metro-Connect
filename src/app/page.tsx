"use client";
import GetStartedButton from "./main/button/get-started/page";
import HeaderText from "./main/text/header-text/page";
import DarkVeil from "@/blocks/Backgrounds/DarkVeil/DarkVeil";
import HowItWorks from "./main/section/how-it-works/page";
import Features from "./main/section/features/page";
import Testimonials from "./main/section/testimonial/page";
import Footer from "./main/section/footer/page";
import DescriptionText from "./main/text/description-text/page";
import AnimatedNetwork from "@/components/ui/AnimatedNetwork";
import Navbar from "./main/section/navbar/page";

export default function Home() {
  return (
    <main className="relative bg-[#0d0d0d] overflow-x-hidden">
      <div className="absolute inset-0 z-0">
        <DarkVeil />
      </div>
      <Navbar/>

      

      <section className="z-20 flex mt-30 mb-50 flex-col md:flex-row items-center justify-center md:justify-between w-full px-6 md:px-20 space-y-10 md:space-y-0 md:space-x-10">
          {/*Left Side - Header Text and Description*/}
          <div className="z-20 flex flex-col items-center justify-center space-y-6 w-[70%]">
            <HeaderText />
            <DescriptionText />
            <GetStartedButton />
          </div>
          {/*Right Side - Image Placeholder*/}
          <div className="z-20 w-[80%] md:w-[40%] lg:w-[30%] flex items-center justify-center">
            <AnimatedNetwork />

          </div>
        </section>

      <section className="relative z-10 mb-30" id="about">
        <HowItWorks />
      </section>
      <section className="relative mb-30 z-10" id="features">
        <Features />
      </section>
      <section className="relative mb-30 z-10" id="testimonials">
        <Testimonials />
      </section>
      <section className="relative z-10" id="contact">
        <Footer />
      </section>
    </main>
  );
}
