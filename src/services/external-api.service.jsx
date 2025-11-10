import axios from "axios";

export const callExternalAPI = async (options) => {
  try {
    // Delegate to axios so individual services only need to provide config objects.
    const response = await axios(options.config);
    const { data } = response;
    return {
      data,
      error: null,
    };
  } catch (error) {
    let message = "http request failed";

    if (axios.isAxiosError(error)) {
      const axiosError = error;
      const { response } = axiosError;
      // Normalize error messaging coming from Axios so callers have a consistent shape.
      if (response && response.statusText) {
        message = response.statusText;
      }

      if (axiosError.message) {
        message = axiosError.message;
      }

      if (response && response.data && response.data.message) {
        message = response.data.message;
      }
    } else if (error instanceof Error) {
      message = error.message;
    }

    return {
      data: null,
      error: {
        message,
      },
    };
  }
};

export default callExternalAPI;
