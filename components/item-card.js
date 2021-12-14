import Image from 'next/image'

function ItemCard(props) {
  const {product_name, brand_name, img} = props

  return ( 
    <li className="flex flex-row">
      <div className="flex flex-1 items-center py-4 px-6">
        <div className="flex flex-col w-14 h-14 justify-center items-center mr-4 ">
          { img 
            ? <img alt="product" src={img} className="mx-auto object-cover rounded-full h-14 w-14"/>
            : <div className="h-14 w-14 bg-stone-200 rounded-full"></div>
          }
        </div>
        <div className="flex-1 pl-1 mr-3">
            <div className="font-medium dark:text-white">
                {product_name}
            </div>
            <div className="text-gray-600 dark:text-gray-200 text-sm">
                {brand_name}
            </div>
        </div>
      </div>
    </li>
   );
}

export default ItemCard;