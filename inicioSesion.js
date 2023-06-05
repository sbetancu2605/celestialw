//inicio de sesion

function Credenciales(){

    listaUsuarios=
    [
        ['1','sara',' ', 'saramedina@gmail.com','2605'],
        ['2', 'Sofia',' ','sofia@gmail.com', '2405'],
        ['3', 'Andrea', 'Chavarria', 'andreachavarria@gmail.com', '2354'],
        ['2','profe','','profe@gmail.com','2403'],
    ]

return listaUsuarios;
}


function ValidarCredenciales(pCorreo, pContrasena) {
    let listaUsuarios = Credenciales();
    let acceso = false;

    for (let i = 0; i < listaUsuarios.length; i++) {
        if (pCorreo === listaUsuarios[i][3] && pContrasena === listaUsuarios[i][4]) {
            acceso = true;
            sessionStorage.setItem('usuario', JSON.stringify(listaUsuarios[i][1]));
            break;
        } else {
            acceso = false;
        }
    }

    return acceso;
}


function IniciarSesion(){

    let usuarioCorreo= '';
    let usuarioContr='';
    let acceso= false;

    usuarioCorreo = document.getElementById('usuarioCorreo').value;
    usuarioContr = document.getElementById('usuarioContra').value;

    acceso= ValidarCredenciales(usuarioCorreo, usuarioContr);

    if(acceso== true){
        window.location.href="index.html";
    }
    else if (acceso== false){
        document.getElementById('banner').style.display="flex";
    }
}