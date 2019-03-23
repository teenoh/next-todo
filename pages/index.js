import React, { Component } from "react";
import Head from "next/head";
import Link from "next/link";

export default class Index extends Component {
  state = {
    todos: [],
    newTodo: ""
  };

  componentDidMount() {
    if (this.state.todos.length == 0) {
      const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
      this.setState({ todos: savedTodos });
    }
  }

  handleSubmit = () => {
    if (!this.state.newTodo) {
      return;
    }
    const todoId = this.state.todos.length + 1;
    const newTodos = this.state.todos.concat({
      id: todoId,
      todo: this.state.newTodo
    });

    localStorage.setItem("todos", JSON.stringify(newTodos)); // save todos locally

    this.setState({ todos: newTodos, newTodo: "" });
  };

  handleDelete = id => {
    const newTodos = this.state.todos.filter(todo => todo.id !== id);

    localStorage.setItem("todos", JSON.stringify(newTodos)); // save todos locally

    this.setState({
      todos: newTodos
    });
  };

  render() {
    return (
      <div>
        <Head>
          <meta charset="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <meta http-equiv="X-UA-Compatible" content="ie=edge" />
          <title>Next Todo App</title>
          <link rel="stylesheet" href="/static/css/bootstrap.min.css" />
          <link rel="stylesheet" href="/static/css/main.css" />
        </Head>

        <main className="container">
          <h1 className="text-white text-center mt-5">Persistent <br/> ToDo App</h1>
          <small className="text-white text-center d-block">
            (Your todos still remain even if you refresh your browser)
          </small>
          <div className="add-input mx-auto mt-5 d-flex">
            <input
              type="text"
              placeholder="Add todo item"
              className="form-control mr-3"
              value={this.state.newTodo}
              onChange={e => this.setState({ newTodo: e.target.value })}
            />
            <button className="btn btn-primary" onClick={this.handleSubmit}>
              Add
            </button>
          </div>

          <div className="todos mx-auto mt-5">
            <ul className="list-group">
              {this.state.todos.map(item => {
                return (
                  <li className="list-group-item todo-item pr-5" key={item.id}>
                    {item.todo}
                    <span
                      className="close-icon"
                      onClick={() => this.handleDelete(item.id)}
                    >
                      &times;
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </main>
      </div>
    );
  }
}
