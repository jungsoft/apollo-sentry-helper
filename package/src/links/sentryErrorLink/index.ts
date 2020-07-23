import { onError } from 'apollo-link-error';

import { buildSentryErrorLinkOptions } from '../../interfaces';
import captureSentryException from './captureSentryException';
import defaultErrorFilter from './defaultErrorFilter';

/**
 * The error link that connects apollo-link-error with Sentry.
 *
 * This link will report GraphQL errors to Sentry, according to the settings mentioned.
 *
 * Network errors will be captured as only one exception, and graphQL errors will be split
 * as multiple exceptions, one for each graphQL error.
 *
 * Note that by default errors will only be reported if there was a network error, or if
 * the operation hasn't returned any data, meaning that the server processed the request,
 * but it was invalid. You can override this behavior by setting the "filter" option.
 */
const buildSentryErrorLink = ({
  filter = defaultErrorFilter,
  includeVariables = true,
  includeResponse = true,
  includeBody = true,
}: buildSentryErrorLinkOptions) => onError((error) => {
  const isValid = filter(error);

  if (!isValid) {
    return;
  }

  const exceptionData = {
    includeVariables,
    includeResponse,
    includeBody,
    error,
  };

  if (error?.networkError) {
    captureSentryException({
      ...exceptionData,
      extras: [
        {
          key: 'networkError',
          value: error?.networkError,
        },
      ],
    });

    return;
  }

  if (error?.graphQLErrors?.length) {
    const graphQLErrors = (error?.graphQLErrors || []).map((graphQLError) => ({
      message: graphQLError.message,
    }));

    graphQLErrors.forEach((graphQLError) => {
      captureSentryException({
        ...exceptionData,
        extras: [
          {
            key: 'graphQLError',
            value: graphQLError,
          },
        ],
      });
    });
  }
});

export default buildSentryErrorLink;
