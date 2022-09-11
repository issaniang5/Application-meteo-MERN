// Précharge les données météo enregistrées à partir du stockage local, si disponibles.
let getWeatherFromLocal = () => {
    let value = localStorage.getItem('CurrentWeatherData');
    return JSON.parse(value) || "";
}

const weather = (state = getWeatherFromLocal(), action) => {
    switch (action.type) {
        case "SAVE_WEATHER_DATA":
            return action.payload;
        default:
            return state;
    }
};

export default weather;
