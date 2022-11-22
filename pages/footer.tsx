/* This example requires Tailwind CSS v2.0+ */
import { PencilSquareIcon } from "@heroicons/react/24/outline"
import { ClipboardIcon } from "@heroicons/react/24/outline"
import Image from "next/image"
import linkedin from "../images/linkedin.svg"

export default function Footer() {
    return (
        <div className="bg-white border-t py-10 mt-24 mx-4 max-w-5xl xl:mx-auto inset-x-0 md:mx-12 lg:mx-24 mt-6 px-2 z-10">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="lg:text-center">
                    <h2 className="text-xl text-center font-semibold desc2 ">
                        Get in Touch!
                    </h2>
                    <p className="mt-1 text-2xl font-bold text-center tracking-tight text-gray-900">
                        hello@vikrantgurav.com
                    </p>
                    <div className="flex flex-row mt-1 justify-center gap-4">
                        <PencilSquareIcon className="w-6 text-xl text-gray-500 hover:text-gray-900" />
                        <ClipboardIcon className="w-6 text-xl text-gray-500 hover:text-gray-900" />
                    </div>
                    <h2 className="text-xl text-center font-semibold desc1 mt-4">
                        or you can find me here!
                    </h2>
                    <div className="flex flex-row mt-1 justify-center gap-2">
                        <a
                            href="https://in.linkedin.com/in/vikrant-gurav"
                            target="_blank"
                            className="w-6 fill-grey-100"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="linkedin"
                                width="20px"
                                viewBox="0 5 1036 990"
                            >
                                <path d="M0 120c0-33.334 11.667-60.834 35-82.5C58.333 15.833 88.667 5 126 5c36.667 0 66.333 10.666 89 32 23.333 22 35 50.666 35 86 0 32-11.333 58.666-34 80-23.333 22-54 33-92 33h-1c-36.667 0-66.333-11-89-33S0 153.333 0 120zm13 875V327h222v668H13zm345 0h222V622c0-23.334 2.667-41.334 8-54 9.333-22.667 23.5-41.834 42.5-57.5 19-15.667 42.833-23.5 71.5-23.5 74.667 0 112 50.333 112 151v357h222V612c0-98.667-23.333-173.5-70-224.5S857.667 311 781 311c-86 0-153 37-201 111v2h-1l1-2v-95H358c1.333 21.333 2 87.666 2 199 0 111.333-.667 267.666-2 469z" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}
