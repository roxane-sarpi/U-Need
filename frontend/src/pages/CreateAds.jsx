import { useState } from "react";
import { Form, useNavigate } from "react-router-dom";
import CreerAnnonce from "../components/ads/AdForm";
import Adform from "../components/ads/AdForm";

function CreateAds() {

    return (
        <div className="flex flex-col bg-canvas items-center justify-center h-100vh md:text-3xl font-bold">
            <Adform />
        </div>
    );  

}

export default CreateAds;
