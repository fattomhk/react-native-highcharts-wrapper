# react-native-highcharts-webview
Highcharts react native wrapper, fork from [HighCharts](https://github.com/highcharts/highcharts-react-native).
## Platforms
[x] iOS
[x] Android
[ ] Web

## Prerequisites
- expo `>=43.0.3`, we are using the `Asset` and `FileSystem` packages
- react-native-webview

## Installation
### Install dependencies
```sh
yarn add react-native-highcharts-webview
yarn add expo
```

### Extra steps for bare react native projects
1. follow the setup guide of [Expo](https://docs.expo.dev/bare/installing-expo-modules/)
2. Add permissions to Android manifest
```html
<!-- Added permissions -->
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.INTERNET" />
```

### Edit metro.config.js
```javascript
const path = require('path');
const blacklist = require('metro-config/src/defaults/blacklist');
const escape = require('escape-string-regexp');
const pak = require('../package.json');
const { getDefaultConfig } = require('metro-config'); // <-- add this

const root = path.resolve(__dirname, '..');

const modules = Object.keys({
  ...pak.peerDependencies,
});

module.exports = (async () => {
    //<------add this
  const {
    resolver: { sourceExts, assetExts },
  } = await getDefaultConfig();
   //</add this-------->

  return {
    projectRoot: __dirname,
    watchFolders: [root],
    resolver: {
      blacklistRE: blacklist(
        modules.map(
          (m) =>
            new RegExp(`^${escape(path.join(root, 'node_modules', m))}\\/.*$`)
        )
      ),
      sourceExts, ///<------add this
      extraNodeModules: modules.reduce((acc, name) => {
        acc[name] = path.join(__dirname, 'node_modules', name);
        return acc;
      }, {}),
      assetExts: [...assetExts, 'hcscript'], ///<------add this
    },
    transformer: {
      getTransformOptions: async () => ({
        transform: {
          experimentalImportSupport: false,
          inlineRequires: true,
        },
      }),
    },
  };
})();

```

## Try it
### iOS
```sh
yarn example ios
```

### Android
```sh
yarn example android
```

## Example
```js
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
          styles={styles.container}
          options={this.state.chartOptions}
        />
      </View>
    );
  }
}
```

## Options details
Available properties:
```jsx
  <HighchartsReact
    styles={styles}
    webviewStyles={webviewStyles}
    options={this.state.chartOptions}
    modules={modules}
    callback={chartCallback}
    useSSL={true}
    useCDN={true} // or string 'mydomain.com/highchartsfiles/'
    data={'Data to be stored as global variable in Webview'}
    onMessage={message => this.onMessage(message)}
    loader={ true }
    devPort={'xxx.xxx.xxx.xxx:xxxxx'} // i.e 192.168.0.1:12345
    setOptions={highchartsGlobalOptions}
  />
```

| Parameter | Type | Required | Description |
| --------- | :----: | :--------: | ----------- |
| `styles` | Object | no | You can style your container using JavaScript like in the regular react and react native. |
| `options` | Object | yes | Highcharts chart configuration object. Please refer to the Highcharts [API documentation](https://api.highcharts.com/highcharts/). This option is required. |
| `modules` | Array | no | List of modules which should be added to Highcharts. I.e when you would like to setup `solidgauge` series which requires `highcharts-more` and `solid-gauge` files, you should declare array: `const modules = ['solid-gauge']` |
| `callback` | Function | no | A callback function for the created chart. First argument for the function will hold the created `chart`. Default `this` in the function points to the `chart`. This option is optional. |
| `useCDN` | Boolean | no | Set the flag as true, if you would like to load files (i.e highcharts.js) from CDN instead of local file system. You can declare an url to your domain (i.e `mydomain.com/highchartsfiles/`) |
| `useSSL` | Boolean | no | Set the flag as true, if you would like to load files (i.e highcharts.js) by SSL. (The useCDN flag is mandatory). |
| `data` | any | no | Data to be stored as global variable in Webview. |
| `onMessage` | Function | no | Global communication between Webview and App. The function takes the message as the first argument. |
| `loader` | Boolean | no | Set the flag to `true`, if you would like to show loader while chart is loading. |
| `webviewStyles` | Object | no | You can style your webview using JavaScript object structured like in the regular React and React Native apps. |
| `webviewProps` | Object | no | You can pass webview props. |
| `setOptions` | Object | no | Options which are set for Highcharts through `Highcharts.setOptions()` method. Usually it is used to set the `global` and `lang` options. For more details please visit [Highcharts documentation](https://api.highcharts.com/class-reference/Highcharts#.setOptions), and [API](https://api.highcharts.com/highcharts/global). |
| `devPort` | String | no | When using EXPO in DEV mode, you may declare address and port to actually load the html file in Android. You cannot use built-in `file:///` when using Expo,because the Android and iOS folders don’t exist yet. When it’s in STAGING or PROD skip this option and use default the `file:///android_asset` path. |

## License
See the [License file](LICENSE)

## Remarks

## Changelog
### 0.1
- Init forking from official package
- modify folder structure and dependencies
- update highcharts files to version `9.3.1`
