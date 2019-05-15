import React from 'react'
import { Grid, Header, Form, Button } from 'semantic-ui-react'
import { API_BASE } from '../API';
import { toast } from 'react-toastify';
import ImageUpload from './ImageUpload';

export default class BreweryProfile extends React.Component {

    state = {
        brewery: {
            id: 0,
            name: '',
            bio: '',
            location: '',
            profile_img: ''
        }
    }

    componentDidMount(){
        this.setState({ brewery: this.props.brewery })
    }

    updateDetails = () => {
        fetch(API_BASE + `breweries/${this.state.brewery.id}`, {
            method: 'PATCH',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(this.state.brewery)})
                .then(resp => resp.json())
                .then(response => {
                    if (response.error){
                        toast.error('response.error', {containerId: 'messages'})
                    } else {
                        toast.success('Details updated.', { containerId: 'messages' })
                        this.setState({ brewery: response })
                        this.props.getUser()
                        this.props.getProducts()
                    }
                })

    }

    setImage = (profile_img) => {
        this.setState({brewery: {...this.state.brewery, profile_img}})
    }

    formValidation = () => {
        const { name, bio, location } = this.state.brewery
        if (!name || !bio || !location) {
            return false
        } else {
            return true
        }
    }

    handleChange = e => {
        this.setState({
            brewery: {...this.state.brewery, [e.target.name]: e.target.value}
        })
    }

    render(){
        return(
            <React.Fragment>

                <Grid textAlign='center'>
                    <Grid.Column style={{ maxWidth: 450, paddingTop: '8em'}}>

                        <Header as='h2' textAlign='center'>
                            Brewery Details
                        </Header>

                        <Form size='large' onSubmit={this.updateDetails} onChange={this.handleChange} >
                            <Form.Input fluid required icon='address card' iconPosition='left' name='name' placeholder='Brewery Name' value={this.state.brewery.name} />
                            <Form.TextArea required name='bio' placeholder='Bio' style={{height:'8em'}} value={this.state.brewery.bio} />
                            <Form.Input fluid required icon='location arrow' iconPosition='left' name='location' placeholder='Location' value={this.state.brewery.location} />

                            <ImageUpload image={this.state.brewery.profile_img} setImage={this.setImage} />

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