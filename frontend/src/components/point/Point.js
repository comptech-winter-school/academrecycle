import React from 'react';

import './style.css';
import ManipulateButton from "../buttons/manipulate/ManipulateButton";

export default class Point extends React.Component {

    onClickEdit = () => {

    };

    onClickRemove = () => {

    };

    render() {

        const {id, recycle_cities_id, lat, lng, title, content_text, address} = this.props;

        return (
            <article className="point">
                <div className="id">{id}</div>
                <div className="recycle_cities_id">{recycle_cities_id}</div>
                <div className="coordinates">{lat}N {lng}E</div>
                <div className="title">{title}</div>
                <div className="content">{content_text}</div>
                <div className="address">{address}</div>
                <ManipulateButton buttonName={'edit'} onClick={this.onClickEdit}/>
                <ManipulateButton buttonName={'remove'} onClick={this.onClickRemove}/>
            </article>
        );
    };
};