import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default class HomeView extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Showcase</Text>
        <Button
          title="Tabular >"
          onPress={() => {
            this.props.navigation.navigate('Tabular');
          }}
        />
        <Button
          title="MultiColumn Selector >"
          onPress={() => {
            this.props.navigation.navigate('SelectTabular');
          }}
        />
        <Button
          title="Modal >"
          onPress={() => {
            this.props.navigation.navigate('Modal');
          }}
        />
        <Button
          title="GPS >"
          onPress={() => {
            this.props.navigation.navigate('GPS');
          }}
        />
        <Button
          title="TreeView >"
          onPress={() => {
            this.props.navigation.navigate('TreeView');
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  heading: {
    fontSize: 40,
    marginBottom: 20
  }
});
