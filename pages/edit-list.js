import { useState, useEffect } from 'react'
import { supabase } from '../client'
import { useRouter } from 'next/router'
import Link from 'next/link'
import ItemCard from '../components/item-card'
import {TiDelete} from 'react-icons/ti'
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import toast from 'react-hot-toast'

export default function EditList({ user }) {
  const [list, setList] = useState([])
  const [options, setOptions] = useState([])
  const [insertions, setInsertions] = useState([])
  const [deletions, setDeletions] = useState([])
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setLoading(true)
    fetchList()
    fetchOptions()
    setLoading(false)
  }, [])
  
  async function fetchList() {
    try {
      let { data: listData, error: listError } = await supabase
        .from('map_with_info')
        .select('*')
        .eq('owner', user.id)
        .order('brand_name', {ascending: true})
      
      if (listError) {
        throw listError
      } 
      setList(listData)
    } catch (error){
      console.log(error)
    }
  }

  async function fetchOptions() {
    try {
      let { data: optionData, error: optionError } = await supabase
        .from('products')
        .select('*')
      
      if (optionError) {
        throw optionError
      } 

      setOptions(optionData)

    } catch (error){
      console.log(error)
    }
  }

  async function updateList() {
    setLoading(true)
    try {
      const inserts = insertions.map(item => ({owner:user.id, product_id:item.id }))

      let { error:insertError } = await supabase
        .from('product_list_map')
        .upsert(inserts, {returning:'minimal'})
      
      if (insertError) {
        throw insertError
      } 

      let { error:deleteError } = await supabase
        .from('product_list_map')
        .delete()
        .in('id', deletions)
      
      if (deleteError) {
        throw deleteError
      } 

      toast.success("Saved your edits!")

    } catch (error){
      toast.error(error.message)
    }
  }


  const handleOnSelect = (item) => {
    setList([item, ...list])
    setInsertions([...insertions, item])
    setOptions(options.filter(a => a.id !== item.id))
  }

  function handleDelete(item) {
    if (item.map_id) {
      setDeletions([...deletions, item.map_id])
    }
    setList(list.filter(a => a.id !== item.id))
  }

  return (
    <div className="default-bg">
      <div className="default-card p-0 pb-5">
        <div className="pt-10 pl-10 pr-5 flex justify-between">
          <div>
            <h2 className="default-header mb-2">edit wishlist</h2>
            <p className="text-sm mb-3"> add items to your wishlist! </p>
            <p className="text-xs"> if you can&apos;t find what you&apos;re looking for, </p>
            <Link href="/create-item"><p className="underline cursor-pointer text-xs mb-3">create new items here</p></Link>
          </div>
          <div className="">
            <button onClick={updateList} className="button loading:bg-gray-100" disabled={loading}> save </button>
          </div>
        </div>
        <div className="p-3">
          <ReactSearchAutocomplete items={options} onSelect={handleOnSelect} fuseOptions={{ keys: ["product_name", "brand_name"]}} resultStringKeyName="full_name" /> 
        </div>

        <ul className="flex flex-col divide divide-y">
          {list.length > 0 
            ? list.map((item, key) => {
            return (
              <div className="grid grid-cols-8" key={key}>
                <div className='col-span-7'>
                  <ItemCard product_name={item.product_name} brand_name={item.brand_name} img={item.image_url} />
                </div>
                <div className="flex justify-center items-center">
                  <button onClick={()=>handleDelete(item)}>
                    <TiDelete size='24px' />
                  </button>
                </div>
              </div>
            )})
            : <div className="py-3 px-10">
                <p className="text-gray-500 italic text-sm"> no items yet! </p>
              </div>
            }


        </ul>
      </div>
    </div>
  )
}

export async function getServerSideProps({ req }) {
  const { user } = await supabase.auth.api.getUserByCookie(req)

  if (!user) {
    return { props: {}, redirect: { destination: '/' } }
  }

  return { props: { user } }
} 

