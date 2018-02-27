import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Modal,
  TouchableOpacity,
} from 'react-native';
import Triangle from 'react-native-triangle';
import Tabular from '../tabular';

const styles = StyleSheet.create({
  dropdownBox: {
    width: 200,
    height: 50,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#cccccc',
  },
  absoluteRight: {
    position: 'absolute',
    right: 15,
    top: 20,
  },
});

export default class SelectTabular extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: null,
      isOpen: false,
    };
  }

  closeModal() {
    this.setState({ isOpen: false });
  }

  render() {
    const { identifier, caption, value } = this.props;
    const { isOpen, selected } = this.state;

    return (
      <View>
        <TouchableOpacity
          onPress={() => this.setState({ isOpen: true })}
          style={styles.dropdownBox}
        >
          <Text
            style={{
              overflow: 'hidden',
              paddingTop: 15,
              paddingRight: 20,
              flex: 1,
            }}
            numberOfLines={1}
          >
            {selected && selected[caption]}
          </Text>
          <View style={styles.absoluteRight}>
            <Triangle
              width={15}
              height={10}
              color={'#c0eaff'}
              direction={isOpen ? 'up' : 'down'}
            />
          </View>
        </TouchableOpacity>
        <Modal
          visible={isOpen}
          animationType={'slide'}
          onRequestClose={() => this.closeModal()}
        >
          <View
            style={{
              paddingTop: 50,
              flex: 1,
              flexGrow: 1,
              position: 'relative',
            }}
          >
            <View style={{ position: 'absolute', top: 20, right: 10 }}>
              <Button title={'Close'} onPress={() => this.closeModal()} />
            </View>
            <Tabular
              loadOptions={this.props.loadOptions}
              options={this.props.options}
              optionsStructure={this.props.optionsStructure}
              pagination={this.props.pagination}
              sorting={this.props.sorting}
              filtering={this.props.filtering}
              total={this.props.total}
              onClickRow={(item, e) => {
                this.setState({ selected: item, isOpen: false });
                this.props.onChange(item[identifier]);
              }}
              customRowStyle={item =>
                cn({ selected: item[identifier] === value })
              }
            />
          </View>
        </Modal>
      </View>
    );
  }
}

SelectTabular.propTypes = {
  identifier: PropTypes.string.isRequired,
  caption: PropTypes.string.isRequired,

  value: PropTypes.string,

  loadOptions: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  optionsStructure: PropTypes.arrayOf(PropTypes.object).isRequired,
  className: PropTypes.string,
  pagination: PropTypes.bool,
  sorting: PropTypes.bool,
  filtering: PropTypes.bool,
  total: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

SelectTabular.defaultProps = {
  pagination: true,
  sorting: true,
  filtering: true,
  className: null,
  value: '',
};
