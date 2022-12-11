import React, { ReactNode } from 'react';
import styled from 'styled-components';

type StackProps = {
  children?: ReactNode;
  direction?: 'column' | 'row-reverse' | 'row' | 'column' | 'row-reverse';
  style?: React.CSSProperties;
};

const Stack = ({ children, direction = 'row', ...props }: StackProps) => {
  const styleObject = {
    display: 'flex',
    flexDirection: direction,
  };
  return (
    <Container style={{ ...styleObject, ...props.style }} {...props}>
      {children}
    </Container>
  );
};

const Container = styled.div``;

export default Stack;
