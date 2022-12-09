interface ResponseInterface {
  statusCode: number;
  headers: Object;
  body: string;
}

const defaultHeaders = {
  'Access-Control-Allow-Methods': '*',
  'Access-Control-Allow-Headers': '*',
  'Access-Control-Allow-Origin': '*',
};

const errorResponse = (
  err: Error,
  statusCode: number = 500,
): ResponseInterface => {
  return {
    statusCode,
    headers: {
      ...defaultHeaders,
    },
    body: JSON.stringify({ message: err.message || 'Unknown Error' }),
  };
};

const successResponse = <T = Object>(
  body: T,
  statusCode: number = 200,
): ResponseInterface => {
  return {
    statusCode,
    headers: {
      ...defaultHeaders,
    },
    body: JSON.stringify(body),
  };
};

export { errorResponse, successResponse, ResponseInterface };
