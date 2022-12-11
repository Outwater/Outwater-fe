import React from 'react';
import type { NextPage } from 'next';
import Layout from '../components/Layout';
import styled from 'styled-components';

const NotFound: NextPage = () => {
  return (
    <Layout>
      <Container>
        <Text>존재하지 않는 페이지 입니다.</Text>
      </Container>
    </Layout>
  );
};

export default NotFound;

const Container = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  margin-top: 40px;
`;

const Text = styled.div`
  font-size: 32px;
  font-weight: 700;
`;
