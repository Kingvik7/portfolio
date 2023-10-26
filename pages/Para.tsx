import { gsap } from "gsap"
import React, { useEffect } from "react"


export default function Para(props) {
    return (
      <div className="my-5">
        <h1 className="text-gray-500 text-sm">{props.text}</h1>
      </div>
    )
  }