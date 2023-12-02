import React from 'react'
import { getProductById } from '../../../lib/actions'
import { redirect } from 'next/navigation'
import Image from 'next/image'
import { Product } from '../../../types'
import Link from 'next/link'

type Props = {
  params: { id: string }
}

async function ProductDetails({ params: { id } }: Props) {
  const product = await getProductById(id)

  if (!product) redirect('/');

  return (
    <div className='product-container'>
      <div className='flex gap-28 xl:flex-row flex-col'>
        <div className='product-image'>
          <Image
            src={product.image}
            alt={product.title}
            width={580}
            height={400}
            className='mx-auto'
          />
        </div>

        <div className="flex-1 flex flex-col">
          <div className="flex justify-between items-start gap-5 flex-wrap pb-6">
            <div className="flex flex-col gap-3">
              <p className="text-[28px] text-secondary font-semibold">
                {product.title}
              </p>

              <Link href={product.url} target='_blank' className='text-base text-black opacity-50'>
                Visit Product
              </Link>
            </div>

            <div className="flex items-cetner gap-3">
              <div className="product-hearts">
                <Image 
                  src="/assets/icons/red-heart.svg"
                  alt='heaert'
                  width={20}
                  height={20}
                />

                <p className='text-base font-semibold text-[#D46F77]'>{product.reviewsCount}</p>
              </div>
            </div>

          </div>
        </div>
      </div>

    </div>
  )
}

export default ProductDetails