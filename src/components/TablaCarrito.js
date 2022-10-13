import React from 'react'

function TablaCarrito(props) {
  console.log('soy la prop')
  console.log(props.prop.funcion.carrito)
    return (
    <div>TablaCarrito
        <div className="overflow-x-auto w-full">
  <table className="table w-full">
    {/*<!-- head -->*/}
    <thead>
      <tr>
        <th>
          <label>
            <input type="checkbox" className="checkbox" />
          </label>
        </th>
        <th>Nombre</th>
        <th>Precio</th>
        <th>Cantidad</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      {/*<!-- row 1 -->*/}
      {
    //funcion.funcion.carrito.map( producto => <ProductoCarrito key={producto.id} producto={producto} quitarHandler={funcion.funcion.quitarProductoCarrito}></ProductoCarrito>)
    props.prop.funcion.carrito.map( producto => 
      <tr>
        <th>
          <label>
            <input type="checkbox" className="checkbox" />
          </label>
        </th>
        <td>
          <div className="flex items-center space-x-3">
            <div className="avatar">
              <div className="mask mask-squircle w-12 h-12">
                <img src={producto.imagenUrl} alt="Avatar Tailwind CSS Component" />
              </div>
            </div>
            <div>
              <div className="font-bold">{producto.nombre}</div>
              <div className="text-sm opacity-50"></div>
            </div>
          </div>
        </td>
        <td>
        ${producto.precio}
          
          <span className="badge badge-ghost badge-sm">No se que es esto</span>
        </td>
        <td>{producto.stock}</td>
        <th>
          <button className="btn btn-primary">Quitar</button>
        </th>
      </tr>)}
    </tbody>
    
  </table>
  </div>
    </div>
  )
}

export default TablaCarrito