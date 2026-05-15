import { useState } from "react";
import { Form, useNavigate } from "react-router-dom";
import CreerAnnonce from "../components/ads/AdForm";
function CreateAds() {

    return (
        <div className="flex flex-col font-mono items-center justify-center h-screen md:text-3xl font-bold">
            <h1>Créer votre annonce</h1>
            <h2>Remplisser les champs suivants pour votre annonce</h2>

            <CreerAnnonce />
        </div>
    );  

}

export default CreateAds;
