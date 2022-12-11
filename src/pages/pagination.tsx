import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import type { NextPage } from 'next';
import styled from 'styled-components';

import { Product } from '../types/product';
import { request } from '../api/request';
import Layout from '../components/Layout';
import ProductList from '../components/ProductList';
import Pagination from '../components/Pagination';

const PaginationPage: NextPage = () => {
  const router = useRouter();
  const page = router.query.page as string;

  const [products, setProducts] = useState<Product[]>([]);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      if (!page) return;
      try {
        const { data } = await request(`/products?page=${page}&size=10`);
        setProducts(data.products);
        setTotalCount(data.totalCount);
      } catch (err: any) {
        err.name === 'NotFound' && router.push('/404');
      }
    };
    fetchProducts();
  }, [page]);

  if (products.length === 0) return <div>Loading..</div>;
  return (
    <Layout>
      <Container>
        <ProductList products={products} />
        <Pagination totalCount={totalCount} />
      </Container>
    </Layout>
  );
};

export default PaginationPage;

const Container = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 20px 40px;
`;
