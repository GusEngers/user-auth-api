module.exports = {
  METHODS: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  HEADER_TOKEN: 'X-Authorization-Token',
  HEADER_API_KEY: 'X-Authorization-Api-Key',
  STATUS_ACTIVE: 'active',
  STATUS_INACTIVE: 'inactive',
  get LINKS_API() {
    return [
      {
        path: '/api/auth',
        headers: { POST: [this.HEADER_API_KEY, this.HEADER_TOKEN] },
        methods: [this.METHODS[1]],
      },
      {
        path: '/api/auth/register',
        headers: { POST: [this.HEADER_API_KEY] },
        methods: [this.METHODS[1]],
      },
      {
        path: '/api/auth/login',
        headers: { POST: [this.HEADER_API_KEY] },
        methods: [this.METHODS[1]],
      },
      {
        path: '/api/user/:id',
        headers: {
          GET: [this.HEADER_API_KEY],
          DELETE: [this.HEADER_API_KEY, this.HEADER_TOKEN],
        },
        params: ['id'],
        methods: [this.METHODS[0], this.METHODS[3]],
      },
      {
        path: '/api/user/:id/change/data',
        headers: {
          PUT: [this.HEADER_API_KEY, this.HEADER_TOKEN],
        },
        params: ['id'],
        methods: [this.METHODS[2]],
      },
      {
        path: '/api/user/:id/change/email',
        headers: {
          PUT: [this.HEADER_API_KEY, this.HEADER_TOKEN],
        },
        params: ['id'],
        methods: [this.METHODS[2]],
      },
      {
        path: '/api/user/:id/change/password',
        headers: {
          PUT: [this.HEADER_API_KEY, this.HEADER_TOKEN],
        },
        params: ['id'],
        methods: [this.METHODS[2]],
      },
    ];
  },
};
