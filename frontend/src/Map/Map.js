import React from 'react'
import {ReactComponent as SouthKorea} from "@svg-maps/south-korea/south-korea.svg";
import './Map.css'
import {useState,useEffect} from 'react'

interface ILocation{
    latitude: number
    longitude: number
}

const Map = () => {
    return(
        <div className={"map-container"}>
            <div className={"map"}>
                <SouthKorea/>
            </div>
            <div className = {"weather-info"}>
                weather info
            </div>
        </div>


    )
}
export default Map