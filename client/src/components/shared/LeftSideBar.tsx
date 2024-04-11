import { sidebarLinks } from '@/constants';
import { useUserContext } from '@/lib/context/AuthContext';
import { INavLink } from '@/types';
import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Button } from '../ui/button';

const LeftSideBar = () => {
  const { logout, setisUserLoading, isUserLoading } = useUserContext();
  const [userData, setUserData] = useState(null);
  const { pathname } = useLocation();

  useEffect(() => {
    if (!isUserLoading) {
      // Fetch the user data from the tokenResponse in localStorage
      const tokenResponse = JSON.parse(localStorage.getItem('tokenResponse') ?? '');
      const { user } = tokenResponse;
      setUserData(user);
    }
  }, [isUserLoading]);

  return (
    <nav className='leftsidebar'>
      <div className='flex flex-col gap-11'>
        <Link to="/" className="flex gap-3 items-center">
          <img
            src="/assets/images/mylogo1.png"
            alt="logo"
            width={50}
            height={36}
          />
        </Link>
        {isUserLoading || !userData ? (
          <p>Loading user data...</p>
        ) : (
          <Link to={`/profile/${userData?.UserID}`}>
            <img src={userData?.AvatarUrl || '/assets/images/owner.jpg'} alt='profile' className='h-14 w-14 rounded-full' />
            <div className='flex flex-col'>
              <p className='body-bold'>{userData?.MemberName}</p>
              <p>@{userData?.Username}</p>
            </div>
          </Link>
        )}
        
        <ul className='flex flex-col gap-6'>
            {sidebarLinks.map((link: INavLink) => {
              const isActive = pathname === link.route;
               return(
                <li key={link.label}
                   className={`leftsidebar-link group ${ isActive && 'bg-primary-700'}`}>
                   <NavLink to={link.route} 
                            className="flex gap-4 items-center p-4">
                            <img src={link.imgURL} 
                                 alt={link.label} 
                                 className={`group-hover:invert-white ${isActive && 'invert-white'}`}
                                 />
                     {link.label}
                  </NavLink>
                </li>
                
               )
            })}
        </ul>
      </div>
      <Button variant="ghost" 
              className="shad-button_ghost" 
              onClick={() => logout()}>
            <img src="/assets/icons/logout.svg" 
              alt="logout" />
            <p className='small-medium lg:base-medium'>Logout</p>
      </Button>
    </nav>
  );
};

export default LeftSideBar;
