"use client"

import OpenLayersComponent from "@/components/open-layers"
import { TWAContext } from "@/contexts/twa-context";
import { LocationData } from "@twa-dev/types";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";


export default function Page() {

  const context = useContext(TWAContext)
  const webApp = context?.webApp

  const handleClick = () => {
    if (webApp?.LocationManager.isInited) {
      if (!webApp.LocationManager.isAccessGranted) {
        webApp.LocationManager.openSettings() 
      }
      webApp.LocationManager.getLocation((data: LocationData | null) => {
        console.log(data);
      })
    }
  }

  return (
    <div className="relative h-screen w-full">
      <OpenLayersComponent />
      <div className="absolute bottom-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
        <Image src={"/pin.svg"} alt="pin" width={50} height={30} />
      </div>
      <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 z-50">
        {/* <Link href={"/create"}> */}
          <button onClick={handleClick} className="bg-sky-400 text-white font-bold w-72 py-4 rounded-lg shadow">
            Попросить помощь
          </button>
        {/* </Link> */}
      </div>
    </div>
  );
}
