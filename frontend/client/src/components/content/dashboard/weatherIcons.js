const weatherDesc = weatherLogs.map((logs) => logs.description);

export default function weatherIcons(weatherDesc){
    switch(weatherDesc){
        case "Cloudy": 
            return console.log("Cloudyicon");
            break;
        case "Sunny":
            return console.log("Sunnyicon");
            break;
        default:
            return undefined;
    }
}