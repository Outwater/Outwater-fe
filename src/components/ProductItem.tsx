import Link from 'next/link';
import Image from 'next/image';
import styled from 'styled-components';

import { Product } from '../types/product';
import useStorage from '../hooks/useStorage';

type ProductItemProps = {
  product: Product;
};

const ProductItem = ({ product: { id, name, thumbnail, price } }: ProductItemProps) => {
  const { setItem } = useStorage('session');
  return (
    <Link href={`/products/${id}`}>
      <Container onClick={() => setItem('scrollY', window.scrollY)}>
        <Image
          width={180}
          height={180}
          alt={name}
          src={thumbnail ? thumbnail : '/defaultThumbnail.jpg'}
        />
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

const Name = styled.div`
  margin-top: 8px;
  font-size: 16px;
`;

const Price = styled.div`
  margin-top: 4px;
`;
