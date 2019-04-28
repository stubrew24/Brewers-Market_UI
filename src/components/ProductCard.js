import React from 'react'
import { Link } from 'react-router-dom'
import { Card, Image, Header } from 'semantic-ui-react'

export default class ProductCard extends React.Component{
    render(){
        const {id, brewery, name, style, image_url} = this.props.beer
        return (
            <Card as={Link} to={`/product/${id}`} onClick={() => this.props.fetchProduct(id)} >
                <Image src={image_url}/>
                <Card.Content>
                    <Header>{name}</Header>
                    <p>{brewery.name}</p>
                </Card.Content>
                <Card.Content extra>
                    {style}
                </Card.Content>
            </Card>
        )
    }
}