
export const handleApiError = (error) => {
  if (error.response) {
    // Server responded with error
    return error.response.data;
  } else if (error.request) {
    // Request made but no response
    return { message: 'No response from server' };
  } else {
    // Request setup error
    return { message: 'Error setting up request' };
  }
};