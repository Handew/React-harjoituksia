import React, { useState } from 'react'
import '../App.css';

const Product = ({ product, handleDeleteClick, handleEditClick }) => {

    const [näytäEnemmän, setNäytäEnemmän] = useState(false)

    return (
        <>
            <h3><nobr
                onClick={() => setNäytäEnemmän(!näytäEnemmän)}
            >
                {product.productName}

            </nobr>

                <button id="nappi" onClick={() => handleDeleteClick(product.productId)}>Delete</button>

                <button id="nappi" onClick={() => handleEditClick(product)}>Edit</button>

            </h3>


            {näytäEnemmän && <table class="center">
                <thead>
                    <tr>
                        <th>Product name</th>
                        <th>Supplier</th>
                        <th>Category</th>
                        <th>QuantityPerUnit</th>
                        <th>UnitPrice</th>
                        <th>UnitsInStock</th>
                        <th>UnitsOnOrder</th>
                        <th>ReorderLevel</th>
                        <th>Discontinued</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{product.productName}{' '}</td>
                        <td>{product.supplierId}{' '}</td>
                        <td>{product.categoryId}{' '}</td>
                        <td>{product.quantityPerUnit}{' '}</td>
                        <td>{product.unitPrice}{' '}</td>
                        <td>{product.unitsInStock}{' '}</td>
                        <td>{product.unitsOnOrder}{' '}</td>
                        <td>{product.reorderLevel}{' '}</td>
                        <td>{product.discontinued}{' '}</td>
                    </tr>
                </tbody>
            </table>}

        </>
    )
}

export default Product;
