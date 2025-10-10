import {
  BookOpen,
  CircleCheck,
  CircleX,
  Info,
  Lightbulb,
  StickyNote,
  TriangleAlert,
} from 'lucide-react';
import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';

import { cn } from '../lib/cn';

type BaseCalloutType = 'info' | 'warning' | 'error' | 'success';
type ExtraCalloutType = 'note' | 'obs' | 'example' | 'tip' | 'def';
type NormalizedType = BaseCalloutType | ExtraCalloutType;

type CalloutProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  'title' | 'type' | 'icon'
> & {
  title?: ReactNode;
  type?: NormalizedType | 'warn';
  icon?: ReactNode;
};

const iconClass = 'size-5 -me-0.5 fill-(--callout-color) text-fd-card';

const iconByType: Record<NormalizedType, ReactNode> = {
  info: <Info className={iconClass} />,
  warning: <TriangleAlert className={iconClass} />,
  error: <CircleX className={iconClass} />,
  success: <CircleCheck className={iconClass} />,
  note: <StickyNote className={iconClass} />,
  obs: <StickyNote className={iconClass} />,
  example: <BookOpen className={iconClass} />,
  tip: <Lightbulb className={iconClass} />,
  def: <Info className={iconClass} />,
};

const toneByType: Record<NormalizedType, BaseCalloutType> = {
  info: 'info',
  warning: 'warning',
  error: 'error',
  success: 'success',
  note: 'info',
  obs: 'info',
  example: 'success',
  tip: 'success',
  def: 'info',
};

const defaultTitleByType: Record<NormalizedType, string> = {
  info: 'Informație',
  warning: 'Atenție',
  error: 'Eroare',
  success: 'Succes',
  note: 'Notă',
  obs: 'Observație',
  example: 'Exemplu',
  tip: 'Sfat',
  def: 'Definiție',
};

export const Callout = forwardRef<HTMLDivElement, CalloutProps>(
  ({ className, children, title, type = 'info', icon, style, ...props }, ref) => {
    let currentType = type;
    if (currentType === 'warn') currentType = 'warning';

    if (!(currentType in iconByType)) {
      currentType = 'info';
    }

    const normalizedType = currentType as NormalizedType;
    const tone = toneByType[normalizedType];
    const resolvedTitle = title ?? defaultTitleByType[normalizedType];

    return (
      <div
        ref={ref}
        className={cn(
          'flex gap-2 my-4 rounded-xl border bg-fd-card p-3 ps-1 text-sm text-fd-card-foreground shadow-md',
          className,
        )}
        {...props}
        style={
          {
            '--callout-color': `var(--color-fd-${tone}, var(--color-fd-muted))`,
            ...style,
          } as object
        }
      >
        <div role="none" className="w-0.5 bg-(--callout-color)/50 rounded-sm" />
        {icon ?? iconByType[normalizedType]}
        <div className="flex flex-col gap-2 min-w-0 flex-1">
          {resolvedTitle && (
            <p className="font-medium leading-tight !my-0">{resolvedTitle}</p>
          )}
          <div className="text-fd-muted-foreground prose-no-margin empty:hidden">
            {children}
          </div>
        </div>
      </div>
    );
  },
);

Callout.displayName = 'Callout';
