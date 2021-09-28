const socket = io();

socket.on('listaProductos', (data) => {
    render(data);
});

let render = (data) => {
    if (data.length > 0) {
        let rows = data.map((m) =>`
        <tr>
            <td valign="middle">${m.title}</td>
            <td valign="middle" class="text-center">${m.price}</td>
            <td valign="middle" class="text-center"><img src="${m.thumbnail}" alt="${m.title}" class="tablaproductos__image"></td>
        </tr>
        `).join(' ');
        let html = `
            <table class="table table-hover tablaproductos">
                <thead>
                    <tr>
                        <th scope="col">Producto</th>
                        <th  class="text-center" scope="col">Precio</th>
                        <th  class="text-center" scope="col">Imagen</th>
                    </tr>
                </thead>
                <tbody>
                    ${rows}
                </tbody>
            </table>
        `;
        document.querySelector('.tablaproductos__wrapper').innerHTML = html;
    } else {
        let html = `
        <div class="text-center">
            <h2>No hay productos</h2>
        </div>
        `;
        document.querySelector('.tablaproductos__wrapper').innerHTML = html;
    }
}

const nuevoProducto = () => {
    let title = document.getElementById('title').value;
    let price = document.getElementById('price').value;
    let thumbnail = document.getElementById('thumbnail').value;
    try {
        socket.emit('nuevoProducto', {title, price, thumbnail});
        document.getElementById("formproducto").reset();
        document.getElementById("formproducto__span-successful").style.display = 'block';
        document.getElementById("formproducto__span-failed").style.display = 'none';
    } catch (error) {
        console.log(error);
        document.getElementById("formproducto__span-failed").style.display = 'block';
        document.getElementById("formproducto__span-successful").style.display = 'none';
    }
    return false;
}

/* ------------------------- MENSAJES ------------------------------ */

socket.on('nuevoMensaje', (data) => {
    renderMensaje(data);
});

let renderMensaje = (data) => {
    let html = 
    data.map((m)=>`
        <div class="formchat_fila">
            <strong>${m.email}</strong>
            <span> - (${m.fecha}): </span>
            <em>${m.texto}</em>
        </div>
    `).join(' ');
    document.getElementById('formchat__mensajes').innerHTML = html;
}

const envioMensaje = () => {
    const fecha = new Date().toLocaleString();
    const email = document.getElementById('email').value;
    const texto = document.getElementById('mensaje').value;
    socket.emit('nuevoMensaje', {email, texto, fecha});
    return false;
}