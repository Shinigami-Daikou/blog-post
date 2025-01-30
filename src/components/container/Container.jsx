import React from 'react'

function Container({children, mx = 'mx-auto', w = 'w-full', mxw = 'max-w-7xl', p = 'p-4'}) {
  return <div className={`${w} ${mxw} ${p} ${mx}`}>{children}</div>;
}

export default Container