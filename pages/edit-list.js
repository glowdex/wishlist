import { useState, useEffect } from 'react'
import { supabase } from '../client'
import { useRouter } from 'next/router'
import ItemCard from '../components/item-card'


export default function EditList({ user }) {
  const [list, setList] = useState([])
  const [options, setOptions] = useState([])
  const [query, setQuery] = useState('');
  const router = useRouter()

  const defaultOptions = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ]
  
  useEffect(() => {
    fetchList()
    fetchOptions()
  }, [])
  
  async function fetchList() {
    try {
      let { data: listData, error: listError } = await supabase
        .from('product_list_map')
        .select('id, product_id')
        .eq('owner', user.id)
      
      if (listError) {
        throw listError
      } 

      console.log(listData)
      setList(listData)
    } catch (error){
      console.log(error)
    }
  }

  async function fetchOptions(input) {
    try {
      let { data: optionData, error: optionError } = await supabase
        .from('products')
        .select('*')
        .textSearch('full_name', input, { config: 'english' })
      
      if (optionError) {
        throw optionError
      } 

      console.log(optionData)
      setOptions(optionData)
    } catch (error){
      console.log(error)
    }
  }

  return (
    <div className="default-bg">
      <div className="default-card p-0">
        <div className="p-10">
          <h2 className="default-header">edit wishlist</h2>
          <p className="text-sm text-gray-500"> add items to your wishlist! </p>
        </div>
        

        <ul className="flex flex-col divide divide-y">
          {list && list.map((item, key) => {
            return (
              <ItemCard key={key} product_name={item.product_name} brand_name={item.brand_name} img={item.image_url} />
            )
          })}


        </ul>
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