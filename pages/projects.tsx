import Image from "next/image"
import Link from "next/link"
import stagemanager from "../images/stagemanager.jpg"
import tour from "../images/tour.jpg"
import mobility from "../images/mobility.jpg"
import cerebranium from "../images/cerebranium.jpg"
import kitchenmate from "../images/kitchenmate.jpg"

const featuredcallout = [
    {
        name: "Rethinking Stage Manager on macOS Ventura",
        description: "Critical Analysis and Redesign",
        imageSrc: stagemanager,
        href: "stagemanager",
        tag1: "Redesign",
        tag2: "Figma",
        tag3: "Concept",
    },
]
const callouts = [
    {
        name: "Mobility Assist",
        description:
            "A LiDAR powered mobile application for Mobility Assistance for Visually Impaired users",
        imageSrc: mobility,
        href: "mobilityassist",
        tag1: "swift",
        tag2: "LiDAR",
        tag3: "ArKit",
    },
    {
        name: "KitchenMate",
        description: "An app designed for the amazon echo show to help users cook healthy and sustainable recipes.",
        imageSrc: kitchenmate,
        href: "kitchenmate",
        tag1: "IxD",
        tag2: "Figma",
        tag3: "UCD/HCDE",
    },
    {
        name: "Virtual Tourist Guide",
        description:
            "A mobile application which helps the user identify various landmarks and tourists attractions by taking a picture of the landmark",
        imageSrc: tour,
        href: "tourtime",
        tag1: "ionic",
        tag2: "python",
        tag3: "Tensorflow",
    },
    {
        name: "Promexa",
        description:
            "As an intern in a team to develop Promexa - an online proctored examination platform used by schools in Germany and India. View more on company website",
        imageSrc: cerebranium,
        href: "https://cerebranium.com/promexa",
        tag1: "flutter",
        tag2: "internship",
        tag3: "education",
    },
]

export default function Projects() {
    return (
        <div id="projects" className="">
            <div className="mx-4 max-w-5xl xl:mx-auto inset-x-0 md:mx-12 lg:mx-24 mt-6 px-2 z-10">
                <div className="max-w-2xl mx-auto py-2 lg:max-w-none">
                    <h2 className="text-4xl text-center font-bold text-gray-700 font-['SentientItalic']">
                        Projects
                    </h2>
                    <div className="w-24 h-0.5 mt-4 mb-12 rounded-lg mx-auto bg-gray-400"></div>

                    <div className="mt-6 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-1 lg:gap-y-4">
                        {featuredcallout.map((featuredcallout) => (
                            <div
                                key={featuredcallout.name}
                                className="group relative border rounded-lg p-6"
                            >
                                <div className="relative w-full h-80 rounded-md border overflow-hidden sm:aspect-w-2 sm:aspect-h-1 sm:h-64 lg:aspect-w-1 lg:aspect-h-1">
                                    <Image
                                        src={featuredcallout.imageSrc}
                                        layout="fill"
                                        className="w-full h-full object-center object-cover group-hover:scale-105 transition-transform transitionDuration: 700"
                                    />
                                </div>
                                <h3 className="mt-6 text-base font-semibold text-gray-900">
                                    <Link href={featuredcallout.href}>
                                        <a>
                                        <span className="absolute inset-0" />
                                        {featuredcallout.name}
                                        </a>
                                    </Link>
                                </h3>
                                <p className=" text-sm text-gray-500">
                                    {featuredcallout.description}
                                </p>
                                <div className="flex flex-row gap-2 mt-2 w-full">
                                    <div className="bg-gray-100 py-1 px-3 rounded-lg text-sm text-gray-500 tag">
                                        {featuredcallout.tag1}
                                    </div>
                                    <div className="bg-gray-100 py-1 px-3 rounded-lg text-sm text-gray-500 tag">
                                        {featuredcallout.tag2}
                                    </div>
                                    <div className="bg-gray-100 py-1 px-3 rounded-lg text-sm text-gray-500 tag">
                                        {featuredcallout.tag3}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-6 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-x-5 lg:gap-y-5">
                        {callouts.map((callout) => (
                            <div
                                key={callout.name}
                                className="group relative border rounded-lg p-6  transition-all"
                            >
                                <div className="relative w-full h-80 rounded-md border overflow-hidden sm:aspect-w-2  sm:aspect-h-1 sm:h-64 lg:aspect-w-1 lg:aspect-h-1">
                                    <Image
                                        src={callout.imageSrc}
                                        layout="fill"
                                        className="w-full h-full object-center object-cover group-hover:scale-105  transition-transform"
                                    />
                                </div>
                                <h3 className="mt-6 text-base font-semibold text-gray-900">
                                    <Link href={callout.href}>
                                        <a>
                                            <span className="absolute inset-0" />
                                            {callout.name}
                                        </a>
                                    </Link>
                                </h3>
                                <p className=" text-sm text-gray-500">
                                    {callout.description}
                                </p>
                                <div className="flex flex-row gap-2 mt-2">
                                    <div className="bg-gray-100 py-1 px-3 rounded-lg text-sm text-gray-500 tag">
                                        {callout.tag1}
                                    </div>
                                    <div className="bg-gray-100 py-1 px-3 rounded-lg text-sm text-gray-500 tag">
                                        {callout.tag2}
                                    </div>
                                    <div className="bg-gray-100 py-1 px-3 rounded-lg text-sm text-gray-500 tag">
                                        {callout.tag3}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
