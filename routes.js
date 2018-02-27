import React from 'react';
import { StackNavigator } from 'react-navigation';

import Home from './screens/home';
import Modal from './screens/modal';
import Tabular from './screens/tabular';
import SelectTabular from './screens/select-tabular';
import GPS from './screens/gps';
import TreeView from './screens/treeview';

const AppNavigator = StackNavigator({
  Home: { screen: Home },
  Modal: { screen: Modal },
  Tabular: { screen: Tabular },
  SelectTabular: { screen: SelectTabular },
  GPS: { screen: GPS },
  TreeView: { screen: TreeView }
});

export default AppNavigator;
