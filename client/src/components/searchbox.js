import React, { Component } from "react";
import { Panel } from "react-bootstrap";
import Searchform from "./searchform";

export default class Searchbox extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Panel bsStyle="primary">
        <Panel.Heading>
          <Panel.Title componentClass="h3">Search Parameters</Panel.Title>
        </Panel.Heading>
        <Panel.Body>
          <Searchform
            addScrapedDataToState={this.props.addScrapedDataToState}
          />
        </Panel.Body>
      </Panel>
    );
  }
}
