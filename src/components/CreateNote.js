import React, { Component } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default class CreateNote extends Component {
  state = {
    users: [],
    userSelected: "",
    title: "",
    content: "",
    date: new Date(),
    editable: false,
    _id: "",
  };

  async componentDidMount() {
    const respuesta = await axios.get("http://localhost:4000/api/users");
    this.setState({
      users: respuesta.data.map((user) => user.username),
      userSelected: respuesta.data[0].username,
    });
    //console.log(this.state.users);

    //Pregunto si viene el id. si es asi es una actualizacion de la nota.
    if (this.props.match.params.id) {
      const res = await axios.get(
        "http://localhost:4000/api/notes/" + this.props.match.params.id
      );
      this.setState({
        userSelected: res.data.author,
        title: res.data.title,
        content: res.data.content,
        date: new Date(res.data.date),
        editable: true,
        _id: this.props.match.params.id,
      });
    }
  }

  grabarNota = async (e) => {
    //console.log("state : ", this.state);
    e.preventDefault(); //permite q no reinicie la SPA y no conviene  lo relice

    const newNote = {
      title: this.state.title,
      content: this.state.content,
      date: this.state.date,
      author: this.state.userSelected,
    };

    if (this.state.editable) {
      await axios.put(
        "http://localhost:4000/api/notes/" + this.state._id,
        newNote
      );
    } else {
      await axios.post("http://localhost:4000/api/notes", newNote);
    }

    //console.log("respuesta del API ", res);
    window.location = "/";
  };

  onInputChance = (e) => {
    this.setState({
      [e.target.name]: e.target.value, //selecciona el value de cada input, select del form para no repertir cada component
    });
  };

  onChangeDate = (date) => {
    this.setState({ date });
  };
  render() {
    return (
      <div className="col-md-6 offset-md-3">
        <div className="card card-body">
          <h4>Crear una nota</h4>
          {/** select de usuarios */}
          <div className="form-group">
            <select
              className="from-control"
              name="userSelected"
              onChange={this.onInputChance}
            >
              {this.state.users.map((user) => (
                <option key={user} value={user}>
                  {user}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              name="title"
              placeholder="titulo"
              onChange={this.onInputChance}
              value={this.state.title}
              required
            />
          </div>
          <div className="form-group">
            <textarea
              className="form-control"
              name="content"
              placeholder="content"
              onChange={this.onInputChance}
              value={this.state.content}
              required
            ></textarea>
          </div>

          <div className="from-group">
            <DatePicker
              className="from-control"
              selected={this.state.date}
              onChange={this.onChangeDate}
              value={this.state.date}
            />
          </div>
          <br />
          <form onSubmit={this.grabarNota}>
            <button type="submit" className="btn btn-primary">
              Crear Nota
            </button>
          </form>
        </div>
      </div>
    );
  }
}
