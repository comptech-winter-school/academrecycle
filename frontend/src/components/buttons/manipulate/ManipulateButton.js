import React from "react";

import './style.css';

export default class ManipulateButton extends React.Component {

    render() {

        const {buttonName, onClick} = this.props;

        return (
            <button onClick={() => onClick()} className={`manipulate-button${buttonName ? ` ${buttonName}-button` : ''}`}/>
        )
    }

}