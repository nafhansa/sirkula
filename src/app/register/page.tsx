'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';

interface SchoolOption {
  id: string;
  name: string;
  city: string | null;
}

export default function RegisterPage() {
  const router = useRouter();
  const [schools, setSchools] = useState<SchoolOption[]>([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [schoolId, setSchoolId] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetch('/api/schools')
      .then((res) => res.json())
      .then((data) => {
        setSchools(data.schools ?? []);
        if (data.schools?.[0]) setSchoolId(data.schools[0].id);
      })
      .catch(() => setSchools([]));
  }, []);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!schoolId) {
      setError('Pilih sekolah terlebih dahulu');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, schoolId }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? 'Registrasi gagal');
        return;
      }
      router.push('/student');
      router.refresh();
    } catch {
      setError('Terjadi kesalahan jaringan');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-dvh flex items-center justify-center bg-[var(--color-primary-lighter)] px-4 py-8">
      <div className="w-full max-w-[400px] bg-white rounded-[var(--border-radius-lg)] shadow-[var(--shadow-md)] p-6">
        <div className="text-center mb-6">
          <span className="text-4xl" aria-hidden="true">
            🌱
          </span>
          <h1 className="text-xl font-bold text-[var(--color-primary-dark)] mt-2 mb-0">
            Daftar Akun Siswa
          </h1>
          <p className="text-sm text-[var(--color-neutral-500)] mt-1">
            Mulai kumpulkan poin dari sampahmu
          </p>
        </div>

        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <Input
            label="Nama Lengkap"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nama kamu"
          />
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
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Minimal 8 karakter"
          />

          <div className="flex flex-col gap-1">
            <label
              htmlFor="school"
              className="text-sm font-semibold text-[var(--color-neutral-700)]"
            >
              Sekolah <span className="text-[var(--color-danger)]">*</span>
            </label>
            <select
              id="school"
              required
              value={schoolId}
              onChange={(e) => setSchoolId(e.target.value)}
              className="w-full min-h-[48px] px-4 py-3 rounded-[var(--border-radius-md)] text-base border border-[var(--color-neutral-300)] bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)]"
            >
              <option value="" disabled>
                Pilih sekolah
              </option>
              {schools.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                  {s.city ? ` — ${s.city}` : ''}
                </option>
              ))}
            </select>
          </div>

          {error && <p className="text-sm text-[var(--color-danger)] -mt-2">{error}</p>}
          <Button
            label={isSubmitting ? 'Mendaftar...' : 'Daftar'}
            type="submit"
            variant="primary"
            fullWidth
            loading={isSubmitting}
          />
        </form>

        <p className="text-sm text-center text-[var(--color-neutral-500)] mt-5">
          Sudah punya akun?{' '}
          <Link href="/login" className="text-[var(--color-primary)] font-semibold">
            Masuk
          </Link>
        </p>
      </div>
    </div>
  );
}
