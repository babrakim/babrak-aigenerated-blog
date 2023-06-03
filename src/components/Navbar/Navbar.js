import Link from 'next/link';
import { useEffect } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faFile, faImage, faCommentDots  } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Container from '@/components/Container';
import ArticleSVG from './articleSVG';
import ChatSVG from './chatSVG';

import styles from './Navbar.module.scss';


const Navbar = () => {

  useEffect(() => {
    // Add specific icons to the library
    library.add(faCommentDots );
  }, []);

  return (
    <nav className={`${styles.navbarWrapper} navbar navbar-expand-lg navbar-light fixed-top`}>
      <div className="container d-flex align-items-center">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        
          <div className={`${styles.navLogo} navbar-brand me-auto`}>
            <Link href="/">babrak</Link>
          </div>
        
        <div className="collapse navbar-collapse navbar-menu flex-grow-1" id="navbarNav">
          <ul className="navbar-nav mx-auto">
            
            <li className={`${styles.navItem} nav-item`}>
              <Link href="/article">  
              <ArticleSVG className={styles.svgImage} />
              Article</Link>
            </li>

            <li className={`${styles.navItem} nav-item`}>
              <Link href="/image"> 
               <svg className={`${styles.svgImage} svg-inline--fa fa-image`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="20" height="20"><path fill="currentColor" d="M0 96C0 60.7 28.7 32 64 32H448c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zM323.8 202.5c-4.5-6.6-11.9-10.5-19.8-10.5s-15.4 3.9-19.8 10.5l-87 127.6L170.7 297c-4.6-5.7-11.5-9-18.7-9s-14.2 3.3-18.7 9l-64 80c-5.8 7.2-6.9 17.1-2.9 25.4s12.4 13.6 21.6 13.6h96 32H424c8.9 0 17.1-4.9 21.2-12.8s3.6-17.4-1.4-24.7l-120-176zM112 192a48 48 0 1 0 0-96 48 48 0 1 0 0 96z"></path></svg> 
               Image</Link>
            </li>
            <li className={`${styles.navItem} nav-item`}>
              <Link href="/chat">
              <ChatSVG className={styles.svgImage} />
              Chat</Link>
            </li>
          </ul>
        </div>
        <div className={styles.userImage}>
          
          <Image src="/user.png" alt="userImage" width={30} height={30} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
