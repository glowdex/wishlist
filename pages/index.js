import Link from 'next/link'

export default function Home() {
  return (
    <div className="md:grid md:grid-cols-2 py-36">
      <div className="md:col-span-1 px-20">
        <span className="w-20 h-2 bg-pink-200 dark:bg-white mb-12">
        </span>
        <h1 className="text-6xl font-bold mb-6">
          a list of pretty things ✨
        </h1>
        <p className="text-sm sm:text-base text-gray-700 dark:text-white">
          a simple, no-fuss, live updating wishlist and inventory list for beauty lovers. <br/>
          perfect to put on your profile for the holidays! 🎁
        </p>
        <div className="flex mt-8">
            <Link href="/sign-in">
            <button className="button rounded-lg">
                create your own </button>
            </Link>
        </div>  
      </div>
      <div className="my-20 md:my-0 md:col-span-1 px-10 flex justify-center">
        <div className="default-card"> examplesldkfjslkdjflsdkjfslkdjflskjdf </div>
      </div>
    </div>
    )
  }