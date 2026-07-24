'use client';

interface RadioOption {
  label: string;
  value: string;
}

interface RadioButtonGroupProps {
  name: string;
  options: RadioOption[];
  value: string;
  onChange: (value: string) => void;
  label?: string;
}

export function RadioButtonGroup({ name, options, value, onChange, label }: RadioButtonGroupProps) {
  return (
    <fieldset className="flex flex-col gap-2">
      {label && (
        <legend className="text-sm font-semibold text-[var(--color-neutral-700)] mb-1">
          {label}
        </legend>
      )}
      {options.map((opt) => (
        <label
          key={opt.value}
          htmlFor={`${name}-${opt.value}`}
          className="flex items-center gap-2 text-sm text-[var(--color-neutral-700)] select-none cursor-pointer min-h-[44px]"
        >
          <input
            id={`${name}-${opt.value}`}
            type="radio"
            name={name}
            value={opt.value}
            checked={value === opt.value}
            onChange={() => onChange(opt.value)}
            className="w-[18px] h-[18px] accent-[var(--color-primary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]"
          />
          {opt.label}
        </label>
      ))}
    </fieldset>
  );
}
