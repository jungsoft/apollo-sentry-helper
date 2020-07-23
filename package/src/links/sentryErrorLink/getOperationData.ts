import { ErrorOperation, getOperationDataOptions } from '../../interfaces';

/**
 * Extracts operation data from the given error.
 */
const getOperationData = ({
  includeVariables,
  includeBody,
  error,
}: getOperationDataOptions): ErrorOperation => {
  const query = error?.operation?.query;

  const definition = query?.definitions?.[0];

  const operation: ErrorOperation = {
    name: error?.operation?.operationName,
    type: definition?.['operation'],
  };

  if (includeBody) {
    operation.body = query?.loc?.source?.body || '';
  }

  if (includeVariables) {
    operation.variables = JSON.stringify(error?.operation?.variables || {});
  }

  return operation;
};

export default getOperationData;
