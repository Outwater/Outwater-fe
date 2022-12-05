import React from 'react';
import Link from 'next/link';
import type { NextPage } from 'next';
import styled from 'styled-components';
import Stack from '../components/common/Stack';

const LoginPage: NextPage = () => {
  return (
    <>
      <Header>
        <Link href='/'>
          <Title>HAUS</Title>
        </Link>
        <Link href='/login'>
          <p>login</p>
        </Link>
      </Header>
      <Form>
        <Stack direction='column'>
          <StyledLabel htmlFor='loginId'>아이디</StyledLabel>
          <TextInput type='text' id='loginId' />
          <ErrorMessage>올바른 아이디 형식으로 입력해주세요.</ErrorMessage>
        </Stack>
        <Stack direction='column'>
          <StyledLabel htmlFor='password'>비밀번호</StyledLabel>
          <TextInput type='password' id='password' />
          <ErrorMessage>올바른 아이디 형식으로 입력해주세요.</ErrorMessage>
        </Stack>
        <LoginButton disabled>로그인</LoginButton>
      </Form>
    </>
  );
};

export default LoginPage;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`;

const Title = styled.a`
  font-size: 48px;
`;

const Form = styled.form`
  margin-top: 40px;
  padding: 0 20px 40px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const StyledLabel = styled.label`
  font-size: 13px;
  font-weight: 700;
  color: #6c6c7d;
`;

const TextInput = styled.input`
  margin-top: 8px;
  padding: 16px;
  background: #f7f7fa;
  border: 1px solid #000;
  border-radius: 12px;

  &:active {
    background-color: #fdedee;
  }
`;

const ErrorMessage = styled.div`
  margin-top: 8px;
  font-size: 13px;
  font-weight: 400;
  color: #ed4e5c;
`;

const LoginButton = styled.button`
  margin-top: 40px;
  padding: 20px;
  border-radius: 12px;
  background-color: #222;
  color: #fff;

  &:disabled {
    background-color: #e2e2ea;
  }
`;
