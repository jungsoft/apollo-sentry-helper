import { ErrorResponse } from 'apollo-link-error';

/**
 * The default error filter.
 *
 * Errors will only be reported if there was a network error, or if the operation
 * hasn't returned any data, meaning that the server processed the request,
 * but it was invalid.
 *
 * You can override this behavior by setting the "filter" option.
 * @param error The error.
 */
const defaultErrorFilter = (error: ErrorResponse) => {
  if (error?.networkError) {
    return true;
  }

  if (error?.graphQLErrors?.length && !error?.response?.data) {
    return true;
  }

  return false;
};

export default defaultErrorFilter;
