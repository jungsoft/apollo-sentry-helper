import { ErrorResponse } from 'apollo-link-error';

/**
 * Sanitizes a query error, returning a list of errors to be displayed.
 * @param error The query error.
 */
const getErrorsList = (
  error: ErrorResponse,
) => {
  if (error?.networkError) {
    return ['Network Error'];
  }

  const graphQLErrors = (
    error?.graphQLErrors
    || (
      Array.isArray(error)
        ? error
        : []
    )
  ) || [];

  if (!Array.isArray(graphQLErrors)) {
    return [];
  }

  return graphQLErrors.map((graphQLError) => (
    `${graphQLError?.message}\n`
  ));
};

export default getErrorsList;
