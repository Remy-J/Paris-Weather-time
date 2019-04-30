import React, { Component } from "react";
import favorites from "../images/favorites.png"
import profil from "../images/profil.png"
import filtre from "../images/filtre.png"
import EffectModalFilter from './EffectModalFilter';


class NavBarButton extends Component {


    state = {
        isShowing: false,
        btn1: false,
        btn2: false,
        btn3: false,

    }

    /*-- Open Modal --*/
    openModalHandler = (param) => {
        if ("btn1" === param) {
            this.setState({ isShowing: true, btn1: true, btn2: false, btn3: false })
        } else if ("btn2" === param) {
            this.setState({ isShowing: true, btn1: false, btn2: true, btn3: false })
        } else if ("btn3" === param) {
            this.setState({ isShowing: true, btn1: false, btn2: false, btn3: true })
        }
    }

    /*-- Close Modal --*/
    closeModalHandler = (param) => {
        if ("btn1" === param) {
            this.setState({ isShowing: false, btn1: false, btn2: false, btn3: false })
        } else if ("btn2" === param) {
            this.setState({ isShowing: false, btn1: false, btn2: false, btn3: false })
        } else if ("btn3" === param) {
            this.setState({ isShowing: false, btn1: false, btn2: false, btn3: false })
        }
    }

    render() {
        const { btn1 } = this.state
        return (
            <div className="btn-NavBar">
                <button className="btn-3" onClick={this.state.isShowing ? () => this.closeModalHandler("btn1") : () => this.openModalHandler("btn1")}><img src={favorites} className="icon" alt="logo" /></button>
                <button className="btn-2" onClick={this.state.isShowing ? () => this.closeModalHandler("btn2") : () => this.openModalHandler("btn2")}><img src={profil} className="icon" alt="logo" /></button>
                <button className="btn-filter" onClick={this.state.isShowing ? () => this.closeModalHandler("btn3") : () => this.openModalHandler("btn3")}><img src={filtre} className="icon" alt="logo" /></button>
                {
                    btn1 === true ?
                        <EffectModalFilter
                            show={this.state.isShowing}
                            close={this.closeModalHandler}>
                            Profil
						</EffectModalFilter> :
                        <EffectModalFilter
                            show={this.state.isShowing}
                            close={this.closeModalHandler}>
                            Filtre
						</EffectModalFilter>
                }
            </div>
        )
    }
}

export default NavBarButton;