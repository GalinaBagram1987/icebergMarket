'use client';
import type { NextErrorProps } from '@/shared/ui/errorRender';
import { ErrorRender } from '@/shared/ui/errorRender';

const ErrorPage = (props: NextErrorProps) => {
  return <ErrorRender {...props} />;
};

export default ErrorPage;
