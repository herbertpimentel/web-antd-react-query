/* eslint-disable no-prototype-builtins */
import axios from 'axios';
import * as fileSaver from 'file-saver';

import { SESSION_TOKEN_KEY } from '../constants';

const api = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
});

api.interceptors.response.use(
  (response) => {
    if (!response) {
      return response;
    }

    return response.data;
  },
  function (error) {
    const errorMessage = extractErrorMessage(error);

    // Redirect when banned user
    if (error?.response?.status === 403) {
      sessionStorage.removeItem(SESSION_TOKEN_KEY);
      return Promise.reject(errorMessage);
    }

    // Do something with response error
    if (error?.response?.status === 401) {
      sessionStorage.removeItem(SESSION_TOKEN_KEY);
      if (window && window.location && window.location.href) {
        window.location.href = '/login';
      }
    }

    return Promise.reject(errorMessage);
  }
);

function buildRequestHeaders() {
  const data = sessionStorage.getItem(SESSION_TOKEN_KEY);

  if (!data || !data.token) {
    return {};
  }

  return {
    headers: { Authorization: `Bearer ${data.token}` },
  };
}

function getFormData(data) {
  const formData = new FormData();
  if (!data) {
    return formData;
  }

  const keys = Object.keys(data);

  if (!(keys && keys.length)) {
    return formData;
  }

  for (const key of keys) {
    formData.append(key, data[key]);
  }

  return formData;
}

function extractErrorMessage(err) {
  if (typeof err === 'string') {
    return err;
  }

  return err.message;
}

function throwFriendlyErrorMessage(err) {
  throw new Error(extractErrorMessage(err));
}

export const requestHelper = {
  baseURL: process.env.BACKEND_URL,
  buildRequestHeaders,

  post: async function (route, payload = {}, config = {}) {
    try {
      const headers = buildRequestHeaders();

      const response = await api.post(route, payload, {
        ...headers,
        ...config,
      });
      return response.data;
    } catch (err) {
      throwFriendlyErrorMessage(err);
    }
  },

  get: async function (route, params = null, config = {}) {
    try {
      const headers = await buildRequestHeaders();

      const response = await api.get(route, {
        params,
        ...headers,
        ...config,
      });

      return response.data;
    } catch (err) {
      throwFriendlyErrorMessage(err);
    }
  },

  delete: async function (route, params = null, config = {}, data = null) {
    try {
      const headers = await buildRequestHeaders();

      const options = {
        params,
        ...headers,
        ...config,
      };

      if (data) {
        options['data'] = data;
      }

      const response = await api.delete(route, options);

      return response.data;
    } catch (err) {
      throwFriendlyErrorMessage(err);
    }
  },

  put: async function (route, payload = null, config = {}) {
    try {
      const headers = await buildRequestHeaders();

      const response = await api.put(route, payload, { ...headers, ...config });
      return response.data;
    } catch (err) {
      throwFriendlyErrorMessage(err);
    }
  },

  upload: async function (route, payload = null, config = {}) {
    try {
      const httpConfig = await buildRequestHeaders();

      const { headers } = httpConfig;

      const formData = getFormData(payload);

      const response = await api.post(route, formData, {
        headers: {
          ...headers,
          'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
        },
        ...config,
      });

      return response.data;
    } catch (err) {
      throwFriendlyErrorMessage(err);
    }
  },

  download: async function (route, params = null, config = {}) {
    const mimeType = config.mimeType || 'application/octet-stream';
    let fileName = config.fileName || 'download.file';

    if (config.extension) {
      fileName = `${fileName}.${config.extension}`;
    }

    const headers = await buildRequestHeaders();

    return new Promise((resolve, reject) => {
      return api
        .get(route, {
          params,
          ...headers,
          responseType: 'blob',
        })
        .then((response) => {
          const blob = new Blob([response?.data], { type: mimeType });
          fileSaver.saveAs(blob, fileName);
          resolve(true);
        })
        .catch((err) => {
          reject(extractErrorMessage(err));
        });
    });
  },
};
