import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import type { NextPage } from 'next';

import useUser from '../hooks/useUser';
import LoginForm from '../components/loginForm';
import Layout from '../components/Layout';

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
