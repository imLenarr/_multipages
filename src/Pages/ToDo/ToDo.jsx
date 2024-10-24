import { useState, useEffect, useRef } from "react";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import { fetchtodos } from "../../data/todos";

import "./ToDo.css";
import Form from 'react-bootstrap/Form';

function ToDo() {
  // todosRaw -> filters -> todos -> display

  // todosRaw
  const [todosRaw, setTodosRaw] = useState([]);
  // filters
  const [onlyWaiting, setOnlyWating] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  // todos
  const [todos, setTodos] = useState([]);
  // display
  const [numPages, setNumPages] = useState(1);
  const [curPage, setCurPage] = useState(1);

  useEffect(() => {
    // setCurPage((prev) => (prev > numPages ? numPages : prev));
    setCurPage(1);
  }, [numPages]);

  useEffect(() => {
    console.log(`curPage: ${curPage}`);
  }, [curPage]);

  useEffect(() => {
    console.log(`itemsPerPage: ${itemsPerPage}`);
    setNumPages(Math.ceil(todosRaw.length / itemsPerPage)); //ceil คือใช้ปัดขึ้น สำหรับหน้าเพจ
  }, [itemsPerPage, todosRaw]);

  useEffect(() => {
    console.log(`onlyWaiting: ${onlyWaiting}`);
  }, [onlyWaiting]); //first load

  useEffect(() => {
    setTodosRaw(fetchtodos());
    setCurPage(1);
  }, []); //load

  // กรองตัวwaiting
  useEffect(() => {
    if (onlyWaiting) {
      // show only waiting
      setTodos(todosRaw.filter((todo) => !todo.completed));
    } else {
      //show all
      setTodos(todosRaw);
    }
  }, [todosRaw, onlyWaiting, itemsPerPage]); // *** bypass filters ***

  // event handler
  function deleteClick(id) {
    // [todosRaw] -> todos
    setTodosRaw(todosRaw.filter((todo) => todo.id !== id));
  }

  function waitingClick(id) {
    const todoSelected = todosRaw.find((todo) => todo.id === id);
    todoSelected.completed = true;
    setTodosRaw([...todosRaw]); // state change
  }

  function addClick(id, title) {
    const newItem = {
      id,
      title,
      completed: false,
      userId: 1,
    };
    setTodosRaw([...todosRaw, newItem]); // work
  }

  // modals handlers
  const [show, setShow] = useState(false);

  const newIdRef = useRef();
  const newTitleRef = useRef();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="todo-container">
      {/* modals */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {" "}
            <span className="bi bi-plus-lg">&nbsp; Add todo</span>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>ID : </Form.Label>
              <Form.Control
                type="text"
                autoFocus
                disabled
                value={
                  Number(
                    todosRaw.reduce(
                      (prev, todo) => (todo.id > prev ? todo.id : prev),
                      0
                    )
                  ) + 1
                }
                ref={newIdRef}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
              <Form.Label>Title : </Form.Label>
              <Form.Control type="text" autoFocus ref={newTitleRef} />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            <span className="bi bi-x-lg">&nbsp; Cancel</span>
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              // ?
              const id = newIdRef.current.value;
              const title = newTitleRef.current.value.trim();
              if (title === "") {
                alert("Title cannot be empty");
                newTitleRef.current.focus();
              } else {
                addClick(id, title);
                handleClose();
              }
            }}
          >
            <span className="bi bi-plus-lg">&nbsp; Add</span>
          </Button>
        </Modal.Footer>
      </Modal>

      {/* filters */}
      <div className="filters-container">
        <div className="form-check form-switch">
          <input
            className="form-check-input todo-checkbox"
            type="checkbox"
            role="switch"
            id="flexSwitchCheckChecked"
            onClick={(e) => setOnlyWating(e.target.checked)} />

          <label className="form-check-label" htmlFor="flexSwitchCheckChecked">
            Show only &nbsp;
            <span className="btn btn-warning ">
              waiting &nbsp; <span className="bi-clock"></span>
            </span>
          </label>
          
        </div>

        <select
          className="form-select"
          aria-label="Default select example"
          defaultValue={10}
          style={{ width: "200px" }}
          onChange={(e) => setItemsPerPage(e.target.value)}
        >
          <option value={5}>5 items per page</option>
          <option value={10}>10 items per page</option> {/* selected */}
          <option value={50}>50 items per page</option>
          <option value={100}>100 items per page</option>
        </select>
      </div>

      {/* table */}
      <table className="table table-striped todo-table">
        <thead className="table-dark">
          <tr>
            <th style={{ width: "5%", textAlign: "center" }}>ID</th>
            <th valign="middle">Title</th>
            <th style={{ textAlign: "right", width: "20%" }} valign="middle">
              Complete &nbsp;
              <button
                className="btn btn-primary"
                onClick={() => {
                  handleShow();
                }}
              >
                <span className="bi bi-plus-lg"></span>
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {
            // itemsPerPage = 5
            // curPage = 1, 2, 3
            // items (human) = [ 1 .... 5 ], [ 6 .... 10 ], [ 11 .... 15 ]
            // items (js*) = [ 0 .... 4 ], [ 5 .... 9 ], [ 10 .... 14 ]
            // items (js*) = [ min .... max ]
            // min = (curPage - 1) * itemsPerPage
            // max = min * itemsPerPage - 1
            todos
              .filter((todo, index) => {
                const min = (curPage - 1) * itemsPerPage;
                const max = curPage * itemsPerPage - 1;
                return index >= min && index <= max;
              })

              .map((todo) => {
                return (
                  <tr key={todo.id}>
                    <td valign="middle">
                      <span
                        className="btn btn-secondary"
                        style={{ width: "4rem" }}
                      >
                        {todo.id}
                      </span>
                    </td>
                    <td style={{ textAlign: "left" }} valign="middle">
                      {todo.title}
                    </td>
                    <td style={{ textAlign: "right" }}>
                      <button
                        onClick={() => waitingClick(todo.id)}
                        className={
                          "btn " +
                          (todo.completed ? "btn-success" : "btn-warning")
                        }
                      >
                        {todo.completed ? "done" : "waiting"}{" "}
                        <span
                          className={
                            "bi " + (todo.completed ? "bi-check" : "bi-clock")
                          }
                        ></span>
                      </button>{" "}
                      <button
                        className="btn btn-danger"
                        onClick={() => deleteClick(todo.id)}
                      >
                        <span className="bi bi-trash"></span>
                      </button>
                    </td>
                  </tr>
                );
              })
          }
        </tbody>
      </table>

      {/* page control */}
      <div className="page-control">
        <button
          className="btn btn-outline-primary todo-space"
          onClick={() => setCurPage(1)}
          disabled={curPage === 1}
        >
          Frist
        </button>
        <button
          className="btn btn-outline-primary todo-space"
          onClick={() => curPage > 1 && setCurPage(curPage - 1)}
          // disabled={curPage  1}
        >
          Previous
        </button>
        <span className="todo-space">
          {curPage} &nbsp; /&nbsp; {numPages}
        </span>
        <button
          className="btn btn-outline-primary todo-space"
          onClick={() => curPage < numPages && setCurPage(curPage + 1)}
          disabled={curPage === numPages}
        >
          Next
        </button>
        <button
          className="btn btn-outline-primary todo-space"
          onClick={() => setCurPage(numPages)}
          disabled={curPage === numPages}
        >
          Last
        </button>
      </div>
    </div>
  );
}

export default ToDo;
