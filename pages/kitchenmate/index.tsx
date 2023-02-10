import Head from "next/head"
import Image from "next/image"
import styles from "../../styles/Home.module.css"
import NameTitle from "../NameTitle"
import { motion } from "framer-motion"
import NameAnim from "../NameAnim"
import ScrollInformer from "../ScrollInformer"
import NavBar from "../NavBar"
import Projects from "../projects"
import Details from "./Details"
import Footer from "../footer"
import FAQGrid from "https://framer.com/m/FAQ-Grid-uvJp.js@rbQiKXASeSNS2d01495V"
import { XMarkIcon } from "@heroicons/react/24/outline"
import stagemanager2 from "../../images/stagemanager2.png"
import frame1 from "./images/frame1.jpg"
import frame2 from "./images/frame2.jpg"
import frame3 from "./images/frame3.jpg" 
import frame4 from "./images/frame4.jpg"
import frame5 from "./images/frame5.jpg"
import frame6 from "./images/frame6.jpg"
// import frame7 from "./images/frame7.png"
import { useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/dist/ScrollTrigger"
import Para from "../Para"
import Title from "../title"

const callouts1 = [
    {
        name: "Visibility",
        description:
            "All open apps are moved to the left-hand side of the screen with a 3D perspective & a live preview of each window. The user can click on any of the previewed windows to display the app On-Stage.",
    },
    {
        name: "On-Stage",
        description:
            "These are the apps that are visible on the desktop and being used by the user.",
    },
    {
        name: "Off-Stage",
        description:
            "These are the apps that are not being used by the user and are on the left-hand side of the screen. ",
    },
    {
        name: "Grouped Apps",
        description: "Apps can also be grouped and used on the desktop.",
    },
]

const callouts2 = [
    {
        name: "Screen Real estate",
        description:
            "The windows of open apps take up a lot of screen real estate on the left-hand side of the screen. These windows can be moved elsewhere which integrates with existing window management features.",
    },
    {
        name: "Discoveribility",
        description:
            "For a novice user, discovering new features in stage manager can be challenging and does not blend in well with existing macOS features such as minimizing an app or mission control.",
    },
    {
        name: "Low Frame-rates",
        description:
            "Older non-apple silicon-based macs face potential frame-rate issues due to the 3D perspective of the windows having a live preview of the app.",
    },
    {
        name: "No Split-Screen View",
        description:
            "Split-screen cannot be used when two or more apps are grouped in stage manager.",
    },
]

const callouts3 = [
    {
        name: "Incorporating Stage Manager for All User Types",
        description:
            "This redesign mainly aims to combine stage manager with existing features such as minimizing to the dock, mission control & gesture controls to improve discoverability for all types of users. This results in a seamless window management system. There are now 2 ways to use stage manager depending on the user type.",
    },
    {
        name: "Novice Users",
        description:
            "A Novice user generally would not use gestures, mission control, etc and mainly uses the dock for navigation. All open apps are moved to the dock similar to when an app is minimized. Apps are grouped together similar to folders on iOS. ",
    },
]

const callouts4 = [
    {
        name: "Grouping Apps",
        description:
            "Apps can be grouped by dragging open windows into existing app groups & can also be un-grouped using the minus icon. Alternatively, the user can use the context menu.",
    },
    {
        name: "Live Preview",
        description:
            "Left-clicking on the apps/group icon shows a live preview of the app window.",
    },
    {
        name: "Context Menu",
        description:
            "Right-clicking on the app/group brings up a context menu to customise the group. The user can add to the group, ungroup, show On-Stage or quit all apps.",
    },
    {
        name: "Discoveribility",
        description:
            "With stage manager being moved to the dock, discoverability for novice users would improve.",
    },
]

const callouts5 = [
    {
        name: "Experienced Users",
        description:
            "An experienced user would generally use gestures and mission control for navigation. All open apps/groups are also visible in mission control. Apps can be grouped by dragging open windows onto other apps. ",
    },
]

const callouts6 = [
    {
        name: "Using Hot Corners",
        description:
            "Complex grid views can be created by dragging & holding windows to a corner/side (hot corners).",
    },
]

export default function Home(): JSX.Element {
    useEffect(() => {
        // gsap.registerPlugin(ScrollTrigger)
        gsap.timeline({}).fromTo(
            "#header",
            { opacity: 0 },
            {
                opacity: 1,
                y: "10px",
                ease: "power1.inOut",
            }
        )
        gsap.to("#header", {
            scale: "0.4",
            height: "400px",
            scrollTrigger: {
                trigger: "#header",
                start: "top top",
                end: "bottom top",
                scrub: true,
            },
        })
        gsap.to(".Projects", {
            color: "black",
        })
    }, [])
    return (
        <div className={styles.container}>
            <Head>
                <title>Vikrant Gurav - Rethinking Stage Manager</title>
                <meta
                    name="description"
                    content="Generated by create next app"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <NavBar />
            <div className="bg-gray-100  innerShadow">
                <main
                    id="header"
                    className="z-0 mx-4 max-w-5xl xl:mx-auto inset-x-0 md:mx-12 lg:mx-24  px-2 py-28 sm:py-32 md:py-28 lg:py-56 flex md:flex-row justify-center flex-col  gap-4"
                >
                    <h1 className="w-full md:w-1/3 text-gray-500 text-3xl md:text-5xl align-center font-['Sfpro']">
                        Rethinking Stage Manager on macOS Ventura
                    </h1>
                    <div className="sm:w-full md:w-2/3">
                        <Image src={stagemanager2} />
                    </div>
                </main>
            </div>
            <Details />
            <div className=" mx-4 my-5 max-w-5xl xl:mx-auto inset-x-0 md:mx-12 lg:mx-24 px-2">
                <Title text="How Stage Manager Works on macOS Ventura" />
                <div className="mt-10 mb-10 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-x-16 lg:gap-y-8">
                    {callouts1.map((callout) => (
                        <div key={callout.name} className="">
                            <h3 className="text-base font-semibold text-gray-900">
                                <a>
                                    {/* <span className="absolute inset-0" /> */}
                                    {callout.name}
                                </a>
                            </h3>
                            <div className="w-12 h-0.5 my-1.5 rounded-lg bg-gray-400"></div>
                            <p className="mt-1 text-sm text-gray-500">
                                {callout.description}
                            </p>
                        </div>
                    ))}
                </div>
                <Image src={frame1} />
                <Title text="Issues Observed in Stage Manager " />
                <div className="mt-10 mb-10 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-x-16 lg:gap-y-8">
                    {callouts2.map((callout) => (
                        <div key={callout.name} className="">
                            <h3 className="text-base font-semibold text-gray-900">
                                <a>
                                    {/* <span className="absolute inset-0" /> */}
                                    {callout.name}
                                </a>
                            </h3>
                            <div className="w-12 h-0.5 my-1.5 rounded-lg bg-gray-400"></div>
                            <p className="mt-1 text-sm text-gray-500">
                                {callout.description}
                            </p>
                        </div>
                    ))}
                </div>
                <Image src={frame2} />
                <Title text="Redesigning Stage Manager" />
                <div className="mt-10 mb-10 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-x-16 lg:gap-y-8">
                    {callouts3.map((callout) => (
                        <div key={callout.name} className="">
                            <h3 className="text-base font-semibold text-gray-900">
                                <a>
                                    {/* <span className="absolute inset-0" /> */}
                                    {callout.name}
                                </a>
                            </h3>
                            <div className="w-12 h-0.5 my-1.5 rounded-lg bg-gray-400"></div>
                            <p className="mt-1 text-sm text-gray-500">
                                {callout.description}
                            </p>
                        </div>
                    ))}
                </div>
                <Image src={frame3} />
                <div className="mt-20"></div>
                <Image src={frame4} />
                <div className="mt-20"></div>
                <Image src={frame5} />
                <div className="mt-20"></div>
                <Image src={frame6} />
                <Title text="Stage Manager on the Dock" />
                <div className="mt-10 mb-10 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-x-16 lg:gap-y-8">
                    {callouts4.map((callout) => (
                        <div key={callout.name} className="">
                            <h3 className="text-base font-semibold text-gray-900">
                                <a>
                                    {/* <span className="absolute inset-0" /> */}
                                    {callout.name}
                                </a>
                            </h3>
                            <div className="w-12 h-0.5 my-1.5 rounded-lg bg-gray-400"></div>
                            <p className="mt-1 text-sm text-gray-500">
                                {callout.description}
                            </p>
                        </div>
                    ))}
                </div>
                <iframe  className="w-full h-96" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fproto%2FceIOrE14mSUlIorvNXeeqR%2FUntitled%3Fpage-id%3D0%253A1%26node-id%3D1%253A727%26viewport%3D195%252C448%252C0.08%26scaling%3Dmin-zoom%26starting-point-node-id%3D1%253A727%26show-proto-sidebar%3D1" allowfullscreen></iframe>
                {/* <Image src={frame4} /> */}
                <Title text="Stage Manager in Mission Control" />
                <div className="mt-10 mb-10 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-x-16 lg:gap-y-8">
                    {callouts5.map((callout) => (
                        <div key={callout.name} className="">
                            <h3 className="text-base font-semibold text-gray-900">
                                <a>
                                    {/* <span className="absolute inset-0" /> */}
                                    {callout.name}
                                </a>
                            </h3>
                            <div className="w-12 h-0.5 my-1.5 rounded-lg bg-gray-400"></div>
                            <p className="mt-1 text-sm text-gray-500">
                                {callout.description}
                            </p>
                        </div>
                    ))}
                </div>
                {/* <Image src={frame5} /> */}
                <Title text="Split-Screen View" />
                <div className="mt-0 mb-10 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-1 lg:gap-x-16 lg:gap-y-8"></div>
                {/* <Image src={frame6} /> */}
                <Title text="Creating complex Split-Screen Views" />
                <div className="mt-10 mb-10 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-x-16 lg:gap-y-8">
                    {callouts6.map((callout) => (
                        <div key={callout.name} className="">
                            <h3 className="text-base font-semibold text-gray-900">
                                <a>
                                    {/* <span className="absolute inset-0" /> */}
                                    {callout.name}
                                </a>
                            </h3>
                            <div className="w-12 h-0.5 my-1.5 rounded-lg bg-gray-400"></div>
                            <p className="mt-1 text-sm text-gray-500">
                                {callout.description}
                            </p>
                        </div>
                    ))}
                </div>
                {/* <Image src={frame7} /> */}
            </div>
            <Footer />
        </div>
    )
}
