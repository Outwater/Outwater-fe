import React from 'react';
import type { NextPage } from 'next';

import LoginForm from '../components/loginForm';
import Layout from '../components/Layout';
const LoginPage: NextPage = () => {
  return (
    <Layout>
      <LoginForm />
    </Layout>
  );
};

export default LoginPage;
