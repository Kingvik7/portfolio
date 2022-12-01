import Head from "next/head"
import Image from "next/image"
import styles from "../styles/Home.module.css"
import NameTitle from "./NameTitle"
import { motion } from "framer-motion"
import NameAnim from "./NameAnim"
import ScrollInformer from "./ScrollInformer"
import NavBar from "./NavBar"
import Projects from "./projects"
import Footer from "./footer"
import FAQGrid from "https://framer.com/m/FAQ-Grid-uvJp.js@rbQiKXASeSNS2d01495V"
import { XMarkIcon } from "@heroicons/react/24/outline"
import { useEffect } from "react"
import gsap from "gsap"

export default function Home(): JSX.Element {
    useEffect(() => {
        gsap.timeline({ delay: 2.5 }).from("#nav", {
            opacity: 0,
            ease: "power1.inOut",
        })
        gsap.to(".Projects", {
            delay: "0.5",
            color: "black",
            scrollTrigger: {
                trigger: "#intro",
                start: "center",
                scrub: true,
            },
        })
    }, [])

    return (
        <div className={styles.container}>
            <Head>
                <title>Vikrant Gurav</title>
                <meta
                    name="description"
                    content="Generated by create next app"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <NavBar />
            <main className={styles.main}>
                <div className="App">
                    <header
                        id="intro"
                        className="container justify-center heading flex flex-col px-2"
                    >
                        <NameAnim />
                        <NameTitle
                            first="Product Designer, "
                            second=""
                            third=" Developer. "
                            fourth="Pursuing MSc in Human-Computer Interaction at City, University of London"
                        />
                    </header>
                    <ScrollInformer />
                </div>
            </main>
            <Projects />

            <Footer />
        </div>
    )
}
