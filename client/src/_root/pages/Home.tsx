import PostCard from "@/components/shared/PostCard";
import useAuth from "@/lib/context/useAuth";
import { Loader } from "lucide-react";
import { useQuery } from "react-query";
import instance from "@/lib/axiosConfig";



const Home = () => {

  const { user, isUserLoading } = useAuth();
  
  const { data: post, isLoading: isPostLoading, refetch: fetchPosts } = useQuery(['posts', user], async () => {
    
    // Fetch recent posts only if user is authenticated and posts are not yet loaded
    if (user && !post) {
      try {
        const storedToken = localStorage.getItem('user');
        const response = await instance.get('/getRecentPosts', {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            Authorization: `Bearer ${storedToken}`,
          },
        });
        return response.data;
      } catch (error) {
        console.error('Error getting posts:', error);
        return [];
      }
    }
  });

  if (isUserLoading || !user) {
    // Render a loading indicator or placeholder content
    return <div>Loading... User Not fetched</div>;
  }

  if (!user || !post) {
    return null;
  }

  if (isPostLoading || !post) {
    return <Loader />;
  }

  if (!post) {
    return <div>No posts found</div>;
  }

  return (
    <div className='flex flex-1'>
      <div className="home-container">
        <div className="home-posts">
          <h2 className="h3-bold md:h2-bold text-left w-full">Home Feed</h2>
          {isPostLoading && !post ? (
            <Loader />
          ) : (
            <ul className="flex flex-col flex-1 gap-9 w-full">
              {/* Render post cards */}
              {post.map((post: any) => (
                <PostCard key={post.PostID} post={post} />
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}

export default Home;


// import PostCard from "@/components/shared/PostCard";
// import useAuth from "@/lib/context/useAuth";
// import { Loader } from "lucide-react";
// import { useEffect, useState } from "react";
// import { useQuery } from "react-query";
// import instance from "@/lib/axiosConfig";
// import { IUser } from "@/types";


// const Home = () => {
//   const [user, setUser] = useState<IUser | null>(null);
//   const [isUserLoading, setIsUserLoading] = useState(true);

//   useEffect(() => {
//     if (!user) return; // Exit early if user is not defined
//     setUser(user);
//   }, [user]);

//   const { data: posts, isLoading: isPostLoading, refetch: fetchPosts } = useQuery(['posts', user], async () => {
//     if (user) {
//       const response = await instance.get('/getRecentPosts');
//       return response.data;
//     }
//   });

//   useEffect(() => {
//     if(user && !posts)
//     fetchPosts();
//   }
//   , [user, fetchPosts]);

//   if (isUserLoading || !user) {
//     // Render a loading indicator or placeholder content
//     return <div>Loading... Post Not fetched</div>;
//   }

//   if (!user || !posts) {
//     return null;
//   }

//   if (isPostLoading || !user) {
//     return <Loader />;
//   }

//   if (!posts) {
//     return <div>No posts found</div>;
//   }

//   return (
//     <div className='flex flex-1'>
//       <div className="home-container">
//         <div className="home-posts">
//           <h2 className="h3-bold md:h2-bold text-left w-full">Home Feed</h2>
//           {isPostLoading && !posts ? (
//             <Loader />
//           ) : (
//             <ul className="flex flex-col flex-1 gap-9 w-full">
//               <PostCard  key={posts.PostID}   post={posts} />
//             </ul>   
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Home