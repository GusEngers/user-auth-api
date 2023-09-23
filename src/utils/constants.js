module.exports = {
  METHODS: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  HEADER_TOKEN: 'Token',
  HEADER_API_KEY: 'Api-Key',
  STATUS_ACTIVE: 'active',
  STATUS_INACTIVE: 'inactive',
  get LINKS_API() {
    return [
      {
        path: '/api/auth',
        headers: [this.HEADER_API_KEY, this.HEADER_TOKEN],
        methods: [this.METHODS[1]],
      },
      {
        path: '/api/auth/register',
        headers: [this.HEADER_API_KEY],
        methods: [this.METHODS[1]],
      },
      {
        path: '/api/auth/login',
        headers: [this.HEADER_API_KEY],
        methods: [this.METHODS[1]],
      },
      {
        path: '/api/user/:id',
        headers: [this.HEADER_API_KEY],
        params: ['id'],
        methods: [this.METHODS[0], this.METHODS[3]],
      },
    ];
  },
};
