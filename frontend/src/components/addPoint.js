import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  Input,
  InputLabel,
  TableCell,
  TableRow,
  Table,
  FormControl
} from "@material-ui/core";
import {put, post, showAllert} from "../actions/actions";
import {BACKEND_URL} from "../consts";
require('dotenv').config()
export class AddPoint extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      recycle_cities_id: "",
      name: "",
      address: "",
      latitude: "",
      longitude: ""
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.flag) {
      return { ...prevState };
    } else if (nextProps.data.modalName === "editPoint") {
      return { ...nextProps.data.rowData };
    } else if (nextProps.data.modalName === "addPoint") {
      return {
        id: "",
        recycle_cities_id: "",
        name: "",
        address: "",
        latitude: "",
        longitude: "",
        flag: true
      };
    } else {
      return null;
    }
  }

  handleSave = () => {
    if (this.props.data.modalName === "editPoint") {
      put(BACKEND_URL+"/points/" + this.state.id, this.state).then(result => {
       showAllert("изменение прошло успешно", 'info')
      }).catch(err =>{
        showAllert(err, 'error')
      })
    } else {
      post(BACKEND_URL + "/points", this.state).then(result => {
        showAllert("создание прошло успешно", 'info')
      }).catch(err =>{
        showAllert(err, 'error')
      })
    }
    this.handleCancel();
  };

  handleCancel = () => {
    this.setState({
      flag: false
    });
    this.props.modalHandler();
  };

  changeHandler = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
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

  render() {
    return (
      <Dialog
        open={this.props.open}
        onClose={this.props.closeModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogActions>
          <Table>
            <TableRow>
              <TableCell align="center">
                <h2>
                  {this.props.data.modalName === "addPoint"
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
    );
  }
}


