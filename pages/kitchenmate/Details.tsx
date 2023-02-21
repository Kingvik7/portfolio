import { useState } from "react"
import { StarIcon } from "@heroicons/react/20/solid"
import { RadioGroup } from "@headlessui/react"
import Link from "next/link"
import {Docuemnt, Page} from 'react-pdf'

const project = {
    name: "KitchenMate",
    breadcrumbs: [{ id: 1, name: "Projects", href: "../../#projects" }],

    description:
        "A cooking app designed for the Amazon Echo Show/iPad, making it easier than ever to prepare healthy and sustainable meals. With features like personalized recipe recommendations based on available ingredients, sustainability, and calorie tracking goals, all integrated with smart devices, that allow users to cook healthy meals that align with their goals with ease.",
    highlights: ["Part of Interaction Design Group Coursework", "Designed using a UCD/HCDE approach following User research, Conceptual design, Detailed design and Evaluation"], 
    tag1: "IxD",
    tag2: "Figma",
    tag3: "UCD/HCDE",
}

// function classNames(...classes) {
//   return classes.filter(Boolean).join(' ')
// }

export default function Details() {
    return (
        <div className="bg-white mx-4 max-w-5xl xl:mx-auto inset-x-0 md:mx-12 lg:mx-24 px-2">
            <div className="pt-8">
                <nav aria-label="Breadcrumb">
                    <ol
                        role="list"
                        className="mx-auto flex max-w-2xl items-center space-x-2 lg:max-w-7xl"
                    >
                        {project.breadcrumbs.map((breadcrumb) => (
                            <li key={breadcrumb.id}>
                                <div className="flex items-center">
                                    <a
                                        href={breadcrumb.href}
                                        className="mr-2 text-sm font-medium  text-gray-500"
                                    >
                                        {breadcrumb.name}
                                    </a>
                                    <svg
                                        width={16}
                                        height={20}
                                        viewBox="0 0 16 20"
                                        fill="currentColor"
                                        xmlns="http://www.w3.org/2000/svg"
                                        aria-hidden="true"
                                        className="h-5 w-4 text-gray-300"
                                    >
                                        <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                                    </svg>
                                </div>
                            </li>
                        ))}
                    </ol>
                </nav>
                <div className="mx-auto max-w-2xl  pt-2 pb-16  lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8  lg:pt-2 lg:pb-8">
                    <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                            {project.name}
                        </h1>
                    </div>

                    <div className="mt-0 lg:row-span-3 lg:mt-0">
                        <h3 className="text-sm font-medium text-gray-900 mt-5">
                            TechStack
                        </h3>
                        <div className="flex flex-row gap-2 mt-2 w-full">
                            <div className="bg-gray-100 py-1 px-3 rounded-lg text-sm text-gray-500 tag">
                                {project.tag1}
                            </div>
                            <div className="bg-gray-100 py-1 px-3 rounded-lg text-sm text-gray-500 tag">
                                {project.tag2}
                            </div>
                            <div className="bg-gray-100 py-1 px-3 rounded-lg text-sm text-gray-500 tag">
                                {project.tag3}
                            </div>
                        </div>
                        <h3 className="text-sm font-medium text-gray-900 mt-5">
                            Links
                        </h3>
                        <form className="">
                        <a download href="/Report.pdf" target='_blank' rel="noreferrer" className="mt-2 flex w-full items-center justify-center rounded-md border border-transparent bg-pink-600 py-3 px-8 text-center font-medium text-white hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                Download Coursework Report
                            </a>
                        </form>
                    </div>
                    <div className="py-0 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pt-0 lg:pb-0 lg:pr-8">
                        <div>
                            <div className="space-y-2 mt-5">
                                <p className="text-sm text-gray-900">
                                    {project.description}
                                </p>
                            </div>
                        </div>
                        <div className="mt-5">
                            <h3 className="text-sm font-medium text-gray-900">
                                Highlights
                            </h3>
                            <div className="mt-2">
                                <ul
                                    role="list"
                                    className="list-disc space-y-2 pl-4 text-sm"
                                >
                                    {project.highlights.map((highlight) => (
                                        <li
                                            key={highlight}
                                            className="text-gray-400"
                                        >
                                            <span className="text-gray-500 font-['SentientItalic']">
                                                {highlight}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
