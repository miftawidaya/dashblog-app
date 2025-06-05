import { describe, it, expect, vi } from 'vitest';
import axiosWithConfig from '@/utils/apis/axios-with-config';
import {
  fetchRecommendedPosts,
  fetchMostLikedPosts,
  fetchPostById,
  searchPosts,
  createPost,
  updatePost,
  likePost,
  deletePost,
  fetchLikes,
  fetchComments,
} from '@/utils/apis/post';

vi.mock('@/utils/apis/axios-with-config');

describe('Post API', () => {
  it('should fetch recommended posts', async () => {
    const mockResponse = {
      data: [{ id: 1, title: 'Recommended Post' }],
      total: 1,
      page: 1,
      lastPage: 1,
    };
    (axiosWithConfig.get as any).mockResolvedValueOnce({ data: mockResponse });

    const data = await fetchRecommendedPosts();
    expect(data).toEqual(mockResponse);
  });

  it('should fetch most liked posts', async () => {
    const mockResponse = {
      data: [{ id: 2, title: 'Most Liked Post' }],
      total: 1,
      page: 1,
      lastPage: 1,
    };
    (axiosWithConfig.get as any).mockResolvedValueOnce({ data: mockResponse });

    const data = await fetchMostLikedPosts();
    expect(data).toEqual(mockResponse);
  });

  it('should get a post by ID', async () => {
    const mockPost = { id: 3, title: 'Single Post' };
    (axiosWithConfig.get as any).mockResolvedValueOnce({ data: mockPost });

    const data = await fetchPostById(3);
    expect(data).toEqual(mockPost);
  });

  it('should search posts by keyword', async () => {
    const keyword = 'frontend';
    const mockResponse = {
      data: [{ id: 4, title: 'Frontend Tips' }],
      total: 1,
      page: 1,
      lastPage: 1,
    };
    (axiosWithConfig.get as any).mockResolvedValueOnce({ data: mockResponse });

    const data = await searchPosts(keyword);
    expect(data).toEqual(mockResponse);
  });

  it('should create a new post', async () => {
    const newPost = {
      title: 'New Post',
      content: 'This is a new post.',
      tags: ['new', 'post'],
      imageUrl: '/uploads/image.jpg',
    };
    const mockResponse = { id: 5, ...newPost, likes: 0, comments: 0 };
    (axiosWithConfig.post as any).mockResolvedValueOnce({ data: mockResponse });

    const data = await createPost(newPost);
    expect(data).toEqual(mockResponse);
  });

  it('should update a post by ID', async () => {
    const updatedPost = {
      title: 'Updated Post',
      content: 'Updated content',
      tags: ['updated'],
      imageUrl: '/uploads/updated.jpg',
    };
    const mockResponse = { id: 6, ...updatedPost };
    (axiosWithConfig.patch as any).mockResolvedValueOnce({ data: mockResponse });

    const data = await updatePost(6, updatedPost);
    expect(data).toEqual(mockResponse);
  });

  it('should like a post by ID', async () => {
    const mockResponse = { id: 7, title: 'Liked Post', likes: 10 };
    (axiosWithConfig.post as any).mockResolvedValueOnce({ data: mockResponse });

    const data = await likePost(7);
    expect(data).toEqual(mockResponse);
  });

  it('should delete a post by ID', async () => {
    const mockResponse = { success: true };
    (axiosWithConfig.delete as any).mockResolvedValueOnce({ data: mockResponse });

    const data = await deletePost(8);
    expect(data).toEqual(mockResponse);
  });

  it('should get list of users who liked a post', async () => {
    const mockResponse = [
      { id: 1, name: 'Alice', headline: 'Dev', avatarUrl: '/alice.jpg' },
      { id: 2, name: 'Bob', headline: 'DevOps', avatarUrl: '/bob.jpg' },
    ];
    (axiosWithConfig.get as any).mockResolvedValueOnce({ data: mockResponse });

    const data = await fetchLikes(9);
    expect(data).toEqual(mockResponse);
  });

  it('should get comments for a post', async () => {
    const mockResponse = [
      {
        id: 1,
        content: 'Great post!',
        createdAt: '2025-05-27T10:00:00.000Z',
        author: {
          id: 1,
          name: 'Alice',
          headline: 'Dev',
          avatarUrl: '/alice.jpg',
        },
      },
    ];
    (axiosWithConfig.get as any).mockResolvedValueOnce({ data: mockResponse });

    const data = await fetchComments(10);
    expect(data).toEqual(mockResponse);
  });
});
