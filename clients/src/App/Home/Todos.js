import React, { useEffect, useState } from "react";
import _ from "lodash";
import {
  Card,
  Col,
  Container,
  Row,
  Badge,
  Accordion,
  useAccordionToggle,
} from "react-bootstrap";
import axios from "axios";
import { useHistory } from "react-router-dom";

export default function Todos() {
  const [listOfTodos, setListOfTodos] = useState([]);
  const history = useHistory();

  const todoComplete = async (id) => {
    const response = await axios.put(`/todos/${id}`, { isCompleted: true });
    const updatedTodo = response.data;
    const todoIndex = listOfTodos.findIndex((todo) => {
      if (todo.id === id) {
        return true;
      }
      return false;
    });
    listOfTodos.splice(todoIndex, 1, updatedTodo);
    setListOfTodos([...listOfTodos]);
  };
  const todoIncomplete = async (id) => {
    const response = await axios.put(`/todos/${id}`, { isCompleted: false });
    const updatedTodo = response.data;
    const todoIndex = listOfTodos.findIndex((todo) => {
      if (todo.id === id) {
        return true;
      }
      return false;
    });
    listOfTodos.splice(todoIndex, 1, updatedTodo);
    setListOfTodos([...listOfTodos]);
  };

  const todoEdit = (id) => {
    console.log(id);
    history.push(`/edit/${id}`);
  };

  const todoDelete = async (id) => {
    await axios.delete(`/todos/${id}`);
    _.remove(listOfTodos, { id: id });
    setListOfTodos([...listOfTodos]);
  };

  const ToggleOpenTodo = ({ eventKey }) => {
    const decoratedOnClick = useAccordionToggle(eventKey);

    return (
      <svg
        width="1.25em"
        height="1.25em"
        viewBox="0 0 16 16"
        className="bi bi-chevron-expand mr-3"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        onClick={decoratedOnClick}
      >
        <path
          fillRule="evenodd"
          d="M3.646 9.146a.5.5 0 0 1 .708 0L8 12.793l3.646-3.647a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 0-.708zm0-2.292a.5.5 0 0 0 .708 0L8 3.207l3.646 3.647a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 0 0 0 .708z"
        />
      </svg>
    );
  };

  const EditSvg = (props) => {
    return (
      <svg
        width="1.1em"
        height="1.1em"
        viewBox="0 0 16 16"
        className="bi bi-pen mr-3"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        onClick={() => todoEdit(props.id)}
      >
        <path
          fillRule="evenodd"
          d="M13.498.795l.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z"
        />
      </svg>
    );
  };

  const CompleteSvg = (props) => {
    return (
      <svg
        width="1.5em"
        height="1.5em"
        viewBox="0 0 16 16"
        className="bi bi-x text-danger mr-3"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        onClick={() => todoIncomplete(props.id)}
      >
        <path
          fillRule="evenodd"
          d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
        />
      </svg>
    );
  };
  const IncompleteSvg = (props) => {
    return (
      <svg
        width="1.5em"
        height="1.5em"
        viewBox="0 0 16 16"
        className="bi bi-check2 mr-3 text-success"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        onClick={() => todoComplete(props.id)}
      >
        <path
          fillRule="evenodd"
          d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"
        />
      </svg>
    );
  };
  const DeleteSvg = (props) => {
    return (
      <svg
        width="1.1em"
        height="1.1em"
        viewBox="0 0 16 16"
        className="bi bi-trash text-danger"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        onClick={() => todoDelete(props.id)}
      >
        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
        <path
          fillRule="evenodd"
          d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
        />
      </svg>
    );
  };

  const listTodos = () => {
    return listOfTodos.length > 0 ? (
      <Accordion defaultActiveKey="0">
        {listOfTodos.map((item) => (
          <Card key={item.id}>
            <Card.Header>
              <Row>
                <Col sm="10">
                  <span className={item.isCompleted ? "text-success" : ""}>
                    {item.title}
                  </span>
                  {item.isCompleted && (
                    <Badge pill variant="success" className="ml-4">
                      task completed
                    </Badge>
                  )}
                </Col>
                <Col sm="2">
                  <div className="float-right">
                    {!item.isCompleted && <IncompleteSvg id={item.id} />}
                    {item.isCompleted && <CompleteSvg id={item.id} />}
                    <EditSvg id={item.id} />
                    <ToggleOpenTodo eventKey={item.id} />
                    <DeleteSvg id={item.id} />
                  </div>
                </Col>
              </Row>
            </Card.Header>
            <Accordion.Collapse eventKey={item.id}>
              <Card.Body>
                <Row className="mt-2">
                  <Col>
                    <div>{item.description}</div>
                  </Col>
                </Row>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        ))}
      </Accordion>
    ) : (
      <Card>
        <Card.Header>No work to do. Yayyy!</Card.Header>
      </Card>
    );
  };

  useEffect(() => {
    axios
      .get("/todos?_sort=isCompleted")
      .then((response) => setListOfTodos(response.data));
  }, []);

  return (
    <Container className="mt-5">
      <Card>
        <Card.Header as="h5" bg="dark">
          Your Todos
        </Card.Header>
        {listTodos()}
      </Card>
    </Container>
  );
}
