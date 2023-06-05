const cards= document.getElementById('cards');
const itemsF= document.getElementById('items-favorito');
const itemsC= document.getElementById('items-carrito');
const footer=document.getElementById('footer');
const footerFav=document.getElementById('footerFav');
const templateCard= document.getElementById('template-card').content
const templateFooter=document.getElementById('template-footer').content
const templateCarrito=document.getElementById('template-carrito').content
const templateFooterFav=document.getElementById('template-footerFav').content
const fragment=document.createDocumentFragment()
let carrito={}
let favorito={}

document.addEventListener('DOMContentLoaded', e =>{
    FetchData()});


cards.addEventListener('click', e =>{
    addCarrito(e)
})

cards.addEventListener('click', e => {
    addFav(e);
});

itemsF.addEventListener('click', e =>{
    btnAccion(e)
})

itemsC.addEventListener('click', e =>{
    btnAccion(e)
})

const FetchData= async()=>{
    try{
        const res= await fetch('api.json')
        const data= await res.json()
          
        pintarCards(data)
    }catch(error){
        console.log(error)
    }
}

const pintarCards= data =>{
    data.forEach(producto=> {
        templateCard.querySelector('h5').textContent = producto.title
        templateCard.querySelector('p').textContent=producto.precio
        templateCard.querySelector('img').setAttribute("src",producto.thumbnailUrl)
        templateCard.querySelector('.but').dataset.id= producto.id
        templateCard.querySelector('.bat').dataset.id= producto.id

        const clone= templateCard.cloneNode(true)
        fragment.appendChild(clone)
    })
    cards.appendChild(fragment)
}

const addCarrito = e => {
    if (e.target.classList.contains('but')) {
        console.log(e.target.dataset.id)
        console.log(e.target.parentElement)
        setCarrito(e.target.parentElement)
    }
    e.stopPropagation()
}

const addFav = e => {
    if (e.target.classList.contains('bat')) {
        console.log(e.target.dataset.id)
        console.log(e.target.parentElement)
        setFavorito(e.target.parentElement)
    }
    e.stopPropagation()
}

const setFavorito = objeto => {
    const producto = {
        id: objeto.querySelector('.bat').dataset.id,
        title: objeto.querySelector('h5').textContent,
        precio: objeto.querySelector('p').textContent,
        cantidad: 1
    };

    if (favorito.hasOwnProperty(producto.id)) {
        favorito[producto.id] = { ...producto };
        pintarFavoritos();
    } else {
        favorito[producto.id] = { ...producto };
        pintarFavoritos();
    }
}

const setCarrito = objeto=> {
    const producto={
        id: objeto.querySelector('.but').dataset.id,
        title: objeto.querySelector('h5').textContent,
        precio: objeto.querySelector('p').textContent,
        cantidad:1
    }
    if(carrito.hasOwnProperty(producto.id)){
        producto.cantidad=carrito[producto.id].cantidad+ 1
    }

    carrito[producto.id]= {...producto}
    pintarCarrito()

}


const pintarCarrito=()=>{

    itemsC.innerHTML=''
    Object.values(carrito).forEach(producto=> {
        templateCarrito.querySelector('th').textContent=producto.id
        templateCarrito.querySelectorAll('td')[0].textContent=producto.title
        templateCarrito.querySelectorAll('td')[1].textContent=producto.cantidad
        templateCarrito.querySelector('.bi-plus-circle').dataset.id=producto.id
        templateCarrito.querySelector('.bi-dash-circle').dataset.id=producto.id
        templateCarrito.querySelector('span').textContent= producto.cantidad * producto.precio


        const clone= templateCarrito.cloneNode(true)
        fragment.appendChild(clone)
    })
    itemsC.appendChild(fragment)

    pintarFooter()

    localStorage.setItem('carrito', JSON.stringify(carrito))
}

const templateFavorito = document.getElementById('template-favorito').content;

const pintarFavoritos = () => {
    itemsF.innerHTML = '';
    Object.values(favorito).forEach(producto => {
      const fila = document.createElement('tr');
  
      const idColumna = document.createElement('th');
      idColumna.textContent = producto.id;
  
      const titleColumna = document.createElement('td');
      titleColumna.textContent = producto.title;
  
      const precioColumna = document.createElement('td');
      precioColumna.textContent = producto.precio;

      fila.appendChild(idColumna);
      fila.appendChild(titleColumna);
      fila.appendChild(precioColumna);
  
      fragment.appendChild(fila);
    });
    itemsF.appendChild(fragment);
  
    pintarFooterFav();
  
    localStorage.setItem('favorito', JSON.stringify(favorito));
  };

const pintarFooter =() =>{
    footer.innerHTML=''
    if(Object.keys(carrito).length===0){
      footer.innerHTML = '<th scope="row" colspan="5"><div class="vacio">Su carrito actualmente está vacío.</div><div class="carritovacio"><img src="img/carritovacio.png" alt="Imagen de carrito vacío"></div></th>';
        return;
    }

    const nCantidad= Object.values(carrito).reduce((acc,{cantidad})=>acc+cantidad,0)

    
    const nPrecio= Object.values(carrito).reduce((acc,{cantidad, precio}) => acc+cantidad* precio,0 );

    templateFooter.querySelectorAll('td')[0].textContent=nCantidad

    templateFooter.querySelector('span').textContent=nPrecio

    const clone= templateFooter.cloneNode(true)
    fragment.appendChild(clone)
    footer.appendChild(fragment)

    const btnVaciar=document.getElementById('vaciar-carrito')
    btnVaciar.addEventListener('click', () => {

        carrito={}
        pintarCarrito()
    })

}

const pintarFooterFav = () => {
    footerFav.innerHTML = '';

    if (Object.keys(favorito).length === 0) {
        footerFav.innerHTML = '<th scope="row" colspan="5"><div class="vacio">No has agregado ningún objeto a favoritos.</div><div class="carritovacio"><img src="img/fav.png" alt="Imagen de carrito vacío"></div></th>';
        return;
    }

    const clone = templateFooterFav.cloneNode(true);
    fragment.appendChild(clone);
    footerFav.appendChild(fragment);

    const btnVaciar = document.getElementById('vaciar-carrito');
    btnVaciar.addEventListener('click', () => {
        favorito = {};
        pintarFavoritos();
    });
}


const btnAccion = e =>{

    //para aumentar

    if(e.target.classList.contains('bi-plus-circle')){
        console.log(carrito[e.target.dataset.id])

    const producto = carrito[e.target.dataset.id]

    // así se podría simplificar => producto.cantidad++

    producto.cantidad=carrito[e.target.dataset.id].cantidad + 1

    carrito[e.target.dataset.id]={...producto}
    pintarCarrito()
}

// para restar


if(e.target.classList.contains('bi-dash-circle')){
    const producto= carrito[e.target.dataset.id]
    producto.cantidad --

    if(producto.cantidad === 0){
        delete carrito[e.target.dataset.id]
    }
    pintarCarrito()
}
    e.stopPropagation()
}



function Carrito(){
    document.getElementById("open-carrito").style.display="flex";
}

function Cerrar(){
    document.getElementById("open-carrito").style.display="none";
    document.getElementById("open-favorito").style.display="none";
}

function Favorito(){
    document.getElementById("open-favorito").style.display="flex";
}



