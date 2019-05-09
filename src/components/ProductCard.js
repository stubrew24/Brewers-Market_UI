import React from 'react'
import { Link } from 'react-router-dom'
import { Card, Image, Rating } from 'semantic-ui-react'

export default class ProductCard extends React.Component{
    render(){
        const {id, brewery, name, image_url, weightedRating} = this.props.beer
        return (
            <Card  >
                <Image src={image_url} as={Link} to={`/product/${id}`} onClick={() => { this.props.fetchProduct(id) }} style={{padding:'0.5em', backgroundColor:'white'}} />
                <Card.Content>
                    <Rating icon="star" rating={Math.round(weightedRating)} maxRating={5} disabled /><br /><br />
                    <Card.Header as={Link} to={`/product/${id}`} onClick={() => { this.props.fetchProduct(id) }}>{name}</Card.Header>
                    <Card.Meta><Link to={`/brewery/${brewery.id}`}>{brewery.name}</Link></Card.Meta>
                </Card.Content>
            </Card>
        )
    }
}