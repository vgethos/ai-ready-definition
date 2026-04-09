/**
 * EDS v2 adapter — typed wrappers for prototype-specific prop interfaces.
 * EDS v2 2.0.0 is now React 19 native; wrappers here keep prototype imports clean.
 * Import EDS components from here, not directly from the package.
 */
import React from 'react';
import * as EDS from '@getethos/ethos-design-system-v2';

type ButtonVariant =
  | 'primary'
  | 'primaryDark'
  | 'primaryDarkOutline'
  | 'primaryInverted'
  | 'secondary'
  | 'secondaryOutline'
  | 'whiteOutline'
  | 'clover'
  | 'cloverOutline'
  | 'link';

type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  buttonTitle: string;
  variant: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  trailingIcon?: string;
  leadingIcon?: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const EdsButton = EDS.Button as any;

export function Button(props: ButtonProps) {
  return <EdsButton {...props} />;
}

// Re-export other EDS components with same pattern as needed
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const EdsProgressBar = EDS.ProgressBar as any;
export function ProgressBar(props: Record<string, unknown>) {
  return <EdsProgressBar {...props} />;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const EdsIcon = EDS.Icon as any;
export function Icon(props: { name: string; sx?: Record<string, unknown> }) {
  return <EdsIcon {...props} />;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const EdsBadge = EDS.Badge as any;
export function Badge(props: Record<string, unknown>) {
  return <EdsBadge {...props} />;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const EdsInput = EDS.Input as any;
export function Input(props: Record<string, unknown>) {
  return <EdsInput {...props} />;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const EdsModal = EDS.Modal as any;
export function Modal(props: Record<string, unknown>) {
  return <EdsModal {...props} />;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const EdsCheckboxInput = EDS.CheckboxInput as any;
export function CheckboxInput(props: Record<string, unknown>) {
  return <EdsCheckboxInput {...props} />;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const EdsRadioButton = EDS.RadioButton as any;
export function RadioButton(props: Record<string, unknown>) {
  return <EdsRadioButton {...props} />;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const EdsSpinner = EDS.Spinner as any;
export function Spinner(props: Record<string, unknown> = {}) {
  return <EdsSpinner {...props} />;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const EdsAccordion = EDS.Accordion as any;
export function Accordion(props: Record<string, unknown>) {
  return <EdsAccordion {...props} />;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const EdsBanner = EDS.Banner as any;
export function Banner(props: Record<string, unknown>) {
  return <EdsBanner {...props} />;
}
