import React, {Component} from "react";
import {Form, Button, Row, Col, ButtonGroup, ToggleButton} from "react-bootstrap";

import axios from 'axios';

import {connect} from "react-redux";
import {saveZipCode, saveWeatherData, saveTemperature, updateHistory} from "../actions";

class WeatherForm extends Component {
    // valeurs d'état par défaut
    state = {
        tempMetric: "imperial",
        zipCodeInput: "98052"
    }

    componentDidMount() {
        this.refreshSavedWeather();
    }

    // Actualise les données météorologiques actuelles pour le code postal le plus récent, s'il existe
    refreshSavedWeather = () => {
        if (localStorage.getItem("zipCode")) {
            axios.post("/api/weather", {
                zipCode: localStorage.getItem("zipCode"),
                tempMetric: localStorage.getItem("tempMetric")
            }).then(d => {
                localStorage.setItem("CurrentWeatherData", JSON.stringify(d.data));
                this.props.saveWeatherData(d.data);
            });
        }
    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    saveFormData = (event) => {
        event.preventDefault();

        // Récupère les données météorologiques depuis l'API météo et les retourne pour les enregistrer dans le stockage local et le store Redux
        axios.post("/api/weather", {
            zipCode: this.state.zipCodeInput,
            tempMetric: this.state.tempMetric
        }).then(response => {
            let weatherData = response.data;

            this.saveToStore(weatherData);
            this.saveToLocalStorage(weatherData);
        });
    }

    // Enregistrer les données du formulaire dans le stockage local
    saveToLocalStorage = (weatherData) => {
        localStorage.setItem("zipCode", this.state.zipCodeInput);
        localStorage.setItem("tempMetric", this.state.tempMetric);
        localStorage.setItem("CurrentWeatherData", JSON.stringify(weatherData));
        localStorage.setItem("WeatherHistory", JSON.stringify(this.props.history));
    }

    saveToMongo = (event) => {
        axios.post("/api/weatherMongo", {
            zipCode: this.state.zipCodeInput,
            tempMetric: this.state.tempMetric
        }).then(response => {
            let weatherData = response.data;

            // faites ce que vous voulez avec les données météorologiques
        });
    }

    // Enregistre les données dans le store Redux
    saveToStore = (weatherData) => {
        this.props.saveTemperature(this.state.tempMetric);
        this.props.saveZipCode(this.state.zipCodeInput);
        this.props.saveWeatherData(weatherData);

        this.props.updateHistory({
            timestamp: (new Date()).toLocaleString(),
            city: weatherData.name,
            zipcode: this.state.zipCodeInput,
            temperature: weatherData.main.temp,
            description: weatherData.weather[0].description
        });
    }

    render() {
        return (
            <Form className="weather-form" onSubmit={this.saveFormData}>

                <Row type="flex" justify="center" align="center" className="zipCode">
                    <Col>
                        <span>Code posta: </span>
                        <Form.Control name="zipCodeInput"
                                      type="text"
                                      placeholder="Enter your zip code"
                                      onChange={this.onChange}
                                      className="zipCodeInput"/>
                    </Col>
                </Row>

                <Row type="flex" justify="center" align="center">
                    <Col span={4}>
                        <ButtonGroup toggle>
                            <ToggleButton
                                key={"C"}
                                type="radio"
                                variant="secondary"
                                name="tempMetric"
                                value={"metric"}
                                checked={this.state.tempMetric === "metric"}
                                onChange={this.onChange}
                            >
                                Celsius (°C)
                            </ToggleButton>
                            <ToggleButton
                                key={"F"}
                                type="radio"
                                variant="secondary"
                                name="tempMetric"
                                value={"imperial"}
                                checked={this.state.tempMetric === "imperial"}
                                onChange={this.onChange}
                            >
                                Fahrenheit (°F)
                            </ToggleButton>
                        </ButtonGroup>
                    </Col>
                </Row>

                <Row type="flex" justify="center" align="center">
                    <Col span={4}>
                        <Button className="save-btn" variant="primary" type="submit">
                        Enregistrer
                        </Button>
                    </Col>
                </Row>

            </Form>
        );
    }
}

// Mapper l'état du store aux props ;
// c'est-à-dire... si nous mettons à jour ces props, cela mettra à jour le store Redux
const mapStateToProps = (state) => {
    return {
        zipCode: state.zipCode,
        weather: state.weather,
        tempMetric: state.tempMetric,
        history: state.history
    }
};

// Ce sont les actions que nous pouvons dispatcher et nous les lions simplement aux props
const mapDispatchToProps = () => {
    return {
        saveZipCode,
        saveWeatherData,
        saveTemperature,
        updateHistory
    }
};

// Cela connecte notre mappage de l'état et du dispatch aux props pour une utilisation dans WeatherForm
export default connect(mapStateToProps, mapDispatchToProps())(WeatherForm);