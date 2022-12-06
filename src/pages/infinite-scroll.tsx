import React from 'react';
import type { NextPage } from 'next';
import styled from 'styled-components';

import products from '../api/data/products.json';
import ProductList from '../components/ProductList';
import Layout from '../components/Layout';

const InfiniteScrollPage: NextPage = () => {
  return (
    <Layout>
      <Container>
        <ProductList products={products} />
      </Container>
    </Layout>
  );
};

export default InfiniteScrollPage;

const Container = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 20px 40px;
`;
