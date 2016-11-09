import { normalize } from 'normalizr';
import _ from 'lodash';
import axios from 'axios';
import Symbol from 'es6-symbol';

const ROOT_URL = 'https://dbpgo.herokuapp.com';

/**
 * Removes (sub-)properties with null or undefined values from a given JSON object
 * @param  {object} jsonObject  A JSON object with some potentially null or 
 * underfined (sub-)properties
 * @returns {object}            A new JSON object where (sub-)properties with 
 * undefined or null values have been
 *                                removed.
 */
function filterNil(jsonObject) {
  return _.omitBy(jsonObject, _.isNil);
}

/**
 * Executes an HTTP GET request on the given endpoint
 * @param {string} endpoint   The URL to send the request to
 * @param {object} parameters Optional JSON object representing the query string parameters
 * @param {object} schema     The schema to normalize the response to
 * @returns {Promise}         The promise backing the request
 */
function callGet(endpoint, parameters, schema) {
  const queryParams = filterNil(parameters);
  const url = `${ROOT_URL}/${endpoint}`;

  let request;
  if (queryParams === null) {
    request = axios.get(url);
  } else {
    request = axios.get(url, {
      params: queryParams
    });
  }

  return new Promise((resolve, reject) => {
    request
      .then(response => ({ json: response.data, response }))
      .then(({ json }) => {
        resolve(normalize(json, schema));
      }).catch(error => {
        const message = error.response ? error.response.data : error.message;
        reject({ message });
      });
  });
}

// Defines the property that actions need to have in order to be handled by the middleware
export const API_CALL_INFO = Symbol('API Call Info');

// Middleware that interprets actions with API_CALL_INFO property specified
export default store => next => action => {
  // Get the action's API call info property
  const apiCallInfo = action[API_CALL_INFO];

  // Don't do anything if there is no API call info, i.e. call next dispatch method
  if (typeof apiCallInfo === 'undefined') {
    return next(action);
  }

  // Get the different API call elements
  const { endpoint, parameters, schema, actionTypes } = apiCallInfo;

  // Validate given elements
  if (typeof endpoint !== 'string') {
    throw new Error('Specify a string endpoint URL.');
  }
  if (!schema) {
    throw new Error('Specify one of the exported Schemas');
  }
  if (!Array.isArray(actionTypes) || actionTypes.length !== 3) {
    throw new Error('Expected an array of three action types.');
  }
  if (!actionTypes.every(type => typeof type === 'string')) {
    throw new Error('Expected action types to be strings.');
  }

  // Define function that builds new action with the given mutations
  function actionWith(mutations) {
    const newAction = Object.assign({}, action, mutations);
    delete newAction[API_CALL_INFO]; // remove API call info property
    return newAction;
  }

  const [requestType, successType, failureType] = actionTypes;

  // Dispatch "start request" action
  next(actionWith({ parameters, type: requestType }));

  return callGet(endpoint, parameters, schema).then(
    response => {
      // Dispatch "success" action
      return next(actionWith({
        parameters,
        response,
        type: successType
      }));
    },
    error => {
      // Dispatch "failure" action
      return next(actionWith({
        parameters,
        errorMessage: error.message || 'Unexpected error',
        type: failureType,
      }));
    }
  );
};
