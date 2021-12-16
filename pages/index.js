import Head from 'next/head'
import Link from 'next/link'
import ItemCard from '../components/item-card'

export default function Home() {
  return (
    <div className="h-screen overflow-scroll">
    <Head>
      <title>The Get List.</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta
      property="og:image"
      content="https://blog.glowdexapp.com/wp-content/uploads/2021/12/sitepreview.png"/>
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@glowdexapp" />
      <meta name="twitter:creator" content="@glowdexapp" />
      <meta name="twitter:title" content="The Get List." />
      <meta name="twitter:description" content="a simple, no-fuss wishlist for beauty lovers. get a url to share on your profile for the holidays! 🎁" />
      <meta name="twitter:image" content="https://blog.glowdexapp.com/wp-content/uploads/2021/12/sitepreview.png" />
      <!-- Cloudflare Web Analytics --><script defer src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{"token": "5f652cf391a74430bdf5763d3942e975"}'></script><!-- End Cloudflare Web Analytics -->
    </Head>
    <div className="md:grid md:grid-cols-2 pt-12">
      <div className="md:col-span-1 px-8 sm:px-20 pt-36 pb-12 sm:py-36">
        <h1 className="text-7xl mb-6 font-display italic">
          the get list. 
        </h1>
        <p className="text-sm text-gray-700">
          a simple, no-fuss wishlist for beauty lovers. <br />
          get a url to share on your profile (perfect for the holidays! 🎄🎁)
        </p>
        <div className="flex mt-8">
            <Link href="/sign-in">
            <button className="button-secondary">
                create your own → </button>
            </Link>
        </div>  
        <div className="mt-12">
          <p className="text-sm inline">a project by </p><a href="https://www.instagram.com/glowdexapp/" target="_blank" rel="noopener noreferrer"><p className="underline cursor-pointer text-sm inline">@glowdexapp</p></a>
        </div>
        <div className="mt-1">
          <p className="text-xs inline">name by </p><a href="https://www.instagram.com/ice2ooo/" target="_blank" rel="noopener noreferrer"><p className="underline cursor-pointer text-xs inline">@ice2ooo</p></a> <p className="inline text-xs">♡</p>
        </div>
      </div>
      <div className="my-20 md:col-span-1 flex justify-center items-center">
        <div className="default-card px-0 py-6"> 
          <div className="flex px-10 mb-3">
            <div className="w-14">
              <div className="w-14 h-14 bg-rose-100 rounded-full pt-1 text-3xl flex items-center justify-center">🐰</div>
            </div>
            <div className="ml-5">
              <h3 className="text-lg font-bold">@glossjelly</h3>
              <p className="text-gray-500 text-sm">5 items</p>
            </div>
          </div>
          <ItemCard product_name="Glam Change Multi Palette 04 UNICORN PINK" brand_name="A.Black" img="https://m.media-amazon.com/images/I/71p96zYLAsL._SY355_.jpg" />
          <ItemCard product_name="Faded Serum for Dark Spots & Discoloration" brand_name="Topicals" img="https://www.sephora.com/productimages/sku/s2457042-main-zoom.jpg?imwidth=630" />
          <ItemCard product_name="Lip Glow 001 Pink" brand_name="DIOR" img="https://m.media-amazon.com/images/I/61ECdMZyAqL._SL1500_.jpg" />
          <ItemCard product_name="Hydro Boost Water Gel" brand_name="Neutrogena" img="https://i5.walmartimages.com/asr/8f92ecc1-a167-4e25-8ec5-999457f449a7.295f6134f6e5044cbce68401e68c2ca6.jpeg" />
          <ItemCard product_name="Ink V Shading #1 Almond Brown" brand_name="PERIPERA" img="https://cdn.shopify.com/s/files/1/0087/3539/1806/products/Peripera_ink_v_shading_9.5g_2_types.jpg?v=1584962875" />
        </div>
      </div>
    </div>
    </div>
    )
  }