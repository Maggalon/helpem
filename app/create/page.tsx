"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/select"
import { TWAContext } from "@/contexts/twa-context"
import { ChevronLeft, Locate, MapPin, Navigation } from "lucide-react"
import { useRouter } from "next/navigation"
import { useContext, useEffect, useState } from "react"


const typeOptions = [
    {
      value: "medical-first-aid",
      label: "Медицина и первая помощь",
      subtypes: [
        { value: "bandages-band-aids", label: "Бинты или пластыри" },
        { value: "pain-relievers", label: "Обезболивающие" },
        { value: "feminine-hygiene-products", label: "Средства женской гигиены" },
        { value: "motion-sickness-medicine", label: "Средство от укачивания" },
        { value: "allergy-medicine", label: "Средство от аллергии" },
        { value: "wound-cleaning-supplies", label: "Средства для очистки ран" },
      ],
    },
    {
      value: "food-drink-emergencies",
      label: "Еда и напитки",
      subtypes: [
        { value: "water", label: "Вода" },
        { value: "snack", label: "Перекус" },
        { value: "baby-formula", label: "Детская смесь" },
        { value: "bottle-opener-corkscrew", label: "Открывалка для бутылок или штопор" },
      ],
    },
    {
      value: "tech-connectivity",
      label: "Технологии и связь",
      subtypes: [
        { value: "phone-charger-power-bank", label: "Зарядка или Power bank" },
        { value: "hotspot", label: "Точка доступа" },
        { value: "аdapter-converter", label: "Адаптер или переходник" },
      ],
    },
    {
      value: "travel-transport",
      label: "Путешествия и транспорт",
      subtypes: [
        { value: "navigation", label: "Подсказать дорогу" },
        { value: "translation", label: "Помощь с переводом" },
        { value: "ticket", label: "Помощь с общественным транспортом" },
        { value: "jump-start", label: "Завести машину с толкача" },
        { value: "flat-tire", label: "Колесо спустило" },
        { value: "gasoline", label: "Бензин кончился" },
      ],
    },
    {
      value: "daily-essentials",
      label: "Предметы на каждый день",
      subtypes: [
        { value: "toilet-paper", label: "Туалетная бумага" },
        { value: "toiletries", label: "Туалетные принадлежности" },
        { value: "sunscreen", label: "Cолнцезащитный крем" },
        { value: "wet-wipes", label: "Влажные салфетки" },
        { value: "diapers", label: "Памперсы" },
        { value: "lighter-matches", label: "Зажигалка или спички" },
      ],
    },
]

export default function Create() {

    const [selectedType, setSelectedType] = useState<string>("")
    const [selectedSubtype, setSelectedSubtype] = useState<string>("")
    const [comment, setComment] = useState<string>("")
    const [centerAddress, setCenterAddress] = useState<string>('Загрузка...');
    
    const context = useContext(TWAContext)
    const webApp = context?.webApp
    const geolocation = context?.geolocation

    const router = useRouter()

    useEffect(() => {
        getAddressFromCoordinates(geolocation?.lng, geolocation?.lat)
    }, [])

    // Get subtypes based on selected type
    const subtypes = typeOptions.find((type) => type.value === selectedType)?.subtypes || []

    // Reset subtype when type changes
    const handleTypeChange = (value: string) => {
        setSelectedType(value)
        setSelectedSubtype("")
    }

    const getAddressFromCoordinates = async (lon: number | undefined, lat: number | undefined) => {
        try {
          // Using Nominatim's reverse geocoding service
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
          );
          const data = await response.json();
          
          if (data && data.display_name) {
            setCenterAddress(data.display_name);
            return data.display_name;
          } else {
            setCenterAddress('Address not found');
            return 'Address not found';
          }
        } catch (error) {
          console.error('Error fetching address:', error);
          setCenterAddress('Error getting address');
          return 'Error getting address';
        }
    };

    const handleConfirm = async () => {
        const response = await fetch('/api/problem/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                type: selectedType,
                subtype: selectedSubtype,
                comment,
                user_id: webApp?.initDataUnsafe.user?.id,
                location: `POINT(${geolocation?.lng} ${geolocation?.lat})`
            })
        })

        const data = await response.json()

        if (data.success) alert("Problem successfully created")
        else alert(data)
    }

    return(
        <>
        <div className="pt-3 pl-2 flex relative">
            <ChevronLeft onClick={() => router.back()} className="absolute left-2" />
            <span className="font-bold w-full text-center">Заполните детали проблемы</span>
        </div>

        <div className="space-y-6 p-5">
            <div className="space-y-2">
                <label className="text-md font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="Location">Местоположение</label>
                <div className="py-1"></div>
                <div className="w-full border p-2 rounded-md flex items-center gap-2">
                    <MapPin />
                    {centerAddress.split(',').slice(0,4).reverse().join(", ")}
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-md font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="type">Тип проблемы</label>
                <div className="py-1"></div>
                <Select value={selectedType} onValueChange={handleTypeChange}>
                    <SelectTrigger id="type" className="w-full">
                        <SelectValue placeholder="Выберите тип" />
                    </SelectTrigger>
                    <SelectContent>
                        {typeOptions.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                            {type.label}
                        </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div className="space-y-2">
                <label className="text-md font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="subtype">Подтип проблемы</label>
                <div className="py-1"></div>
                <Select value={selectedSubtype} onValueChange={setSelectedSubtype} disabled={!selectedType}>
                    <SelectTrigger id="subtype" className="w-full">
                        <SelectValue placeholder={selectedType ? "Выберите подтип" : "Сначала выберите тип"} />
                    </SelectTrigger>
                    <SelectContent>
                        {subtypes.map((subtype) => (
                        <SelectItem key={subtype.value} value={subtype.value}>
                            {subtype.label}
                        </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div className="space-y-2">
                <label className="text-md font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="comment">Комментарий к проблеме</label>
                <div className="py-1"></div>
                <textarea
                    id="comment"
                    placeholder="Помогите, люди добрые..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="flex min-h-[120px] w-full rounded-md border border-input px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                />
            </div>

            <button onClick={handleConfirm} className="bg-sky-400 text-white font-bold w-full py-4 rounded-lg">Подтвердить</button>
        </div>
        </>
    )
}