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
                        Get in Touch
                    </h2>
                    <p className="mt-1 text-2xl font-bold text-center tracking-tight text-gray-900">
                        hello@vikrantgurav.com
                    </p>
                    <div className="flex flex-row mt-1 justify-center gap-4">
                        <a href="mailto:hello@vikrantgurav.com">
                            <PencilSquareIcon className="w-6 text-xl text-gray-500 hover:text-gray-900" />
                        </a>
                        {/* <ClipboardIcon className="w-6 text-xl text-gray-500 hover:text-gray-900" /> */}
                    </div>
                    <h2 className="text-xl text-center font-semibold desc1 mt-4">
                        or you can find me on...
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
                        <a
                            href="https://www.instagram.com/kingvik_7"
                            target="_blank"
                            className="w-6 fill-grey-100"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20px"
                                class="instagram"
                                viewBox="0 0 16 16"
                            >
                                <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}
