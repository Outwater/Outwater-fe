import Link from 'next/link';
import styled from 'styled-components';

import useUser from '../hooks/useUser';
import Stack from './common/Stack';

const Nav = () => {
  const { userInfo, userAction } = useUser();
  return (
    <Header>
      <Link href='/'>
        <Title>HAUS</Title>
      </Link>
      {userInfo?.user ? (
        <Stack direction='column'>
          <div>{userInfo.user.NAME}</div>
          <StyledButton onClick={() => userAction.logout()}>logout</StyledButton>
        </Stack>
      ) : (
        <Link href='/login'>
          <StyledLink>login</StyledLink>
        </Link>
      )}
    </Header>
  );
};

export default Nav;

const Header = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`;

const Title = styled.a`
  font-size: 48px;
  cursor: pointer;
`;

const StyledButton = styled.button`
  cursor: pointer;
`;

const StyledLink = styled.a`
  font-size: 16px;
  cursor: pointer;
`;
