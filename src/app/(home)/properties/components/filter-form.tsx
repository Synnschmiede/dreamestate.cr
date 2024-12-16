'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const FilterForm = ({ searchParams }: { searchParams: any }) => {
  const router = useRouter();

  const [userId, setUserId] = useState(searchParams.userId || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (userId) params.set('userId', userId);
    router.push(`/properties?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search by name or location"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />

      <button type="submit">Filter</button>
    </form>
  );
};

export default FilterForm;
