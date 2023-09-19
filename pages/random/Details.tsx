import { useState } from "react"
import { StarIcon } from "@heroicons/react/20/solid"
import { RadioGroup } from "@headlessui/react"

const project = {
    name: "Random Tech Projects",

    breadcrumbs: [{ id: 1, name: "Projects", href: "../../" }],

    description:
        "This is a page that shows some of the random projects that I have worked on in the past. This includes games, apps and other things",
    tag1: "Random",
    tag2: "Fun",
    tag3: "Games",
}

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
                        
                    </div>
                    <div className="py-0 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pt-0 lg:pb-0 lg:pr-8">
                        <div>
                            <div className="space-y-2 mt-5">
                                <p className="text-sm text-gray-900">
                                    {project.description}
                                </p>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}
