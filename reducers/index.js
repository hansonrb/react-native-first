import { combineReducers } from 'redux';

import navigation from './navigation';
import projects from './projects';

export default combineReducers({
  nav: navigation,
  projects,
});
