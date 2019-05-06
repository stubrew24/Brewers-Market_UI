import React from 'react'
import { Grid, Header, Form, Button } from 'semantic-ui-react'
import { toast } from 'react-toastify'
import { DateInput } from 'semantic-ui-calendar-react'
import { API_BASE } from '../API'
import ImageUpload from './ImageUpload';

export default class UserProfile extends React.Component {

    state = {
        first_name: '',
        last_name: '',
        tel: '',
        address_line_1: '',
        address_line_2: '',
        city: '',
        postcode: '',
        dob: '',
        email: '',
        profile_img: ''
    }

    componentDidMount() {

        const token = localStorage.getItem('user')
        if (token) {
            fetch(API_BASE + 'auto_signin', {
                headers: { 'Authorization': token }
            }).then(resp => resp.json())
                .then(response => {
                    if (response.error) return
                    this.setState({ ...response.user })
                })
        } else {
            this.props.history.push('/signin')
        }
    }

    updateDetails = () => {
        fetch(API_BASE + `users/${this.state.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.state)
        }).then(resp => resp.json())
            .then(response => {
                if (response.error) {
                    response.error.map(err => toast.error(err, { containerId: 'messages' }))
                } else {
                    toast.success('Details updated.', { containerId: 'messages' })
                    this.setState({ user: response })
                    this.props.getUser()
                }
            })
    }

    handleOnChange = e => this.setState({ [e.target.name]: e.target.value })

    formValidation = () => {
        const { first_name, last_name, tel, address_line_1, city, postcode } = this.state
        if (!first_name || !last_name || !tel || !address_line_1 || !city || !postcode) {
            return false
        } else {
            return true
        }
    }

    setImage = (profile_img) => {
        this.setState({profile_img})
    }

    render() {

        const { first_name, last_name, tel, address_line_1, address_line_2, city, postcode, email, dob } = this.state

        return (
            <React.Fragment>

                <Grid textAlign='center'>
                    <Grid.Column style={{ maxWidth: 450, paddingTop: '6em' }}>

                        <Header as='h2' textAlign='center'>
                            My Details
                    </Header>

                        <Form size='large' onSubmit={this.updateDetails}>
                            <Form.Input fluid required icon='user' iconPosition='left' placeholder='First Name' name='first_name' onChange={this.handleOnChange} value={first_name} />
                            <Form.Input fluid required icon='user' iconPosition='left' placeholder='Last Name' name='last_name' onChange={this.handleOnChange} value={last_name} />

                            <Form.Input fluid required disabled icon='mail' iconPosition='left' placeholder='E-mail address' name='email' onChange={this.handleOnChange} value={email} />

                            <DateInput
                                disabled
                                value={dob}
                                iconPosition="left"
                            />

                            <Form.Input fluid required icon='phone' iconPosition='left' placeholder='Phone No.' name='tel' onChange={this.handleOnChange} value={tel} />
                            <Form.Input fluid required icon='address book' iconPosition='left' placeholder='Address Line 1' name='address_line_1' onChange={this.handleOnChange} value={address_line_1} />
                            <Form.Input fluid icon='address book' iconPosition='left' placeholder='Address Line 2' name='address_line_2' onChange={this.handleOnChange} value={address_line_2} />
                            <Form.Input fluid required icon='address book' iconPosition='left' placeholder='City' name='city' onChange={this.handleOnChange} value={city} />
                            <Form.Input fluid required icon='address book' iconPosition='left' placeholder='Postcode' name='postcode' onChange={this.handleOnChange} value={postcode} />

                            <ImageUpload image={this.state.profile_img} setImage={this.setImage} />

                            {this.formValidation()
                                ?
                                <Button fluid size='large' content="Update Details" positive />
                                :
                                <Button fluid size='large' content="Update Details" disabled />
                            }
                        </Form>
                    </Grid.Column>
                </Grid>
            </React.Fragment>
        )
    }
}