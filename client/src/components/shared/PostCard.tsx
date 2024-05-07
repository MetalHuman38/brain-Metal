import useAuth from "@/lib/context/useAuth";
import { timeAgo } from "@/lib/utils";
import { IUpdatePost } from "@/types";
import { Link } from "react-router-dom"

type PostCardProps = {
  post: IUpdatePost;
}

const PostCard = ({ post }: PostCardProps) => {

  const { user } = useAuth(); // Assuming you have access to the user context
 
  return (
    <div className="post-card">
       <div className="flex-between">
        <div className="flex items-center gap-3">
          <Link to={`/profile/${user?.ImageUrl}`}>
          <img src={user?.ImageUrl || '/assets/icons/profile-placeholder.svg'} 
               alt="User" 
               className="rounded-full w-12 lg:h-12" />
          </Link>
          <div className="flex flex-col">
            <p className="base-meduim lg:body-bold text-light-1">
              {post?.Likes}
            </p>
            <div className="flex-center gap-2 text-light-3">
              <p className="subtle-semibold lg:small-regular">
                {post?.CreatedAt && timeAgo(post.CreatedAt.toString())}
              </p>
              - 
              <p className="sublte-semibold lg:small-regular">
                {post?.Location}
              </p>
            </div>
          </div>
        </div>
       </div>
    </div>
  )
}

export default PostCard