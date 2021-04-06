import React, { useState } from 'react'
import '../App.css'
import ProductService from '../services/product'

const ProductEdit = ({ setMuokkaustila, setProducts, products, setMessage, setShowMessage,
    setIsPositive, muokattavaProduct }) => {

    // Edit komponentin State määritykset. Alkutila otetaan propsina saadusta MuokattavaCustomer oliosta (yläpuolella oleva rivi).
    // Se alkutila tulee myös input kenttiin alkutilaksi, koska input kentän sisältö on sidottu näihin state:hin.
    // Input kentän muutos muuttaa kyseistä statea samoin kuin add komponentissakin tapahtui.

    const [newProductName, setNewProductName] = useState(muokattavaProduct.productName)
    const [newSupplierId, setNewSupplierId] = useState(muokattavaProduct.supplierId)
    const [newCategoryId, setNewCategoryId] = useState(muokattavaProduct.categoryId)

    const [newQuantityPerUnit, setNewQuantityPerUnit] = useState(muokattavaProduct.quantityPerUnit)
    const [newUnitPrice, setNewUnitPrice] = useState(muokattavaProduct.unitPrice)
    const [newUnitsInStock, setNewUnitsInStock] = useState(muokattavaProduct.unitsInStock)

    const [newUnitsOnOrder, setNewUnitsOnOrder] = useState(muokattavaProduct.unitsOnOrder)
    const [newReorderLevel, setNewReorderLevel] = useState(muokattavaProduct.reorderLevel)
    const [newDiscontinued, setNewDiscontinued] = useState(muokattavaProduct.discontinued)

    // Muokkauslomakkeen onSubmit tapahtumankäsittelijä. Tämä koodi ajetaan kun painetaan talleta / save nappia.

    const submitProduct = (event) => {
        event.preventDefault()
        var changedProduct = {
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


        ProductService
            .update(muokattavaProduct.productId, changedProduct) // Put pyyntö back-endille
            .then(response => {

                if (response.status === 200) {

                    const id = changedProduct.productId

                    // Poistetaan ensin vanha product statesta
                    setProducts(products.filter(filtered => filtered.productId !== id))

                    // Ja lisätään uudestaan muuttuneilla tiedoilla
                    setProducts(products.concat(changedProduct))

                    setMessage(`Päivitetty ${changedProduct.productName}`)
                    setIsPositive(true)
                    setShowMessage(true)

                    setTimeout(() => {
                        setShowMessage(false)
                    }, 4000
                    )
                }

            })
            .catch(error => {
                setMessage(`Tapahtui virhe. Tässä lisätietoa: ${error}`)
                setIsPositive(false)
                setShowMessage(true)

                setTimeout(() => {
                    setShowMessage(false)
                }, 7000
                )
            })
        
        // Tämä setTimout on lisätty myös CustomerAdd tiedostoon. Annetaan 0,5sek aikaa tietokannalle tallettaa
        // ennenkuin palataan asiakkaiden listausnäkymään. Silloin saadaan listaus ajantasaiseksi.

        setTimeout(() => {
            setMuokkaustila(false)
        }, 500
        )
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
    // Lisätty required 2 ensimmäiseen inputiin, samoin kuin add komponentissakin. Näin ei voida luoda täysin tyhjiä customereita.
    // Eikä sotkea ID:tä.
    //TODO:
    //Itseasiassa ID pitäisi olla tässä kohtaa kiinteä, jota ei voi edes muokata.

    return (
        <form onSubmit={submitProduct}>

            {/* inputien tapahtumankäsittelijöissä on määritelty funktio, jotka saa parametrikseen kyseisen
            input elementin target tiedon. Funktiot kutsuvat set state hookia parametrina target.value */}

            <div>
                <input type="text" value={newProductName} placeholder="Product name"
                    onChange={({ target }) => setNewProductName(target.value)} required />
            </div>
            <div>
                <input type="number" value={newSupplierId} placeholder="Supplier ID"
                    onChange={({ target }) => setNewSupplierId(target.value)} />
            </div>
            <div>
                <input type="number" value={newCategoryId} placeholder="Category ID"
                    onChange={({ target }) => setNewCategoryId(target.value)} />
            </div>
            <div>
                <input type="text" value={newQuantityPerUnit} placeholder="Quantity per unit"
                    onChange={({ target }) => setNewQuantityPerUnit(target.value)} />
            </div>
            <div>
                <input type="number" value={newUnitPrice} placeholder="Unit price"
                    onChange={({ target }) => setNewUnitPrice(target.value)} />
            </div>
            <div>
                <input type="number" value={newUnitsInStock} placeholder="Units in stock"
                    onChange={({ target }) => setNewUnitsInStock(target.value)} />
            </div>
            <div>
                <input type="number" value={newUnitsOnOrder} placeholder="Units on order"
                    onChange={({ target }) => setNewUnitsOnOrder(target.value)} />
            </div>
            <div>
                <input type="number" value={newReorderLevel} placeholder="Reorder level"
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

            <button type="submit" style={{ background: 'green' }}>Save</button>

            <button onClick={() => setMuokkaustila(false)} style={{ background: 'red' }}>
                Cancel</button>
        </form>
    )
}

export default ProductEdit