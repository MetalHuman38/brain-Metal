import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { useEffect, useState } from 'react';
import { useUserContext } from '@/lib/context/AuthContext';


const TopBar = () => {
  
  const { user, logout, isSuccess } = useUserContext();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (isSuccess) navigate(0);
  }, [isSuccess])

  useEffect(() => {
    if (!isSuccess) {
      // Fetch the user data from the tokenResponse in localStorage
      const tokenResponse = JSON.parse(localStorage.getItem('tokenResponse') ?? '');
      const { user } = tokenResponse;
      setUserData(user);
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
          <Link to={`/profile/${userData?.UserID}`} className='flex-center gap-3'>
            <img src={userData?.AvatarUrl || '/assets/images/owner.jpg'}
              alt='profile'
            className='h-8 w-8 rounded-full'/>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TopBar