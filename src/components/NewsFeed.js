import React from 'react'
import { Feed, Pagination } from 'semantic-ui-react'
import { API_BASE } from '../API';
import FeedItem from './FeedItem'

export default class NewsFeed extends React.Component {

    state = {
        posts: [],
        activePage: 1
    }

    componentDidMount(){
        if (this.props.user){
        fetch(API_BASE + 'posts')
            .then(resp => resp.json())
            .then(posts => this.setState({posts: this.postFilter(posts)}))
        }
    }

    postFilter = postsArr => {
        if (this.props.brewery) {
            return postsArr.filter(post => post.brewery.id === this.props.brewery)    
        } else if (this.props.user.breweries) {
            return postsArr.filter(post => this.props.user.breweries.find(brewery => brewery.id === post.brewery.id))  
        } else {
            return postsArr
        }
    }

    displayPosts = () => {
        const ap = this.state.activePage * 5
        return this.state.posts.slice(ap-5, ap)
    }

    paginationClick = (e,data) => {
        this.setState({activePage: data.activePage})
        window.scrollTo(0, 260)
    }

    render() {
        if (this.state.posts.length > 0) return (
            <React.Fragment>
                <Feed size='large'>
                    {this.displayPosts().map(post => <FeedItem key={post.id} post={post} user={this.props.user} />)}
                </Feed>
                <Pagination 
                    fluid 
                    defaultActivePage={1}
                    firstItem={null}
                    lastItem={null}
                    pointing
                    secondary
                    onPageChange={this.paginationClick}
                    totalPages={Math.ceil(this.state.posts.length / 5)} 
                />
            </React.Fragment>
        )
        return (

            <p>Nothing to see here, yet...</p>
        )
    }
}
