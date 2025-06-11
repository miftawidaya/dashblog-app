import React, { useState } from 'react';
import { PostCard } from '@/components/common/PostCard';
import { useRecommendedPosts } from '@/utils/hooks/usePosts';
import { Skeleton } from '../ui/skeleton';
import { API_BASE_URL } from '@/utils/apis/axios-with-config';
import { useAuthors } from '@/utils/hooks/useAuthors';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

export const RecommendedPostList: React.FC = () => {
  const [page, setPage] = useState(1);
  const limit = 5;

  const { data, isLoading, isError } = useRecommendedPosts(page, limit);
  const emails = data?.data.map((post) => post.author.email) || [];
  const { authors } = useAuthors(emails);

  const totalPages = data ? Math.ceil(data.total / limit) : 1;

  const goToPage = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const getPageItems = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (page <= 3) {
        // Halaman awal: 1, 2, 3, ..., total
        pages.push(1, 2, 3, '...', totalPages);
      } else if (page >= totalPages - 2) {
        // Halaman akhir: 1, ..., total-2, total-1, total
        pages.push(1, '...', totalPages - 2, totalPages - 1, totalPages);
      } else {
        // Tengah: 1, ..., page-1, page, page+1, ..., total
        pages.push(1, '...', page - 1, page, page + 1, '...', totalPages);
      }
    }

    return pages;
  };

  if (isError || !data)
    return <p className='text-red-500'>Failed to load posts.</p>;

  if (isLoading)
    return (
      <div className='flex w-full flex-col space-y-4'>
        {[...Array(3)].map((_, i) => (
          <div key={i} className='w-full space-y-2'>
            <Skeleton className='h-5 w-3/4' />
            <Skeleton className='h-4 w-full' />
            <div className='flex gap-2'>
              <Skeleton className='h-4 w-16' />
              <Skeleton className='h-4 w-16' />
            </div>
          </div>
        ))}
      </div>
    );

  return (
    <div className='w-full'>
      <div className='flex flex-col space-y-8 pb-8'>
        {data.data.map((post) => {
          const avatarUrl = authors[post.author.email]?.avatarUrl;
          const avatar = avatarUrl ? `${API_BASE_URL}${avatarUrl}` : '';
          return (
            <PostCard
              className='md:border-b md:border-neutral-300 md:pb-8'
              key={post.id}
              id={post.id}
              thumbnail={post.imageUrl}
              title={post.title}
              tags={post.tags}
              summary={post.content.slice(0, 150)}
              author={{
                name: post.author.name,
                avatar: avatar,
              }}
              date={post.createdAt}
              likes={post.likes}
              comments={post.comments}
            />
          );
        })}
      </div>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href='#'
              onClick={(e) => {
                e.preventDefault();
                goToPage(page - 1);
              }}
              className={page === 1 ? 'pointer-events-none opacity-50' : ''}
            />
          </PaginationItem>

          {getPageItems().map((p, i) => (
            <PaginationItem key={i}>
              {p === '...' ? (
                <PaginationEllipsis />
              ) : (
                <PaginationLink
                  href='#'
                  isActive={p === page}
                  onClick={(e) => {
                    e.preventDefault();
                    if (typeof p === 'number') goToPage(p);
                  }}
                >
                  {p}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
              href='#'
              onClick={(e) => {
                e.preventDefault();
                goToPage(page + 1);
              }}
              className={
                page === totalPages ? 'pointer-events-none opacity-50' : ''
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};
