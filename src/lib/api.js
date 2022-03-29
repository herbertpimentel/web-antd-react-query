import { useMutation, useQueryClient } from 'react-query';

import { requestHelper } from './request-helper';

export const useLoginMutation = () => {
  return useMutation((params) =>
    requestHelper.post('/auth', {
      user: params.user,
      password: params.password,
    })
  );
};

export const useGetUsersQuery = () => {
  return useQueryClient(['users'], () => requestHelper.get('/users'));
};

export const useGetUserQuery = (id) => {
  return useQueryClient(['users', id], () =>
    requestHelper.get('/users', { id })
  );
};

export const useSaveUserMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (data) => {
      const id = (data || {}).id;
      const method = id ? 'put' : 'post';
      const url = id ? `/users/${id}` : '/users';

      return requestHelper[method](url, data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['users']);
      },
    }
  );
};
