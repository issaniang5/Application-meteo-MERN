// La température par défaut utilisera Fahrenheit (impérial, °F)
const temperature = (state = "imperial", action) => {
    switch (action.type) {
        case "SAVE_TEMPERATURE":
            return action.payload;
        default:
            return state;
    }
};

export default temperature;
