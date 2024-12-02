document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('product-form');
    const tableBody = document.querySelector('#product-table tbody');


    function loadProducts() {
        fetch('crud.php?action=read')
            .then(response => response.json())
            .then(data => {
                tableBody.innerHTML = '';
                data.forEach(product => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${product.id}</td>
                        <td>${product.nome}</td>
                        <td>R$ ${product.preco}</td>
                        <td>${product.quantidade}</td>
                        <td><img src="${product.imagem}" alt="${product.nome}" width="50"></td>
                        <td>
                            <button onclick="editProduct(${product.id})">Editar</button>
                            <button onclick="deleteProduct(${product.id})">Deletar</button>
                        </td>
                    `;
                    tableBody.appendChild(row);
                });
            });
    }


    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        fetch('crud.php?action=save', {
            method: 'POST',
            body: formData
        }).then(() => {
            form.reset();
            loadProducts();
        });
    });


    window.editProduct = (id) => {
        fetch(`crud.php?action=edit&id=${id}`)
            .then(response => response.json())
            .then(product => {
                document.getElementById('id').value = product.id;
                document.getElementById('nome').value = product.nome;
                document.getElementById('preco').value = product.preco;
                document.getElementById('quantidade').value = product.quantidade;
                document.getElementById('imagem').value = product.imagem;
            });
    };


    window.deleteProduct = (id) => {
        fetch(`crud.php?action=delete&id=${id}`)
            .then(() => loadProducts());
    };

    loadProducts();
});
