'use client';

import removeLocalStorage from '@/utils/localstorage/removeLocalStorage';
import Link from 'next/link';
import { HiOutlinePencil } from 'react-icons/hi';
interface EditArticleProps {
  href: string;
}

const EditArticle = ({ href }: EditArticleProps) => {
  const handleEditLocalStorageClick = () => {
    removeLocalStorage('EditArticleTitle', 'EditArticleContent');
  };

  return (
    <Link
      href={href}
      onClick={handleEditLocalStorageClick}
      className="flex items-center gap-1 hover:opacity-70"
    >
      <HiOutlinePencil width={30} height={30} />
      <span className="text-base">記事を編集</span>
    </Link>
  );
};

export default EditArticle;
