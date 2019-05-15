import React from 'react'
import {Grid, Header,Form, Segment, Item, Rating, Button } from 'semantic-ui-react'
import { API_BASE } from '../API'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';

export default class Review extends React.Component {

    state = {
        product: {
            id: 0,
            name: '',
            description: '',
            image_url: ''
        },
        review: {
            user_id: 0,
            product_id: 0,
            rating: 0,
            comment: ''
        }
    }

    componentDidMount(){
        fetch(API_BASE + `products/${this.props.match.params.id}`)
            .then(resp => resp.json())
            .then(product => this.setState({product, review: {...this.state.review, product_id: product.id, user_id: this.props.user.id}}))
    }

    formValidation = () => {
        const {rating, comment} = this.state.review
        if (!rating || !comment){
            return false
        } else {
            return true
        }
    }

    handleSubmit = () => {
        fetch(API_BASE + 'reviews', {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(this.state.review)})
            .then(resp => resp.json())
            .then(review => {
                if(review.error){
                    toast.error(review.error, {containerId: 'messages'})
                } else {
                    this.props.refreshData()
                    this.props.history.push(`/product/${this.state.product.id}`)
                }
            })
    }


    setRating = (event, data) => {
        this.setState({review: {...this.state.review, rating: data.rating}})
    }

    setComment = e => {
        this.setState({review: {...this.state.review, comment: e.target.value}})
    }

    render(){
        return(
            <React.Fragment>

                <Grid textAlign='center'>

                    <Grid.Row>
                        <Grid.Column style={{ maxWidth: 600 }}>

                            <Header as='h2' textAlign='center'>
                                <Header.Content>Add a Review</Header.Content>
                            </Header>

                            <Segment>
                                <Item>
                                    <Item.Image size='tiny' src={this.state.product.image_url} />
                                    <Item.Content>
                                        <Item.Header as={Link} to={`/product/${this.state.product.id}`}>{this.state.product.name}</Item.Header>
                                        <Item.Description>
                                            {this.state.product.description}
                                        </Item.Description>
                                    </Item.Content>
                                </Item>
                            </Segment>

                            <Form onSubmit={this.handleSubmit}>
                                <br />
                                <Rating maxRating={5} icon='star' size='massive' onRate={this.setRating} />
                                <br /><br />
                                <Form.TextArea required name='content' placeholder='Review' onChange={this.setComment} value={this.state.review.comment} />


                                {this.formValidation()
                                    ?
                                    <Button fluid size='large' content='Add Review' positive />
                                    :
                                    <Button fluid size='large' content='Add Review' disabled />
                                }
                            </Form>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </React.Fragment>
        )
    }
}