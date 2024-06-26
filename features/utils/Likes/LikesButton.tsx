"use client"

import { Post, User } from "@/types/types";
import { revalidatePath } from "next/cache";
import { useState } from "react"
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io"

interface LikesButtonProps {
  isLikedPost: boolean;
  post: Post;
  user: User | null;
  count: number;
}

const LikesButton = ({isLikedPost, post, user, count}: LikesButtonProps) => {
  const [isLiked, setIsLiked] = useState<Boolean>(isLikedPost);
  const [likeCount, setLikeCount] = useState<number>(count);
  const isYoursPost = user?.id === post.User.id? true: false;

  const hanldePressLikesButton = async () => {
    try {
      setIsLiked(true)
      setLikeCount(likeCount + 1)
      const data = {
        postId: post.id,
        userId: user?.id
      }

      const res = await fetch('/api/likes/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      })

    } catch (error) {
      console.log(error);
    }
  }

  const hanldeDeleteLikesButton = async () => {
    try {
      setIsLiked(false)
      setLikeCount(likeCount - 1)
      const data = {
        postId: post.id,
        userId: user?.id
      }
      const res = await fetch('/api/likes/', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      })
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex gap-2">
      {isYoursPost? (
        <div>
          <IoMdHeartEmpty className="inline-block text-gray-400" size={24}/>
        </div>
      ):(
        <>
          {isLiked? (
            <button>
              <IoMdHeart onClick={hanldeDeleteLikesButton} className="inline-block text-red-500" size={24}/>
            </button>
          ):(
            <button >
              <IoMdHeartEmpty onClick={hanldePressLikesButton} className="inline-block text-gray-400" size={24}/>
            </button>
          )}
        </>
      )}

        {likeCount > 0? (
          <span className="text-gray-400">{likeCount}</span>
        ):(
          <span className="text-gray-400">0</span>
        )}
    </div>
  )
}

export default LikesButton
