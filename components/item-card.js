function ItemCard(props) {
  const {product_name, brand_name, img} = props

  return ( 
    <li className="flex flex-row">
              <div className="select-none cursor-pointer flex flex-1 items-center p-4">
                  <div className="flex flex-col w-14 h-14 justify-center items-center mr-4">
                      <a href="" className="block relative">
                          <img alt="profil" src={img} className="mx-auto object-cover rounded-full h-14 w-14"/>
                      </a>
                  </div>
                  <div className="flex-1 pl-1 mr-16">
                      <div className="font-medium dark:text-white">
                          {product_name}
                      </div>
                      <div className="text-gray-600 dark:text-gray-200 text-sm">
                          {brand_name}
                      </div>
                  </div>
                  <div className="text-gray-600 dark:text-gray-200 text-xs">
                      
                  </div>
              </div>
          </li>
   );
}

export default ItemCard;