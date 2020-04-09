import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Navegation from "./components/Navegation";
import NoteList from "./components/NoteList";
import CreateNote from "./components/CreateNote";
import CreateUser from "./components/CreateUser";

function App() {
  return (
    <BrowserRouter>
      <Navegation />

      <div className="container p-4">
        <Route path="/" exact component={NoteList} />
        <Route path="/edit/:id" component={CreateNote} />
        <Route path="/create" component={CreateNote} />
        <Route path="/user" component={CreateUser} />
      </div>
    </BrowserRouter>
  );
}

export default App;
