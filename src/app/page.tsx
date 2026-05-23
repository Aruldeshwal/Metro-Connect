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

      

      <section className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl flex-col items-center justify-center gap-12 px-6 pb-24 pt-32 md:flex-row md:px-10 lg:gap-16 lg:px-8">
          <div className="z-20 flex w-full flex-col items-center space-y-8 text-center md:w-[56%] md:items-start md:text-left">
            <HeaderText />
            <DescriptionText />
            <GetStartedButton />
          </div>
          <div className="z-20 flex w-full items-center justify-center md:w-[44%]">
            <div className="relative w-full max-w-[560px] overflow-hidden rounded-lg border border-cyan-300/20 bg-[#071016]/80 p-4 shadow-2xl shadow-cyan-950/30 backdrop-blur">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent" />
              <div className="mb-4 flex items-center justify-between text-xs font-semibold uppercase tracking-[0.24em] text-cyan-100/70">
                <span>Live Route Match</span>
                <span className="rounded-full border border-emerald-300/30 bg-emerald-300/10 px-3 py-1 text-emerald-200">Active</span>
              </div>
              <div className="relative rounded-lg border border-white/10 bg-black/30">
                <AnimatedNetwork height={390} />
                <div className="absolute left-5 top-5 rounded-md border border-white/10 bg-black/55 px-3 py-2 text-sm text-slate-200 shadow-lg backdrop-blur">
                  Sector 15
                </div>
                <div className="absolute bottom-5 right-5 rounded-md border border-white/10 bg-black/55 px-3 py-2 text-sm text-slate-200 shadow-lg backdrop-blur">
                  Cyber Hub
                </div>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-3 text-center text-sm">
                <div className="rounded-md border border-white/10 bg-white/[0.04] px-3 py-2">
                  <p className="text-cyan-200">18 min</p>
                  <p className="text-slate-500">overlap</p>
                </div>
                <div className="rounded-md border border-white/10 bg-white/[0.04] px-3 py-2">
                  <p className="text-amber-200">3 stops</p>
                  <p className="text-slate-500">shared</p>
                </div>
                <div className="rounded-md border border-white/10 bg-white/[0.04] px-3 py-2">
                  <p className="text-emerald-200">92%</p>
                  <p className="text-slate-500">match</p>
                </div>
              </div>
            </div>
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
