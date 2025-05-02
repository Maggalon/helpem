"use client"

import { TWAContext } from "@/contexts/twa-context"
import { Smile, RotateCcw, ShoppingBag, Croissant, BadgeRussianRuble, HeartHandshake, Info, Award } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useContext, useState } from "react"

interface ReputationData {
    currentScore: number
    nextLevelThreshold: number
    level: number
    rank: string
}
  
// Sample data - in a real app, this would come from props or an API
const sampleData: ReputationData = {
    currentScore: 1250,
    nextLevelThreshold: 1500,
    level: 3,
    rank: "Trusted Member",
}


export default function Profile() {

    const context = useContext(TWAContext)
    const webApp = context?.webApp

    const [repData, setRepData] = useState<ReputationData>(sampleData)
    const [helpTokenBalance, setHelpTokenBalance] = useState<number>(1250.70)

    return(
        <div className='flex flex-col gap-5 mx-5'>
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
                <span className='text-xl font-bold text-gray-900'>Пригласи друга</span>
                <span>Помогай другим вместе с друзьями</span>
                <a href={`https://t.me/share/url?url=${encodeURI("https://t.me/helpem_bot")}`} className='bg-sky-400 px-4 py-2 text-white font-semibold rounded-full'>Расскажи всем!</a>
            </div>
            <div className='flex flex-col items-start gap-2 p-5 border shadow-lg rounded-lg'>
                <div className="w-full flex justify-between items-center">
                    <h3 className="text-xl font-bold text-gray-900">Репутация</h3>
                    <div className="flex items-center gap-1 bg-sky-200 px-2 py-1 rounded-full">
                        <Award className="h-4 w-4 text-sky-600" />
                        <span className="text-sm font-medium text-sky-700">Уровень {repData.level}</span>
                    </div>
                </div>
                    <p className="text-md text-gray-500 dark:text-gray-400 mt-1">{repData.rank}</p>
            
                    {/* Score and Progress */}
                <div className="space-y-2 w-full">
                    <div className="flex justify-between items-end">
                        <div>
                            <span className="text-3xl font-bold text-gray-900 dark:text-gray-100">{repData.currentScore}</span>
                            <span className="text-ьв text-gray-500 dark:text-gray-400 ml-1">очков</span>
                        </div>
                    </div>

                    {/* Custom Progress Bar with Tooltip */}
                    <div className="relative">
                        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-sky-400 rounded-full transition-all duration-300"
                                style={{ width: `${Math.min(Math.round((repData.currentScore / repData.nextLevelThreshold) * 100), 100)}%` }}
                            ></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex flex-col items-center p-5 border shadow-lg rounded-lg'>
                <h2 className="text-lg font-medium text-gray-700 mb-2">Токены <span className="font-bold text-sky-400">HELP</span></h2>
                <div className="text-3xl font-bold">{helpTokenBalance.toLocaleString()}</div>
            </div>
            <div className='flex items-center gap-2 p-5 border shadow-lg rounded-lg'>
                <Info size={32} className="text-sky-400" />
                <span className="">Информация о приложении</span>
            </div>
        </div>
    )
}