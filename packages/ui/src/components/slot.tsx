import * as React from 'react';

type SlotProps = {
  children?: React.ReactNode;
  asChild?: boolean;
} & React.HTMLAttributes<HTMLElement>;

type SlotComponent = React.ForwardRefExoticComponent<
  SlotProps & React.RefAttributes<HTMLElement>
>;

type ElementWithRef = {
  ref?: React.Ref<HTMLElement>;
} & React.ReactElement;

export const Slot: SlotComponent = React.forwardRef<HTMLElement, SlotProps>(
  (props, forwardedRef) => {
    const { children, asChild = false, ...rest } = props;

    // If asChild is false, just render children as is
    if (!asChild) {
      return <>{children}</>;
    }

    // Ensure we have a valid React element
    const child = React.Children.only(children);
    if (!React.isValidElement(child)) {
      return <>{children}</>;
    }

    // Get the child's props and ref with proper typing
    const childProps = child.props as React.HTMLAttributes<HTMLElement>;
    const childRef = (child as ElementWithRef).ref;

    // Clone the child element with merged props and refs
    return React.cloneElement(child, {
      ...childProps,
      ...rest,
      ref: forwardedRef ? mergeRefs([forwardedRef, childRef]) : childRef,
    } as React.HTMLAttributes<HTMLElement>);
  },
);

Slot.displayName = 'Slot';

function mergeRefs<T>(
  refs: Array<React.Ref<T> | undefined>,
): React.RefCallback<T> {
  return (value: T) => {
    refs.forEach((ref) => {
      if (typeof ref === 'function') {
        ref(value);
      } else if (ref != null) {
        (ref as React.RefObject<T>).current = value;
      }
    });
  };
}
