import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { StyleSheet, Text, View, Button, Modal, ListView } from 'react-native';

import * as projectsActions from '../actions/projects';

import Tabular from '../components/tabular';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  full: {
    flexGrow: 1,
  },
  heading: {
    fontSize: 40,
    marginTop: 30,
    paddingBottom: 15,
  },
});

class TabularView extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { projects, projectsActionsProps } = this.props;

    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Tabular</Text>
        <View style={styles.full}>
          <Tabular
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
          />
        </View>
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
  // i propose to use redux thunk
  return {
    projectsActionsProps: bindActionCreators(projectsActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TabularView);
