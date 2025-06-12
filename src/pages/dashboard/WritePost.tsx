import React, { useRef, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { createPost } from '@/utils/apis/post';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';
import { UploadCloud } from 'lucide-react';
import { createPostSchema } from '@/utils/types/post';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export type CreatePostInput = z.infer<typeof createPostSchema>;

const WritePost: React.FC = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [content, setContent] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CreatePostInput>({
    resolver: zodResolver(createPostSchema),
  });

  const mutation = useMutation({
    mutationFn: async (data: CreatePostInput) => {
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('content', data.content);
      if (data.tags) formData.append('tags', data.tags);
      if (data.image) formData.append('image', data.image);

      return await createPost(formData);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      navigate(`/posts/${data.id}`);
      toast.success('Post created successfully');
    },
    onError: () => {
      toast.error('Failed to create post');
    },
  });

  const onSubmit = (formData: CreatePostInput) => {
    mutation.mutate({ ...formData, content });
  };

  return (
    <div className='mx-auto flex w-full max-w-200 flex-col gap-4 md:w-200'>
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
        <div>
          <Label>Title</Label>
          <Input placeholder='Enter your title' {...register('title')} />
          {errors.title && (
            <p className='text-sm text-red-500'>{errors.title.message}</p>
          )}
        </div>

        <div>
          <Label>Content</Label>
          <SunEditor
            setContents={content}
            onChange={(value) => {
              setContent(value);
              setValue('content', value);
            }}
            height='300px'
          />
          {errors.content && (
            <p className='text-sm text-red-500'>{errors.content.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor='image'>Cover Image</Label>
          <div
            className='flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-4 text-center hover:bg-gray-50'
            onClick={() => fileInputRef.current?.click()}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              const file = e.dataTransfer.files[0];
              if (file && file.type.startsWith('image/')) {
                setValue('image', file);
                setImagePreview(URL.createObjectURL(file));
              }
            }}
          >
            <div className='mb-6 flex h-10 w-10 items-center justify-center rounded-md border border-neutral-300'>
              <UploadCloud className='h-5 w-5 text-neutral-950' />
            </div>
            <p className='text-sm text-neutral-700'>
              <span className='text-primary-300 font-semibold'>
                Click to upload
              </span>{' '}
              or drag and drop
              <br />
              PNG or JPG (max. 5MB)
            </p>
            <Input
              id='image'
              type='file'
              accept='image/png, image/jpeg'
              className='hidden'
              {...register('image')}
              ref={fileInputRef}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setValue('image', file);
                  setImagePreview(URL.createObjectURL(file));
                }
              }}
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt='Preview'
                className='mt-4 max-h-60 rounded'
              />
            )}
          </div>
          {errors.image?.message && (
            <p className='text-sm text-red-500'>
              {errors.image.message as string}
            </p>
          )}
        </div>

        <div>
          <Label>Tags</Label>
          <Input
            placeholder='Enter your tags (comma separated)'
            {...register('tags')}
          />
        </div>

        <div className='flex justify-end'>
          <Button
            type='submit'
            disabled={mutation.isPending}
            className='w-full md:w-64'
          >
            {mutation.isPending ? 'Publishing...' : 'Finish'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default WritePost;
