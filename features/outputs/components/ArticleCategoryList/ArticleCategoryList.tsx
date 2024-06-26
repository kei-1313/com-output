import React from 'react';
import ArticleCategory from '../ArticleCategory/ArticleCategory';
import { Category, CategoryRelation } from '@/types/Category/Category';

interface ArticleCategoryListProps {
  categoryList: CategoryRelation[];
}

const ArticleCategoryList = ({ categoryList }: ArticleCategoryListProps) => {
  return (
    <ul className="mt-12 flex flex-wrap items-center gap-2.5 text-xs leading-normal">
      {categoryList?.map((category) => (
        <ArticleCategory
          categoryName={category.Category.name}
          key={category.categoryId}
        />
      ))}
    </ul>
  );
};

export default ArticleCategoryList;
