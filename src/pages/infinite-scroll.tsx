import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import type { NextPage } from 'next';
import styled from 'styled-components';

import { Product } from '../types/product';
import { request } from '../api/request';
import useStorage from '../hooks/useStorage';
import useIntersection from '../hooks/useInterection';
import ProductList from '../components/ProductList';
import Layout from '../components/Layout';

const ITEM_COUNT_PER_FETCH = 16;

const InfiniteScrollPage: NextPage = () => {
  const router = useRouter();
  const { getItem, setItem } = useStorage('session');

  const [page, setPage] = useState(0);
  const [products, setProducts] = useState<Product[]>([]);
  const [isFirstFetched, setFirstFetch] = useState(false);
  const [isLastPage, setIsLastPage] = useState(false);

  const fetchMoreRef = useRef<HTMLDivElement | null>(null);
  const intersecting = useIntersection(fetchMoreRef);

  useEffect(() => {
    const savedScrollY = getItem('scrollY', 0);
    const { products, page: savedPage, isLastPage } = getItem('products', {});

    if (!isFirstFetched && products && savedPage) {
      setProducts(products);
      setPage(savedPage);
      setIsLastPage(isLastPage);
      setFirstFetch(true);
      return;
    }
    if (!isFirstFetched && page === 0) {
      fetchMore();
      setFirstFetch(true);
      return;
    }
    if (savedScrollY !== '0') window.scrollTo(0, Number(savedScrollY));
  }, [isFirstFetched]);

  useEffect(() => {
    if (isFirstFetched && page > 0 && intersecting) {
      fetchMore();
    }
  }, [isFirstFetched, intersecting]);

  const fetchMore = async () => {
    if (isLastPage) {
      alert('모든 상품을 불러왔습니다!');
      return;
    }

    const fetchProducts = async (page: number, size: number) => {
      try {
        const { data } = await request(`/products?page=${page}&size=${size}`);
        const newProducts = [...products, ...data.products];
        setProducts(newProducts);
        setIsLastPage(newProducts.length === data.totalCount);

        setItem('products', {
          products: newProducts,
          page,
          isLastPage: newProducts.length === data.totalCount,
        });
      } catch (err: any) {
        err.name === 'NotFound' && router.push('/404');
      }
    };
    await fetchProducts(page + 1, ITEM_COUNT_PER_FETCH);
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
