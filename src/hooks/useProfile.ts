'use client';

import { useCallback, useState } from 'react';
import { type Student } from '@/types';

export interface UseProfileResult {
  student: Student;
  isSaving: boolean;
  updateProfile: (updates: Partial<Pick<Student, 'name' | 'avatarUrl'>>) => Promise<void>;
}

export function useProfile(initialStudent: Student): UseProfileResult {
  const [student, setStudent] = useState<Student>(initialStudent);
  const [isSaving, setIsSaving] = useState(false);

  const updateProfile = useCallback(
    async (updates: Partial<Pick<Student, 'name' | 'avatarUrl'>>) => {
      setIsSaving(true);
      await new Promise((resolve) => setTimeout(resolve, 500));
      setStudent((prev) => ({ ...prev, ...updates }));
      setIsSaving(false);
    },
    [],
  );

  return { student, isSaving, updateProfile };
}
