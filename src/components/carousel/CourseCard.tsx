// CourseCard.tsx or wherever it is defined

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  gender: string;
  inventory: number;
}

export const CourseCard: React.FC<{ product: Product }> = ({ product }) => {
  return (
    <article className="rounded-md bg-slate-200 drop-shadow-md w-full cursor-pointer hover:-translate-y-2 transition ease-out hover:delay-75 hover:shadow-md">
      <div className="p-4">
        <div>
          <img
            src="https://esuhai.vn/upload/fck_new/image/4Nursery/SONG%20&%20LV%20TAI%20NB/2022/T5/van-hoa-nhat-ban-esuhai-kaizen-ca-koi-2.jpg"
            alt={product.name}
          />
        </div>
        <div className="flex justify-between my-3">
          <div>
            <span>{product.inventory} in stock</span>
          </div>
          <div>
            <i className="fa-solid fa-ellipsis-vertical cursor-pointer"></i>
          </div>
        </div>
        <h3 className="font-semibold">{product.name}</h3>
        <div className="my-2">
          <span className="font-light text-xs">{product.gender}</span>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-xs">
            By <span className="font-medium">Koi Farm</span>
          </p>
          <i className="fa-solid fa-cart-plus ml-14 cursor-pointer"></i>
          <span>${product.price}</span>
        </div>
      </div>
    </article>
  );
};
