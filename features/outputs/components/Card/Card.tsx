'use client';

import Image from 'next/image';
import Link from 'next/link';
import { IoMdHeartEmpty } from 'react-icons/io';

import formatPostTime from '@/utils/date/formatPostTime';

interface CardProps {
  post: any;
}

const Card: React.FC<CardProps> = ({ post }) => {
  return (
    <li className="grid grid-cols-card gap-3" key={post.id}>
      <Link
        href={`/outputs/posts/${post.id}`}
        className="flex h-[92px] w-[92px] items-center justify-center rounded-lg border-[1px] border-solid border-slate-300 bg-white"
      >
        <Image src="/images/dammy.png" width={40} height={40} alt="dammy" />
      </Link>
      <div>
        <Link href={`/outputs/posts/${post.id}`}>
          <h2 className="text-base font-bold leading-6 text-black">
            {post.title}
          </h2>
        </Link>
        <div className="mt-2 flex items-center gap-2">
          <Link href="/" className="block">
            <Image
              className="rounded-full"
              src="/images/dammy.png"
              width={26}
              height={26}
              alt="dammy"
            />
          </Link>
          <div className="flex items-center gap-1">
            <Link href="/" className="block">
              <span className="text-[13px] text-black">{post.User.name}</span>
            </Link>
            <span className="mt-1 inline-block text-[12px] text-gray-500">
              {formatPostTime(post.created_at)}
            </span>
            <div className="flex items-center gap-1">
              <IoMdHeartEmpty className="mt-1 inline-block text-gray-400" />
              {Number(post.likes) > 0 ? (
                <span className="mt-1 inline-block text-[12px] text-gray-400">
                  {post.likes}
                </span>
              ) : (
                <span className="mt-1 inline-block text-[12px] text-gray-400">
                  0
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default Card;
