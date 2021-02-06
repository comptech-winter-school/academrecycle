import React from "react";
import Modal from 'react-modal';
import Point from "../../components/point/Point";
import {get, post} from "../../fetcher/fetcher";
import "./style.css";

class Table extends React.Component {

    constructor () {
        super();
        this.state = {
            showModal: false,
            cityId: '',
            latitude: '',
            longitude: '',
            pointName: '',
            materials: '',
            address: '',
            points: []
        };

        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.handleChangeCityId = this.handleChangeCityId.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleOpenModal () {
        this.setState({ showModal: true });
    }

    handleCloseModal () {
        this.setState({ showModal: false });
    }

    handleSubmit (e) {
        e.preventDefault()
        const data = {
            recycle_cities_id: this.state.cityId,
            name: this.state.pointName,
            address: this.state.address,
            latitude: this.state.latitude,
            longitude: this.state.longitude
        }
        post("localhost:9000/api/points/", data)
            .then(response => {
                this.setState({
                    cityId: '',
                    latitude: '',
                    longitude: '',
                    pointName: '',
                    materials: '',
                    address: '',
                })
            })
            .catch(error => {

            })
    };

    handleChangeCityId(event) {
        this.setState({ cityId: event.target.value });
    }

    renderList = () => {
        get("http://localhost:9000/api/points?page=0&size=20")
            .then(response => {
                this.setState({points: response})
            })
            .catch(error => {

            })

        const pointList = this.state.points["tutorials"] || []

        return <div className={'point-list'}>
            {
                pointList.map((item) => {
                    return (
                        <Point key id={item.id} recycle_cities_id={item.recycle_cities_id} lat={item.latitude} lng={item.longitude} title={item.name}
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
                            <label htmlFor="city_id">Id города</label>
                            <input
                                type="text"
                                id="city_id"
                                name="city_id"
                                value={this.state.cityId}
                                onChange={this.handleChangeCityId}
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