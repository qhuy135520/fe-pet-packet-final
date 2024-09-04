import queryString from "query-string";

export const sendRequest = async (props) => {
  let {
    url,
    method,
    body,
    queryParams = {},
    useCredentials = false,
    headers = {},
    nextOption = {},
  } = props;

  const options = {
    method: method,
    headers: new Headers({ "content-type": "application/json", ...headers }),
    body: body ? JSON.stringify(body) : null,
    ...nextOption,
  };

  if (useCredentials) options.credentials = "include";

  if (queryParams) {
    url = `${url}?${queryString.stringify(queryParams)}`;
  }

  return fetch(url, options).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return res.json().then((json) => {
        return {
          statusCode: res.status,
          message: json?.message ?? "",
          error: json?.error ?? "",
        };
      });
    }
  });
};

export const sendRequestFile = async (props) => {
  let {
    url,
    method,
    body,
    queryParams = {},
    useCredentials = false,
    headers = {},
    nextOption = {},
  } = props;

  const options = {
    method: method,
    headers: new Headers({ ...headers }),
    body: body ? body : null,
    ...nextOption,
  };

  if (useCredentials) options.credentials = "include";

  if (queryParams) {
    url = `${url}?${queryString.stringify(queryParams)}`;
  }

  return fetch(url, options).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return res.json().then((json) => {
        return {
          statusCode: res.status,
          message: json?.message ?? "",
          error: json?.error ?? "",
        };
      });
    }
  });
};
