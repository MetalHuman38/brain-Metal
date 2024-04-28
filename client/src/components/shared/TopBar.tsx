import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { useEffect } from 'react';
import { useUserContext } from '@/lib/context/AuthContext';
import useAuth from '@/lib/context/useAuth';


const TopBar = () => {
  
  const { logout, isSuccess } = useUserContext();
  const { user, isUserLoading } = useAuth();

  const navigate = useNavigate();
 

  useEffect(() => {
    if (isSuccess) navigate(0);
  }, [isSuccess])

  useEffect(() => {
    if (!isUserLoading && !user) {
      try {
          navigate('/sign-in');
      } catch (error) {
        console.error('Error parsing access token:', error);
        // Handle parsing error gracefully, e.g., show error message to the user
      }
    }
  }, [isSuccess]);

  return (
    <section className="topbar">
      <div className="flex-between py-4 px-5">
        <Link to="/" className="flex gap-3 items-center">
          <img
            src="/assets/images/mylogo1.png"
            alt="logo"
            width={100}
            height={325}
          />
        </Link>
        <div className="flex gap-4">
          <Button variant="ghost" className="shad-button_ghost" onClick={() => logout()}>
            <img src="/assets/icons/logout.svg" alt="logout" />
          </Button>
          <Link to={`/profile/${user?.UserID}`} className='flex-center gap-3'>
            <img src={user?.AvatarUrl || '/assets/images/owner.jpg'}
              alt='profile'
            className='h-8 w-8 rounded-full'/>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TopBar