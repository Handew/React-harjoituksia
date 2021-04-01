import React, { useState } from 'react'
import '../App.css'
import ProductService from '../services/product'

const ProductAdd = ({ setLisäystila, setProducts, products, setMessage, setShowMessage,
    setIsPositive }) => {

    // State määritykset

    const [newProductName, setNewProductName] = useState('')
    const [newSupplierId, setNewSupplierId] = useState('')
    const [newCategoryId, setNewCategoryId] = useState('')

    const [newQuantityPerUnit, setNewQuantityPerUnit] = useState('')
    const [newUnitPrice, setNewUnitPrice] = useState('')
    const [newUnitsInStock, setNewUnitsInStock] = useState('')

    const [newUnitsOnOrder, setNewUnitsOnOrder] = useState('')
    const [newReorderLevel, setNewReorderLevel] = useState('')
    const [newDiscontinued, setNewDiscontinued] = useState('')

    // Lomakkeen onSubmit tapahtumankäsittelijä

    const submitProduct = (event) => {
        event.preventDefault()
        var newProduct = {
            productName: newProductName,
            supplierId: parseInt(newSupplierId),
            categoryId: parseInt(newCategoryId),
            quantityPerUnit: newQuantityPerUnit,
            unitPrice: parseFloat(newUnitPrice),
            unitsInStock: parseInt(newUnitsInStock),
            unitsOnOrder: parseInt(newUnitsOnOrder),
            reorderLevel: parseInt(newReorderLevel),
            discontinued: newDiscontinued            
        }

        const jwt = localStorage.getItem("token")
        ProductService.setToken(jwt)

        try {
            ProductService // Käytetään services/product tiedoston..
                .create(newProduct) // ..create metodia back-end http pyyntöön
                .then(response => console.log(response.data))
                console.log(newProduct.productName)
            setMessage(`Lisätty ${newProduct.productName}`)
            setIsPositive(true)
            setShowMessage(true)
            setProducts(products.concat(newProduct))
                
            setTimeout(() => {
                setShowMessage(false)
            },
                6000
            )
        }
        catch (e) {
            setMessage(`Tapahtui virhe: ${e}`)
            setIsPositive(false)
            setShowMessage(true)

            setTimeout(() => {
                setShowMessage(false)
            },
                6000
            )
        }
        finally {

            setLisäystila(false)

        }
    }

    const handleChangeDiscontinued = (event) => {
        var täppä = event.target.value
        if (täppä === "true") {
            setNewDiscontinued(true)
        }
        else {
            setNewDiscontinued(false)
        }
    }

    // Komponentti palauttaa käyttöliittymään form elementin

    return (
        <form onSubmit={submitProduct}>

            {/* inputien tapahtumankäsittelijät on funktiota, jotka saa parametrikseen
            input elementin target tiedon. Funktiot kutsuvat set state hookia parametrina target.value */}

            <div>
                <input type="text" value={newProductName} placeholder="Product name"
                    onChange={({ target }) => setNewProductName(target.value)} />
            </div>
            <div>
                <input type="number" value={newSupplierId} placeholder="Supplier Id"
                    onChange={({ target }) => setNewSupplierId(target.value)} />
            </div>
            <div>
                <input type="number" value={newCategoryId} placeholder="Category Id"
                    onChange={({ target }) => setNewCategoryId(target.value)} />
            </div>
            <div>
                <input type="text" value={newQuantityPerUnit} placeholder="Quantity Per Unit"
                    onChange={({ target }) => setNewQuantityPerUnit(target.value)} />
            </div>
            <div>
                <input type="number" value={newUnitPrice} placeholder="Unit Price"
                    onChange={({ target }) => setNewUnitPrice(target.value)} />
            </div>
            <div>
                <input type="number" value={newUnitsInStock} placeholder="Units In Stock"
                    onChange={({ target }) => setNewUnitsInStock(target.value)} />
            </div>
            <div>
                <input type="number" value={newUnitsOnOrder} placeholder="Units On Order"
                    onChange={({ target }) => setNewUnitsOnOrder(target.value)} />
            </div>
            <div>
                <input type="number" value={newReorderLevel} placeholder="Reorder Level"
                    onChange={({ target }) => setNewReorderLevel(target.value)} />
            </div>
            <div>
                <label htmlFor="Discontinued">Discontinued</label>
                {newDiscontinued === true ? <div className="form-group" onChange={handleChangeDiscontinued}>
                    <input type="radio" value="täppä" checked="checked" name="disc" /> Kyllä
                <input type="radio" value="false" name="disc" /> Ei
                </div> : <div className="form-group" onChange={handleChangeDiscontinued}>
                    <input type="radio" value="täppä" name="disc" /> Kyllä
                <input type="radio" value="false" checked="checked" name="disc" /> Ei
                </div>}
            </div>

            <button type="submit" style={{ background: 'green' }}>Create</button>

            <button onClick={() => setLisäystila(false)} style={{ background: 'red' }}>
                Cancel</button>
        </form>
    )
}

export default ProductAdd