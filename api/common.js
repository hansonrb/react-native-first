import axios from 'axios';

class GenericAuthenticatedApi {
  constructor(token) {
    this._client = axios.create({
      baseURL: 'http://119.81.112.90:8100/api/v1/project',
      headers: {
        Accept: 'application/json',
        Authorization: `Token e76d25663597d37764287cb574abafd161239dad`,
      },
    });
  }

  getAll(params) {
    return this._client.get('', { params: this._fetchParamsToQuery(params) });
  }

  create(params) {
    return this._client.post('', params);
  }

  update(params) {
    const update = Object.assign({}, params);
    delete update.id;
    return this._client.patch(`/${params.id}`, update);
  }

  remove(params) {
    return this._client.delete(`/${params.id}`);
  }

  _getBaseUrl() {
    throw new Error('This should be implemented');
  }

  _fetchParamsToQuery(params) {
    return {};
  }
}

export default GenericAuthenticatedApi;
