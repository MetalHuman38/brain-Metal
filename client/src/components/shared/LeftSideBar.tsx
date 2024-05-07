import { sidebarLinks } from '@/constants';
import { useUserContext } from '@/lib/context/AuthContext';
import { INavLink } from '@/types';
import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import useAuth from '@/lib/context/useAuth';

const LeftSideBar = () => {
  const { logout } = useUserContext();
  const { user } = useAuth();
  const [isUserLoading, setIsUserLoading] = useState(true);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isUserLoading && !user) {
      try {
        setIsUserLoading(false);
        navigate('/');
      } catch (error) {
        console.error('Error parsing access token:', error);
      }
    }
  }, [isUserLoading, user]);

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
        {!user || !isUserLoading ? (
          <p>Loading user data...</p>
        ) : (
          <Link to={`/profile/${user?.UserID}`}>
            <img src={user?.ImageUrl || '/assets/images/owner.jpg'} alt='profile' className='h-14 w-14 rounded-full' />
            <div className='flex flex-col'>
              <p className='body-bold'>{user?.FirstName}</p>
              <p>@{user?.Username}</p>
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
