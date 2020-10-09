import React from 'react'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap'
import { connect } from 'react-redux'
import { createCampaign } from '../redux/actions'
import '../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { withRouter } from 'react-router-dom'
import Templates from './Templates'

class CreateForm extends React.Component {

  state = {
    name: "",
    subject: "",
    template_id: 0
  }

  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  submitHandler = e => {
    e.preventDefault()
    this.props.submitHandler(this.state).then(() => {
      this.props.history.push(this.props.redirectTo)
    })
  }

  selectHanlder = e => {
    const foundTemplate = this.props.templates.find(template => template.id === parseInt(e.target.id))
    this.setState({ template_id: foundTemplate.id })
  }

  render() {
    return (
      <>
        <h1>Create New Campaign</h1>
        <Form onSubmit={this.submitHandler}>
          <FormGroup>
            <Label for="name">Name</Label>
            <Input type="text" name="name" id="campaign-name" value={this.state.name} onChange={this.changeHandler} />
          </FormGroup>
          <FormGroup>
            <Label for="subject">Subject</Label>
            <Input type="text" name="subject" id="campaign-subject" value={this.state.subject} onChange={this.changeHandler} />
          </FormGroup>
          <Templates templates={this.props.templates} templateId={this.state.template_id} selectHanlder={this.selectHanlder} />
          <Button color="primary" style={{ marginTop: "30px" }}>Next</Button>
        </Form>
      </>
    )
  }
}

const msp = state => {
  return { campaigns: state.campaigns, redirectTo: state.redirectTo, templates: state.templates }
}

const mdp = dispatch => {
  return { submitHandler: campaignObj => dispatch(createCampaign(campaignObj)) }
}

export default withRouter(connect(msp, mdp)(CreateForm))