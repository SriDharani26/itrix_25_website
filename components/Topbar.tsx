'use client'

import React from 'react'
import usePageStore from '@/stores/pageStore'
import Link from 'next/link'

const Topbar = () => {
  const { store, remove } = usePageStore()

  return (
    <div className="w-full h-10 fixed min-[800px]:top-14 z-50 flex items-center backdrop-blur-3xl border-b border-three
                    overflow-x-auto gap-1 no-scrollbar">

		{store.map((item) => (
			<div
				key={item.path}
				className="h-full w-36 flex items-center bg-one rounded-sm 
							backdrop-blur-2xl text-sm text-twelve group"
			>
			<Link
				href={item.path}
				title={item.name}
				className="flex-1 px-3 truncate flex items-center"
			>
				{item.name}
			</Link>

			{item.path !== '/' && (
				<button
				onClick={(e) => {
					e.preventDefault()
					e.stopPropagation()
					remove(item.path)
				}}
				className="px-2 text-ten hover:text-five transition cursor-crosshair"
				>
					X
				</button>
			)}
			</div>
		))}
    </div>
  )
}

export default Topbar