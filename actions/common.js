/* eslint new-cap: "off" */
export function wrapAuthenticatedApiCall(
  apiCall,
  processResult,
  apiConstructor = null,
  processError = null,
) {
  return (dispatch, getState) => {
    const state = getState();

    let promise;
    if (apiConstructor) {
      const api = new apiConstructor();
      promise = apiCall(api);
    } else {
      promise = apiCall(state);
    }
    return promise.then(res => processResult(dispatch, res)).catch(err => {
      console.log(err);
    });
  };
}
