'use client';

import { useEffect, useState } from 'react';

import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useParams, useRouter } from 'next/navigation';
import CreateFooter from '@/features/outputs/components/Footer/CreateFooter';
import PostFormTitle from '@/features/outputs/components/PostForm/Title/PostFormTitle';
import PostFormBody from '@/features/outputs/components/PostForm/Body/PostFormBody';
import PrevieContent from '@/features/outputs/components/PreviewContent/PrevieContent';
import Link from 'next/link';
import SubmitButton from '@/features/outputs/components/Button/SubmitButton';
import TagSettings from '@/features/outputs/components/TagSettings/TagSettings';
import PreviewButton from '@/features/outputs/components/Button/PreviewButton';
import { FaArrowLeft } from 'react-icons/fa';
import { Post } from '@/types/Post/Post';
import { Category } from '@/types/Category/Category';
import Loading from '@/app/outputs/posts/[id]/edit/loading';

interface Tags {
  id: string;
  label: string;
  name: string;
  icon: string;
}

interface EditPageProps {
  post: Post;
  postId: string;
  categoies: Category[];
}

const EditPage = ({ post, postId, categoies }: EditPageProps) => {
  const router = useRouter();
  const postTitle = post.title;
  const postContent = post.PostFormatBases[0].contents;

  const [title, setTitle] = useState(postTitle);
  const [source, setSource] = useState(postContent);

  const [isPreview, setPreview] = useState(false);

  const exitingTags = post.CategoryRelations.map((tag) => tag.Category);

  const [tags, setTags] = useState<Tags[]>(exitingTags);

  const [isLoading, setIsLoading] = useState(false);

  //後ほどカスタムフックにする
  // 編集があれば、localstorageの値を表示させる
  useEffect(() => {
    const EditArticleTitle = localStorage.getItem('EditArticleTitle');
    const EditArticleContent = localStorage.getItem('EditArticleContent');
    if (EditArticleTitle && postTitle !== EditArticleTitle) {
      setTitle(EditArticleTitle);
    }
    if (EditArticleContent && postContent !== EditArticleContent) {
      setSource(EditArticleContent);
    }
  }, [postTitle, postContent]);

  //投稿をPOSTする
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      title: title,
      contents: source,
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    try {
      //空白の場合
      if (!data.title || !data.contents) {
        throw Error('入力してください');
      }

      const updatePost = {
        title: data.title,
        contents: data.contents,
        thumbnail: post.thumbnail,
        userId: post.User.id,
        postId,
        postFormatBaseId: post.PostFormatBases[0].id,
        tags: tags,
      };

      const res = await fetch('/api/posts/', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatePost),
      });

      reset();
      router.push(`/outputs/posts/${postId}`);
    } catch (error) {
      //エラー処理
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  //プレビューの表示、非表示
  const handlePreviewClick = () => {
    setPreview(!isPreview);
  };

  //ローディング
  if (isLoading) {
    return <Loading />;
  }

  return (
    <form className="min-h-screen" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex h-14 items-center justify-between gap-2 px-4">
        <div className="lg:flex-1">
          <Link
            href={`/outputs/posts/${postId}`}
            className="flex h-[36px] w-[36px] items-center justify-center rounded-full transition duration-300 hover:bg-sky-50"
          >
            <FaArrowLeft
              width={20}
              height={20}
              className="mx-auto text-gray-400"
            />
          </Link>
        </div>
        <div className="flex-1 lg:justify-center">
          <div className="lg:text-center">
            <SubmitButton />
          </div>
        </div>
        <div className="mr-4 flex flex-1 items-center justify-end gap-8">
          <TagSettings tags={tags} setTags={setTags} categoies={categoies} />
          <PreviewButton
            handlePreviewClick={handlePreviewClick}
            isPreview={isPreview}
          />
        </div>
      </div>
      <div className="mx-auto max-w-[580px] px-6 py-24">
        {isPreview ? (
          <PrevieContent source={source} title={title} />
        ) : (
          <>
            <div className="mb-8">
              <PostFormTitle
                register={register('title')}
                title={title}
                setTitle={setTitle}
                action={'edit'}
              />
            </div>
            <div>
              <PostFormBody
                register={register('contents')}
                source={source}
                setSource={setSource}
                action={'edit'}
              />
            </div>
          </>
        )}
      </div>
      <CreateFooter length={source.length} />
    </form>
  );
};

export default EditPage;
