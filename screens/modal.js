import React from 'react';
import { StyleSheet, Text, View, Button, Modal, ListView } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  innerContainer: {
    alignItems: 'center',
  },
  full: {
    flexGrow: 1,
  },
  heading: {
    fontSize: 40,
    paddingBottom: 15,
  },
});

export default class ModalView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    };
  }

  onPressShowModal() {
    this.setState({ showModal: true });
  }

  closeModal() {
    this.setState({ showModal: false });
  }

  render() {
    const { showModal } = this.state;

    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Modal</Text>
        <View style={styles.full}>
          <Button
            onPress={() => this.onPressShowModal()}
            title="Show Modal"
            color="#5cb85c"
            accessibilityLabel="Show modal"
            style={styles.button}
          />
        </View>
        <Modal
          visible={this.state.showModal}
          animationType={'slide'}
          onRequestClose={() => this.closeModal()}
        >
          <View style={styles.modalContainer}>
            <View style={styles.innerContainer}>
              <Text>This is content inside of modal component</Text>
              <Button onPress={() => this.closeModal()} title="Close modal" />
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}
