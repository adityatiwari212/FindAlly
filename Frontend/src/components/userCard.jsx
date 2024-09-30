import React from "react";

export function Card({username,name,friends,url,request}){
    return(
        <div className=" cursor-pointer h-60 m-3 w-auto p-3 shadow-lg rounded-2xl border-4 border-s-2 border-violet-400 flex flex-col justify-evenly">
            <span className="w-full font-bold text-xl text-violet-600 flex justify-center">{username}</span>
            <div className="flex items-center justify-evenly">
                <div className="w-24 h-24 mr-4 flex flex-col items-center justify-center">
                    {{url}?<img className="rounded-xl w-full h-full" src={url} alt=""/>:<img src='user.png' alt=""/>}
                </div>
                <ul className="flex flex-col">
                    <li className="font-semibold text-lg text-violet-600 mb-2">Name : {name}</li>
                    <li className="font-semibold text-lg text-violet-600 mb-2">Friends : {friends}</li>
                </ul>
            </div>
            <div className="text-center p-1 font-semibold text-lg text-white bg-violet-600 rounded-lg">
                Send Request
            </div>
        </div>
    )
}