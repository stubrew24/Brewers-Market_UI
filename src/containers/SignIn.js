import React from 'react'
import { Grid, Header, Form, Message, Button } from 'semantic-ui-react'

export default class SignIn extends React.Component {

    state = {
        email: '',
        password: ''
    }

    handleOnChange = e => {
        this.setState({
            [e.target.name]: e.target.value 
        })
    }

    handleSubmit = e => {
        this.props.signInSubmit(this.state)
    }

    render(){
        return (
        <React.Fragment>

        <Grid textAlign='center'>
          <Grid.Column style={{ maxWidth: 450, paddingTop: '8em'}}>

            <Header as='h2' textAlign='center'>
              Sign in to your account
            </Header>

            <Form size='large' onSubmit={this.handleSubmit}>

                <Form.Input fluid icon='user' iconPosition='left' placeholder='E-mail address' name='email' onChange={this.handleOnChange} value={this.state.email} />
                <Form.Input
                  fluid
                  icon='lock'
                  name='password'
                  iconPosition='left'
                  placeholder='Password'
                  type='password'
                  onChange={this.handleOnChange}
                  value={this.state.password} 
                />
                {this.state.email && this.state.password
                  ?
                    <Button fluid size='large' content="Login" positive/>
                  :
                    <Button fluid size='large' content="Login" disabled />
                }
            </Form>

            <Message>
              New here? Sign Up
            </Message>

          </Grid.Column>
        </Grid>
      </React.Fragment>
        )
    }
}