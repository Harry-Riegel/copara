import React, { useState } from 'react';

/**
 * Copara Input — web port of src/components/ui/Input.tsx (parentingapp).
 * Sand fill, hairline border; 2px Wald focus; 2px clay error (never red).
 */
export function Input({
  label,
  error,
  value,
  onChange,
  placeholder,
  type = 'text',
  style,
  inputStyle,
}) {
  const [focused, setFocused] = useState(false);
  const border = error
    ? '2px solid var(--clay-500)'
    : focused
    ? '2px solid var(--wald-500)'
    : '1px solid var(--sand-200)';
  // keep height stable between 1px and 2px borders
  const pad = error || focused ? 'calc(var(--space-4) - 1px)' : 'var(--space-4)';
  return (
    <div style={{ display: 'flex', flexDirection: 'column', ...style }}>
      {label && (
        <label
          style={{
            fontFamily: 'var(--font-body)',
            fontWeight: 'var(--weight-body-medium)',
            fontSize: 'var(--text-sm-size)',
            lineHeight: 'var(--text-sm-line)',
            color: 'var(--ink-600)',
            marginBottom: 'var(--space-1)',
          }}
        >
          {label}
        </label>
      )}
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          height: 'var(--control-md)',
          padding: '0 ' + pad,
          borderRadius: 'var(--radius-sm)',
          background: 'var(--sand-0)',
          border,
          outline: 'none',
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--text-base-size)',
          color: 'var(--ink-900)',
          boxSizing: 'border-box',
          width: '100%',
          ...inputStyle,
        }}
      />
      {error && (
        <div
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-sm-size)',
            lineHeight: 'var(--text-sm-line)',
            color: 'var(--clay-500)',
            marginTop: 'var(--space-1)',
          }}
        >
          {error}
        </div>
      )}
    </div>
  );
}
