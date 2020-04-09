import React, { Component } from "react";
import axios from "axios";
import { format } from "timeago.js";
import { Link } from "react-router-dom";

export default class NoteList extends Component {
  state = {
    notes: [],
  };

  async componentDidMount() {
    this.getNoteList();
  }

  getNoteList = async () => {
    const result = await axios.get("http://localhost:4000/api/notes");
    this.setState({ notes: result.data });
  };

  deleteNote = async (id) => {
    const res = await axios.delete("http://localhost:4000/api/notes/" + id);
    console.log(res.data);
    window.location = "/";
  };

  editNote = (id) => {
    axios.put("http://localhost:4000/api/notes/" + id);
    console.log("Nota a actualizar: ", id);
  };

  render() {
    return (
      <div className="row">
        {this.state.notes.map((note) => (
          <div className="col-md-4 p-2" key={note._id}>
            <div className="card">
              <div className="card-header d-flex justify-content-between">
                {note.title}
                <Link className="btn btn-secondary" to={"/edit/" + note._id}>
                  Edit
                </Link>
              </div>

              <div className="card-body">
                <p>{note.content}</p>
                <p>{note.author}</p>
                <p>{format(note.date)}</p>
              </div>
              <div className="card-footer">
                <button
                  className="btn btn-danger"
                  onClick={() => this.deleteNote(note._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}
