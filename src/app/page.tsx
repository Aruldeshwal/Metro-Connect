'use client';
import Hyperspeed from "@/blocks/Backgrounds/Hyperspeed/Hyperspeed";
import Logo from "./main/logo/page";
import ButtonSignupLogin from "./main/button/signup-login/page";

import dynamic from 'next/dynamic';


const ModelViewer = dynamic(() => import('@/app/main/model/model-viewer/page'), {
  ssr: false, 
});

export default function Home() {
  

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#0d0d0d]">
      <Hyperspeed/>
        <Logo/>

        <ButtonSignupLogin/>

      
    </div>
  );

}
