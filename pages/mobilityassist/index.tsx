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
import stagemanager2 from "./images/mobilityassist.jpg"
import frame1 from "./images/frame1.jpg"
import frame2 from "./images/frame2.jpg"
import frame3 from "./images/frame3.jpg" 
import frame4 from "./images/frame4.jpg"
import frame5 from "./images/frame5.jpg"
import frame6 from "./images/frame6.png"
import frame7 from "./images/frame7.png"
import { useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/dist/ScrollTrigger"
import Para from "../Para"
import Title from "../title"

const callouts1 = [
    {
        name: "Function",
        description:
            "A mobile application which would mainly be a substitute for walking canes for the visually impaired.",
    },
    {
        name: "LiDAR",
        description:
            "Using LiDAR (Light Detection and Ranging), a 3D model of the scanned environment would be constructed in real time.",
    },
    {
        name: "Haptic Feedback",
        description:
            "The user, through haptic feedback, can be aware if an obstacle exists in his view. The frequency of this haptic feedback would be inversely proportional to the distance from the obstacle.",
    },
    {
        name: "Object Recognition",
        description: "Using a CNN model, which has an input of the spatial features and depth features of the environment, the user can identify the type of obstacle that exists in their view through synthesized speech.",
    },
]

const callouts2 = [
    {
        name: "Step 1: LiDAR",
        description:
            "The LiDAR scanner works on the principle of using light in the form of a pulsed laser to measure ranges. Using these measured ranges, the distance to every single point in the environment can be calculated with respect to the user. Using these distances, a 3D recreation of the environment is obtained.",
    },
    {
        name: "Step 2: Haptic Feedback",
        description:
            "The frequency of the haptic feedback/vibrations on the smartphone will be inversely proportional to the distance from the obstruction. The goal is to create a realistic haptic simulation that keeps the user constantly aware of their proximity to objects and ensures their safety.",
    },
    {
        name: "Step 3: Object Recognition",
        description:
            "By utilizing the 3D mesh, the system can identify the obstacles in the user's path and, if necessary, verbally alert them to the type of hazards through synthesized speech.",
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
                <title>Vikrant Gurav - Mobility Assist</title>
                <meta
                    name="description"
                    content="Generated by create next app"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <NavBar />
            <div className="bg-orange-100  innerShadow">
                <main
                    id="header"
                    className="z-0 mx-4 max-w-5xl xl:mx-auto inset-x-0 md:mx-12 lg:mx-24  px-2 py-28 sm:py-32 md:py-18 lg:py-18 flex md:flex-row justify-center flex-col  gap-4"
                >
                    <div className="flex align-middle">
                        <h1 className="w-full md:w-2/3 my-auto text-gray-700 text-3xl md:text-5xl align-center justify-center font-['SentientItalic'] ">
                        Mobility Assist
                    </h1>
                    </div>
                    <div className="sm:w-full md:w-1/2">
                        <Image src={stagemanager2} priority />
                    </div>
                </main>
            </div>
            <Details />
            <div className=" mx-4 my-5 max-w-5xl xl:mx-auto inset-x-0 md:mx-12 lg:mx-24 px-2">
                <Title text="The Idea" />
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
                <Title text="How it Works" />
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
                {/* <Title text="Operational Flowchart" />
                <div className="mt-10 mb-10 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-x-16 lg:gap-y-8">
                </div> */}
   
            </div>
            <Footer />
        </div>
    )
}
