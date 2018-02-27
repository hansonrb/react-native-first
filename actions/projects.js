import * as types from './types';
import ProjectsApi from '../api/projects';
import { wrapAuthenticatedApiCall } from './common';

export function load(params, reset) {
	return wrapAuthenticatedApiCall(
		api => api.loadMore(params),
		(dispatch, res) =>
			dispatch({
				type: reset
					? types.RELOAD_PROJECTS_SUCCESS
					: types.LOAD_PROJECTS_SUCCESS,
				payload: res.data,
			}),
		ProjectsApi,
	);
}
