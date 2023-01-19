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
import ScrollToPlugin from "gsap/dist/ScrollToPlugin"
import gsap from "gsap"
import { inferInitialRouteFromPath } from "framer/build/router"
import { createPublicKey } from "crypto"
import Projects from "./projects"
import { ScrollTrigger } from "gsap/dist/ScrollTrigger"
gsap.registerPlugin(ScrollToPlugin)

const scrollToId = (id: string, duration = 0.5) => {
    gsap.to(window, {
        // delay: 0.2,
        duration: 0.5,
        scrollTo: { y: `#${id}`, offsetY: 140 },
        ease: "sine.inOut",
    })
}

function classNames(...classes) {
    return classes.filter(Boolean).join(" ")
}

export default function NavBar() {
    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger)
    }, [])
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
                                            <a
                                                onClick={() => {
                                                    scrollToId("projects")
                                                }}
                                                className="Projects text-sm text-gray-400 px-3 py-2 rounded-md hover:text-red-500"
                                            >
                                                Projects
                                            </a>
                                            <a
                                                className=" text-sm text-gray-400 px-3 py-2 rounded-md hover:text-gray-00"
                                            >
                                                Resume
                                            </a>
                                        </div>
                                    </div>
                                    <div className="-mr-2 flex md:hidden">
                                        <Disclosure.Button className="bg-white inline-flex items-center justify-center p-2 rounded-md text-gray-400   focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 ">
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
                                <div className="py-2 pt-2 pb-3 space-x-1 sm:py-3">
                                        <div className="flex flex-col  items-baseline space-y-2">
                                            <a
                                                onClick={() => {
                                                    scrollToId("projects")
                                                }}
                                                className="mx-auto Projects text-sm text-gray-400 px-3 py-2 rounded-md hover:text-gray-500"
                                            >
                                                Projects
                                            </a>
                                            <a
                                                className="mx-auto text-sm text-gray-400 px-3 py-2 rounded-md hover:text-gray-00"
                                            >
                                                Resume
                                            </a>
                                        </div>
                                    </div>
                            </Disclosure.Panel>
                        </>
                    )}
                </Disclosure>
            </div>
        </>
    )
}
