// se le indica que espere a que carge la pagina y se  llama a la funcion inicio
$(document).ready(inicio);

// funcion que sitrve para cargar al inicio
function inicio() {
    // se llama a la funcion para cragar los datos
    cargarLista();
}

// funcion para cargar los datos en la pagina
function cargarLista() {
    // se realiza peticion ñla servidor 
        $.ajax({
            method:"get",
            url: 'http://192.168.30.115/APICDS/public/api/notaInformativa',
            // si se realiza la peticion sin errores se llama la funcion anonima  para gargar datos
            success: function (result) {
                var datos=result.datos;
                var cadena="";
                for (let i = 0; i < datos.length; i++) {
                    cadena=cadena+"<tr><td>"+datos[i].id+"</td>"
                    +"<td>"+datos[i].fecha+"</td>"
                    +"<td>"+datos[i].titulo+"</td>"
                    +"<td>"+datos[i].descripcion+"</td>"
                    +"<td>"
                    +"<button class='btn btn-warning' onclick='modificar("+datos[i].id+")' >Modificar</button>"
                    +"<button class='btn btn-danger' onclick='eliminar("+datos[i].id+")' >Eliminar</button>"
                    +"</td>"
                    +"<tr>"
                    
                }
                // se mandan los datos a la pagina para ser visualizados
                $("#productos").html(cadena);
                
            },
            // si la ejecucion da error se escribe en la conbsola el error
            error: function (err) {
                console.log(err);
            }
        });
}

                                            /// funciones para guardara registro
function agregar() {
    // se llama la funcion para limpiar los campos del formulario ubicado ene el modal
    limpiarCAmpos();
    // se cambian los botones del modal para mejor funcionabilidad
    $(".modal-footer").html(`<button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
             <button type="button" class="btn btn-primary" onclick="guardar()">Guardar</button>`);
             $("#modalProductos").modal("show");
}

// al hacer clic en guardar en el modal se llama esta funcion
function guardar() {
    // se obtiuene los datos
    var fecha=$("#fecha").val();
    var titulo=$("#titulo").val();
    var descripcion=$("#descripcion").val();
    // se realiza peticion ajax para guardar
    $.ajax({
        method:"POST",
        url: 'http://192.168.30.115/APICDS/public/api/notaInformativa',
        data:{
            fecha: fecha,
            titulo: titulo,
            descripcion:descripcion
        },
        // si no hay errores se guradan los datos y se llama a la funcion para gargar los datos nuevamente
        success: function (data) {
            limpiarCAmpos();
            $(".modal-footer").html(``);
            cargarLista();
            $("#modalProductos").modal("hide");
        }

    });
}


                                                ///      funciones para editar un registro

// se consulta a la nbase de datos para rellenar los campos con los datos del registro
function modificar(id) {
    $.ajax({
        method:"get",
        url: 'http://192.168.30.115/APICDS/public/api/notaInformativa/'+id+'/edit',
        success: function (data) {
            $("#codigo").val(data.dato.id);
            $("#fecha").val(data.dato.fecha);
            $("#titulo").val(data.dato.titulo);
            $("#descripcion").val(data.dato.descripcion);
            $(".modal-footer").html(`<button type="button" class="btn btn-secondary " data-dismiss="modal">Cerrar</button>
             <button type="button" class="btn btn-primary" onclick="editar()">Editar</button>`);
            $("#modalProductos").modal("show");
        }

    });
}

// se reciben los datos del formulario y se modifican
function editar() {
    var id=$("#codigo").val();;
    var fecha=$("#fecha").val();
    var titulo=$("#titulo").val();
    var descripcion=$("#descripcion").val();
    $.ajax({
        method:"PUT",
        url: 'http://192.168.30.115/APICDS/public/api/notaInformativa/'+id,
        data:{
            fecha: fecha,
            titulo: titulo,
            descripcion:descripcion
        },
        success: function (data) {
            limpiarCAmpos();
            $(".modal-footer").html(``);
            cargarLista();
            $("#modalProductos").modal("hide");
        }

    });
    
}


                                                            // funcion para eliminar registro
function eliminar(id) {
    $.ajax({
        method:"DELETE",
        url: 'http://192.168.30.115/APICDS/public/api/notaInformativa/'+id,
        success: function (data) {
            limpiarCAmpos();
            cargarLista();
            alert("Elemento eliminado");
        }

    });
}

//  fincion para limpiar los campos del modal
function limpiarCAmpos(){
    $("#codigo").val("");
    $("#fecha").val("");
    $("#titulo").val("");
    $("#descripcion").val("");
}

// new Vue({
//     el: "#app",
//     data:{
//         listProductos:'',
//         fecha:'',
//         titulo:'',
//         descripcion:''
//     },
//     created(){
//         this.cargarLista();
//     },
//     methods:{
//         cargarLista:function () {
//             axios.get('http://192.168.30.115/APICDS/public/api/notaInformativa')
//             .then(resp=> {
//                 this.listProductos=resp.data.datos;
//                 // console.log(this.listProductos);
//             })
//             .catch( err=>{
//                 console.log(err);
//             })

//         },
//         modificar:function (id) {
//             axios.get('http://192.168.30.115/APICDS/public/api/notaInformativa/'+id+'/edit')
//             .then(respon=>{
//                 this.fecha=respon.data.dato.fecha;
//                 this.titulo=respon.data.dato.titulo;
//                 this.descripcion=respon.data.dato.descripcion;
//                 $(".modal-footer").html(`<button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
//                 <button type="button" class="btn btn-primary" @click="editar()">Editar</button>`);
//                 $("#modalProductos").modal("show");
//             })
//             .catch(err=>{
//                 console.log(err);
//             });
            
//         },

//         editar: function () {
//             alert("cds");
//         },
//     }
// });