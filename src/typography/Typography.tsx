// components/Typography.tsx

import React, { ElementType, ReactNode } from 'react';
import clsx from 'clsx';

type HeadingVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'd1' | 'd2' | 'd3' | 'd4';

type BodyVariant = 'b1' | 'b2'| 'b3'| 'b4' | 'subtitle';

type ButtonVariant = 'btn-primary' | 'btn-tertiary' | 'btn-pills' | 'btn-time';



type SpecialVariant = 'gather-h1';
type Variant = HeadingVariant | BodyVariant | ButtonVariant | SpecialVariant;

type FontWeight = 'bold' | 'semi-bold' | 'medium' | 'regular' | 'helloat';

interface TypographyProps {
  variant?: Variant;
  weight?: FontWeight;
  component?: ElementType;
  className?: string;
  children?: ReactNode;
  [key: string]: any;
}

const Typography: React.FC<TypographyProps> = ({
  variant = 'b1',
  weight = 'regular',
  component: Component = 'p',
  className = '',
  children,
  ...props
}) => {
  // Variant to class mapping
  const variantClasses: Record<Variant, string> = {
    h1: 'text-[32px] leading-[42px]',
    h2: 'text-[28px] leading-[40px]',
    h3: 'text-[24px] leading-[34px]',
    h4: 'text-[20px] leading-[28px]',
    d1: 'text-[32px] leading-[42px] lg:text-[56px] lg:leading-[70px]',
    d2: 'text-[28px] leading-[38px] lg:text-[48px] lg:leading-[60px]',
    d3: 'text-[24px] leading-[34px] lg:text-[42px] lg:leading-[55px]',

    d4: 'text-[20px] leading-[28px] lg:text-[32px] lg:leading-[40px]',

    b1: 'text-[16px] leading-[24px]',
    b2: 'text-[14px] leading-[22px]',
    b3: 'text-[12px] leading-[20px]',
    b4: 'text-[9px] leading-[18px]',
    subtitle: 'text-[14px] leading-[18px]',
    'btn-primary': 'text-[16px] leading-[22px] tracking-[0.04em]',
    'btn-tertiary': 'text-[14px] leading-[21px] tracking-[0.04em]',
    'btn-pills': 'text-[12px] leading-[10px] tracking-[0.04em]',
    'btn-time': 'text-[10px] leading-[8px] tracking-[0.04em]',



    'gather-h1': 'text-[32px] leading-[32px]',
  };
  

  // Weight to class mapping
  const weightClasses: Record<FontWeight, string> = {
    'bold': 'font-bold',
    'semi-bold': 'font-semibold',
    'medium': 'font-medium',
    'regular': 'font-normal',
    'helloat': 'font-bold'
  };

  // Determine the HTML element if not specified
  if (!props.component) {
    const variantToTag: Partial<Record<Variant, ElementType>> = {
      h1: 'h1',
      h2: 'h2',
      h3: 'h3',
      h4: 'h4',
      d1: 'h1',
      d2: 'h2',
      d3: 'h3',
      d4: 'h4',
      'btn-primary': 'span',
      'btn-tertiary': 'span',
      'btn-pills': 'span',
      'btn-time': 'span',

      'gather-h1': 'h1',
      b1: 'p',
      b2: 'p',
      subtitle: 'p',
    };
  
    Component = variantToTag[variant] || 'p';
  }
  

  return (
    <Component 
      className={clsx(
        variantClasses[variant],
        weightClasses[weight],
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
};

// Helper components for specific typography cases
export const H1 = (props: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="h3" {...props} />
);

export const H2 = (props: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="h2" {...props} />
);

export const B1 = (props: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="b1" {...props} />
);

export const PrimaryButtonText = (props: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="btn-primary" weight="bold" {...props} />
);

export const GatherHeading = (props: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="gather-h1" {...props} />
);

export const D1 = (props: Omit<TypographyProps, 'variant'>) => (
    <Typography variant="d1" {...props} />
  );
  
  export const D2 = (props: Omit<TypographyProps, 'variant'>) => (
    <Typography variant="d2" {...props} />
  );
  
  export const D3 = (props: Omit<TypographyProps, 'variant'>) => (
    <Typography variant="d3" {...props} />
  );
  
  export const D4 = (props: Omit<TypographyProps, 'variant'>) => (
    <Typography variant="d4" {...props} />
  );
  

export default Typography;