import React from 'react'
import { Grid, Header, Form, Button, Popup } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import ImageUpload from './ImageUpload';
import { styles } from '../constants'

export default class BreweryProductForm extends React.Component {

    state = {
        name: '',
        description: '',
        abv: 0,
        volume: 0,
        style: '',
        packaging: '',
        price: 0,
        stock: 0,
        image_url: '',
    }

    componentDidMount(){
        if(this.props.product){
            this.setState({...this.props.product})
        }
    }

    setImage = (image_url) => {
        this.setState({image_url})
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSelect = (e, {name, value}) => {
        this.setState({
            [name]: value
        })
    }

    formValidation = () => {
        const {name, description, abv, volume, style, packaging, price, stock } = this.state
         if (!name || !description || !abv || !volume || !style || !packaging || !price || !stock.toString() ) {
             return false
         } else {
             return true
         }
    }

    styles = () => {
        return styles.map(style => {
            return {text: style, value: style}
        })
    }

    packaging = () => {
        return [
            {text: 'Can', value: 'can'},
            {text: 'Bottle', value: 'bottle'}
        ]

    }

    handleSubmit = () => {
        this.props.handleSubmit(this.state)
    }

    render() {
        return (
            <React.Fragment>

                <Grid textAlign='center'>
                    <Grid.Row>
                        <Grid.Column>
                        <Button floated="left" as={Link} to={'/brewery/products'}>Back to Products</Button>

                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                    <Grid.Column style={{ maxWidth: 450 }}>

                        <Header as='h2' textAlign='center'>
                            <Header.Content>{this.props.title}</Header.Content>
                        </Header>

                        <Form size='large' onSubmit={this.handleSubmit} onChange={this.handleChange} >
                            <Popup trigger={<Form.Input fluid required icon='address card' iconPosition='left' name='name' placeholder='Product Name' value={this.state.name} />} content="Product Name" position='left center' />
                            <Popup trigger={<Form.TextArea required name='description' placeholder='Description' value={this.state.description} />} content="Description" position='left center' />
                            <Popup trigger={<Form.Input fluid required icon='percent' iconPosition='left' name='abv' placeholder='ABV' value={this.state.abv} />} content="ABV" position='left center' />
                            <Popup trigger={<Form.Input fluid required icon='arrows alternate vertical' iconPosition='left' name='volume' placeholder='Volume' value={this.state.volume} />} content="Volume" position='left center' />
                            <Popup trigger={<Form.Dropdown fluid required name='style' selection placeholder='Style' options={this.styles()} value={this.state.style} onChange={this.handleSelect} />} content="Style" position='left center' />
                            <Popup trigger={<Form.Dropdown fluid required selection name='packaging' placeholder='Packaging' options={this.packaging()} value={this.state.packaging} onChange={this.handleSelect} />} content="Packaging" position='left center' />
                            <Popup trigger={<Form.Input fluid required icon='pound' iconPosition='left' name='price' placeholder='Price' value={this.state.price} />} content="Price" position='left center' />
                            <Popup trigger={<Form.Input fluid required icon='list ol' iconPosition='left' name='stock' placeholder='Stock' value={this.state.stock} />} content="Stock" position='left center' />

                            <ImageUpload image={this.state.image_url} setImage={this.setImage} />


                            {this.formValidation()
                                ?
                                <Button fluid size='large' content={this.props.btn} positive />
                                :
                                <Button fluid size='large' content={this.props.btn} disabled />
                            }
                        </Form>
                    </Grid.Column>
                    </Grid.Row>
                </Grid>
            </React.Fragment>
        )
    }
}