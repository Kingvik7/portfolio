/* This example requires Tailwind CSS v2.0+ */
import { PencilSquareIcon } from '@heroicons/react/24/outline'
import { ClipboardIcon } from '@heroicons/react/24/outline'
import { SocialIcon } from 'react-social-icons';

export default function Footer() {
  return (
    <div className="bg-white border-t py-10 mt-24 mx-4 max-w-5xl xl:mx-auto inset-x-0 md:mx-12 lg:mx-24 mt-6 px-2 z-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-xl text-center font-semibold text-blue-400 ">Get in Touch!</h2>
          <p className="mt-1 text-2xl font-bold text-center tracking-tight text-gray-900">
            hello@vikrantgurav.com
          </p>
          <div className='flex flex-row mt-1 justify-center gap-4'>
            <PencilSquareIcon className='w-6 text-xl text-gray-500 hover:text-gray-900'/>
            <ClipboardIcon className='w-6 text-xl text-gray-500 hover:text-gray-900'/>
          </div>
          <h2 className="text-xl text-center font-semibold text-orange-300 mt-4">
            or you can find me here!
          </h2>
          <div className='flex flex-row mt-1 justify-center gap-2'>
            <PencilSquareIcon className='w-6 text-xl text-gray-500 hover:text-gray-900'/>
            <PencilSquareIcon className='w-6 text-xl text-gray-500 hover:text-gray-900'/>
          </div>
        </div>
      </div>
    </div>
  )
}