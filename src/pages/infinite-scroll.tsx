import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import type { NextPage } from 'next';
import styled from 'styled-components';

import { Product } from '../types/product';
import { request } from '../api/request';
import useIntersection from '../hooks/useInterection';
import ProductList from '../components/ProductList';
import Layout from '../components/Layout';

const InfiniteScrollPage: NextPage = () => {
  const router = useRouter();

  const [products, setProducts] = useState<Product[]>([]);
  const [totalCnt, setTotalCnt] = useState<Number | null>(null);
  const [page, setPage] = useState(1);
  const ITEM_COUNT_PER_FETCH = 16;

  const fetchMoreRef = useRef<HTMLDivElement | null>(null);
  const intersecting = useIntersection(fetchMoreRef);

  useEffect(() => {
    if (intersecting) {
      fetchMore();
    }
  }, [intersecting]);

  const fetchMore = () => {
    if (totalCnt === products.length) {
      alert('모든 상품을 불러왔습니다!');
      return;
    }

    const fetchProducts = async (page: number, size: number) => {
      try {
        const { data } = await request(`/products?page=${page}&size=${size}`);
        const newProducts = [...products, ...data.products];
        setProducts(newProducts);
        setTotalCnt(data.totalCount);
      } catch (err: any) {
        err.name === 'NotFound' && router.push('/404');
      }
    };
    fetchProducts(page, ITEM_COUNT_PER_FETCH);
    setPage((page) => page + 1);
  };

  return (
    <Layout>
      <Container>
        <ProductList products={products} />
        <FetchMore ref={fetchMoreRef} />
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

const FetchMore = styled.div`
  visibility: hidden;
`;
