export default function weatherIcons(weatherDesc){
    switch(weatherDesc){
        case "partly-cloudy-day":
            return '/img/climacons/Cloud-Sun.svg';
        case "partly-cloudy-night":
            return '/img/climacons/Cloud-Moon.svg';
        case "clear-night":
            return '/img/climacons/Moon.svg';
        case "cloudy":
            return '/img/climacons/Cloud.svg';
        case "rain":
            return '/img/climacons/Cloud-Drizzle.svg';
        case "sleet":
            return '/img/climacons/Cloud-Hail-Alt.svg';
        case "snow":
            return '/img/climacons/Cloud-Snow-Alt.svg';
        case "wind":
            return '/img/climacons/Cloud-Wind.svg';
        case "fog":
            return '/img/climacons/Cloud-Fog.svg';
        default:
            return '/img/climacons/Sun.svg';
    }
}