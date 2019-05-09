import React from 'react'
import { Card, Button, Image, Grid, List, Header, Segment, Item, Rating, Pagination } from 'semantic-ui-react'
import CardBar from './CardBar'
import { API_BASE } from '../API';
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'

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
            .then(product => this.setState({...product, activePage: 1}))
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
        const reviews = this.props.user.reviews.map(review => review.product_id)
        if (this.props.user.products.includes(this.state.id) && !reviews.includes(this.state.id)) {
            return true
        } else {
            return false
        }
    }

    reviewClick = () => {
        this.props.history.push(`/reviews/${this.state.id}`)
    }

    paginationClick = (e, data) => {
        this.setState({activePage: data.activePage})
    }

    displayReviews = () => {
        const ap = this.state.activePage * 5
        return this.state.reviews.slice(ap-5, ap)
    }

    render() {
        const { name, description, abv, volume, style, packaging, price, image_url, brewery} = this.state
        if ( this.state.id && this.props.user ) return (
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
                                            <Link to={`/brewery/${brewery.id}`}>{brewery.name}</Link>
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
                                            <strong>Rating: </strong> <Rating icon="star" rating={Math.round(this.state.weightedRating)} maxRating={5} disabled />
                                        </List.Item>
                                    </List>
                                </Card.Content>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                    { 
                        !this.props.user.brewery &&
                        <Card.Content extra>
                            <Button positive floated={'right'} onClick={this.handleAddToCart}>Add to Cart</Button>
                            {this.reviewButton() && <Button positive floated={'right'} onClick={this.reviewClick}>Review</Button>}
                        </Card.Content>
                    }
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
                                    this.displayReviews().map(review => {
                                        return (
                                            <Item key={review.id}>
                                                <Item.Image size='tiny' src={this.state.image_url} />
                                                <Item.Content>
                                                    <Item.Header><Rating icon="star" defaultRating={review.rating} maxRating={5} disabled /></Item.Header>
                                                    <Item.Meta>{review.reviewer}</Item.Meta>
                                                     <Item.Meta style={{fontSize:'0.7em'}}>{review.date}</Item.Meta>
                                                    <Item.Description>{review.comment}</Item.Description>
                                                </Item.Content>
                                            </Item>
                                        )
                                    })
                                    :
                                    'No reviews yet.'
                                }
                            </Item.Group>
                            <Pagination 
                                fluid 
                                defaultActivePage={1}
                                firstItem={null}
                                lastItem={null}
                                pointing
                                secondary
                                onPageChange={this.paginationClick}
                                totalPages={Math.ceil(this.state.reviews.length / 5)} 
                            />
                        </Segment>
                    </Grid.Column>
                </Grid>
            </React.Fragment>
        )
        return <div></div>
    }
}