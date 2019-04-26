import React from 'react'
import { Grid, Header, Form, Button } from 'semantic-ui-react'
import { ToastContainer, toast } from 'react-toastify'
import { DateInput } from 'semantic-ui-calendar-react'

export default class UserProfile extends React.Component {

    state = {
        first_name: this.props.user.first_name,
        last_name: this.props.user.last_name,
        tel: this.props.user.tel,
        address_line_1: this.props.user.address_line_1,
        address_line_2: this.props.user.address_line_2,
        city: this.props.user.city,
        postcode: this.props.user.postcode
    }

    handleOnChange = e => {
        this.setState({
            [e.target.name]: e.target.value 
        })
    }

    handleSubmit = () => {
        this.props.updateDetails(this.state)
    }

    formValidation = () => {
        const {first_name, last_name, tel, address_line_1, address_line_2, city, postcode} = this.state
        if (!first_name || !last_name || !tel || !address_line_1 || !address_line_2 || !city || !postcode) {
          return false
        } else {
          return true
        }
    }

    render(){

        return (
            <React.Fragment>
                <ToastContainer containerId={'errors'} position={toast.POSITION.TOP_RIGHT} />

                <Grid textAlign='center'>
                <Grid.Column style={{ maxWidth: 450, paddingTop: '8em'}}>

                    <Header as='h2' textAlign='center'>
                        My Details
                    </Header>

                    <Form size='large' onSubmit={this.handleSubmit}>
                        <Form.Input fluid required icon='user' iconPosition='left' placeholder='First Name' name='first_name' onChange={this.handleOnChange} value={this.state.first_name} />
                        <Form.Input fluid required icon='user' iconPosition='left' placeholder='Last Name' name='last_name' onChange={this.handleOnChange} value={this.state.last_name} />
                
                        <Form.Input fluid required disabled icon='mail' iconPosition='left' placeholder='E-mail address' name='email' onChange={this.handleOnChange} value={this.props.user.email} />
                
                        <DateInput
                        disabled
                        name="dob"
                        placeholder="Date of Birth"
                        value={this.props.user.dob}
                        iconPosition="left"
                        onChange={this.handleDateChange}
                        />

                        <Form.Input fluid required icon='phone' iconPosition='left' placeholder='Phone No.' name='tel' onChange={this.handleOnChange} value={this.state.tel} />
                        <Form.Input fluid required icon='address book' iconPosition='left' placeholder='Address Line 1' name='address_line_1' onChange={this.handleOnChange} value={this.state.address_line_1} />
                        <Form.Input fluid required icon='address book' iconPosition='left' placeholder='Address Line 2' name='address_line_2' onChange={this.handleOnChange} value={this.state.address_line_2} />
                        <Form.Input fluid required icon='address book' iconPosition='left' placeholder='City' name='city' onChange={this.handleOnChange} value={this.state.city} />
                        <Form.Input fluid required icon='address book' iconPosition='left' placeholder='Postcode' name='postcode' onChange={this.handleOnChange} value={this.state.postcode} />
                
                        {this.formValidation()
                            ? 
                                <Button fluid size='large' content="Update Details" positive/>
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