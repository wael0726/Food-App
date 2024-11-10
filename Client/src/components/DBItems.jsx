import React, { useState, useEffect } from 'react';
import { DataTable } from '../components';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAProduct, getAllProducts } from '../api';
import { setAllProducts } from '../context/actions/productActions';
import { alertSuccess, alertDanger } from '../context/actions/alertActions';
import { FaDollarSign } from "../assets/icons";

const DBItems = () => {
  const products = useSelector(state => state.products || []); // Initialise avec un tableau vide si `products` est null ou undefined
  const dispatch = useDispatch();

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [editedName, setEditedName] = useState('');
  const [editedPrice, setEditedPrice] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getAllProducts();
      // Vérifie que `data` est un tableau ou bien extrait les données si elles sont sous la forme { data: [...] }
      dispatch(setAllProducts(Array.isArray(data) ? data : data.data || []));
    };
    fetchProducts();
  }, [dispatch]);

  const handleEditClick = (product) => {
    setSelectedProduct(product);
    setEditedName(product.product_name);
    setEditedPrice(product.product_price);
  };

  const handleUpdate = async () => {
    if (!selectedProduct || !selectedProduct.productId) {
      console.error('Produit non sélectionné ou ID manquant');
      return;
    }

    const productId = selectedProduct.productId;
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5001/food-app-45888/us-central1/app/api/products/update/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          product_name: editedName,
          product_price: editedPrice,
        }),
      });

      if (response.ok) {
        const responseBody = await response.json();
        alert('Produit mis à jour avec succès');
        // Assure que `responseBody.data` est un tableau
        dispatch(setAllProducts(Array.isArray(responseBody.data) ? responseBody.data : []));
        setSelectedProduct(null);
      } else {
        const errorMessage = await response.json();
        alert('Échec de la mise à jour : ' + (errorMessage.message || 'Erreur inconnue'));
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour :', error);
      alert('Erreur lors de la mise à jour : ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir effectuer cette action ?")) {
      try {
        await deleteAProduct(id);
        dispatch(alertSuccess("Produit supprimé"));
      } catch (error) {
        dispatch(alertDanger("Erreur lors de la suppression du produit : " + error.message));
      }
    }
  };

  return (
    <div className='flex items-center justify-center w-full gap-4 pt-6'>
      <DataTable 
        columns={[
          {
            title: "Image", 
            field: "imageURL", 
            render: (rowData) => (
              <img
                src={rowData.imageURL}
                className='w-32 h-16 object-contain rounded-md'
                alt={rowData.product_name}
              />
            ),
          },
          {
            title: "Nom",
            field: "product_name",
          },
          {
            title: "Catégorie",
            field: "product_category",
          },
          {
            title: "Prix",
            field: "product_price",
            render: (rowData) => (
              <p className='text-xl font-semibold text-textColor flex items-center'>
                <FaDollarSign className='text-red-400'/>
                {parseFloat(rowData.product_price).toFixed(2)}
              </p>
            ),
          },
        ]}
        data={products} 
        title={"Liste des Produits"}
        actions={[
          {
            icon: "edit",
            tooltip: "Modifier",
            onClick: (event, rowData) => handleEditClick(rowData),
          },
          {
            icon: "delete",
            tooltip: "Supprimer",
            onClick: (event, rowData) => handleDeleteProduct(rowData._id),
          },
        ]}
      />

      {selectedProduct && (
        <div className="modal">
          <div className="modal-content">
            <h2>Modifier le produit puis aller dans home et refresh</h2>
            <div className="input-group">
              <label htmlFor="product-name">Nom du produit:</label>
              <input
                type="text"
                id="product-name"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                className="input-field"
              />
            </div>
            <div className="input-group">
              <label htmlFor="product-price">Prix du produit:</label>
              <input
                type="text"
                id="product-price"
                value={editedPrice}
                onChange={(e) => setEditedPrice(e.target.value)}
                className="input-field"
              />
            </div>
            <div className="button-group">
              <button onClick={handleUpdate} disabled={loading} className="button update-button">
                {loading ? "En cours..." : "Mettre à jour"}
              </button>
              <button onClick={() => setSelectedProduct(null)} className="button cancel-button">
                Annuler
              </button>
            </div>
          </div>

          <style jsx>{`
            .modal {
              display: flex;
              justify-content: center;
              align-items: center;
              position: fixed;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              background-color: rgba(0, 0, 0, 0.5);
              z-index: 1000;
            }
            .modal-content {
              background-color: #f9f9f9;
              padding: 20px;
              border-radius: 8px;
              box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
              max-width: 600px;
              width: 100%;
            }
            h2 {
              font-size: 24px;
              font-weight: bold;
              margin-bottom: 20px;
            }
            .input-group {
              margin-bottom: 15px;
            }
            .input-group label {
              display: block;
              margin-bottom: 8px;
              font-weight: 600;
            }
            .input-field {
              width: 100%;
              padding: 10px;
              border: 1px solid #ccc;
              border-radius: 5px;
              font-size: 16px;
            }
            .input-field:focus {
              border-color: #4CAF50;
              outline: none;
            }
            .button-group {
              display: flex;
              justify-content: space-between;
              margin-top: 20px;
            }
            .button {
              padding: 10px 20px;
              border: none;
              border-radius: 5px;
              font-size: 16px;
              cursor: pointer;
            }
            .update-button {
              background-color: #a8e6cf;
              color: #333;
            }
            .cancel-button {
              background-color: #ffccbc;
              color: #333;
            }
            .button:hover {
              opacity: 0.9;
            }
          `}</style>
        </div>
      )}
    </div>
  );
};

export default DBItems;
