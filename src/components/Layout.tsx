import { ReactNode } from 'react';
import Nav from './Nav';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Nav />
      {children}
    </>
  );
};

export default Layout;
