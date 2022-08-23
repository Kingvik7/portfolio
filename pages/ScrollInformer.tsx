import React, { useEffect } from "react";
import gsap from "gsap";

const ScrollInformer: React.FC = () => {
    useEffect(() => {
        gsap.timeline({ repeat: -1 })
            .fromTo(
                ".scroll__line",
                {
                    height: "0px",
                    y: -60,
                },
                {
                    y: 0,
                    height: "60px",
                    duration: 1.4,
                    ease: "power1.inOut",
                },
            )
            .to(".scroll__text", {
                delay: -0.5,
                scale: 1.16,
                duration: 0.2,
                stagger: {
                    amount: 0.3,
                    ease: "power2.inOut",
                },
            })
            .to(".scroll__line", {
                height: "0px",
                duration: 1.2,
                ease: "power1.inOut",
                delay: 1,
            })
            .to(".scroll__text", {
                delay: -0.6,
                scale: 1,
                duration: 0.2,
                stagger: {
                    amount: 0.3,
                    ease: "power2.inOut",
                },
            })
            .to(".scroll__line", { height: "0px", duration: 0.6 });
    }, []);

    return (
        <div className="scroll absolute text-xs xl:text-sm">
            <div className="scroll__line bg-gray-600"></div>
            <div className="scroll__text text-gray-600">S</div>
            <div className="scroll__text text-gray-600">C</div>
            <div className="scroll__text text-gray-600">R</div>
            <div className="scroll__text text-gray-600">O</div>
            <div className="scroll__text text-gray-600">L</div>
            <div className="scroll__text text-gray-600">L</div>
        </div>
    );
};

export default ScrollInformer;