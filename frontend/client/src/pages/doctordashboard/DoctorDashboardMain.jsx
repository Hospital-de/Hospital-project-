



import React, { useState } from "react";
import Sidebar from "./Sidebar";
import InformationMain from './InformationMain'
import AppointmentForrDoctor from "./AppointmentForrDoctor";
import AppointmentsPage from "./AppointmentsPage";
import MedicalReport from "./MedicalReport";
import PatientRecordsCards from "./PatientRecordsCards";
import DoctorChat from "./DoctorChat";

function DoctorDashboardMain() {
    const [selectedComponent, setSelectedComponent] = useState("dashboard");

    return (
        
        <div className="flex">
            <div className="flex-1 ml-40 mt-10 mr-20 h-screen mx-auto">
                {selectedComponent === "dashboard" && <InformationMain />}
                {selectedComponent === "appointments" && <AppointmentForrDoctor />}
                {selectedComponent === "AppointmentsPage" && <AppointmentsPage />}
                {selectedComponent === "PatientRecordsCards" && <PatientRecordsCards />}
            
                {selectedComponent === "Chat" && <DoctorChat />}

            </div>
            <div className="">
                <Sidebar setSelectedComponent={setSelectedComponent} />

            </div>
        </div>
    );
}

export default DoctorDashboardMain;
