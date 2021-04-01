/* eslint-disable array-callback-return */
import React, { useState, useEffect } from "react";
import "../App.css";
import ProductService from "../services/product";
import Product from "./Product";
import ProductAdd from "./ProductAdd";
import ProductEdit from "./ProductEdit";
import Message from "../Message";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [näytetäänkö, setNäytetäänkö] = useState(false);
  const [search, setSearch] = useState("");
  const [lisäysTila, setLisäystila] = useState(false);
  const [muokkausTila, setMuokkaustila] = useState(false);
  const [muokattavaProduct, setMuokattavaProduct] = useState({}); // yksi product olio

  const [showMessage, setShowMessage] = useState(false);
  const [isPositive, setIsPositive] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token")
    ProductService.setToken(token)
    ProductService
    .getAll()
    .then((data) => {
      setProducts(data);
    })
  }, [lisäysTila, näytetäänkö, muokkausTila])

  const handleSearchInputChange = (event) => {
    setNäytetäänkö(true);
    setSearch(event.target.value.toLowerCase());
  }

  const handleDeleteClick = (id) => {
    //Kaivetaan esiin koko product olio jotta alertissa voidaan näyttää product name id:n sijaan
    const product = products.find((prod) => prod.productId === id);

    // Poiston varmistus kyselyikkuna
    const confirm = window.confirm(
      `Haluatko todella poistaa: ${product.productName}:n pysyvästi?`
    )

    if (confirm) {
      ProductService.remove(id)
        .then((response) => {
          if (response.status === 200) {
            // Poistetaan product statesta
            setProducts(
              products.filter((filtered) => filtered.productId !== id)
            );

            setMessage(`${product.productName}:n poisto onnistui!`);
            setIsPositive(true);
            setShowMessage(true);
            window.scrollBy(0, -10000); // Scrollataan ylös jotta nähdään alert :)

            setTimeout(() => {
              setShowMessage(false);
            }, 4000);
          }
        })

        .catch((error) => {
          console.log(error);
          setMessage(
            `Tapahtui virhe: ${error}. Onkohan tuotteella tilauksia?`
          );
          setIsPositive(false);
          setShowMessage(true);
          setNäytetäänkö(false);

          setTimeout(() => {
            setShowMessage(false);
          }, 7000);
        });
    } else {
      // JOS KÄYTTÄJÄ EI VAHVISTANUT POISTOA:
      setMessage("Poisto peruutettu");
      setIsPositive(true);
      setShowMessage(true);

      setTimeout(() => {
        setShowMessage(false);
      }, 4000)
    }
  }

  const handleEditClick = (product) => {
    setMuokattavaProduct(product)
    setMuokkaustila(true)
  }

  return (
    <>
      <div className="content">
        <h1
          style={{ cursor: "pointer" }}
          onClick={() => setNäytetäänkö(!näytetäänkö)}
        >
          products
          <button
            id="nappi"
            style={{ cursor: "pointer" }}
            onClick={() => setLisäystila(true)}
          >
            Add new
          </button>
        </h1>

        {showMessage && <Message message={message} isPositive={isPositive} />}

        {/* <input value={search} onChange={handleSearchInputChange} /> */}

        {!lisäysTila && !muokkausTila && (
          <input
            placeholder="Search by product name"
            value={search}
            onChange={handleSearchInputChange}
          />
        )}

        {products &&
          näytetäänkö &&
          !lisäysTila &&
          !muokkausTila &&
          products.map((product) => {
            const lowerCaseName = product.productName.toLowerCase();
            if (lowerCaseName.indexOf(search) > -1) {
              return (
                <Product
                  key={product.productID}
                  product={product}
                  handleDeleteClick={handleDeleteClick}
                  handleEditClick={handleEditClick}
                />
              );
            }
          })}
        {!products && <p>Loading...</p>}

        {lisäysTila && (
          <ProductAdd
            setLisäystila={setLisäystila}
            products={products}
            setProducts={setProducts}
            setMessage={setMessage}
            setShowMessage={setShowMessage}
            setIsPositive={setIsPositive}
          />
        )}

        {muokkausTila && (
          <ProductEdit
            setMuokkaustila={setMuokkaustila}
            muokattavaProduct={muokattavaProduct}
            products={products}
            setProducts={setProducts}
            setMessage={setMessage}
            setShowMessage={setShowMessage}
            setIsPositive={setIsPositive}
          />
        )}
      </div>
    </>
  );
};

export default ProductList;
