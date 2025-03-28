import React from 'react'
import {ReactComponent as SouthKorea} from "@svg-maps/south-korea/south-korea.svg";
import './Map.css'
import {useState,useEffect} from 'react'
import {fetchWeatherData, fetchWeatherDataFromNxNy, getCurrentDate, processWeatherData} from "../WeatherAPI/weatherAPI";
import {PTYCode, regionCodes, SKYCode,categoryMap} from "../WeatherAPI/DataSet";
import {useGeoLocation} from "../WeatherAPI/Location.ts";


const Map = () => {
    const { location, error } = useGeoLocation(); // ✅ 무한 호출 방지됨

    useEffect(() => {
        if(location){
            console.log("현재위치 :",location);
            fetchWeatherDataFromNxNy(location.latitude,location.longitude)
                .then(data => {
                    console.log("날씨 데이터 가져오기 성공: ",selectedRegion);
                    const processedData = processWeatherData(data);
                    setWeatherData(processedData);
                })
                .catch(error => console.error("날씨 데이터 가져오기 실패: ", error));
        }
    }, [location]);

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
                {weatherData.PTY !== undefined ? (
                    // 날씨 정보가 있을 때의 UI
                    <div>
                        {regionName ? (
                            <h3 style={{ textAlign: "left" }}>{regionName}의 현재 날씨 정보</h3>
                        ) : (
                            <h3 style={{ textAlign: "left" }}>현재 날씨 정보</h3>
                        )}
                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                            {weatherData["PTY"] === "0" ? (
                                <img width="50" src={SKYCode[weatherData["SKY"]].imgLink} alt="SKY image" />
                            ) : (
                                <>
                                    <img width="50" src={PTYCode[weatherData["PTY"]]?.imgLink} alt="PTY image" />
                                    <p>{categoryMap[PTYCode[weatherData["PTY"]].match].name} : {weatherData[PTYCode[weatherData["PTY"]].match]}</p>
                                </>
                            )}
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "10px", textAlign: "left" }}>
                                <p>
                                    현재 기온 : {weatherData.TMP} {categoryMap["TMP"].unit}
                                    <br />
                                    강수 확률 : {weatherData.POP} {categoryMap["POP"].unit}
                                    <br />
                                    습도 : {weatherData.REH} {categoryMap["REH"].unit}
                                    <br />
                                    일 최고/최저 기온 : {weatherData.TMN} {categoryMap["TMN"].unit} / {weatherData.TMX} {categoryMap["TMX"].unit}
                                </p>
                            </div>
                        </div>
                    </div>
                ) : (
                    // 지역을 선택해달라는 메시지
                    <p></p>
                )}
            </div>
        </div>
    );
};


export default Map