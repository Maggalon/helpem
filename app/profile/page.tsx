"use client"

import { TWAContext } from "@/contexts/twa-context"
import { Smile, RotateCcw, ShoppingBag, Croissant, BadgeRussianRuble, HeartHandshake, Info } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useContext } from "react"


export default function Profile() {

    const context = useContext(TWAContext)
    const webApp = context?.webApp

    return(
        <div className='flex flex-col gap-10 mx-5'>
            <div className='fixed top-0 left-0 bg-white font-bold p-3 text-2xl flex gap-3 w-screen shadow-sm items-center justify-start'>
                {webApp?.initDataUnsafe?.user?.photo_url ? <Image src={webApp!.initDataUnsafe.user!.photo_url!} alt={"Profile pic"} width={48} height={48} className="rounded-full" /> :  <Smile size={48} className='text-sky-400 bg-sky-400/20 rounded-full p-2' />}
                {webApp?.initDataUnsafe?.user ? webApp!.initDataUnsafe.user!.first_name : "Пользователь"}
            </div>
            {/* {!history &&
                <div className='font-semibold text-lg flex flex-col items-center gap-3 border-2 rounded-lg h-96 overflow-auto p-3 mt-24'>
                    <div className="flex items-center gap-4 w-full border shadow-md p-4 rounded-lg">
                        <div className="w-12 h-12 rounded-full bg-gray-300 animate-pulse"></div>
                        <div className="flex-1 flex flex-col gap-2">
                            <div className="w-full h-5 rounded-full bg-gray-300 animate-pulse"></div>
                            <div className="w-1/2 h-4 rounded-full bg-gray-300 animate-pulse"></div>
                        </div>
                        <RotateCcw size={48} className="text-gray-300 animate-pulse p-1" />
                    </div>
                    <div className="flex items-center gap-4 w-full border shadow-md p-4 rounded-lg">
                        <div className="w-12 h-12 rounded-full bg-gray-300 animate-pulse"></div>
                        <div className="flex-1 flex flex-col gap-2">
                            <div className="w-full h-5 rounded-full bg-gray-300 animate-pulse"></div>
                            <div className="w-1/2 h-4 rounded-full bg-gray-300 animate-pulse"></div>
                        </div>
                        <RotateCcw size={48} className="text-gray-300 animate-pulse p-1" />
                    </div>
                </div>
            } */}
            {/* {history && history.length === 0 &&
                <div className='font-semibold text-lg flex flex-col items-center gap-3 mt-24'>
                    <ShoppingBag size={48} className='text-primary-600' />
                    Здесь будет история заказов
                    <Link href="/" className='text-primary-600 font-semibold underline underline-offset-4'>Сделай первый</Link>
                </div>
            }     */}
            {/* {history && history.length !== 0 &&
                <div className='font-semibold text-lg flex flex-col items-center gap-3 border-2 rounded-lg h-96 overflow-auto p-3 mt-24'>
                    {history && history.map(item => {
                        return (
                            <HistoryCard key={item.id} item={item} setSelectedItem={setSelectedItem} />
                        )
                    })}
                </div>
            }    */}
            <div className='mt-24 flex flex-col items-start gap-2 p-5 border shadow-lg rounded-lg'>
                <span className='font-semibold text-sky-400'>Пригласи друга</span>
                <span>Помогай другим вместе с друзьями</span>
                <a href={`https://t.me/share/url?url=${encodeURI("https://t.me/helpem_bot")}`} className='bg-sky-400 px-4 py-2 text-white font-semibold rounded-full'>Расскажи всем!</a>
            </div>
            <div className='flex gap-3'>
                <div className='flex-1 flex flex-col gap-3 items-center p-5 border shadow-lg rounded-lg'>
                    <div className='text-center text-sky-400 text-xl font-semibold w-24'>Репутация</div>
                    <HeartHandshake size={48} className='text-sky-400' />
                    <div className='font-semibold'>100 КГ</div>
                </div>
                <div className='flex-1 flex flex-col gap-3 items-center p-5 border shadow-lg rounded-lg'>
                    <div className='text-center text-sky-400 text-xl font-semibold w-24'>HELP</div>
                    <BadgeRussianRuble size={48} className='text-sky-400' />
                    <div className='font-semibold'>100 РУБ</div>
                </div>
            </div>
            <div className='flex items-center gap-2 p-5 border shadow-lg rounded-lg'>
                <Info size={32} className="text-sky-400" />
                <span className="">Информация о приложении</span>
            </div>
        </div>
    )
}