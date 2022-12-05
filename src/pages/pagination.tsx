import React from 'react';
import { useRouter } from 'next/router';
import type { NextPage } from 'next';
import styled from 'styled-components';

import products from '../api/data/products.json';
import ProductList from '../components/ProductList';
import Pagination from '../components/Pagination';
import Layout from '../components/Layout';

const PaginationPage: NextPage = () => {
  const router = useRouter();
  const { page } = router.query;

  return (
    <Layout>
      <Container>
        <ProductList products={products.slice(0, 10)} />
        <Pagination />
      </Container>
    </Layout>
  );
};

export default PaginationPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 20px 40px;
`;
