"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, User } from "lucide-react";

const navItems = [
    { href: "/", icon: Home, label: "Главная" },
    { href: "/profile", icon: User, label: "Профиль" },
];

export const BottomNavigation = () => {

    const pathName = usePathname()

    return (
        <div className="fixed bottom-0 left-0 right-0 z-10 bg-white border-t border-gray-200">
          <div className="flex justify-around py-3">
            {navItems.map(({ href, icon: Icon, label }) => {
                const isActive = pathName === href;
                return (
                    <Link
                        key={href}
                        href={href}
                        className={`flex flex-col items-center justify-center",
                        ${isActive
                            ? "text-sky-400"
                            : "text-gray-400"
                        }`}
                    >
                        <Icon className={`h-6 w-6 ${isActive && "fill-sky-400"}`} />
                        <span className="text-xs mt-1">{label}</span>
                    </Link>
                );
            })}
          </div>
        </div>
    )
}