import React, { Component } from "react";
import {
  Checkbox,
  Radio,
  ControlLabel,
  FormGroup,
  FormControl,
  Button,
  HelpBlock
} from "react-bootstrap";

import axios from "axios";

function FieldGroup({ id, label, help, ...props }) {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
}

export default class Searchform extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchterm: "",
      numberOfRecords: "",
      startYear: "",
      endYear: ""
    };
    this.onTextChange = this.onTextChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }
  // this.state is a JS object, so the notation is {searchterm: "somevalue"}
  // In JSX(in render() ), we pass key value pairs like this: placeholder="SomeValue" name="David"

  onTextChange(event) {
    // [event.target.name]:
    // console.log(event.target.name);
    // console.log(event.target.value);

    this.setState({
      [event.target.name]: event.target.value
    });
  }

  onFormSubmit(e) {
    e.preventDefault();
    let formData = {
      searchterm: this.state.searchterm,
      numberOfRecords: this.state.numberOfRecords,
      startYear: this.state.startYear,
      endYear: this.state.endYear
    };

    // let url = `http://localhost:3001/news?searchterm=${formData.searchterm}`
    let url = `http://localhost:3001/news?`;
    url += `searchterm=${formData.searchterm}&`;
    url += `numofrecords=${formData.numberOfRecords}&`;
    url += `startyear=${formData.startYear}&`;
    url += `endyear=${formData.endYear}`;

    axios(url).then(res => {
      console.log(res.data.results);
      this.props.addScrapedDataToState(res.data.results);
    });
  }

  render() {
    return (
      <div>
        <form>
          <FieldGroup
            id="formControlsText"
            type="text"
            label="Search Term"
            value={this.state.searchterm}
            placeholder="Enter Search Term Here"
            name="searchterm"
            onChange={this.onTextChange}
          />
          <FieldGroup
            id="formControlsText"
            type="text"
            label="Number of Records to Retrieve"
            value={this.state.numberOfRecords}
            placeholder="Enter Number of records to retrieve"
            name="numberOfRecords"
            onChange={this.onTextChange}
          />
          <FieldGroup
            id="formControlsText"
            type="text"
            label="Start Year(Optional)"
            value={this.state.startYear}
            placeholder="Enter Start year"
            name="startYear"
            onChange={this.onTextChange}
          />
          <FieldGroup
            id="formControlsText"
            type="text"
            label="End Year(Optional)"
            value={this.state.endYear}
            placeholder="Enter End Year"
            name="endYear"
            onChange={this.onTextChange}
          />

          <Button type="submit" onClick={this.onFormSubmit}>
            Search
          </Button>
          <Button type="submit">Clear Results</Button>
        </form>
      </div>
    );
  }
}
