import { useState } from 'react'
import { supabase } from '../client'
import ItemCard from '../components/item-card'
import toast from 'react-hot-toast'

export default function Protected({ user }) {
  const [productName, setProductName] = useState('')
  const [brandName, setBrandName] = useState('')
  const [imgUrl, setImgUrl] = useState('')
  const [loading, setLoading] = useState(false)

  async function createProduct(e){
    e.preventDefault()
    setLoading(true)
    try {
      let fullName = brandName + ' ' + productName

      const updates = {
        product_name: productName,
        brand_name: brandName,
        image_url: imgUrl, 
        full_name: fullName,
        created_at: new Date()
      }

      let { error:insertError } = await supabase
        .from('products')
        .upsert(updates, {returning:'minimal'})
      
      if (insertError) {
        throw insertError
      } 

      toast.success("Created " + fullName + "!")
      //reset all of them in case they want to make more
      setProductName('')
      setBrandName('')
      setImgUrl('')
      setLoading(false)
    } catch (error){
      toast.error(error.message)
    }
  }

  return (
    <div className="default-bg">
      <div className="default-card">
        <h2 className="default-header mb-2">create items</h2>
        <p className="text-xs mb-5"> new items will become searchable to all users! please be nice :)</p>

        <form onSubmit={createProduct}>
          <div className="mb-5">
            <input onChange={e => setProductName(e.target.value)}
              type="text" className="default-input w-full mb-3" placeholder="product name"/>
            <input onChange={e => setBrandName(e.target.value)}
              type="text" className="default-input w-full mb-3" placeholder="brand name"/>
            <input onChange={e => setImgUrl(e.target.value)}
              type="text" className="default-input w-full" placeholder="link to an image"/>
          </div>
          <p className="text-xs">preview:</p>
          <ItemCard product_name={productName} brand_name={brandName} img={imgUrl} />
          <div className="flex justify-center">
            <button type="submit" disabled={loading} className="button-secondary py-3 mt-3">save</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export async function getServerSideProps({ req }) {
  const { user } = await supabase.auth.api.getUserByCookie(req)

  if (!user) {
    return { props: {}, redirect: { destination: '/sign-in' } }
  }

  return { props: { user } }
}