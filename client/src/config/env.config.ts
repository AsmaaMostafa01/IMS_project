const vars = new Map();

if (process.env.VITE_BACKEND_BASE_URL) {
  vars.set('backendBaseUrl', process.env.VITE_BACKEND_BASE_URL);
<<<<<<< HEAD
} else if (import.meta.env.VITE_BACKEND_BASE_URL) {
  vars.set('backendBaseUrl', import.meta.env.VITE_BACKEND_BASE_URL);
} else {
  vars.set('backendBaseUrl', 'http://0.0.0.0:5000/api/v1');
=======
}
else if (import.meta.env.VITE_BACKEND_BASE_URL) {
  vars.set('backendBaseUrl', import.meta.env.VITE_BACKEND_BASE_URL);
}
else {
  vars.set('backendBaseUrl', 'http://localhost:5000/api/v1');
>>>>>>> 7837fcc238be675b0eae11776801ea2e4c180f5c
}

if (process.env.PUBLIC_URL) {
  vars.set('public', process.env.PUBLIC_URL);
<<<<<<< HEAD
} else if (import.meta.env.PUBLIC_URL) {
  vars.set('public', import.meta.env.PUBLIC_URL);
} else {
=======
}
else if (import.meta.env.PUBLIC_URL) {
  vars.set('public', import.meta.env.PUBLIC_URL);
}
else {
>>>>>>> 7837fcc238be675b0eae11776801ea2e4c180f5c
  vars.set('public', 'public');
}

vars.set('authTokenName', 'COCA_USER_TOKEN');
vars.set('projectName', 'Corelia cyber security');

export default vars;
