import "date-fns";
import React from "react";
import {
    Button,
    TableCell,
    TableBody,
    TableContainer,
    TableRow,
    TableHead,
    Table,
    Paper,
} from "@material-ui/core";
import {AddPoint} from "../../components/AddPoint";
import {BACKEND_URL} from "../../consts";
export class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            modalName: "",
            rowData: {},
            index: 0,
            pageCount: 0,
            page: 0,
            selected: 0,
            size: 4
        };
    }

    componentDidMount() {
        this.loadData(this.state.page)
    }
    showAlert = (message, type) => {
        const Noty = require('noty');
        new Noty({
            text: message,
            timeout: 5000,
            type: type,
            theme: 'metroui',
            layout: 'topLeft',
            closeWith: ['button'],
        }).show();
    };

    loadData(selected){
        let pointList = []
        let url = BACKEND_URL +"/points?page=" + selected + "&size=" + this.state.size
        console.log(url)
        fetch(url, {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            }
        })
            .then(response => {
                return response.json();
            })
            .then(data => {
                this.setState({
                    totalItems: data.totalItems,
                    totalPages: data.totalPages,
                    currentPage: data.currentPage,
                    data: data.tutorials || []
                });
                pointList = data["tutorials"] || []
            })
            .catch(err => {
                console.log("Error occured while fetching data", err);
            });
        return pointList;
    }
    handlePageClick = (data) => {
        let selected = data.selected;
        this.loadData(selected)
    };
    modalHandler = (name, rowData, index) => {
        if (name === "delete") {
            console.log(name, rowData, index)
            fetch(BACKEND_URL+"api/points/" + rowData.id, {
                method: "DELETE",
            })
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    this.showAlert(data.message, 'info')
                })
                .catch(err => {
                    this.showAlert("Удаление завершилось с ошибкой", 'error')
                });
        } else {
            this.setState({
                open: !this.state.open,
                modalName: name,
                rowData: Object.assign({}, rowData, { flag: true }),
                index,
            });
        }
        this.loadData(this.state.selected)
    };

    renderTable = data => {
        return (
            data &&
            data.map((row, index) => {
                return (
                    <TableRow key={index} id={index}>
                        <TableCell component="th" scope="row" colSpan={2}>
                            {row.id}
                        </TableCell>
                        <TableCell component="th" scope="row" colSpan={2}>
                            {row.recycle_cities_id}
                        </TableCell>
                        <TableCell align="center" colSpan={2}>
                            {row.name}
                        </TableCell>
                        <TableCell component="th" colSpan={2}>
                            {row.address}
                        </TableCell>
                        <TableCell align="center" colSpan={2}>
                            {row.latitude}
                        </TableCell>
                        <TableCell align="center" colSpan={2}>
                            {row.longitude}
                        </TableCell>
                        <TableCell>
                            <Button
                                id={index}
                                variant="contained"
                                color="primary"
                                onClick={() => this.modalHandler("editPoint", row, index)}
                            >
                                Редактировать
                            </Button>
                        </TableCell>
                        <TableCell>
                            <Button
                                id={index}
                                variant="contained"
                                color="secondary"
                                onClick={() => this.modalHandler("delete", row, index)}
                            >
                                Удалить
                            </Button>
                        </TableCell>
                    </TableRow>
                );
            })
        );
    };

    render() {
        return (
            <div>
                <Table>
                    <TableRow>
                        <TableCell align="right">
                            <Button
                                variant="outlined"
                                color="primary"
                                onClick={() => this.modalHandler("addPoint")}
                            >
                                Добавить точку
                            </Button>
                            <AddPoint
                                open={this.state.open}
                                modalHandler={this.modalHandler}
                                data={this.state}
                            />
                        </TableCell>
                    </TableRow>
                </Table>
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow key={1}>
                                <TableCell colSpan={2}>id</TableCell>
                                <TableCell colSpan={2}>id_города</TableCell>
                                <TableCell align="center" colSpan={2}>Название</TableCell>
                                <TableCell align="center" colSpan={2}>Адрес</TableCell>
                                <TableCell align="center" colSpan={2}>Широта</TableCell>
                                <TableCell align="center" colSpan={2}>Долгота</TableCell>
                                <TableCell align="center" colSpan={2}>
                                    Действия
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>{this.renderTable(this.state.data)}</TableBody>
                    </Table>
                </TableContainer>
            </div>
        );
    }
}
