import { ApolloError } from '@apollo/client';
import { ErrorResponse } from '@apollo/client/link/error';

import getErrorsList from './getErrorsList';

/**
 * Sanitizes a query error, returning the error messages to be displayed.
 * @param error The query error.
 */
const getErrorMessage = (
  error: ErrorResponse | ApolloError,
) => {
  const errors = getErrorsList(error);

  return errors.join('\r\n');
};

export default getErrorMessage;
