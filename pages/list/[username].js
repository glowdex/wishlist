import { useState, useEffect } from 'react'
import { supabase } from '../../client'
import { useRouter } from 'next/router'
import ItemCard from '../../components/item-card'

export default function MyList() {
  const router = useRouter()
  const { username } = router.query 
  const [list, setList] = useState([])
  const [count, setCount] = useState(null);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    if(!router.isReady) return
    fetchList(username)
  }, [router.isReady])
  
  async function fetchList(username) {
    console.log(username)
    try {
      let { data: listData, error: listError, count:countData } = await supabase
        .from('map_with_info')
        .select('*', {count:'exact'})
        .eq('username', username)
        .order('brand_name', {ascending: true})
      
      if (listError) {
        throw listError
      } 
      setList(listData)
      setCount(countData)
      setLoading(false)
    } catch (error){
      console.log(error)
    }
  }


  return (
    <div className="h-screen overflow-scroll" style={{backgroundColor: ((!loading && list.length > 0) ? list[0].color : "#F5F5F4")}}>
    <div className="default-bg">
      <div className="default-card p-0 pb-5">
        <div className="pt-10 px-10 flex justify-between">
          <div>
            <h2 className="default-header mb-1">@{username}&apos;s list ✨</h2>
            <p className="text-sm text-gray-500 mb-3"> {count&&count} items (sorted A-Z by brand) </p>
          </div>
        </div>
        { !loading && 
        <ul className="flex flex-col divide divide-y">
          {list.length > 0 
            ? list.map((item, key) => {
            return (
              <div className="grid grid-cols-8" key={key}>
                <div className='col-span-7'>
                  <ItemCard product_name={item.product_name} brand_name={item.brand_name} img={item.image_url} />
                </div>
              </div>
            )})
            : <div className="py-3 px-10">
                <p className="text-gray-500 italic text-sm"> no items yet! </p>
              </div>
          }
        </ul>
        }
      </div>
    </div>
    </div>
  )
}
