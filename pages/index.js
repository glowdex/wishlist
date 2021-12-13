import Link from 'next/link'
import ItemCard from '../components/item-card'

export default function Home() {
  return (
    <div className="md:grid md:grid-cols-2">
      <div className="md:col-span-1 px-20 py-36">
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
      <div className="my-20 md:col-span-1 flex justify-center items-center">
        <div className="default-card px-0 py-6"> 
          <div className="flex px-10 mb-3">
            <div className="w-14">
              <div className="w-14 h-14 bg-rose-50 rounded-full pt-1 text-3xl flex items-center justify-center">🐰</div>
            </div>
            <div className="ml-5">
              <h3 className="text-lg font-bold">@glossjelly8</h3>
              <p className="text-gray-500 text-sm">5 items</p>
            </div>
          </div>
          <ItemCard product_name="Glam Change Multi Palette 04 UNICORN PINK" brand_name="A.Black" img="https://m.media-amazon.com/images/I/71p96zYLAsL._SY355_.jpg" />
          <ItemCard product_name="Faded Serum for Dark Spots & Discoloration" brand_name="Topicals" img="https://www.sephora.com/productimages/sku/s2457042-main-zoom.jpg?imwidth=630" />
          <ItemCard product_name="Lip Glow 001 Pink" brand_name="DIOR" img="https://m.media-amazon.com/images/I/61ECdMZyAqL._SL1500_.jpg" />
          <ItemCard product_name="Hydro Boost Water Gel" brand_name="Neutrogena" img="https://ntg-catalog.imgix.net/products/6811047-pack-2101-2.jpg?w=1200&h=1443&sfrm=jpg&fit=crop" />
          <ItemCard product_name="Ink V Shading #1 Almond Brown" brand_name="PERIPERA" img="https://cdn.shopify.com/s/files/1/0087/3539/1806/products/Peripera_ink_v_shading_9.5g_2_types.jpg?v=1584962875" />
        </div>
      </div>
    </div>
    )
  }