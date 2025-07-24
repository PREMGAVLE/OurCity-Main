// src/hooks/useApiState.ts
import { useState } from 'react';

export const useApiState = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const start = () => {
    setLoading(true);
    setError(null);
  };

  const fail = (e: any) => {
    setError(e?.response?.data?.message || e?.message || 'Something went wrong');
    setLoading(false);
  };

  const success = () => {
    setLoading(false);
  };

  const reset = () => {
    setLoading(false);
    setError(null);
  };

  return {
    loading,
    error,
    start,
    success,
    fail,
    reset,
  };
};