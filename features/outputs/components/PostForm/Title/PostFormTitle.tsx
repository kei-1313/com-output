'use client';

import { UseFormRegisterReturn } from 'react-hook-form';

interface PostFormTitleProps {
  register?: UseFormRegisterReturn;
  title: string;
  setTitle(event: string): void;
  action: string;
}

const PostFormTitle = ({
  register,
  title,
  setTitle,
  action,
}: PostFormTitleProps) => {
  return (
    <textarea
      {...register}
      className="min-h-[70px] w-full resize-none bg-transparent text-xl  leading-relaxed outline-0"
      value={title}
      onChange={(e) => {
        e.target.style.height = 'auto';
        e.target.style.height = e.target.scrollHeight + 'px';
        if (action === 'edit') {
          localStorage.setItem('EditArticleTitle', e.target.value);
        }
        if (action === 'create') {
          localStorage.setItem('ArticleTitle', e.target.value);
        }
        setTitle(e.target.value);
      }}
      placeholder="タイトル"
    />
  );
};

export default PostFormTitle;
