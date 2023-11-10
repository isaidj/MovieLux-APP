
This is the patch issue and can be resolved by just replacing few lines of code:

check if you have installed deprecated-react-native-prop-types package if not run the below command first.

yarn add deprecated-react-native-prop-types

inside node_modules/react-native/index.js

replace these functions with the below lines

// Deprecated Prop Types
get ColorPropType(): $FlowFixMe {
  return require('deprecated-react-native-prop-types').ColorPropType;
},

get EdgeInsetsPropType(): $FlowFixMe {
  return require('deprecated-react-native-prop-types').EdgeInsetsPropType;
},

get PointPropType(): $FlowFixMe {
  return require('deprecated-react-native-prop-types').PointPropType;
},

get ViewPropTypes(): $FlowFixMe {
  return require('deprecated-react-native-prop-types').ViewPropTypes;
},