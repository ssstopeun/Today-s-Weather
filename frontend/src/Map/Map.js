import React from 'react'
import {ReactComponent as SouthKorea} from "@svg-maps/south-korea/south-korea.svg";
import './Map.css'
import {useState,useEffect} from 'react'
import {fetchWeatherData,getCurrentDate,processWeatherData} from "../WeatherAPI/weatherAPI";
import {PTYCode, regionCodes, SKYCode,categoryMap} from "../WeatherAPI/DataSet";


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
                {console.log("weatherData : ",weatherData)}
                {weatherData.PTY!==undefined?(
                    <div>
                        <h3 style = {{textAlign : "left"}}>{regionName}의 현재 날씨 정보</h3>
                        {console.log("PTY : ",weatherData["PTY"])}
                        <div  style={{ display: "flex", alignItems: "center", gap: "10px"}}>
                            {weatherData["PTY"] === "0" ?(
                                <img width = "50" src = {SKYCode[weatherData["SKY"]].imgLink} alt = "SKY image" />
                            ):(
                                <>
                                    <img width="50" src={PTYCode[weatherData["PTY"]]?.imgLink} alt="PTY image" />
                                    <p>{categoryMap[PTYCode[weatherData["PTY"]].match].name} : {weatherData[PTYCode[weatherData["PTY"]].match]}</p>
                                </>
                            )
                            }
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px"}}>
                            <div style={{ display: "flex", alignItems: "center", gap: "10px", textAlign:"left"}}>
                                <p>
                                    현재 기온 : {weatherData.TMP} {categoryMap["TMP"].unit}
                                    <br />
                                    <br />
                                    강수 확률 : {weatherData.POP} {categoryMap["POP"].unit}
                                    <br />
                                    <br />
                                    습도 : {weatherData.REH} {categoryMap["REH"].unit}
                                    <br />
                                    <br />
                                    일 최고/최저 기온 : {weatherData.TMN} {categoryMap["TMN"].unit} / {weatherData.TMX} {categoryMap["TMX"].unit}
                                </p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <p>지역을 선택해 주십시오.</p>
                )}
            </div>
        </div>
    );
};


export default Map