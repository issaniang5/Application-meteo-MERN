import React, {Component} from "react";

class Header extends Component {
    render() {
        return (
            <section className="header">
                <h1>Les Enfants du Temps <span role="img" aria-label={"umbrella"}>☂️</span></h1>
                <span className="annotation">(Exemple de site web MERN Full Stack)</span>
            </section>
        );
    }
}

export default Header;