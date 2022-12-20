import React, { forwardRef, ReactNode, Ref } from 'react';
// import * as React from 'react'
import { Helmet } from 'react-helmet';

type Props = {
  title: String;
  description?: String;
  children: ReactNode;
  className: string;
};

const Page = forwardRef(
  (
    { title, description, children, className }: Props,
    ref: Ref<HTMLDivElement>,
  ) => {
    return (
      <div ref={ref} className={className}>
        <Helmet>
          <title>Order Now - {title}</title>
          {description && description !== '' && (
            <meta name="description" content={`${description}`} />
          )}
        </Helmet>
        {children}
      </div>
    );
  },
);

export default Page;
