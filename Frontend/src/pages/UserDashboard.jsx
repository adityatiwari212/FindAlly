import React from "react";
import { Dashboard } from "../components/dashboard";
import { UpdateDashboard } from "../components/updateDashboard";
export function UserDash(){
    const [isUpdateDashboard,setIsUpdateDashboard]=React.useState(false)
    return(
        <div className="mt-7 flex justify-center items-center">
            {isUpdateDashboard?<UpdateDashboard toggleDash={setIsUpdateDashboard}/>:<Dashboard toggleDash={setIsUpdateDashboard}/>}
        </div>
    )
}