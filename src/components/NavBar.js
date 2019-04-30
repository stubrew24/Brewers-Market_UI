import React from 'react';
import { Menu, Input, Dropdown, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

export default class NavBar extends React.Component {

    render() {
        const user = this.props.user
        return (
            <Menu fixed="top" color={'blue'} >
                <Menu.Item header  as={Link} to={'/'} >
                    Brewers Market
                </Menu.Item>

                    {user 
                        ?
                            <Menu.Menu position="right">
                                <Menu.Item>
                                    <Input placeholder="Search..." action={{ icon: 'search' }} value={this.props.search} onChange={this.props.setSearch} />
                                </Menu.Item>
                                
                                <Menu.Item as={Link} to={'/cart'} >
                                    <Icon name='cart' /><strong>{Object.keys(this.props.cart).length}</strong>
                                </Menu.Item>
                                
                                <Dropdown item text={`${user.first_name} ${user.last_name}`}>
                                    <Dropdown.Menu>
                                        <Dropdown.Item as={Link} to={'profile'} >My Details</Dropdown.Item>
                                        <Dropdown.Item as={Link} to={'orders'}>Orders</Dropdown.Item>
                                        <Dropdown.Item>Help</Dropdown.Item>
                                        <Dropdown.Item onClick={this.props.signOut} as={Link} to={'/'} >Sign out</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Menu.Menu> 
                        :
                            <Menu.Menu position="right">
                                <Menu.Item as={Link} to={'/signin'} >Sign In</Menu.Item>
                            </Menu.Menu>
                    } 
            </Menu>
        )
    }
}
