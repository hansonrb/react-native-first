import React from 'react';
import { StyleSheet, Text, View, Modal } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as projectsActions from '../actions/projects';
import SelectTabular from '../components/selectTabular';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 40,
    paddingBottom: 15,
  },
});

class SelectTabularView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedValue: '',
      modal: false,
    };
  }

  render() {
    const { projects, projectsActionsProps } = this.props;

    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Tabular</Text>
        <SelectTabular
          identifier="id"
          caption="name"
          loadOptions={(params, reset) => {
            projectsActionsProps.load(params, reset);
          }}
          options={projects.results}
          optionsStructure={[
            { key: 'name', caption: 'Name' },
            { key: 'description', caption: 'Description' },
            { key: 'client', caption: 'Client' },
            { key: 'locality', caption: 'Locality', sort: false },
            { key: 'type', caption: 'Type' },
            {
              key: 'street',
              caption: 'Street',
              renderer: item =>
                `${item.streetName || ''} ${item.streetNumber || ''}`,
              // cannot sort column with renderer
            },
          ]}
          total={projects.count}
          onChange={val => this.setState({ selectedValue: val })}
          value={this.state.selectedValue}
        />
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    projects: state.projects,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    projectsActionsProps: bindActionCreators(projectsActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectTabularView);
