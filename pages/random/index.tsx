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
import stagemanager2 from "../../images/random.png"
import frame1 from "./images/frame1.jpg"
import frame2 from "./images/frame2.jpg"
import frame3 from "./images/frame3.jpg" 
import frame4 from "./images/frame4.jpg"
import { useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/dist/ScrollTrigger"
import Para from "../Para"
import Title from "../title"

const callouts1 = [
    {
        name: "Purpose",
        description:
            "A mobile application for scanning objects or environments with textures using LiDAR and photogrammetry and body motion capture using machine learning.",
    },
    {
        name: "Real-Time Motion Capture",
        description:
            "Full body motion capture using machine learning with skeletal features which can be used to animate a 3D character model.",
    },
    {
        name: "Photogrammetry",
        description:
            "Scan a room/object’s topological features with textures using LiDAR and photogrammetry and viewing it in AR or exporting it as a 3D model in an .obj file to be used in various 3D editing softwares.",
    },
    {
        name: "Viewing",
        description: "Both can either be viewed in AR or be used in rendering tools such as Blender, Cinema 4D, Unity, etc to create 3D model assets and character animations.",
    },
]

const callouts2 = [
    {
        name: "Purpose",
        description:
            "An open-world third person game built using UE5. The open-world sandbox consists of various biomes mainly to explore and use UE5.",
    },
    {
        name: "Effects",
        description:
            "The post processing used include Ambient Occlusion and Screen Spaced Reflections. Lumen could be used in this build of UE5 but macOS does not support hardware accelerated ray-tracing",
    },
    {
        name: "Traversal",
        description:
            "A third person camera controller with basic actions to traverse around the open-world.",
    },
    {
        name: "Nanite",
        description:
            "Nanite based assets were used in this build but the screenshots show a low preset of level of detail.",
    },
]

const callouts3 = [
    {
        name: "Function",
        description:
            "This project involves a Mobile Application for identifying landmarks by clicking a picture of a Landmark or Tourist Destination. Winning project at Internal Smart India hackathon ",
    },
    {
        name: "Image processing",
        description:
            "The image will be processed by a Convolutional Neural Network in the Cloud to identify the landmark and then return information about it, as well as other nearby locations.",
    },
    {
        name: "Guided Tour Itinerary",
        description:
            "The standout feature is a Guided Tour Itinerary that will be presented to the user based on frequent tourist visitation patterns and curated to perfection.",
    },
    {
        name: "Community Feedback",
        description: "The users of the platform can submit new information about the locations they visit, and these facts will go through a crowd review process.",
    },
]


const callouts4 = [
    {
        name: "Function",
        description:
            "An iOS application which helps users keep track of their transactions daily with friends, stores, etc.",
    },
    {
        name: "How it Works",
        description:
            "The user can add transactions and their details and have them tracked in a transaction log can also add friends to keep track of lent or borrowed money between a friend.",
    },
    {
        name: "CoreData",
        description:
            "The app uses CoreData to store app data",
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
            <div className="bggradient  innerShadow">
                <main
                    id="header"
                    className="z-0 mx-4 max-w-5xl xl:mx-auto inset-x-0 md:mx-12 lg:mx-24  px-2 py-28 sm:py-32 md:py-28 lg:py-56 flex md:flex-row justify-center flex-col  gap-4"
                >
                    
                    <div className="w-full">
                        <Image src={stagemanager2} />
                    </div>
                </main>
            </div>

            <div className=" mx-4 my-5 max-w-5xl xl:mx-auto inset-x-0 md:mx-12 lg:mx-24 px-2">
                <Title text="Body Motion Capture and Object Scanning app" />
                <div className="flex flex-row gap-2 mt-6 justify-center">
                            <div className="bg-gray-100 py-1 px-3 rounded-lg text-sm text-gray-500 tag">
                                Swift
                            </div>
                            <div className="bg-gray-100 py-1 px-3 rounded-lg text-sm text-gray-500 tag">
                                ArKit
                            </div>
                            <div className="bg-gray-100 py-1 px-3 rounded-lg text-sm text-gray-500 tag">
                                RealityKit
                            </div>
                        </div>
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
                <Title text="Third Person open world game - Unreal Engine 5 " />
                <div className="flex flex-row gap-2 mt-6 justify-center">
                            <div className="bg-gray-100 py-1 px-3 rounded-lg text-sm text-gray-500 tag">
                                Unreal Engine 5
                            </div>
                            <div className="bg-gray-100 py-1 px-3 rounded-lg text-sm text-gray-500 tag">
                                Nanite
                            </div>
                            <div className="bg-gray-100 py-1 px-3 rounded-lg text-sm text-gray-500 tag">
                                Lumen
                            </div>
                        </div>
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
                <Title text="TourTime - Virtual Tourist Guide" />
                <div className="flex flex-row gap-2 mt-6 justify-center">
                            <div className="bg-gray-100 py-1 px-3 rounded-lg text-sm text-gray-500 tag">
                                ionic
                            </div>
                            <div className="bg-gray-100 py-1 px-3 rounded-lg text-sm text-gray-500 tag">
                                Tensorflow
                            </div>
                            <div className="bg-gray-100 py-1 px-3 rounded-lg text-sm text-gray-500 tag">
                                python
                            </div>
                        </div>
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
                <Title text="iOS Wallet App" />
                <div className="flex flex-row gap-2 mt-6 justify-center">
                            <div className="bg-gray-100 py-1 px-3 rounded-lg text-sm text-gray-500 tag">
                                SwiftUI
                            </div>
                            <div className="bg-gray-100 py-1 px-3 rounded-lg text-sm text-gray-500 tag">
                                ArKit
                            </div>
                            <div className="bg-gray-100 py-1 px-3 rounded-lg text-sm text-gray-500 tag">
                                RealityKit
                            </div>
                        </div>
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
                <Image src={frame4} />
                
            </div>
            <Footer />
        </div>
    )
}
