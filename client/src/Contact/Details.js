import React, { useState } from 'react'
import { Row, Col, Button, Form, Input, FormGroup } from 'reactstrap'
import Segments from './Segments'
import moment from 'moment'
import { editContact } from '../redux/actions'
import { connect } from "react-redux"

const Details = props => {

  const [formDisplay, setFormDisplay] = useState(false)
  const [contactName, setContactName] = useState(props.contact.name)

  const toggleEditForm = () => {
    setFormDisplay(!formDisplay)
  }

  const changeHandler = e => {
    setContactName(e.target.value)
  }

  const editHandler = e => {
    e.preventDefault()
    props.editHandler(props.contact.id, "name", contactName).then(data => {
      toggleEditForm()
    })
  }

  const editForm = formDisplay ? "block" : "none"
  const editFormBtn = formDisplay ? "none" : "block"

  return (
    <>
      {props.contact ?
        <>
          <div className="title">
            <h1 style={{ display: editFormBtn }}>{props.contact.name}</h1>
            <Form onSubmit={editHandler}>
              <FormGroup style={{ display: editForm, width: "300px" }}>
                <Input type="text" value={contactName} onChange={changeHandler} />
                <Button color="primary" size="sm" style={{ width: "100px", float: "none", marginTop: "10px" }}>Save</Button>
                <span className="edit" style={{ textDecoration: "underline", marginLeft: "20px" }} onClick={toggleEditForm}>Cancel</span>
              </FormGroup>
            </Form>
            <span className="edit" style={{ display: editFormBtn }} onClick={toggleEditForm}>Edit name</span>
            <small>Created <strong>{moment(props.contact.created_at).format('lll')}</strong></small>
            <Button
              color="secondary"
              href={`/contacts`}
            >
              Go back to contacts
              </Button>
          </div>
          <Row>
            <Col xs="8">
              <div className="main">
                <div style={{ margin: "0 20px", lineHeight: "45px" }}>
                  <Row>
                    <Col xs="4">
                      <h4 style={{ display: "inline" }}>Email</h4>
                    </Col>
                    <Col xs="6">
                      <div>{props.contact.email}</div>
                    </Col>
                    <Col xs="2">
                      <Button color="secondary">Edit</Button>
                    </Col>
                  </Row>
                </div>
              </div>
            </Col>
            <Col xs="4">
              <div className="main" style={{ paddingTop: "15px" }}>
                <Segments contact={props.contact} />
              </div>
            </Col>
          </Row>
        </>
        : null}
    </>
  )
}

const mdp = dispatch => {
  return { editHandler: (id, field, value) => dispatch(editContact(id, field, value)) }
}

export default connect(null, mdp)(Details)
