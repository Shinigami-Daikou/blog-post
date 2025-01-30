import React from "react"
import { Link } from "react-router-dom"
import Logo from "../Logo"

export default function Footer() {
    return (
        <div>
            <section className="mt-auto w-full bottom-0 py-5 bg-gray-800 text-white scroll-ms-60">
                <div className="text-2xl tracking-widest">
                    Made with &#9825; by Bhupendra.
                </div>
                <div>
                    <p className="text-xs text-gray-300 pt-2">
                        &copy; Copyright. Holler me up on
                        <a href="https://www.linkedin.com/in/chauhan-bhupendra/" target="_blank"> Linkedin</a>
                    </p>
                </div>
            </section>
        </div>
    )
}