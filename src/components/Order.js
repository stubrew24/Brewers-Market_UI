import React from 'react'
import { Item, Step, Icon, Segment, Grid, Header, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { API_BASE } from '../API';

export default class Orders extends React.Component {

    state = {
        order: {}
    }

    componentDidMount(){
        fetch(API_BASE + `orders/${this.props.match.params.id}`)
            .then(resp => resp.json())
            .then(order => this.setState({order}))
    }

    render(){

        const {total, delivery, status, products, user} = this.state.order
        if (this.state.order.id) return(
            <React.Fragment>
                <Step.Group fluid>
                    <Step active={status === 'open'}>
                        <Icon name='thumbs up' />
                        <Step.Content>
                            <Step.Title>Order Placed</Step.Title>
                        </Step.Content>
                    </Step>

                    <Step disabled>
                        <Icon name='box' />
                        <Step.Content>
                            <Step.Title>Preparing</Step.Title>
                        </Step.Content>
                    </Step>

                    <Step disabled>
                        <Icon name='truck' />
                        <Step.Content>
                            <Step.Title>Shipping</Step.Title>
                        </Step.Content>
                    </Step>

                    <Step disabled>
                        <Icon name='check' />
                        <Step.Content>
                            <Step.Title>Complete</Step.Title>
                        </Step.Content>
                    </Step>
                </Step.Group>

                <Segment>

                    <Item.Group>
                        <Item>
                            <Item.Content>
                                <Item.Header>Order Details</Item.Header>
                                <Item.Description>
                                    <Grid style={{borderBottom: '1px solid rgba(0,0,0,0.1'}}>
                                        <Grid.Row>
                                            <Grid.Column width={8}>
                                                Delivery Address: <br />
                                                    {user.address_line_1}<br />
                                                    {user.address_line_2}<br />
                                                    {user.city}<br />
                                                    {user.postcode}
                                            </Grid.Column>
                                            <Grid.Column width={8}>
                                                <Item>
                                                    <Item.Content>
                                                        <Item.Description>
                                                            <p>Subtotal: £{(total - delivery).toFixed(2)}</p>
                                                            <p>Shipping: £{delivery.toFixed(2)}</p>
                                                        </Item.Description>
                                                        <Header>Order Total: £{total.toFixed(2)}</Header>
                                                    </Item.Content>
                                                </Item>
                                            </Grid.Column>
                                        </Grid.Row>
                                    </Grid>
                                        

                                </Item.Description>
                            </Item.Content>
                        </Item>
                        {products.map(product => {
                            return (
                                <Item style={{paddingTop:'2em'}}>
                                    <Item.Image size='tiny' src={product.image_url} />
                                    <Item.Content>
                                        <Item.Header>{product.name}</Item.Header>
                                        <Item.Meta>{product.brewery_name}</Item.Meta>
                                        <Item.Description>
                                            Amount: {product.qty}<br />
                                            Price: £{(product.price * product.qty).toFixed(2)}
                                        </Item.Description>
                                    </Item.Content>
                                </Item>
                            )
                        })
                    }
                    </Item.Group>
                </Segment>
                <Button as={Link} to={'/orders'} basic inverted>Back to Orders</Button>
            </React.Fragment>
        )
        return(<div></div>)
    }
}