import React, {useState, useEffect} from 'react';

const baseUrl = "http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst";
const serviceKey = "YLHTYha6VHNb%2BKtP3ad70%2B4l8ZCENZo2B2Go432gHkFqkP0Cy9DRych%2FRQ7PkyXtgyIAJ61itusoyT97ck8nGg%3D%3D";
const baseTime = "0500";
const numOfRows = "1";
const pageNo = "1";

const regionCodes = {
    "seoul" : {nx : 60, ny: 127}
};

const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2,'0');
    const day = String(today.getDate()).padStart(2,'0');
    return `${year}${month}${day}`;
}

export const fetchWeatherData = async (region) => {
    if(!regionCodes[region]){
        throw new Error("올바른 지역을 선택하세요.");
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
        result.push({
            baseDate: item.getElementsByTagName("baseDate")[0].textContent,
            baseTime: item.getElementsByTagName("baseTime")[0].textContent,
            category: item.getElementsByTagName("category")[0].textContent,
            fcstDate: item.getElementsByTagName("fcstDate")[0].textContent,
            fcstTime: item.getElementsByTagName("fcstTime")[0].textContent,
            fcstValue: item.getElementsByTagName("fcstValue")[0].textContent,
            nx: item.getElementsByTagName("nx")[0].textContent,
            ny: item.getElementsByTagName("ny")[0].textContent
        });
    }
    return result;
}