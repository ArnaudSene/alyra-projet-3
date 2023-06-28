"use client";

import {Flex, Text} from "@chakra-ui/react";
import {ConnectButton} from "@rainbow-me/rainbowkit";
import Link from "next/link";


const Headers = () => {
    return (

        <header className="bg-gray-50 container mx-auto text-center p-6">
            <nav className="container mx-auto flex justify-between items-center">
                <Link className="text-lg font-bold" href="/">Home</Link>

                <div>
                    <ConnectButton />
                </div>
                <div>
                    <Link className="mr-4" href="/admin">Admin</Link>
                    <Link className="mr-4" href="/voters">Voters</Link>
                </div>
            </nav>
        </header>
    )
}
export default Headers;