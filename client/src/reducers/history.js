// Obtenez l'état initial à partir des données précédemment enregistrées dans le stockage local.
let getHistoryFromLocal = () => {
    let value = localStorage.getItem('WeatherHistory')
    return JSON.parse(value) || [];
}

// Maintenez une liste historique des dix dernières données météo consultées.
let getUpdatedHistory = (history, value) => {
    let updateList = [...history];
    if (updateList.length >= 10) {
        updateList.shift();
    }
    updateList.push(value);
    return updateList;
}

const history = (state = getHistoryFromLocal(), action) => {
    switch (action.type) {
        case "UPDATE_HISTORY":
            return getUpdatedHistory(state, action.payload);
        default:
            return state;
    }
};

export default history;
