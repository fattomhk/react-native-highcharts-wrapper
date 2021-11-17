import React from 'react';
import { StyleSheet, View } from 'react-native';
import HighchartsReactNative from 'react-native-highcharts-webview';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      chartOptions: {
        series: [
          {
            data: [1, 2, 3],
          },
        ],
      },
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <HighchartsReactNative
          useCDN={true}
          useSSL={true}
          styles={styles.container}
          options={this.state.chartOptions}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    flex: 1,
  },
});
