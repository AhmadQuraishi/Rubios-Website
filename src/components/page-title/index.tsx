import React, { forwardRef, ReactNode, Ref } from 'react';
// import * as React from 'react'
import { Helmet } from 'react-helmet';

type Props = {
  title: String;
  children: ReactNode;
  className: string;
};

const Page = forwardRef(
  ({ title, children, className }: Props, ref: Ref<HTMLDivElement>) => {
    return (
      <div ref={ref} className={className}>
        <Helmet>
          <title>Order Now - {title}</title>
        </Helmet>
        {children}
      </div>
    );
  },
);

export default Page;
