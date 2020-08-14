import { ErrorResponse } from 'apollo-link-error';

import getErrorsList from './getErrorsList';

/**
 * Sanitizes a query error, returning the error messages to be displayed.
 * @param error The query error.
 */
const getErrorMessage = (
  error: ErrorResponse,
) => {
  const errors = getErrorsList(error);

  return errors.join('\r\n');
};

export default getErrorMessage;
