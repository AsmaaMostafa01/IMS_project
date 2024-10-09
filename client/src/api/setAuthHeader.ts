/* eslint-disable class-methods-use-this */
import axios from 'axios';

/**
 * This method to set auth header for each HTTP request
 */
const setAuthHeader = (token: string) => {
  if (token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
<<<<<<< HEAD
  } else {
=======
  }
  else {
>>>>>>> 7837fcc238be675b0eae11776801ea2e4c180f5c
    delete axios.defaults.headers.common.Authorization;
  }
};

export default setAuthHeader;
