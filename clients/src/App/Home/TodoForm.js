import React, { useState } from "react";
import axios from "axios";
import {
  Card,
  Form,
  Row,
  Col,
  Button,
  Collapse,
  InputGroup,
  FormGroup,
  Container,
} from "react-bootstrap";
import { useFormik } from "formik";
import * as yup from "yup";
import { useHistory } from "react-router-dom";

export default function TodoForm() {
  const [todoForm, setTodoForm] = useState(true);
  const history = useHistory();

  let todoSchema = yup.object().shape({
    title: yup.string().min(2, "Too Short").max(70, "Too Long").required(),
    description: yup.string().min(2, "Too Short").required(),
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
    },
    validationSchema: todoSchema,
    onSubmit: async (values) => {
      const valid = await todoSchema.isValid(values);
      if (valid) {
        await axios.post("/todos", values);
        values.title = "";
        values.description = "";
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
            <Col sm="11">
              <h5>Add Todo</h5>
            </Col>
            <Col sm="1">
              {!todoForm && (
                <svg
                  width="1.5em"
                  height="1.5em"
                  viewBox="0 0 16 16"
                  className="bi bi-plus-circle float-right"
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
                  className="bi bi-dash-circle float-right"
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
                      placeholder="Title"
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
                      placeholder="Description"
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
                <Row className="my-4 float-right">
                  <Col>
                    <Button
                      type="submit"
                      variant="outline-success"
                      size="sm"
                      className="shadow"
                    >
                      Add
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
