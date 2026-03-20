type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface RequestConfig {
  method: HttpMethod;
  endpoint: `/api/${string}`;  // Must start with /api/
}

const config: RequestConfig = {
  method: 'GET',
  endpoint: '/api/users'  // ✅
};

const bad: RequestConfig = {
  method: 'GETS', // error
  endpoint: 'api/users' // Error - missing leading slash
};
