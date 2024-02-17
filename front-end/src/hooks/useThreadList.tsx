import useSWR from 'swr'

export const useThreadList = () => {
  const { data, error, mutate } = useSWR('/api/threads', (url): Promise<Thread[]> => fetch(url).then(r => r.json()))
  return { data, error, isLoading: !error && !data, mutate }
};
