import React, {useState, useEffect} from 'react';
import {regionCodes,categoryMap} from "../WeatherAPI/DataSet";

const baseUrl = "http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst";
const serviceKey = "YLHTYha6VHNb%2BKtP3ad70%2B4l8ZCENZo2B2Go432gHkFqkP0Cy9DRych%2FRQ7PkyXtgyIAJ61itusoyT97ck8nGg%3D%3D";
const baseTime = "0500";
const numOfRows = "500";
const pageNo = "1";


export const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2,'0');
    const day = String(today.getDate()).padStart(2,'0');
    return `${year}${month}${day}`;
}

export const fetchWeatherData = async (region) => {
    if(!regionCodes[region]){
        throw new Error("올바른 지역을 선택하세요 : " +region);
    }
    const {nx,ny} = regionCodes[region];
    const baseDate = getCurrentDate();

    const apiUrl =`${baseUrl}?serviceKey=${serviceKey}&numOfRows=${numOfRows}&pageNo=${pageNo}&base_date=${baseDate}&base_time=${baseTime}&nx=${nx}&ny=${ny}`;

    try{
        const response = await fetch(apiUrl);
        if(!response.ok){
            throw new Error("API 요청 실패");
        }
        const data = await response.text();
        const weatherInfo = await parseWeatherInfo(data);
        return weatherInfo;
    }catch (error){
        console.error("API 요청 중 오류 발생: ",error);
        return null;
    }
}

const parseWeatherInfo = async(xmlString) => {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, "text/xml");

    const items = xmlDoc.getElementsByTagName("item");
    let result = [];

    for(let i = 0;i<items.length;i++){
        let item = items[i];
        let category = item.getElementsByTagName("category")[0].textContent;
        if(categoryMap[category]!==undefined){
            result.push({
                fcstDate: item.getElementsByTagName("fcstDate")[0].textContent,
                fcstTime: item.getElementsByTagName("fcstTime")[0].textContent,
                category: category,
                categoryName: categoryMap[category].name,
                unit: categoryMap[category]?.unit || "",
                fcstValue: item.getElementsByTagName("fcstValue")[0].textContent
            });
        }

    }
    return result;
}

export const processWeatherData = (weatherData) => {
    console.log("processWeatherData start");
    if(!weatherData || weatherData.length === 0) return [];
    const now = new Date();
    const currentDate = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}`;
    const currentTime = `${String(now.getHours()).padStart(2, "0")}00`; // 분을 00으로 맞춤

    console.log("현재온도 : ",currentDate,"현재시간 : ",currentTime);
    const resultData = {};
    let temperature = [];
    let minTemp = null
    let maxTemp = null;

    for(const item of weatherData){
        if(item.fcstDate > currentDate){
            break;
        }
        if(item.category === "TMN"){
            minTemp = item.fcstValue;
            continue;
        }else if(item.category === "TMX"){
            maxTemp = item.fcstValue;
            continue;
        }

        if(item.fcstTime === currentTime){
            resultData[item.category]=item.fcstValue;
        }

        if(item.category === "TMP"){
            temperature.push(item.fcstValue);
        }

    }
    temperature.sort((a,b)=>a-b);
    // console.log(temperature);
    if(!minTemp){
        minTemp = parseFloat(temperature.at(0)).toFixed(1);
    }
    if(!maxTemp){
        maxTemp = parseFloat(temperature.at(temperature.length-1)).toFixed(1);
    }
    resultData["TMX"] = maxTemp;
    resultData["TMN"] = minTemp;
    // filteredData.push({ ...weatherData.at(0), categoryName : "최고기온", fcstValue : maxTemp});
    // filteredData.push({ ...weatherData.at(0), categoryName : "최저기온", fcstValue : minTemp});
    return resultData;
}
