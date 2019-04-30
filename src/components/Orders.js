import React from 'react'
import { Table, Header } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { API_BASE } from '../API';

export default class Orders extends React.Component {

    state = {
        orders: []
    }

    componentDidMount(){
        fetch(API_BASE + `users/${this.props.user.id}`)
            .then(resp => resp.json())
            .then(response => this.setState({orders: response.orders}))
    }

    render(){
        return(

            <React.Fragment>
                <Header textAlign='center' size='huge'>My Orders</Header>
                <Table>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Order Date</Table.HeaderCell>
                            <Table.HeaderCell>Order Number</Table.HeaderCell>
                            <Table.HeaderCell width={2}>Order Total</Table.HeaderCell>
                            <Table.HeaderCell width={2}>Order Status</Table.HeaderCell>
                            <Table.HeaderCell width={2}></Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                    {
                        this.state.orders.map(order => {
                            return (
                                <Table.Row>
                                    <Table.Cell>{`${order.created_at.slice(8,10)}/${order.created_at.slice(5,7)}/${order.created_at.slice(0,4)}`}</Table.Cell>
                                    <Table.Cell>{order.id}</Table.Cell>
                                    <Table.Cell>£{order.total.toFixed(2)}</Table.Cell>
                                    <Table.Cell>{order.status.charAt(0).toUpperCase() + order.status.slice(1,order.status.length)}</Table.Cell>
                                    <Table.Cell><Link to={`/order/${order.id}`}>Details</Link></Table.Cell>
                                </Table.Row>
                            )
                        })
                    }
                    </Table.Body>
                </Table>
            </React.Fragment>
        )
    }
}