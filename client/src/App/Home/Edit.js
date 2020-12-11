import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import {
  Card,
  Form,
  Row,
  Col,
  Button,
  Collapse,
  InputGroup,
  FormGroup,
} from 'react-bootstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useParams, useHistory } from 'react-router-dom';

export default function TodoForm() {
  const [todoForm, setTodoForm] = useState(true);
  const [todo, setTodo] = useState({ title: '', description: '' });
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    getTodo(id);
  }, []);

  const getTodo = async (id) => {
    const response = await axios.get(`/todos/${id}`);
    const fetchedTodo = response.data;
    setTodo({
      ...todo,
      title: fetchedTodo.title,
      description: fetchedTodo.description,
    });
  };

  const todoSchema = yup.object().shape({
    title: yup.string().min(2, 'Too Short').max(70, 'Too Long').required(),
    description: yup.string().min(2, 'Too Short').required(),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: todo.title,
      description: todo.description,
    },
    validationSchema: todoSchema,
    onSubmit: async (values) => {
      const valid = await todoSchema.isValid(values);
      if (valid) {
        await axios.put(`/todos/${id}`, values);
        history.push('/');
      }
    },
  });
  function toggleAddForm() {
    setTodoForm(!todoForm);
  }

  return (
    <Container className="mt-4">
      <Card>
        <Card.Header>
          <Row>
            <Col sm="10">
              <h5>
                Edit
                {todo.title}
              </h5>
            </Col>
            <Col sm="2" className="d-flex justify-content-end">
              {!todoForm && (
                <svg
                  width="1.5em"
                  height="1.5em"
                  viewBox="0 0 16 16"
                  className="bi bi-plus-circle mr-4"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  onClick={toggleAddForm}
                >
                  <path
                    fillRule="evenodd"
                    d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
                  />
                  <path
                    fillRule="evenodd"
                    d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"
                  />
                </svg>
              )}
              {todoForm && (
                <svg
                  width="1.5em"
                  height="1.5em"
                  viewBox="0 0 16 16"
                  className="bi bi-dash-circle mr-4"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  onClick={toggleAddForm}
                >
                  <path
                    fillRule="evenodd"
                    d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
                  />
                  <path
                    fillRule="evenodd"
                    d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"
                  />
                </svg>
              )}
              <svg
                width="1.5em"
                height="1.5em"
                viewBox="0 0 16 16"
                className="bi bi-x-circle"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                onClick={() => {
                  history.push('/');
                }}
              >
                <path
                  fillRule="evenodd"
                  d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
                />
                <path
                  fillRule="evenodd"
                  d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
                />
              </svg>
            </Col>
          </Row>
        </Card.Header>
        <Collapse in={todoForm}>
          <div>
            <Card.Body>
              <Form noValidate onSubmit={formik.handleSubmit}>
                <FormGroup className="mb-4">
                  <Form.Label>Title</Form.Label>
                  <InputGroup>
                    <Form.Control
                      className="shadow-sm"
                      name="title"
                      type="text"
                      onChange={formik.handleChange}
                      value={formik.values.title}
                      isInvalid={formik.touched.title && formik.errors.title}
                      onBlur={formik.handleBlur}
                    />
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.title}
                    </Form.Control.Feedback>
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <Form.Label>Description</Form.Label>
                  <InputGroup>
                    <Form.Control
                      as="textarea"
                      rows={2}
                      className="shadow-sm"
                      name="description"
                      type="text"
                      onChange={formik.handleChange}
                      value={formik.values.description}
                      isInvalid={
                        formik.touched.description && formik.errors.description
                      }
                      onBlur={formik.handleBlur}
                    />
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.description}
                    </Form.Control.Feedback>
                  </InputGroup>
                </FormGroup>
                <Row className="my-4">
                  <Col className="d-flex justify-content-end">
                    <Button
                      type="submit"
                      variant="danger mr-4"
                      size="sm"
                      className="shadow"
                      onClick={() => {
                        history.push('/');
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      variant="outline-success"
                      size="sm"
                      className="shadow"
                    >
                      Update
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </div>
        </Collapse>
      </Card>
    </Container>
  );
}
