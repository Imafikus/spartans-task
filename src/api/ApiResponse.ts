import { Response } from "express";

export interface ApiResponse {
  status: number;
  payload: unknown;
}

export const Statuses = {
  ok: 200,
  created: 201,
  accepted: 202,

  badRequest: 400,
  unauthorized: 401,
  forbidden: 403,
  notFound: 404,
  notAllowed: 405,

  internalServerError: 500,
  serviceUnavailable: 503
};

export const InvalidReqStructureResponse: ApiResponse = {
  status: Statuses.unauthorized,
  payload: { error: 'invalid request structure' }
}

export const InvalidReqContentResponse: ApiResponse = {
  status: Statuses.unauthorized, 
  payload: { error: 'invalid request content' }
};

export const InternalServerErrorResponse: ApiResponse = {
  status: Statuses.internalServerError,
  payload: { error: 'internal server error' }
};

export const sendResponse = (res: Response, apiRes: ApiResponse): void => {
  res.status(apiRes.status).send(apiRes.payload);
};
