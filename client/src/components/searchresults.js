import React, { Component } from "react";
import { Panel, Well } from "react-bootstrap";

// If author is not present use "PRESS"

export default class Searchresults extends Component {
  makeArticle(article) {
    return (
      <Well>
        <a href={article.link}>
          <h4>{article.title}</h4>
        </a>
      </Well>
    );
  }
  render() {
    return (
      <Panel bsStyle="primary">
        <Panel.Heading>
          <Panel.Title componentClass="h3">Top Articles</Panel.Title>
        </Panel.Heading>
        <Panel.Body>
          {this.props.articles.map(article => this.makeArticle(article))}
        </Panel.Body>
      </Panel>
    );
  }
}
