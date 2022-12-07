import Link from 'next/link';
import styled from 'styled-components';
import useStorage from '../hooks/useStorage';

import { Product } from '../types/product';

type ProductItemProps = {
  product: Product;
};

const ProductItem = ({ product: { id, name, thumbnail, price } }: ProductItemProps) => {
  const { setItem } = useStorage('session');

  return (
    <Link href={`/products/${id}`}>
      <Container onClick={() => setItem('scrollY', window.scrollY)}>
        <Thumbnail src={thumbnail ? thumbnail : '/defaultThumbnail.jpg'} />
        <Name>{name}</Name>
        <Price>{price.toLocaleString('ko-KR')}</Price>
      </Container>
    </Link>
  );
};

export default ProductItem;

const Container = styled.a`
  width: 180px;
  margin-left: 20px;
  margin-top: 20px;
`;

const Thumbnail = styled.img`
  width: 100%;
  height: 180px;
`;

const Name = styled.div`
  margin-top: 8px;
  font-size: 16px;
`;

const Price = styled.div`
  margin-top: 4px;
`;
