import { redirect } from 'next/navigation';

export default function ProductsIndexPage() {
    redirect('http://172.16.250.24:3000/products/mountain');
}