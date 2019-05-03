import React from 'react'
import { Card, Button, Image, Grid, List, Header, Segment, Item, Rating } from 'semantic-ui-react'
import CardBar from './CardBar'
import { API_BASE } from '../API';
import { toast } from 'react-toastify';

export default class ProductPage extends React.Component {

    state = {
        id: 0,
        name: '', 
        description: '', 
        abv: 0, 
        volume: 0, 
        style: '', 
        packaging: '', 
        price: 0, 
        stock: 0,
        image_url: '', 
        brewery: {},
        reviews: [],
        productRating: 0
    }

    componentDidMount(){
        this.fetchProduct(this.props.match.params.id)
    }

    fetchProduct = (id) => {
        fetch(API_BASE + `products/${id}`)
            .then(resp => resp.json())
            .then(product => this.setState({...product}))
    }

    moreProducts = () => {
        return this.props.products.filter(product => {
            return (product.brewery.id === this.state.brewery.id) && (product.id !== this.state.id)
        })
    }

    handleAddToCart = () => {
        if (this.props.cart[this.state.id] >= this.state.stock){
            toast.error('Stock level exceeded.', {containerId: 'messages'}) 
        } else {
            this.props.addToCart(this.state.id)
            toast.success('Added to cart.', {containerId: 'messages'}) 
        }
    }

    reviewButton = () => {
        if (this.props.user.products.map(product => product.id).includes(this.state.id)) {
            return true
        } else {
            return false
        }
    }

    reviewClick = () => {
        this.props.history.push(`/reviews/${this.state.id}`)
    }

    render() {
        console.log(this.state.productRating)
        const { name, description, abv, volume, style, packaging, price, image_url, brewery} = this.state
        if ( this.state.id) return (
            <React.Fragment>
                <Card fluid>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column width={8}>
                                <Image size='large' src={image_url} style={{padding:'1em'}} />
                            </Grid.Column>
                            <Grid.Column width={8}>
                            
                                <Card.Header style={{fontSize:'2.5em', padding:'1em'}}>{name}</Card.Header>
                                <Card.Description style={{padding:'1em'}}>
                                    <div>
                                        <Header>
                                            {brewery.name}
                                        </Header>
                                    {brewery.location}
                                    </div>
                                    <br />
                                    <p>{description}</p>
                                </Card.Description>
                                <Card.Content >
                                    <List style={{padding:'1em'}}>
                                        <List.Item style={{lineHeight: '2'}}>
                                            <strong>ABV: </strong> {abv.toFixed(1)}%
                                        </List.Item>
                                        <List.Item style={{lineHeight: '2'}}>
                                            <strong>Volume: </strong> {volume}ml
                                        </List.Item>
                                        <List.Item style={{lineHeight: '2'}}>
                                            <strong>Packaging: </strong> {packaging}
                                        </List.Item>
                                        <List.Item style={{lineHeight: '2'}}>
                                            <strong>Style: </strong> {style}
                                        </List.Item>
                                        <List.Item style={{lineHeight: '2'}}>
                                            <strong>Price: </strong> £{price.toFixed(2)}
                                        </List.Item>
                                        <List.Item style={{lineHeight: '2'}}>
                                            <strong>Rating: </strong> <Rating icon="star" rating={this.state.productRating} maxRating={5} disabled />
                                        </List.Item>
                                    </List>
                                </Card.Content>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                    <Card.Content extra>
                        <Button positive floated={'right'} onClick={this.handleAddToCart}>Add to Cart</Button>
                        {this.reviewButton() && <Button positive floated={'right'} onClick={this.reviewClick}>Review</Button>}
                    </Card.Content>
                </Card>
                <Grid>
                    <Grid.Column width={10}>
                        <CardBar title={`More from ${brewery.name}`} products={this.moreProducts().slice(0,3)} fetchProduct={this.fetchProduct} perRow={3} />
                    </Grid.Column>
                    <Grid.Column width={6}>
                        <Header>Reviews</Header>
                        <Segment>
                            <Item.Group>
                                {this.state.reviews.length > 0 ? 
                                    this.state.reviews.map(review => {
                                        return (
                                            <Item key={review.id}>
                                                <Item.Image size='tiny' src={this.state.image_url} />
                                                <Item.Content>
                                                    <Item.Header><Rating icon="star" defaultRating={review.rating} maxRating={5} disabled /></Item.Header>
                                                    <Item.Meta>{review.reviewer}</Item.Meta>
                                                    <Item.Description>{review.comment}</Item.Description>
                                                </Item.Content>
                                            </Item>
                                        )
                                    })
                                    :
                                    'No reviews yet.'
                                }
                            </Item.Group>
                        </Segment>
                    </Grid.Column>
                </Grid>
            </React.Fragment>
        )
        return <div></div>
    }
}