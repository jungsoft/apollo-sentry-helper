import * as Sentry from '@sentry/browser';

import { captureSentryExceptionOptions } from '../../interfaces';
import getOperationData from './getOperationData';
import getResponseData from './getResponseData';

/**
 * Captures an exception to Sentry.
 * @param param0 Options
 */
const captureSentryException = ({
  includeVariables,
  includeResponse,
  includeBody,
  extras,
  title,
  error,
}: captureSentryExceptionOptions) => {
  Sentry.withScope((scope: Sentry.Scope) => {
    if (error?.operation) {
      const operationData = getOperationData({
        includeVariables,
        includeBody,
        error,
      });

      scope.setExtra('operation', operationData);
    }

    if (includeResponse) {
      const responseData = getResponseData({
        error,
      });

      scope.setExtra('response', responseData);
    }

    if (extras?.length) {
      extras.forEach((extra) => {
        scope.setExtra(extra.key, extra.value);
      });
    }

    let errorTitle = 'GraphQL Error';

    if (title) {
      errorTitle += `: ${title}`;
    }

    Sentry.captureException(new Error(errorTitle));
  });
};

export default captureSentryException;
