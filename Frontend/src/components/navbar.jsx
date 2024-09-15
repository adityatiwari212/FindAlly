import React from "react";
import {Heading} from '@chakra-ui/react'
export function Navbar(){
    return (
        <>
            <nav className="bg-violet-800 h-16 p-3 mx-2 sticky top-2 flex justify-between items-center text-white rounded-3xl">
                <Heading>FindAlly</Heading>
                <ul className="flex w-1/2 md:w-1/3 lg:w-1/5 justify-between">
                    <li className="font-semibold cursor-pointer hover:text-slate-500 ">HOME</li>
                    <li className="font-semibold cursor-pointer hover:text-slate-500">ABOUT</li>
                    <li className="font-semibold cursor-pointer hover:text-slate-500">CONTACT</li>
                </ul>
                <button className='bg-gray-300 hover:bg-gray-400 text-black p-2 rounded-lg  font-bold'>LOGOUT</button>
            </nav>
        </>
    )
}