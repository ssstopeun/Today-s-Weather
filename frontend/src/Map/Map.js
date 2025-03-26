import React from 'react'
import {ReactComponent as SouthKorea} from "@svg-maps/south-korea/south-korea.svg";
import './Map.css'
import {useState,useEffect} from 'react'
import {fetchWeatherData,getCurrentDate,processWeatherData} from "../WeatherAPI/weatherAPI";
import {PTYCode, regionCodes, SKYCode} from "../WeatherAPI/DataSet";


const Map = () => {
    const [selectedRegion, setSelectedRegion] = useState("");
    const [regionName, setRegionName] = useState("");
    const [weatherData, setWeatherData] = useState([]);

    useEffect(() => {
        if(selectedRegion){
            fetchWeatherData(selectedRegion)
                .then(data => {
                    console.log("날씨 데이터 가져오기 성공: ",selectedRegion);
                    const processedData = processWeatherData(data);
                    setWeatherData(processedData);
                })
                .catch(error => console.error("날씨 데이터 가져오기 실패: ", error));
        }
    }, [selectedRegion]);

    const handleRegionClick = (event) => {
        const regionId = event.target.id;
        if(regionId!==""){
            const {title} = regionCodes[regionId];
            console.log(regionId);
            setSelectedRegion(regionId);
            setRegionName(title);
        }

    }
    return(
        <div className="map-container">
            <div className="map">
                <SouthKorea onClick={handleRegionClick} />
            </div>
            <div className="weather-info">
                {console.log(weatherData)}
                {weatherData!==[]?(
                    <div>
                        <h3>{regionName}의 현재 날씨 정보</h3>
                        {console.log("PTY : ",weatherData["PTY"])}
                        {weatherData["PTY"] === "0" ?(
                            <div>
                            <img width = "50" src = {SKYCode[weatherData["SKY"]].imgLink} alt = "SKY image" />
                            </div>
                            ):(
                            <div>
                                <img width = "50" src = {PTYCode[weatherData["PTY"]].imgLink} alt = "PTY image" />
                            </div>
                        )
                        }
                    </div>
                ) : (
                    <p>날씨 데이터를 불러오는 중 ...</p>
                )}
            </div>
        </div>
    );
};


export default Map