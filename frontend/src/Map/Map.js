import React from 'react'
import {ReactComponent as SouthKorea} from "@svg-maps/south-korea/south-korea.svg";
import './Map.css'
import {useState,useEffect} from 'react'
import {fetchWeatherData,regionCodes} from "../WeatherAPI/weatherAPI";


const Map = () => {
    const [selectedRegion, setSelectedRegion] = useState("");
    const [regionName, setRegionName] = useState("");
    const [weatherData, setWeatherData] = useState([]);

    useEffect(() => {
        if(selectedRegion){
            fetchWeatherData(selectedRegion)
                .then(data => setWeatherData(data))
                .catch(error => console.error("날씨데이터 가져오기 실패: ",error))
        }
    }, [selectedRegion]);

    const handleRegionClick = (event) => {
        const regionId = event.target.id;
        console.log(regionId);
        if(regionId!==""){
            const {title} = regionCodes[regionId];
            setSelectedRegion(regionId);
            setRegionName(title);
        }

    }
    return(
        <div className={"map-container"}>
            <div className={"map"}>
                <SouthKorea onClick={handleRegionClick}/>
            </div>
            <div className = {"weather-info"}>
                {regionName ? `선택한 지역: ${regionName}` : "지역을 클릭하세요"}
                {weatherData.length > 0 ? (
                    <div>
                        <h3>날씨 정보</h3>
                        <pre>{JSON.stringify(weatherData, null, 2)}</pre>
                    </div>
                ) : (
                    <p>날씨 데이터를 불러오는 중 ...</p>
                )}
            </div>
        </div>
    );
};
export default Map