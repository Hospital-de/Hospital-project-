import React from "react";
import Sidebar from "./sidebar";
import DoctorDashboard from "./InformationMain";

function DoctorDashboardMain() {
    return (
        <div className="flex">
            <div className="flex-1 ml-40 mt-10 mr-20   h-screen mx-auto  "> {/* Main content area on the left */}
                <DoctorDashboard/>
            </div>
            <div className=""> {/* Sidebar on the right */}
                <Sidebar />
            </div>
        </div>
    );
}

export default DoctorDashboardMain;
