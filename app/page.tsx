"use client"

import OpenLayersComponent from "@/components/open-layers"
import { TWAContext } from "@/contexts/twa-context";
import { LocationData } from "@twa-dev/types";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { useRouter } from "next/navigation";


export default function Page() {

  const context = useContext(TWAContext)
  const webApp = context?.webApp
  const setGeolocation = context?.setGeolocation

  const router = useRouter()

  const handleClick = () => {
    try {
      if (webApp?.LocationManager.isInited) {
        if (webApp.LocationManager.isLocationAvailable) {
          if (webApp.LocationManager.isAccessRequested && !webApp.LocationManager.isAccessGranted) {
            webApp.LocationManager.openSettings()
          }
          webApp.LocationManager.getLocation((data: LocationData | null) => {
            if (data) setGeolocation!({lat: data.latitude, lng: data.longitude})
          }) 
        }
      }
      router.push("/create")
    } catch(e) {
      alert(e)
    }
    
  }

  return (
    <div className="relative h-screen w-full flex justify-center items-center">
      {/* <Link href={"/create"}> */}
        <button onClick={handleClick} className="bg-sky-400 text-white font-bold w-72 py-4 rounded-lg shadow">
          Попросить помощь
        </button>
      {/* </Link> */}
      {/* <OpenLayersComponent />
      <div className="absolute bottom-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
        <Image src={"/pin.svg"} alt="pin" width={50} height={30} />
      </div> */}
      {/* <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 z-50">
        <Link href={"/create"}>
          <button onClick={handleClick} className="bg-sky-400 text-white font-bold w-72 py-4 rounded-lg shadow">
            Попросить помощь
          </button>
        </Link>
      </div> */}
    </div>
  );
}
