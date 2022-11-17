import { Disclosure, Menu, Transition } from "@headlessui/react"
import {
    Bars3Icon,
    BellIcon,
    InboxStackIcon,
    MinusIcon,
    RectangleStackIcon,
    XMarkIcon,
} from "@heroicons/react/24/outline"
import Image from "next/image"
import logo from "../images/fav.png"
import React, { useEffect } from "react"

const navigation = [
    { name: "Home", href: "../", id: "home", current: true },
    { name: "Projects", href: "#projects", current: false },
    { name: "About me", href: "#", current: false },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(" ")
}

export default function NavBar() {
    return (
        <>
            <div
                id="nav"
                className="mx-2 font-['Sentient'] max-w-5xl xl:mx-auto inset-x-0 fixed md:mx-12 mt-6 z-10 backdrop-blur-md bg-white/70 rounded-lg"
            >
                <Disclosure
                    as="nav"
                    className=" drop-shadow-[0_10px_10px_rgba(0,0,0,0.02)]  border rounded-lg"
                >
                    {({ open }) => (
                        <>
                            <div className="max-w-5xl px-4 sm:px-6 lg:px-8">
                                <div className="flex items-center justify-between h-16">
                                    <div className="flex items-center">
                                        <a
                                            href="../"
                                            className="flex-shrink-0 w-8 h-8 "
                                        >
                                            <Image src={logo} />
                                        </a>
                                    </div>
                                    <div className="hidden items-baseline md:block">
                                        <div className="ml-10 flex items-baseline space-x-5">
                                            {navigation.map((item) => (
                                                <a
                                                    key={item.name}
                                                    href={item.href}
                                                    className={classNames(
                                                        item.current
                                                            ? " text-gray-900 font-semibold"
                                                            : "text-gray-400  hover:text-gray-500",
                                                        "px-3 py-2 rounded-md text-sm font-normal"
                                                    )}
                                                    aria-current={
                                                        item.current
                                                            ? "page"
                                                            : undefined
                                                    }
                                                >
                                                    {item.name}
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="-mr-2 flex md:hidden">
                                        <Disclosure.Button className="bg-white inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                                            <span className="sr-only">
                                                Open main menu
                                            </span>
                                            {open ? (
                                                <XMarkIcon
                                                    className="block h-6 w-6"
                                                    aria-hidden="true"
                                                />
                                            ) : (
                                                <Bars3Icon
                                                    className="block h-6 w-6"
                                                    aria-hidden="true"
                                                />
                                            )}
                                        </Disclosure.Button>
                                    </div>
                                </div>
                            </div>

                            <Disclosure.Panel className="md:hidden">
                                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                                    {navigation.map((item) => (
                                        <Disclosure.Button
                                            key={item.name}
                                            as="a"
                                            href={item.href}
                                            className={classNames(
                                                item.current
                                                    ? "bg-gray-900 text-white"
                                                    : "text-gray-300 hover:bg-gray-700 hover:text-white",
                                                "block px-3 py-2 rounded-md text-base font-normal"
                                            )}
                                            aria-current={
                                                item.current
                                                    ? "page"
                                                    : undefined
                                            }
                                        >
                                            {item.name}
                                        </Disclosure.Button>
                                    ))}
                                </div>
                            </Disclosure.Panel>
                        </>
                    )}
                </Disclosure>
            </div>
        </>
    )
}
