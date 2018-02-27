import GenericAuthenticatedApi from './common';

class ProjectsApi extends GenericAuthenticatedApi {
	_getBaseUrl() {
		return '/api/v1/project';
	}

	loadMore(params) {
		let queries = {};
		if (params) {
			queries.page = params.currentPage || 1;
			queries.search = params.filter || '';
			queries.ordering = `${
				params.sort === 'desc' ? '-' : ''
			}${params.sortby || ''}`;
		} else {
			queries.page = 1;
		}

		return this._client.get('', { params: queries });
	}
}

export default ProjectsApi;
