import Link from 'next/link';
import { FaGithub } from 'react-icons/fa';

import Container from '@/components/Container';
import Navbar from '@/components/Navbar';

import styles from './Header.module.scss';

const Header = () => {
  return (
    <header className={styles.header}>
      <Container className={styles.headerContainer}>
       <Navbar>

       </Navbar>
      </Container>
    </header>
  );
};

export default Header;
