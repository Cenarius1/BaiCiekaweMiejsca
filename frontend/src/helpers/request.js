import * as tokenStore from '../infrastructure/tokenStore';

export const HTTP_METHOD = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE"
};

export const request = async (url, { method, headers, body }) => {
  const token = tokenStore.get();

  if (!headers)
    headers = {};

  if (token) {
    headers["Authorization"] = 'bearer ' + token;
  }

  headers["Content-Type"] = 'application/json';
  headers["Accept"] = 'application/json';

  if (!method)
    method = HTTP_METHOD.GET;

  if (method == HTTP_METHOD.GET) {
    if (body) {
      console.warning("HTTP GET performed with BODY available, removing BODY before send");
    }
    body = undefined;
  }

  const result = {
    success: true,
    message: undefined,
    data: undefined
  };

  try {
    const response = await fetch(url, {
      method: method,
      headers: headers,
      body: body
    });

    if (response.headers.get("content-type").indexOf("application/json") !== -1) {
      result.data = await response.json();
    } else {
      console.warning("HTTP Response doesn't contain JSON data, returning RAW string");
      result.data = await response.text();
    }
  }
  catch (err) {
    result.success = false;
    result.message = err.message;
    result.data = undefined;
  }

  return result;
};