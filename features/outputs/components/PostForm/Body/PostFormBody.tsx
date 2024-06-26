'use client';

import { UseFormRegisterReturn } from 'react-hook-form';

interface PostFormBodyProps {
  register?: UseFormRegisterReturn;
  source: string;
  setSource(event: string): void;
  action: string;
}

const PostFormBody = ({
  register,
  source,
  setSource,
  action,
}: PostFormBodyProps) => {
  return (
    <textarea
      {...register}
      className="min-h-[500px] w-full resize-none bg-transparent leading-relaxed outline-0"
      placeholder="本文を書く"
      value={source}
      onChange={(e) => {
        e.target.style.height = 'auto';
        e.target.style.height = e.target.scrollHeight + 'px';
        localStorage.setItem('ArticleContent', e.target.value);
        if (action === 'edit') {
          localStorage.setItem('EditArticleContent', e.target.value);
        }
        if (action === 'create') {
          localStorage.setItem('ArticleContent', e.target.value);
        }
        setSource(e.target.value);
      }}
      autoFocus
    />
  );
};

export default PostFormBody;
