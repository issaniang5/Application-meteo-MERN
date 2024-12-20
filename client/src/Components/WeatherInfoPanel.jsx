import React, {Component} from "react";

import {connect} from "react-redux";

class WeatherInfoPanel extends Component {

    // Différencie si l'utilisateur a choisi d'utiliser Celsius ou Fahrenheit
    getMetric = () => {
        let metric = localStorage.getItem("tempMetric");
        metric = !!metric ? metric : "";
        return metric.includes("metric") ? "°C" : "°F";
    }

    render() {
        const {weatherData} = this.props;
        let metricSymbol = this.getMetric();

        if (Object.keys(weatherData).length > 0) {
            const iconUrl = `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;
            return (
                <section className="weather-info">
                    <h3 className="city-name">{weatherData.name}</h3>

                    <section className="overcast">
                        <img src={iconUrl} className="overcast-img" alt=""/>
                        <span className="overcast-description">{weatherData.weather[0].description}</span>
                    </section>

                    <hr/>

                    <section className="current-weather">
                        <span className="humidity">Humidité: {weatherData.main.humidity}%</span>
                        <span className="curr-temp">Température: {weatherData.main.temp}{metricSymbol}</span>
                        <span className="feels-like">Ressenti: {weatherData.main.feels_like}{metricSymbol}</span>
                    </section>

                    <hr/>

                    <section className="temps">
                        <span className="min-temp">Bas: {weatherData.main.temp_min}{metricSymbol}</span>
                        <span className="max-temp">Élevé: {weatherData.main.temp_max}{metricSymbol}</span>
                    </section>
                </section>
            );
        }
        return (
            <section>
                InfosMétéo!
            </section>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        weatherData: state.weather
    }
};

export default connect(mapStateToProps)(WeatherInfoPanel);