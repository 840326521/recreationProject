import React, { Component } from "react";
import { ScrollView, View } from "@tarojs/components";
import "./index.less";

export default class extends Component<{
  text: string;
  isShow: boolean;
  onClose: () => void;
}> {
  state: {
    top: number
  }
  constructor(props: { text: string; isShow: boolean; onClose: () => void; }) {
    super(props)
    this.state = {
      top: 0
    }
  }

  componentDidUpdate({ isShow }) {
    if (isShow) {
      this.setState({ top: Math.random() })
    }
  }

  render() {
    const { text, isShow, onClose } = this.props
    return (
      <View
        className="modal-box"
        style={{ display: `${isShow ? "block" : "none"}` }}
        catchMove={true}
      >
        <View
          className="modal-box-bg"
          onClick={onClose}
        />
        <ScrollView className="modal-box-content" scrollTop={this.state.top}>
          <View dangerouslySetInnerHTML={{ __html: text }} />
        </ScrollView>
      </View>
    );
  }
}
