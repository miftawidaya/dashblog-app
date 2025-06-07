// src/utils/hooks/useAuthors.ts
import { useQueries } from '@tanstack/react-query';
import { getUserByEmail } from '@/utils/apis/user';
import { uniq } from 'lodash';

export const useAuthors = (emails: string[]) => {
  const uniqueEmails = uniq(emails).filter(Boolean); // hilangkan duplikat dan kosong

  const results = useQueries({
    queries: uniqueEmails.map((email) => ({
      queryKey: ['user', email],
      queryFn: () => getUserByEmail(email),
      enabled: !!email,
    })),
  });

  // Buat hasil map email -> user
  const authorsMap = uniqueEmails.reduce(
    (acc, email, index) => {
      acc[email] = results[index].data;
      return acc;
    },
    {} as Record<string, Awaited<ReturnType<typeof getUserByEmail>>>
  );

  return {
    authors: authorsMap,
    isLoading: results.some((r) => r.isLoading),
    isError: results.some((r) => r.isError),
  };
};
