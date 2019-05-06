import React from 'react';
import Hero from '../components/Hero'
import CardBar from '../components/CardBar'
import { Grid, Header } from 'semantic-ui-react';
import NewsFeed from '../components/NewsFeed';

export default class Landing extends React.Component {

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
                        <CardBar title="Trending" products={this.props.products.slice(0,4)} fetchProduct={()=>{}} perRow={4}  />
                        <CardBar title="Latest" products={[...this.props.products].reverse().slice(0,4)} fetchProduct={()=>{}} perRow={4}  />
                        <CardBar title="Top Rated" products={[...this.props.products].reverse().slice(4,8)} fetchProduct={()=>{}} perRow={4}  />
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
