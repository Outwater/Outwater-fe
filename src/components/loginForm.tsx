import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import Stack from '../components/common/Stack';

const LoginForm = () => {
  const [values, setValues] = useState({
    loginId: '',
    password: '',
  });
  const [errors, setErrors] = useState({
    loginId: '',
    password: '',
  });
  const [visited, setVisited] = useState({
    loginId: false,
    password: false,
  });
  const [canSubmitLogin, setCanSubmitLogin] = useState(false);

  const validate = useCallback(() => {
    const errors = {
      loginId: '',
      password: '',
    };

    const loginIdRegax = /^[a-zA-Z0-9]{5,30}$/;
    const passwordRegax = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,30}$/;
    if (!loginIdRegax.test(values.loginId)) {
      errors.loginId = '올바른 아이디 형식으로 입력해주세요.';
    }
    if (!passwordRegax.test(values.password)) {
      errors.password = '올바른 비밀번호 형식으로 입력해주세요.';
    }
    return errors;
  }, [values]);

  useEffect(() => {
    const errors = validate();
    setErrors(errors);
    if (Object.values(errors).some((value) => value)) {
      setCanSubmitLogin(false);
      return;
    }
    setCanSubmitLogin(true);
  }, [validate]);

  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [e.target.id]: e.target.value,
    });
  };
  const handleOnBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setVisited({
      ...visited,
      [e.target.id]: true,
    });
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert(JSON.stringify(values, null, 2));
  };
  return (
    <Form onSubmit={handleSubmit}>
      <Stack direction='column'>
        <StyledLabel htmlFor='loginId'>아이디</StyledLabel>
        <TextInput
          type='text'
          id='loginId'
          value={values.loginId}
          onChange={handleChangeValue}
          onBlur={handleOnBlur}
        />
        {visited.loginId && errors.loginId && (
          <ErrorMessage>올바른 아이디 형식으로 입력해주세요.</ErrorMessage>
        )}
      </Stack>
      <Stack direction='column'>
        <StyledLabel htmlFor='password'>비밀번호</StyledLabel>
        <TextInput
          type='password'
          id='password'
          value={values.password}
          onChange={handleChangeValue}
          onBlur={handleOnBlur}
        />
        {visited.password && errors.password && (
          <ErrorMessage>올바른 아이디 형식으로 입력해주세요.</ErrorMessage>
        )}
      </Stack>
      <LoginButton type='submit' disabled={!canSubmitLogin}>
        로그인
      </LoginButton>
    </Form>
  );
};

export default LoginForm;

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
