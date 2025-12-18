import { redirect } from 'next/navigation';

export default function ProductsIndexPage() {
    redirect('http://localhost:3000/products/mountain');
}