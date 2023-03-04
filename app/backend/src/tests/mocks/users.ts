export const usersObjects = {
  admin: {
    validAdmin: {
      id: 1,
      username: 'Admin',
      role: 'admin',
      email: 'admin@admin.com',
      password: 'secret_admin',
    },
    invalidAdmin: {
      id: 1,
      username: 'Admin',
      role: 'undefined',
      email: 'admin@xablau.com',
      password: 'senha_invalida',
    },
  },
  user: {
    validUser: {
      id: 2,
      username: 'User',
      role: 'user',
      email: 'user@user.com',
      password: 'secret_user',
    },
    invalidUser: {
      id: 2,
      username: 'User',
      role: 'undefined',
      email: 'user@xablau.com',
      password: 'senha_invalida',
    },
    invalidEmailUsers: [
      {
        id: 3,
        username: 'User',
        role: 'user',
        email: '@user.com',
        password: 'secret_user',
      },
      {
        id: 2,
        username: 'User',
        role: 'user',
        email: 'user@.com',
        password: 'secret_user',
      },
      {
        id: 2,
        username: 'User',
        role: 'user',
        email: 'user@user',
        password: 'secret_user',
      },
    ],
    invalidPasswordUsers: [
       {
        id: 4,
        username: 'User',
        role: 'user',
        email: 'invalid.user@user.com',
        password: '12345',
      }
    ]
  },
  usersToLogin: [
    {
      id: 1,
      username: 'Admin',
      role: 'admin',
      email: 'admin@admin.com',
      password: 'secret_admin',
    }, {
      id: 2,
      username: 'User',
      role: 'user',
      email: 'user@user.com',
      password: 'secret_user',
    },
  ]
};

export const tokenMock = {
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsInBhc3N3b3JkIjoic2VjcmV0X2FkbWluIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjc3ODcxMjc3LCJleHAiOjE2Nzg0NzYwNzd9.4knjA_xCYOsPviCtHWpZgS29cuLRiaDmvAyb_EEV8JI'
}

export const invalidEmailOrPasswordMessage = {
  message: 'Invalid email or password'
}