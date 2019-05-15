import React from 'react'
import { Feed, Icon, Modal, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { API_BASE } from '../API'


export default class FeedItem extends React.Component {

    state = {
        liked: false
    }

    componentDidMount(){
        const liked = !!this.props.post.likes.find(like => like.user_id === this.props.user.id && like.liked === true)
        this.setState({...this.props.post, liked})
    }

    likeClick = () => {
        fetch(API_BASE + 'likes', {
            method: 'POST',
            headers: {'Content-type':'application/json'},
            body: JSON.stringify({post_id: this.state.id, user_id: this.props.user.id})})
            .then(resp => resp.json())
            .then(response => {
                if (response.errors) return
                this.setState({liked: response.liked, likes: response.likes})
            })
    }

    likeCount = () => {
        return this.state.likes.filter(like => like.liked).length
    }

    date = () => {
        const d = this.state.created_at
        return `${d.slice(8,10)}/${d.slice(5,7)}/${d.slice(0,4)}`
    }

    render(){
        if (this.state.brewery) return (
            <Feed.Event>
                <Feed.Label>
                    <img src={this.state.brewery.profile_img} style={{backgroundColor: 'white'}} alt={this.state.brewery.name + ' profile image.'}/>
                </Feed.Label>
                <Feed.Content>
                    <Feed.Summary>
                        <Feed.User as={Link} to={`/brewery/${this.state.brewery.id}`}>{this.state.brewery.name}</Feed.User> {this.state.title}
                        <Feed.Date>{this.date()}</Feed.Date>
                    </Feed.Summary>
                    <Feed.Extra text>
                        {this.state.content}
                    </Feed.Extra>
                    {(this.state.post_images.length > 0) &&
                        <Feed.Extra images>
                            {this.state.post_images.map(image => <Modal trigger={<img src={image.image_url} alt={this.state.brewery.name}/>} key={image.id} basic size='small'><Image src={image.image_url} /></Modal>)}
                        </Feed.Extra>
                    }
                    <Feed.Meta>
                        <Feed.Like onClick={this.likeClick}>
                            <Icon name='like' color={this.state.liked ? 'red' : null}/>
                            {this.likeCount()}{this.likeCount() === 1 ? ' like' : ' likes'}
                        </Feed.Like>
                    </Feed.Meta>
                </Feed.Content>
            </Feed.Event>
        )
        return <div></div>
    }
}