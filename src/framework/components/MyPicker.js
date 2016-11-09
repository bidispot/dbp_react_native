import React, { Component } from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import { Container, Content, Header, Button, Title, List, ListItem } from 'native-base';
import _ from 'lodash';

class MyPicker extends Component {

  constructor(props) {
    super(props);

    this.state = {
      modalVisible: false,
      currentLabel: this.getLabel(props)
    };
  }

  componentWillReceiveProps(nextProps) {
    const currentLabel = this.state.currentLabel;
    const nextLabel = this.getLabel(nextProps);

    if (currentLabel !== nextLabel) {
      this.setState({
        currentLabel: nextLabel
      });
    }
  }

  setModalVisible(modalVisible) {
    this.setState({ modalVisible });
  }

  setCurrentLabel(currentLabel) {
    this.setState({ currentLabel });
  }

  getLabel(props) {
    const item = _.find(props.children, child => {
      return child.props.value === props.selectedValue;
    });
    return _.get(item, 'props.label');
  }

  renderHeader() {
    return (
      this.props.headerComponent) ? this.modifyHeader() : (
        <Header >
          <Button transparent onPress={() => { this.setModalVisible(false); }}>Back</Button>
          <Title>Select One</Title>
        </Header>
      );
  }

  render() {
    return (
      <View style={{ flex: 1, alignSelf: 'stretch', alignItems: 'flex-start' }}>
        <TouchableOpacity
          activeOpacity={0.5}
          style={this.props.style}
          onPress={() => { this.setModalVisible(true); }}
        ><Text style={this.props.textStyle}>{this.state.currentLabel}</Text>
        </TouchableOpacity>
        <Modal
          animationType='slide'
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => { this.setModalVisible(false); }}
        >
          <Container>
            {this.renderHeader()}
            <Content>
              <List
                dataArray={this.props.children}
                renderRow={(child) =>
                  <ListItem
                    style={{ paddingVertical: 5 }}
                    iconRight
                    button
                    onPress={() => {
                      this.setModalVisible(false);
                      this.props.onValueChange(child.props.value);
                      this.setCurrentLabel(child.props.label);
                    }}
                  >
                    <Text>{child.props.label}</Text>
                  </ListItem>
                }
              />
            </Content>
          </Container>
        </Modal>
      </View>
    );
  }

}

export { MyPicker };
