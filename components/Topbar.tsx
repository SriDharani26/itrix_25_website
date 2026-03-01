'use client'

import React from 'react'
import usePageStore from '@/stores/pageStore'
import Link from 'next/link'

const Topbar = () => {
  const store = usePageStore((state) => state.store)

  return (
	<div className="w-full h-10 sticky top-0 z-20 flex items-center bg-one
					overflow-x-auto gap-1">
		{store.map((item) => (
			<Link 
				key={item.path} 
				href={item.path}
				className='h-full px-3 w-36 truncate flex items-center bg-one hover:bg-two rounded-sm 
							backdrop-blur-2xl text-sm text-twelve'
			>
				{item.name}
			</Link>
		))}
		
	</div>
  )
}

export default Topbar