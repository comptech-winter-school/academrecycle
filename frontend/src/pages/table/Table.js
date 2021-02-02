import React from "react";
import pointsFromJson from './recyclePoints.json'
import Point from "../../components/point/Point";
import "./style.css";

class Table extends React.Component {

    renderList = () => {
        let pointList = []
        for (const [, value] of Object.entries(pointsFromJson)) {
            pointList.push(value)
        }

        return <div className={'point-list'}>
            {
                pointList.map((item) => {
                    return (
                        <Point key id={item.id} recycle_cities_id={item.recycle_cities_id} lat={item.lat} lng={item.lng} title={item.title}
                               content_text={item.content_text} address={item.address}/>
                    );
                })
            }
        </div>;
    };

    render() {
        return (
            <section className='main__content'>
                {this.renderList()}
            </section>
        );
    }
}

export default Table;