import { ErrorResponse } from '@apollo/client/link/error';
import { ApolloError } from '@apollo/client';

/**
 * Sanitizes a query error, returning a list of errors to be displayed.
 * @param error The query error.
 */
const getErrorsList = (
  error: ErrorResponse | ApolloError,
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
