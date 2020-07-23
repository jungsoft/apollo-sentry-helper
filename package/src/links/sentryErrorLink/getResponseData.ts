import { getResponseDataOptions } from '../../interfaces';

/**
 * Extracts response data from the given error.
 */
const getResponseData = ({
  error,
}: getResponseDataOptions) => {
  if (!error?.response) {
    return null;
  }

  let responseData;

  try {
    responseData = JSON.stringify(error?.response);
  } catch {
    responseData = error?.response;
  }

  return responseData;
};

export default getResponseData;
