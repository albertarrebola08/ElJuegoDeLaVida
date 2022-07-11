
//Clase Juego
class Juego{
    constructor(Filas, Columnas, Porcentaje){
        this.universo = ''
        this.columnas = Columnas
        this.filas = Filas
        this.matriz = []
        this.porcentajeInicial = Porcentaje
        this.nuevaMatriz = []
        this.piezas = []
        
    }
      //Métodos:
    getDatos(){
        console.log(`   columnas: ${this.columnas} , filas: ${this.filas} ,  ...
        `)
    } // Muestra por consola los datos del objeto
    
    aleatorio(){
        if(Math.floor(Math.random() * 100)<this.porcentajeInicial){
            return true
        }else{
            return false
        }
    }
    crearMatriz(){
        for (let f = 0; f < this.filas; f++) {
            this.matriz.push([])
            for (let c = 0; c < this.columnas; c++) {
                this.matriz[f].push(this.aleatorio())
            } 
        }
    }

    dibujaUniverso(){
        this.universo = '<div id="universo">'
        
        for (let f = 0; f < this.filas; f++) {
            this.universo+=`<div class="row">`
            for (let c = 0; c < this.columnas; c++) {
                if(this.matriz[f][c]==true){
                    var estado = 'viva';
                    
                }else{
                    var estado = 'muerta';
                }
                this.universo+=`<div id="_${f}_${c}" class="casilla ${estado} data-estado="${estado}"></div>`
                    
            }
            this.universo+='</div>'
        }
        this.universo+='</div>'
    }
    
    getVecinosVivos(fila,columna){
        var casillas_vivas = 0;
       
        document.querySelector(`#_${fila}_${columna}`)

        if(fila!=0 && columna!=0){
            if(document.querySelector(`#_${fila-1}_${columna-1}`).classList.contains('viva')){
                casillas_vivas++;
            }
        }
        if(fila!=0){
            if(document.querySelector(`#_${fila-1}_${columna}`).classList.contains('viva')){
                casillas_vivas++;
            }
        }
        if(fila!=0 && columna!=(this.columnas)-1){
            if(document.querySelector(`#_${fila-1}_${columna+1}`).classList.contains('viva')){
                casillas_vivas++;
            }
        }
        if(columna!=0 && fila!=(this.filas)-1){
            if(document.querySelector(`#_${fila+1}_${columna-1}`).classList.contains('viva')){
                casillas_vivas++;
            }
        }
        if(fila!=(this.filas)-1){
            if(document.querySelector(`#_${fila+1}_${columna}`).classList.contains('viva')){
                casillas_vivas++;
            }
        }
        if(fila!=((this.filas)-1) && columna!=(this.columnas)-1){
            if(document.querySelector(`#_${fila+1}_${columna+1}`).classList.contains('viva')){
                 casillas_vivas++;
            }
        }
        if(columna!=0){
            if(document.querySelector(`#_${fila}_${columna-1}`).classList.contains('viva')){
                casillas_vivas++;
            }
        }
        if(columna!=(this.columnas)-1){
            if(document.querySelector(`#_${fila}_${columna+1}`).classList.contains('viva')){
                casillas_vivas++;
            }
        }

        return casillas_vivas;
        
    }//fin metodo getVecinosVivos

    getNuevoEstadoCasilla(fila,columna){
        //CUANDO ESTAN VIVAS ..... PUEDEN MORIR O SEGUIR VIVAS
        if(document.querySelector(`#_${fila}_${columna}`).classList.contains('viva')){
            //CASO 1 MUERTE : MUERTE POR SOLITUD
            if (this.getVecinosVivos(fila,columna)<2){
                //document.write('<br><br> MORTTTTTTTTT DE SOLITUD ')
                return false;
            }
            //CASO 2 MUERTE : MUERTE POR SOBRECONCENTRACION
            if (this.getVecinosVivos(fila,columna)>3){
                //document.write('<br><br> MORTTTTTTTTT DE SOBRECONCENTRACIÓ ')
                return false;
            }
            //CASO 3 SIGUE VIVA
            if (this.getVecinosVivos(fila,columna)==2 || this.getVecinosVivos(fila,columna)==3){
                //document.write('<br><br> SEGUEIX VIVA ')
                return true;
            }

        }
    
        //CUANDO ESTAN MUERTAS... PUEDEN REVIVIR
        if(document.querySelector(`#_${fila}_${columna}`).classList.contains('muerta')){
            if (this.getVecinosVivos(fila,columna)==3){
                //document.write('<br><br> TORNES A LA VIDA!!!')
                return true;
            }else{
                return false;
            }
        }
   
    }

    evolucionarMatriz(){
        this.nuevaMatriz = []
        for (let f = 0; f < this.filas; f++) {
            this.nuevaMatriz.push([])
            for (let c = 0; c < this.columnas; c++) {
                this.nuevaMatriz[f].push(this.getNuevoEstadoCasilla(f,c))
                
            } 
        }
        this.matriz = this.nuevaMatriz.slice(0)
        

    }
    evoluciona(){
        this.evolucionarMatriz()
        this.dibujaUniverso()
        document.querySelector('.app').innerHTML = this.universo
        
    }
    start(){
        console.log('hola start')
        this.crearMatriz()
        this.dibujaUniverso()
        //this.evoluciona()
        //console.log(this.universo)
        
        var div_app = document.querySelector('.app')
        div_app.innerHTML = this.universo
    
    }

    obtener(){
        console.log('hola insertar');
        //aislar las coordenadas donde he clickado (hecho 9:29)
        div_app.addEventListener('click',(element)=>{
            var coord = element.target.id.split('_')
            var nf = parseInt(coord[1])
            var nc = parseInt(coord[2])
            console.log(`${nf},${nc},${select_piezas.value}`)

            this.insertar(nf,nc)
        })
        
        
    }

    insertar(nf,nc){
        var arrayBD = piezas[select_piezas.value].array
        var nombreBD = piezas[select_piezas.value].nombre

        for (let i = 0; i < arrayBD.length; i++) {
            for(let j = 0;j< arrayBD[0].length; j++) {
                if(arrayBD[i][j]==false){
                    this.matriz[i+nf][j+nc]=false
                }else{
                    this.matriz[i+nf][j+nc]=true
                }
               
                console.log(this.matriz[i+nf][j+nc])

            }
        }
        this.crearMatriz()
        this.start()

    }

}//Fin clase Juego

//Capturar divs
var btnCrear = document.querySelector('.btnCrear')
var boton = document.querySelector('.btn')
var div_app = document.querySelector('.app')
var opciones = document.querySelector('#select_piezas')
var cajita = document.querySelector('.muestraPieza')


//Listeners
    //BOTÓN CREAR UNIVERSO 
    btnCrear.addEventListener('click',()=>{
        var ncolumnas = document.querySelector('.ncolumnas').value
        var nfilas = document.querySelector('.nfilas').value
        var percentLife = document.querySelector('.percent').value
        //Instanciamos el objeto
        juego = new Juego(nfilas, ncolumnas,percentLife)
        juego.start()
        juego.obtener()
       
       
        
    })
    //BOTON COMENZAR
    boton.addEventListener('click',()=>{
        setInterval( ()=>juego.evoluciona() ,100)
        
    })
    
    //SELECT
    select_piezas.addEventListener('change',(elemento)=>{
        //alert(`Has seleccionado ${piezas[elemento.target.value].nombre}`)
        cajita.innerHTML = piezas[elemento.target.value].array
        
        arrayBD = piezas[elemento.target.value].array
        nombreBD = piezas[elemento.target.value].nombre
        
        console.log(piezas[elemento.target.value].array)
        var dibujo = ''
        for(let f=0; f<arrayBD.length;f++){
            dibujo+=`<div class="row">`
            
            for(let c=0;c<arrayBD[0].length;c++){
                if(arrayBD[f][c]==true){
                    var estado = 'viva'
                }else{
                    var estado = 'muerta'
                }
                dibujo+=`<div class="casilla ${estado}"></div>`
            }
            dibujo+=`</div>`
        }
        

        cajita.innerHTML=dibujo
        

    
    })
    
    var univers = document.querySelector('#universo')
    
    cajita.addEventListener('click',(elemento)=>{
        console.log(elemento.target)
    })
   
    




    
    
    
        
    
    











 // Instanciamos el objeto de 5filas x 4columnas y con un 20% de celdas vivas


