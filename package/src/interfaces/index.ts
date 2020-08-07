import { ErrorResponse } from '@apollo/client/link/error';

/**
 * Defines options for buildSentryErrorLink.
 */
export interface buildSentryErrorLinkOptions {
  /**
   * Defines if variables are going to be included in the error report.
   */
  includeVariables?: boolean;

  /**
   * Defines if the operation body should be included in the error report.
   */
  includeBody?: boolean;

  /**
   * Defines if the operation response should be included in the error report.
   */
  includeResponse?: boolean;

  /**
   * Filters if the error should be reported to Sentry.
   */
  filter?: (error: ErrorResponse) => boolean;
}

export interface getOperationDataOptions {
  includeVariables: boolean;
  includeBody: boolean;
  error: ErrorResponse;
}

export interface getResponseDataOptions {
  error: ErrorResponse;
}

export interface ExceptionExtraInformation {
  key: string;
  value: any;
}

export interface captureSentryExceptionOptions {
  extras: Array<ExceptionExtraInformation>;
  error: ErrorResponse;
  title?: string;
  includeVariables: boolean;
  includeResponse: boolean;
  includeBody: boolean;
}

export interface ErrorOperation {
  /**
   * JSON data containing variables information.
   */
  variables?: string;

  /**
   * Operation type.
   */
  type: string;

  /**
   * Operation name.
   */
  name: string;

  /**
   * Operation body.
   */
  body?: string;
}
