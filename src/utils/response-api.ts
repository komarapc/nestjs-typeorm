import { HttpStatus } from '@nestjs/common';

type ResponseApi<T = unknown, E = unknown> = {
  statusCode: number;
  statusMessage: string;
  message?: string;
  data?: T;
  error?: E;
};

type ResponsePayload<T> = {
  data?: T;
  message?: string;
};

type ResponseErrorPayload<E> = {
  error?: E;
  message?: string;
};

const HTTP_STATUS_MESSAGE: Record<number, string> = {
  [HttpStatus.OK]: 'OK',
  [HttpStatus.CREATED]: 'Created',
  [HttpStatus.BAD_REQUEST]: 'Bad Request',
  [HttpStatus.UNAUTHORIZED]: 'Unauthorized',
  [HttpStatus.FORBIDDEN]: 'Forbidden',
  [HttpStatus.NOT_FOUND]: 'Not Found',
  [HttpStatus.CONFLICT]: 'Conflict',
  [HttpStatus.INTERNAL_SERVER_ERROR]: 'Internal Server Error',
  [HttpStatus.SERVICE_UNAVAILABLE]: 'Service Unavailable',
  [HttpStatus.GATEWAY_TIMEOUT]: 'Gateway Timeout',
  [HttpStatus.TOO_MANY_REQUESTS]: 'Too Many Requests',
  [HttpStatus.NOT_IMPLEMENTED]: 'Not Implemented',
  [HttpStatus.NOT_ACCEPTABLE]: 'Not Acceptable',
  [HttpStatus.UNPROCESSABLE_ENTITY]: 'Unprocessable Entity',
  [HttpStatus.EXPECTATION_FAILED]: 'Expectation Failed',
  [HttpStatus.LOOP_DETECTED]: 'Loop Detected',
};

function buildResponse<T = unknown, E = unknown>(
  statusCode: number,
  payload?: ResponsePayload<T> | ResponseErrorPayload<E>,
  isError = false,
): ResponseApi<T, E> {
  const statusMessage = HTTP_STATUS_MESSAGE[statusCode] || 'Unknown Status';
  return {
    statusCode,
    statusMessage,
    message: payload?.message || statusMessage,
    ...(isError
      ? { error: (payload as ResponseErrorPayload<E>)?.error }
      : { data: (payload as ResponsePayload<T>)?.data }),
  };
}

// Factory to generate response functions for each status
function createResponse<T = unknown, E = unknown>(
  statusCode: number,
  isError = false,
) {
  return (payload?: ResponsePayload<T> | ResponseErrorPayload<E>) =>
    buildResponse<T, E>(statusCode, payload, isError);
}

// Success responses
export const responseOk = createResponse(HttpStatus.OK);
export const responseCreated = createResponse(HttpStatus.CREATED);

// Error responses
export const responseBadRequest = createResponse(HttpStatus.BAD_REQUEST, true);
export const responseUnauthorized = createResponse(
  HttpStatus.UNAUTHORIZED,
  true,
);
export const responseForbidden = createResponse(HttpStatus.FORBIDDEN, true);
export const responseNotFound = createResponse(HttpStatus.NOT_FOUND, true);
export const responseConflict = createResponse(HttpStatus.CONFLICT, true);
export const responseInternalServerError = createResponse(
  HttpStatus.INTERNAL_SERVER_ERROR,
  true,
);
export const responseServiceUnavailable = createResponse(
  HttpStatus.SERVICE_UNAVAILABLE,
  true,
);
export const responseGatewayTimeout = createResponse(
  HttpStatus.GATEWAY_TIMEOUT,
  true,
);
export const responseTooManyRequests = createResponse(
  HttpStatus.TOO_MANY_REQUESTS,
  true,
);
export const responseNotImplemented = createResponse(
  HttpStatus.NOT_IMPLEMENTED,
  true,
);
export const responseNotAcceptable = createResponse(
  HttpStatus.NOT_ACCEPTABLE,
  true,
);
export const responseUnprocessableEntity = createResponse(
  HttpStatus.UNPROCESSABLE_ENTITY,
  true,
);
export const responseExpectationFailed = createResponse(
  HttpStatus.EXPECTATION_FAILED,
  true,
);
export const responseLoopDetected = createResponse(
  HttpStatus.LOOP_DETECTED,
  true,
);

// Optionally, export the generic builder for custom responses
export { buildResponse };

export type { ResponseApi, ResponsePayload, ResponseErrorPayload };
