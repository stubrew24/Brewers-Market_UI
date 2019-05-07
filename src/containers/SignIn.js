import React from 'react'
import { Grid, Header, Form, Message, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';
import { API_BASE } from '../API'

export default class SignIn extends React.Component {

    state = {
        email: '',
        password: ''
    }

    componentDidMount(){
      this.background()
    }

    background(){
      document.body.style.background = "url('https://res.cloudinary.com/dm7moiolo/image/upload/v1557234055/wil-stewart-24562-unsplash.jpg')";
      document.body.style.backgroundSize = "100%";
    }

    handleOnChange = e => this.setState({ [e.target.name]: e.target.value })

    handleSubmit = e => {
        this.props.signInSubmit(this.state)
    }

    signInSubmit = () => {
      fetch(API_BASE + 'signin',{
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(this.state)
      }).then(resp => resp.json())
        .then(response => {
          if (response.error) {
            toast.error('Signin Failed! Please try again.', {containerId: 'messages'})
          } else {
            localStorage.setItem('user', response.token)
            this.props.getUser()
            this.props.history.push('/') 
          }
        })
    }


    render(){
        return (
        <React.Fragment>
        <Grid textAlign='center'>
          <Grid.Column style={{ maxWidth: 450, paddingTop: '8em'}}>

            <Header as='h2' textAlign='center'>
              Sign in to your account
            </Header>

            <Form size='large' onSubmit={this.signInSubmit}>

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
              New here? <Link to={'/signup'} >Sign Up</Link>
            </Message>

          </Grid.Column>
        </Grid>
      </React.Fragment>
        )
    }
}