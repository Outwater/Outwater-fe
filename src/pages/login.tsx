import React, { useEffect } from 'react';
import type { NextPage } from 'next';

import LoginForm from '../components/loginForm';
import Layout from '../components/Layout';
import { useRouter } from 'next/router';
import useUser from '../hooks/useUser';

const LoginPage: NextPage = () => {
  const router = useRouter();
  const { userInfo } = useUser();

  useEffect(() => {
    if (userInfo?.accessToken) {
      router.push('/');
    }
  }, [userInfo]);

  return (
    <Layout>
      <LoginForm />
    </Layout>
  );
};

export default LoginPage;
