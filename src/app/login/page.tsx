'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? 'Login gagal');
        return;
      }
      const role = data.user.role as string;
      router.push(role === 'student' ? '/student' : '/admin');
      router.refresh();
    } catch {
      setError('Terjadi kesalahan jaringan');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-dvh flex items-center justify-center bg-[var(--color-primary-lighter)] px-4">
      <div className="w-full max-w-[400px] bg-white rounded-[var(--border-radius-lg)] shadow-[var(--shadow-md)] p-6">
        <div className="text-center mb-6">
          <span className="text-4xl" aria-hidden="true">
            ♻️
          </span>
          <h1 className="text-xl font-bold text-[var(--color-primary-dark)] mt-2 mb-0">
            Masuk ke Sirkula
          </h1>
          <p className="text-sm text-[var(--color-neutral-500)] mt-1">
            Kelola sampah, kumpulkan poin
          </p>
        </div>

        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <Input
            label="Email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="nama@email.com"
          />
          <Input
            label="Password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
          />
          {error && <p className="text-sm text-[var(--color-danger)] -mt-2">{error}</p>}
          <Button
            label={isSubmitting ? 'Masuk...' : 'Masuk'}
            type="submit"
            variant="primary"
            fullWidth
            loading={isSubmitting}
          />
        </form>

        <p className="text-sm text-center text-[var(--color-neutral-500)] mt-5">
          Belum punya akun?{' '}
          <Link href="/register" className="text-[var(--color-primary)] font-semibold">
            Daftar sebagai siswa
          </Link>
        </p>
      </div>
    </div>
  );
}
