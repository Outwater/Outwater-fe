import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import type { NextPage } from 'next';
import styled from 'styled-components';

import { request } from '../../api/request';
import { Product } from '../../types/product';
import Layout from '../../components/Layout';

const ProductDetailPage: NextPage = () => {
  const router = useRouter();
  const id = router.query.id as string;

  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      try {
        const { data } = await request(`/products/${id}`);
        setProduct(data.product);
      } catch (err: any) {
        err.name === 'NotFound' && router.push('/404');
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) return <div>Loading...</div>;
  return (
    <Layout>
      <Thumbnail src={product.thumbnail ? product.thumbnail : '/defaultThumbnail.jpg'} />
      <ProductInfoWrapper>
        <Name>{product.name}</Name>
        <Price>{product.price.toLocaleString('ko-KR')}원</Price>
      </ProductInfoWrapper>
    </Layout>
  );
};

export default ProductDetailPage;

const Thumbnail = styled.img`
  width: 100%;
  height: 420px;
`;

const ProductInfoWrapper = styled.div`
  margin-top: 20px;
  padding: 0 20px;
`;

const Name = styled.div`
  font-size: 20px;
  font-weight: bold;
`;

const Price = styled.div`
  font-size: 18px;
  margin-top: 8px;
`;
