export type ErrorCode =
  | 'INVALID_DATA'
  | 'INCORRECT_CREDENTIALS'
  | 'NO_SUCH_ENTITY'
  | 'NOT_YOURS'
  | 'NOT_AUTHENTICATED'
  | 'DUPLICATE_EMAIL'
  | 'DUPLICATE_USERNAME'
  | 'INTERNAL_ERROR';

export type APIErrorCommon = {
  code: ErrorCode;
};

export class AppError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

export type APIError = APIErrorCommon;

// export type APIError = APIErrorCommon | (APIErrorCommon & { extra: ZodIssue[] });
