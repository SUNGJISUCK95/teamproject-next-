import { ProductDetail } from '@/components/product/ProductDetail';
import {axiosGet} from "@/utils/dataFetch";

const getProductDetail = async(category,pid) => {
    const url = `/products/${category}/${pid}`;
    const data = await axiosGet(url);
    return data;
}

export default async function ProductDetailPage({ params }) {
    const { category, pid } = await params;

    const productData = await getProductDetail(category,pid);

    return (
        <ProductDetail product={productData}/>
    );
}