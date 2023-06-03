import Link from 'next/link';
import { useEffect } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faFile, faImage, faCommentDots  } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Container from '@/components/Container';

import styles from './Sidebar.module.scss';


const Sidebar = () => {

  useEffect(() => {
    // Add specific icons to the library
    library.add(faCommentDots );
  }, []);

  return (
    <div className={`${styles.sidebarWrapper} float-left`}>
      <div className="container d-flex align-items-center">
        
        
        <div className="mt-4">
          
          <div className="pt-4">
            <h6> # Brain Storming</h6>
          </div>

          <ul className="mx-auto">
            
            <li className={`${styles.navItem}`}>
              <Link href="/">  
              
              Keyword research</Link>
            </li>

            <li className={`${styles.navItem}`}>
              <Link href="/"> 
               
               Popular question</Link>
            </li>
            <li className={`${styles.navItem}`}>
              <Link href="/">
              
              Keyword strategies</Link>
            </li>
          </ul>
        </div>
        
      </div>
    </div>
  );
};

export default Sidebar;
