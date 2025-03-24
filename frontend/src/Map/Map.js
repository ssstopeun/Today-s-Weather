import React from 'react'
import {ReactComponent as SouthKorea} from "@svg-maps/south-korea/south-korea.svg";
import './Map.css'
import {useState,useEffect} from 'react'
import {fetchWeatherData} from "../WeatherAPI/weatherAPI";


const Map = () => {
    const [selectedRegion, setSelectedRegion] = useState("");
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
        setSelectedRegion(regionId);
    }
    return(
        <div className={"map-container"}>
            <div className={"map"}>
                <SouthKorea onClick={handleRegionClick}/>
            </div>
            <div className = {"weather-info"}>
                {selectedRegion ? `선택한 지역: ${selectedRegion}` : "지역을 클릭하세요"}
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