'use client';

import { useState } from 'react';
import { Breadcrumb } from '@/components/admin/Breadcrumb';
import { FilterQueryPanel, type BrandAuditFilters } from '@/components/admin/FilterQueryPanel';
import { BrandAuditReport } from '@/components/admin/BrandAuditReport';

const DEFAULT_FILTERS: BrandAuditFilters = {
  schools: [
    'SMAN 15 Bandung',
    'SMPN 3 Jakarta',
    'SMAN 5 Surabaya',
    'SMAN 22 Bandung',
    'SMAN 1 Malang',
  ],
  month: 'Juli 2026',
  brands: ['Aqua', 'Le Minerale'],
};

export default function BrandAuditPage() {
  const [filters, setFilters] = useState<BrandAuditFilters>(DEFAULT_FILTERS);

  return (
    <>
      <Breadcrumb
        items={[
          { label: 'Dashboard', href: '/admin' },
          { label: 'Reports', href: '/admin/reports/brand-audit' },
          { label: 'Brand Audit' },
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6 items-start">
        <FilterQueryPanel onApply={setFilters} />
        <BrandAuditReport filters={filters} />
      </div>
    </>
  );
}
