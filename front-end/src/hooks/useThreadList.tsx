import axios from 'axios';
import { useEffect, useState } from 'react';

export const useThreadList = () => {
  const [threadList, setThreadList] = useState<Thread[]>([]);

  useEffect(() => {
    axios.get<Thread[]>('/api/threads').then((res) => {
      setThreadList(res.data);
    });
  }, []);

  return { threadList };
};
