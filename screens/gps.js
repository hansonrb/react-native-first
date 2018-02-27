import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default class GPS extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pos: null,
      err: null
    };
  }

  componentDidMount() {
    const _self = this;

    try {
      this.watchId = navigator.geolocation.watchPosition(
        pos => {
          console.log(pos);
          _self.setState({ pos });
        },
        err => {
          _self.setState({ err });
        },
        {
          enableHighAccuracy: false,
          timeout: 5000,
          maximumAge: 0
        }
      );

      navigator.geolocation.getCurrentPosition(
        pos => {
          console.log(pos);
          _self.setState({ pos });
        },
        err => {
          _self.setState({ err });
        },
        {
          enableHighAccuracy: false,
          timeout: 5000,
          maximumAge: 0
        }
      );

      console.log(this.watchId);
    } catch (e) {
      console.log(e);
    }
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchId);
  }

  render() {
    const { pos, err } = this.state;

    console.log(pos, err);

    return (
      <View style={styles.container}>
        <Text style={styles.heading}>GPS</Text>
        {err && <Text>{err.message}</Text>}
        {pos && (
          <View>
            <Text>Latitude: {pos.coords.latitude}</Text>
            <Text>Longitude: {pos.coords.longitude}</Text>
            <Text>Altitude: {pos.coords.altitude}</Text>
            <Text>Heading: {pos.coords.heading}</Text>
            <Text>Speed: {pos.coords.speed}</Text>
          </View>
        )}
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
