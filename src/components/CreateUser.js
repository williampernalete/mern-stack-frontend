import React, { Component } from "react";
import axios from "axios"; //biblioteca que permite realziar peticiones get,put,post,etc...

export default class CreateUser extends Component {
  state = {
    users: [],
    username: "",
  };

  //ayuda a ejecutar funciones una vez que el componente
  // ya se haya montado.
  async componentDidMount() {
    //const result = await axios.get("http://localhost:4000/api/users");
    //this.setState({ users: result.data });
    this.getUsers();
    console.log(this.state.users);
  }

  getUsers = async () => {
    const result = await axios.get("http://localhost:4000/api/users");
    this.setState({ users: result.data });
  };

  onChangeUserName = (e) => {
    this.setState({
      username: e.target.value,
    });
    //console.log(e.target.value);
  };

  onSubmit = async (e) => {
    e.preventDefault(); //permite q no reinicie la SPA y no conviene  lo relice
    await axios.post("http://localhost:4000/api/users", {
      username: this.state.username,
    });
    this.setState({ username: "" });
    this.getUsers();
  };

  deleteUser = async (id) => {
    console.log("voy a borrar a -> ", id);
    await axios.delete("http://localhost:4000/api/users/" + id);
    this.getUsers();
  };

  render() {
    return (
      <div className="row">
        <div className="col-md-4">
          <div className="card card-body">
            <h3>Crear un nuevo usuario</h3>
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  value={this.state.username}
                  onChange={this.onChangeUserName}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Grabar..
              </button>
            </form>
          </div>
        </div>
        <div className="col-md-8">
          <ul className="list-group">
            {this.state.users.map((user) => (
              <li
                className="list-group-item list-group-item-action"
                key={user._id}
                onDoubleClick={() => this.deleteUser(user._id)}
              >
                {user.username}
                {/* <button>Eliminar</button> */}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
