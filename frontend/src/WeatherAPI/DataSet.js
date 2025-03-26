export const regionCodes = {
    "seoul" : {nx : 60, ny: 127, title : "서울특별시"},
    "gangwon" : {nx : 73, ny: 134, title : "강원도"},
    "gyeonggi" : {nx : 60, ny: 120, title : "경기도"},
    "incheon" : {nx : 55, ny : 124, title : "인천광역시"},
    "south-chungcheong" : {nx:68, ny:100, title : "충청남도"},
    "north-chungcheong" : {nx:69, ny:107, title : "충청북도"},
    "daejeon" : {nx : 67, ny : 100, title : "대전광역시"},
    "sejong" : {nx : 66, ny : 103, title : "세종특별자치시"},
    "north-gyeongsang" : {nx : 87, ny : 106, title : "경상북도"},
    "daegu" : {nx : 89, ny : 90, title : "대구광역시"},
    "south-gyeongsang" : {nx : 91, ny : 77, title : "경상남도"},
    "ulsan" : {nx : 102, ny : 84, title : "울산광역시"},
    "busan" : {nx : 98, ny : 76, title : "부산광역시"},
    "north-jeolla" : {nx : 63, ny : 89, title : "전북특별자치도"},
    "south-jeolla" : {nx : 51, ny : 67, title : "전라도"},
    "gwangju" : {nx : 58, ny : 74, title : "광주광역시"},
    "jeju" : {nx : 52, ny : 38, title : "제주특별자치도"}

};

export const categoryMap = {
    "POP": { name: "강수확률", unit: "%" },
    "PTY": { name: "강수형태", unit: "코드값" },
    "PCP": { name: "1시간 강수량", unit: "mm" },
    "REH": { name: "습도", unit: "%" },
    "SNO": { name: "1시간 신적설", unit: "cm" },
    "SKY": { name: "하늘상태", unit: "코드값" },
    "TMP": { name: "1시간 기온", unit: "℃" },
    "TMN": { name: "일 최저기온", unit: "℃" },
    "TMX": { name: "일 최고기온", unit: "℃" },
    // "UUU": { name: "풍속(동서성분)", unit: "m/s" },
    // "VVV": { name: "풍속(남북성분)", unit: "m/s" },
    // "WAV": { name: "파고", unit: "M" },
    // "VEC": { name: "풍향", unit: "deg" },
    // "WSD": { name: "풍속", unit: "m/s" }
}

export const SKYCode = {
    "1":{name:"맑음", imgLink : "https://i.ibb.co/0RYJG651/flat-2022478-1280.png"},
    "3":{name:"구름많음", imgLink : "https://i.ibb.co/XrFDSZJL/flat-2022478-1280.png"},
    "4":{name:"흐림", imgLink : "https://i.ibb.co/XrFDSZJL/flat-2022478-1280.png"}
}
export const PTYCode = {
    "0":{name:"없음",match:"없음",imgLink : "https://i.ibb.co/0RYJG651/flat-2022478-1280.png"},
    "1":{name:"비",match:"POP",imgLink:"https://i.ibb.co/HT6w3RM9/flat-2022478-1280.png"},
    "2":{name:"비/눈",match:"POP",imgLink:"https://i.ibb.co/ksS4n5hj/flat-2022478-1280.png"},
    "3":{name:"눈",match:"SNO",imgLink:"https://i.ibb.co/gbRz0hvx/flat-2022478-1280.png"},
    "4":{name:"소나기",match:"POP",imgLink:"https://i.ibb.co/zhxDm0np/flat-2022478-1280.png"}
}