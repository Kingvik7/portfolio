
import { gsap } from "gsap"
import React, { useEffect } from "react"

export default function Title(props) {
    return (
        <div className="mt-32 md:text-center font-['SentientItalic']">
            <h1 className="text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">
                {props.text}
            </h1>
            <div className="w-24 h-0.5 mt-4 rounded-lg md:mx-auto bg-gray-400"></div>
        </div>
    )
}
