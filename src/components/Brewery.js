import React from "react";
import { Grid, Header, Image, Button } from "semantic-ui-react";
import { API_BASE } from "../API";
import CardBar from "./CardBar";
import NewsFeed from "./NewsFeed";

export default class Brewery extends React.Component {
  componentDidMount() {
fetch(API_BASE + `breweries/${this.props.match.params.id}`)
      .then(resp => resp.json())
      .then(response => this.setState({ ...response }));
  }

  products = () => {
    const prods = this.props.products.filter(
      product => product.brewery.id === this.state.id
    );
    return prods;
  };

	followClick = () => {
		fetch(API_BASE + `user_breweries`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        user_id: this.props.user.id,
        brewery_id: this.state.id
      })
    })
      .then(resp => resp.json())
      .then(response => {
        if (response.errors) return;
        this.props.getUser();
      });
  };

  render() {
    if (this.state.id && this.props.user)
      return (
        <Grid textAlign="center">
          <Grid.Row>
            <Grid.Column style={{ maxWidth: "70%" }}>
              {this.props.user.breweries.filter(
                brewery => brewery.id === this.state.id
              ).length > 0 ? (
                <Button floated={"right"} negative onClick={this.followClick}>
                  Unfollow
                </Button>
              ) : (
                <Button floated={"right"} positive onClick={this.followClick}>
                  Follow
                </Button>
              )}
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column style={{ maxWidth: "70%" }}>
              <Header as="h1" icon textAlign="center">
                <Image
                  centered
                  src={this.state.profile_img}
                  circular
                  style={{ backgroundColor: "white" }}
                />
                <Header.Content>{this.state.name}</Header.Content>
                <Header.Subheader>{this.state.bio}</Header.Subheader>
              </Header>

              <CardBar
                title="Top Rated"
                products={[...this.products().slice(0, 4)]}
                fetchProduct={() => {}}
                perRow={4}
              />

              <Header>Recent Updates</Header>
              <NewsFeed user={this.props.user} brewery={this.state.id} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      );
    return <div />;
  }
}
