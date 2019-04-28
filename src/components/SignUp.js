import React from 'react'
import { Grid, Header, Form, Button } from 'semantic-ui-react'
import { DateInput } from 'semantic-ui-calendar-react';
import { toast } from 'react-toastify';
import { API_BASE } from '../API'

export default class SignUp extends React.Component {

    state = {
        first_name: '',
        last_name: '',
        email: '',
        dob: '',
        password: '',
        password_confirm: ''
    }

    handleOnChange = e => {
        this.setState({
            [e.target.name]: e.target.value 
        })
    }

    handleDateChange = (event, {name, value}) => {
        this.setState({ [name]: value })
    }

    handleSubmit = e => { 
      let pass_error = true
      let dob_error = true
      if (this.state.password !== this.state.password_confirm) {
        toast.error('Passwords do not match.', {containerId: 'errors'})
        pass_error = true
      } else {
        pass_error = false
      }
      if (this.ageCheck(this.state.dob) < 18){
        toast.error('You must be at least 18.', {containerId: 'errors'})
        dob_error = true
      } else {
        dob_error = false
      }
      if (!dob_error && !pass_error){
        this.signUpSubmit()
      }
    }

    signUpSubmit = () => {
      fetch(API_BASE + 'users', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(this.state)
      }).then(resp => resp.json())
        .then(response => {
          if (response.error) {
            response.error.map(err => toast.error(err, {containerId: 'messages'}))
          } else {
            localStorage.setItem('user', response.token)
            this.props.getUser()
            this.props.history.push('/')
          }
        })
    }

    formValidation = () => {
      const {first_name, last_name, email, dob, password, password_confirm} = this.state
      if (!first_name || !last_name || !email || !dob || !password || !password_confirm) {
        return false
      } else {
        return true
      }
    }

    ageCheck = (date) => {
      const today = new Date()
      const dd = today.getDate()
      const mm = today.getMonth()+1
      const yyyy = today.getFullYear()
      const dob = date.split('-')
      let age = yyyy - dob[2]
      const month = mm - dob[1]
      if (month < 0 || (month === 0 && dd < dob[0])){
        age--
      }
      return age
    }

    render(){
        return (
        <React.Fragment>

        <Grid textAlign='center'>
          <Grid.Column style={{ maxWidth: 450, paddingTop: '8em'}}>

            <Header as='h2' textAlign='center'>
              Create a new account
            </Header>

            <Form size='large' onSubmit={this.handleSubmit}>
                <Form.Input fluid required icon='user' iconPosition='left' placeholder='First Name' name='first_name' onChange={this.handleOnChange} value={this.state.first_name} />
                <Form.Input fluid required icon='user' iconPosition='left' placeholder='Last Name' name='last_name' onChange={this.handleOnChange} value={this.state.last_name} />
                
                <Form.Input fluid required icon='mail' iconPosition='left' placeholder='E-mail address' name='email' onChange={this.handleOnChange} value={this.state.email} />
                
                <DateInput
                  name="dob"
                  placeholder="Date of Birth"
                  value={this.state.dob}
                  iconPosition="left"
                  onChange={this.handleDateChange}
                />
                
                <Form.Input
                  fluid 
                  required
                  icon='lock'
                  name='password'
                  iconPosition='left'
                  placeholder='Password'
                  type='password'
                  onChange={this.handleOnChange}
                  value={this.state.password} 
                />
                <Form.Input
                  fluid 
                  required
                  icon='lock'
                  name='password_confirm'
                  iconPosition='left'
                  placeholder='Confirm Password'
                  type='password'
                  onChange={this.handleOnChange}
                  value={this.state.password_confirm} 
                />
                {this.formValidation()
                  ?
                    <Button fluid size='large' content="Create account" positive/>
                  :
                    <Button fluid size='large' content="Create account" disabled />
                }
            </Form>

          </Grid.Column>
        </Grid>
      </React.Fragment>
        )
    }
}