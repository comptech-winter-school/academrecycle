import React from "react";
import Modal from 'react-modal';
import pointsFromJson from './recyclePoints.json'
import Point from "../../components/point/Point";
import "./style.css";

class Table extends React.Component {

    constructor () {
        super();
        this.state = {
            showModal: false
        };

        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
    }

    handleOpenModal () {
        this.setState({ showModal: true });
    }

    handleCloseModal () {
        this.setState({ showModal: false });
    }

    handleSubmit (e) {
        e.preventDefault()
    };

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
                <button className={'create-button'} onClick={this.handleOpenModal}>Create</button>
                <Modal
                    isOpen={this.state.showModal}
                    contentLabel="Minimal Modal Example"
                >
                    <form onSubmit={this.handleSubmit}>
                        <div>
                            <label htmlFor="rec_id">RecycleMap id</label>
                            <input
                                type="text"
                                id="rec_id"
                                name="rec_id"
                            />
                        </div>
                        <div>
                            <label htmlFor="city_id">Id города</label>
                            <input
                                type="text"
                                id="city_id"
                                name="city_id"
                            />
                        </div>
                        <div>
                            <label htmlFor="latitude">Latitude</label>
                            <input
                                type="text"
                                id="latitude"
                                name="latitude"
                            />
                        </div>
                        <div>
                            <label htmlFor="longitude">Longitude</label>
                            <input
                                type="text"
                                id="longitude"
                                name="longitude"
                            />
                        </div>
                        <div>
                            <label htmlFor="point_name">Name</label>
                            <input
                                type="text"
                                id="point_name"
                                name="point_name"
                            />
                        </div>
                        <div>
                            <label htmlFor="materials">Materials</label>
                            <input
                                type="text"
                                id="materials"
                                name="materials"
                            />
                        </div>
                        <div>
                            <label htmlFor="address">Address</label>
                            <input
                                type="text"
                                id="address"
                                name="address"
                            />
                        </div>
                        <button>Create</button>
                    </form>
                    <button onClick={this.handleCloseModal}>Close Modal</button>
                </Modal>
                {this.renderList()}
            </section>
        );
    }
}

export default Table;