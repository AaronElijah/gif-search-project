import React, { Component } from "react";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import Gif from "./Gif";

export default class Popup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shouldOpen: props.url ? true : false,
    };
  }

  handleClose = () => {
    this.setState({
      shouldOpen: false,
    });
  };

  componentDidUpdate(prevProps) {
    if (prevProps.url != this.props.url && !this.state.shouldOpen) {
      this.setState({ shouldOpen: true });
    }
  }

  render() {
    return (
      <Dialog onClose={this.handleClose} open={this.state.shouldOpen}>
        <DialogTitle>Your random gif!</DialogTitle>
        <Gif url={this.props.url} />
      </Dialog>
    );
  }
}
