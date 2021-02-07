import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import {Button, FormControl, Input, InputLabel} from "@material-ui/core";
import {TableHead} from "@material-ui/core";
import {BACKEND_URL} from "../consts";
import {get, post, put, showAlert} from "../actions/actions";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const useStyles1 = makeStyles((theme) => ({
    root: {
        flexShrink: 0,
        marginLeft: theme.spacing(2.5),
    },
}));
const useStyles2 = makeStyles({
    table: {
        minWidth: 500,
    },
});

function TablePaginationActions(props) {
    const classes = useStyles1();
    const theme = useTheme();
    const { count, page, rowsPerPage, onChangePage } = props;

    const handleFirstPageButtonClick = (event) => {
        onChangePage(event, 0);
    };

    const handleBackButtonClick = (event) => {
        onChangePage(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        onChangePage(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
        onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <div className={classes.root}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </div>
    );
}

TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onChangePage: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};

export class Dashboard1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            elementsCount: 0,
            pagesCount: 0,
            rowsPerPage: 5,
            rows: [],
            page: 1,
        };
        this.loadData = this.loadData.bind(this)
        this.handleChangePage = this.handleChangePage.bind(this)
        this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
        this.handleSave = this.handleSave.bind(this)
    }

    componentDidMount() {
        this.loadData()
    }
    loadData(){
        let url = BACKEND_URL +"/points"

        get(url).then(data => {
            this.setState({
                elementsCount: data.totalItems,
            });
            console.log(this.state.elementsCount)
        })
        url = BACKEND_URL +"/points?page=0&size=14355"
        get(url).then(data => {
            console.log(data)
            this.setState({
                rows: data.tutorials || [],
            });
        })
    }
    handleChangePage = (event, newPage) => {
        this.setState({
            page: newPage
        });
        this.setState(
            {
                emptyRows: this.state.rowsPerPage - Math.min(this.state.rowsPerPage, this.state.elementsCount - this.state.page * this.state.rowsPerPage)
            }
        )
   //     this.loadData()
    };

    handleChangeRowsPerPage = (event) => {
        this.setState({
            rowsPerPage: parseInt(event.target.value, 10)
        })
        this.setState(
            {
                emptyRows: this.state.rowsPerPage - Math.min(this.state.rowsPerPage, this.state.elementsCount - this.state.page * this.state.rowsPerPage)
            }
        )
       // this.loadData()
    };
    renderInputs = (name, id) => (
        <FormControl>
            <InputLabel htmlFor="standard-adornment-amount">{name}</InputLabel>
            <Input
                name={id}
                id={id}
                label={name}
                value={this.state[id]}
                className="pading-right"
                onChange={this.changeHandler}
                aria-describedby="standard-weight-helper-text"
                inputProps={{
                    "aria-label": "weight"
                }}
            />
        </FormControl>
    );
    handleSave = () => {
        if (this.state.modalName === "editPoint") {
            put(BACKEND_URL+"/points/" + this.state.id, this.state).then(result => {
                showAlert("изменение прошло успешно", 'info')
            }).catch(err =>{
                showAlert(err, 'error')
            })
        } else {
            post(BACKEND_URL + "/points", this.state).then(result => {
                showAlert("создание прошло успешно", 'info')
            }).catch(err =>{
                showAlert(err, 'error')
            })
        }
        this.handleCancel();
        this.loadData();
    };

    handleCancel = () => {
        this.setState({
            flag: false
        });
        this.modalHandler();
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
            this.loadData();
        } else {
            this.setState({
                open: !this.state.open,
                modalName: name,
                rowData: Object.assign({}, rowData, { flag: true }),
                index,
            });
        }
    };

    render() {
        return (
            <div>
                <Table>
                    <TableRow>
                        <TableCell align="right">
                            <Button variant="outlined" color="primary" onClick={() => this.modalHandler("addPoint")}>
                                Добавить точку
                            </Button>
                        </TableCell>
                        <Dialog
                            open={this.state.open}
                            onClose={this.state.closeModal}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <DialogActions>
                                <Table>
                                    <TableRow>
                                        <TableCell align="center">
                                            <h2>
                                                {this.state.modalName === "addPoint"
                                                    ? "Добавить"
                                                    : "Редактировать"}
                                            </h2>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="center">
                                            {this.renderInputs("id города",
                                                "recycle_cities_id")}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="center">
                                            {this.renderInputs(
                                                "Название",
                                                "name"
                                            )}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="center">
                                            {this.renderInputs(
                                                "Адрес",
                                                "address"
                                            )}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="center">
                                            {this.renderInputs("latitude", "latitude")}
                                            {this.renderInputs("longitude", "longitude")}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="center">
                                            <Button onClick={this.handleSave} color="primary">
                                                Сохранить
                                            </Button>
                                            <Button onClick={this.handleCancel} color="primary" autoFocus>
                                                Отменить
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                </Table>
                            </DialogActions>
                        </Dialog>
                    </TableRow>
                </Table>
                <TableContainer component={Paper}>
                    <Table aria-label="custom pagination table">
                        <TableHead>
                            <TableRow key={1}>
                                <TableCell align="center" colSpan={2}>id</TableCell>
                                <TableCell align="center" colSpan={2}>id_города</TableCell>
                                <TableCell align="center" colSpan={2}>Название</TableCell>
                                <TableCell align="center" colSpan={2}>Адрес</TableCell>
                                <TableCell align="center" colSpan={2}>Широта</TableCell>
                                <TableCell align="center" colSpan={2}>Долгота</TableCell>
                                <TableCell align="center" colSpan={2}>
                                    Действия
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {(this.state.rowsPerPage > 0
                                    ? this.state.rows.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage)
                                    : this.state.rows
                            ).map((row) => (
                                <TableRow key={row.id} id={row.id}>
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
                                            id={row.id}
                                            variant="contained"
                                            color="primary">
                                            Редактировать
                                        </Button>
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            id={row.id}
                                            variant="contained"
                                            color="secondary"
                                            onClick={() => this.modalHandler("delete", row, row.id)}
                                        >
                                            Удалить
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}

                            {this.state.emptyRows > 0 && (
                                <TableRow style={{ height: 53 * this.state.emptyRows }}>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody >
                        <TableFooter>
                            <TableRow  component="th" scope="row"  colSpan={2}>
                                <TablePagination
                                    rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                    colSpan={3}
                                    count={this.state.elementsCount}
                                    rowsPerPage={this.state.rowsPerPage}
                                    page={this.state.page}
                                    SelectProps={{
                                        inputProps: { 'aria-label': 'rows per page' },
                                        native: true,
                                    }}
                                    onChangePage={this.handleChangePage}
                                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                                    actionsComponent={TablePaginationActions}
                                />
                            </TableRow>
                        </TableFooter>
                    </Table>
                </TableContainer>
            </div>
        );
    }
}
