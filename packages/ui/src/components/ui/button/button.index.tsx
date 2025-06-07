import * as React from 'react';
import { Slot } from '@/components/slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

const buttonVariants = cva(
  [
    'inline-flex items-center justify-center font-medium transition-all',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50',
    'active:translate-x-[2px] active:translate-y-[2px]',
    'border border-black select-none',
  ].join(' '),
  {
    variants: {
      variant: {
        default:
          'bg-yellow-300 text-black shadow-[4px_4px_0px_black] hover:bg-yellow-400 focus-visible:ring-yellow-300',
        outline:
          'bg-white text-black border-2 shadow-[4px_4px_0px_black] hover:bg-gray-50 focus-visible:ring-gray-200',
        ghost:
          'bg-transparent text-black border-none hover:bg-gray-100 focus-visible:ring-gray-200',
        destructive:
          'bg-red-500 text-white shadow-[4px_4px_0px_black] hover:bg-red-600 focus-visible:ring-red-500',
        success:
          'bg-green-500 text-white shadow-[4px_4px_0px_black] hover:bg-green-600 focus-visible:ring-green-500',
        link: 'bg-transparent text-blue-600 underline-offset-4 hover:underline focus-visible:ring-blue-500 border-none shadow-none',
      },
      size: {
        sm: 'h-8 px-3 text-sm rounded-md',
        md: 'h-10 px-4 text-base rounded-md',
        lg: 'h-12 px-6 text-lg rounded-md',
        icon: 'h-10 w-10 p-0 rounded-md',
      },
      isLoading: {
        true: 'relative text-transparent transition-none hover:text-transparent',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      isLoading: false,
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** Whether to render as a child component using Slot */
  asChild?: boolean;
  /** Whether the button is in a loading state */
  isLoading?: boolean;
  /** Optional icon to show before the button text */
  leftIcon?: React.ReactNode;
  /** Optional icon to show after the button text */
  rightIcon?: React.ReactNode;
  /** Optional aria-label for icon-only buttons */
  'aria-label'?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      isLoading = false,
      disabled,
      type = 'button',
      leftIcon,
      rightIcon,
      children,
      'aria-label': ariaLabel,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'button';
    const isIconOnly = size === 'icon' && !children;

    // Ensure icon-only buttons have an aria-label
    if (isIconOnly && !ariaLabel) {
      console.warn(
        'Button: Icon-only buttons should have an aria-label for accessibility',
      );
    }

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, isLoading }), className)}
        ref={ref}
        disabled={disabled || isLoading}
        type={type}
        aria-label={isIconOnly ? ariaLabel : undefined}
        {...props}
      >
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="h-4 w-4 animate-spin text-current" />
          </div>
        )}
        {leftIcon && !isLoading && (
          <span className="mr-2 inline-flex">{leftIcon}</span>
        )}
        {children}
        {rightIcon && !isLoading && (
          <span className="ml-2 inline-flex">{rightIcon}</span>
        )}
      </Comp>
    );
  },
);

Button.displayName = 'Button';

export { Button, buttonVariants };
