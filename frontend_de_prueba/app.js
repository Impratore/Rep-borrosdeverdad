document.addEventListener('DOMContentLoaded', function() {
    console.log('Document loaded');
    fetch('http://localhost:8000/api/products/')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log('Data received:', data);
            const productsDiv = document.getElementById('product-list');
            if (data.length === 0) {
                productsDiv.innerHTML = '<p>No products found</p>';
            } else {
                data.forEach(product => {
                    const productElement = document.createElement('div');
                    productElement.classList.add('item');
                    productElement.innerHTML = `
                        <span class="titulo-item">${product.name}</span>
                        <img src="${product.image || '/frontend/img/placeholder.png'}" alt="" class="img-item">
                        <span class="precio-item">$${product.price}</span>
                        <button class="boton-item" onclick="addToCart(${product.id})">Agregar al Carrito</button>
                    `;
                    productsDiv.appendChild(productElement);
                });
            }
        })
        .catch(error => {
            console.error('Error fetching products:', error);
            const productsDiv = document.getElementById('product-list');
            productsDiv.innerHTML = '<p>Error fetching products</p>';
        });
});

function addToCart(productId) {
    console.log(`Producto ${productId} agregado al carrito`);
    // Aquí puedes añadir la lógica para manejar el carrito de compras
}
