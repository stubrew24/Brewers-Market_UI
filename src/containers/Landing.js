import React from 'react';
import Hero from '../components/Hero'
import CardBar from '../components/CardBar'
import { Grid, Header } from 'semantic-ui-react';
import NewsFeed from '../components/NewsFeed';

export default class Landing extends React.Component {

  componentDidMount(){
    this.background()
  }

  background(){
      document.body.style.background = "#C6FFDD"
      document.body.style.background = "-webkit-linear-gradient(to right, #f7797d, #FBD786, #C6FFDD)"
      document.body.style.background = "linear-gradient(to right, #f7797d, #FBD786, #C6FFDD)"
  }
  topRated = () => {
    return this.props.products.sort((a,b) => b.weightedRating - a.weightedRating)
  }

  trending = () => {
    return this.props.products.filter(product => product.trending.slice(0,4).includes(product.id))
  }

  render(){
    return (
        <React.Fragment>
          <Hero setFilter={this.props.setFilter} /> <br />
            <Grid>
                {
                  this.props.filter.value
                  ? 
                    <Grid.Column>
                      <CardBar title={this.props.filter.type === 'search' ? `Search results: ${this.props.filter.value || 'everything'}` : this.props.filter.value} products={this.props.products} fetchProduct={()=>{}} />
                    </Grid.Column>
                  :
                    <React.Fragment>
                      <Grid.Column width={11}>
                        <CardBar title="Trending" products={this.trending()} fetchProduct={()=>{}} perRow={4}  />
                        <CardBar title="Latest" products={[...this.props.products].reverse().slice(0,4)} fetchProduct={()=>{}} perRow={4}  />
                        <CardBar title="Top Rated" products={this.topRated().slice(0,4)} fetchProduct={()=>{}} perRow={4}  />
                      </Grid.Column>
                      <Grid.Column width={5}>
                        <Header>Brewery Updates</Header>
                        <NewsFeed user={this.props.user} limit={10} />
                      </Grid.Column>
                    </React.Fragment>
                }
            </Grid>
        </React.Fragment>
    )
  }
}
