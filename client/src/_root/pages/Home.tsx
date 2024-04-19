import PostCard from "@/components/shared/PostCard";
import useAuth from "@/lib/context/useAuth";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import instance from "@/lib/axiosConfig";
import { IUser } from "@/types";


const Home = () => {
  const { user, isUserLoading } = useAuth();
  const [userData, setUserData] = useState<IUser | null>(null);
  const { data: posts, isLoading: isPostLoading } = useQuery(['posts', userData], async () => {
    const response = await instance.get(`/getPosts?UserID=${user?.UserID}`);
    return response.data;
  });

  useEffect(() => {
    if (!user) return; // Exit early if user is not defined
    setUserData(user);
  }, [user]);

  if (isUserLoading || !userData) {
    // Render a loading indicator or placeholder content
    return <div>Loading... Post Not fetched</div>;
  }

  if (!user || !posts) {
    return null;
  }

  if (isPostLoading || !user) {
    return <Loader />;
  }

  if (!posts) {
    return <div>No posts found</div>;
  }

  return (
    <div className='flex flex-1'>
      <div className="home-container">
        <div className="home-posts">
          <h2 className="h3-bold md:h2-bold text-left w-full">Home Feed</h2>
          {isPostLoading && !posts ? (
            <Loader />
          ) : (
            <ul className="flex flex-col flex-1 gap-9 w-full">
              <PostCard  key={posts.PostID}   post={posts} />
            </ul>   
          )}
        </div>
      </div>
    </div>
  )
}

export default Home