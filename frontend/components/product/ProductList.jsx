import React from 'react';
import '@/styles/product/productList.css';
import Link from 'next/link';

export async function ProductList({products =[]}) {

    const sortedProducts = products
        .slice()
        .sort((a, b) => parseInt(a.pid) - parseInt(b.pid));

    return (
        <div className="product-grid-container">
            {sortedProducts && sortedProducts.map((product) => (
                    <Link href={`/products/${product.category}/${product.pid}`} key={product.pid} className="product-card-link">
                        <div className="product-card">
                            <div className="product-card-image">
                                <img src={product.image} alt={product.name} />
                            </div>
                            <div className="product-card-info">
                                <h4 className="product-name" >{product.name}</h4>
                                <p className="product-price">{parseInt(product.price).toLocaleString()}원</p>
                            </div>
                        </div>
                    </Link>
                )
            )}
        </div>
    );
}