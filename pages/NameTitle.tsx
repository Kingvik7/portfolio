import { gsap } from "gsap"
import React, { useEffect } from "react"

function NameTitle(props) {
    useEffect(() => {
        gsap.timeline({ delay: 2.5 }).to(".desc", {
            opacity: 1,
            y: "15px",
            ease: "power1.inOut",
        })
    }, [])

    return (
        <div className="text-center mt-0 desc">
            <div className="mx-4 text-center font-['SentientItalic']">
                <a className="desc desc1">{props.first}</a>
                <a className="desc font-['Sentient'] text-yellow-300">
                    {props.second}
                </a>
                <a className="desc desc2 text-blue-500">{props.third}</a>
            </div>
            <a className="desc text-gray-500 font-['SentientItalic']">
                {props.fourth}
            </a>
        </div>
    )
}

export default NameTitle
