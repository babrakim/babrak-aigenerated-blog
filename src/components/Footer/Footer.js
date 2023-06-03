import Container from '@/components/Container';

import styles from './Footer.module.scss';
const currentDate = new Date();
const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
const formattedDate = currentDate.toLocaleDateString('en-US', options);



const Footer = ({ ...rest }) => {
  return (
    <footer className={styles.footer} {...rest}>
      <Container className={`${styles.footerContainer} ${styles.footerLegal}`}>
        <p>
          {formattedDate}
        </p>
      </Container>
    </footer>
  );
};

export default Footer;
