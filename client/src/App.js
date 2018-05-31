import React, { Component } from "react";
import Searchbox from "./components/searchbox";
import Searchresults from "./components/searchresults";
import { Well } from "react-bootstrap";

const styles = {
  wrapper: {
    width: "60%",
    margin: "0 auto"
  }
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: []
    };

    this.addScrapedDataToState = this.addScrapedDataToState.bind(this);
  }

  addScrapedDataToState(scrapedData) {
    this.setState({
      articles: scrapedData
    });
  }

  render() {
    return (
      <div className="App">
        <div className="wrapper" style={styles.wrapper}>
          <Well
            bsSize="lg"
            style={{
              background: "#1E2C50",
              color: "white",
              fontSize: "5em",
              fontWeight: "bold",
              textAlign: "center",
              height: "300px"
            }}
          >
            <div style={{ marginTop: "100px" }}>New York Times Search</div>
          </Well>
          <Searchbox addScrapedDataToState={this.addScrapedDataToState} />
          <Searchresults articles={this.state.articles} />
        </div>
      </div>
    );
  }
}

export default App;
