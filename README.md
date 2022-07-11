# El juego de la vida

## Usando HTML 5, CSS 3 y JavaScript ES6 --> DOM + POO

### ¿En que consiste el Juego de la Vida?
El juego de la vida se desarrolla en un tablero que es el plano cuadriculado e infinito. En una posición del juego algunas de las celdas de la cuadrícula tienen el estatus de "vivas"; las demás celdas son vacías. (Gráficamente, las celdas vivas se representan con el color negro y las vacías con el color blanco.) El juego consiste en una sucesión de cambios de posiciones, donde cada posición se calcula a partir de la posición anterior. De este modo, la evolución del juego solo depende de la posición inicial.

Las reglas del cambio son las siguientes. El estatus de una celda en la nueva posición dependerá de su estatus actual y del número de celdas vivas entre las 8 celdas adyacentes a ella. Una celda estará viva en la nueva posición, si

está viva en la posición actual y tiene 2 o 3 celdas vecinas vivas;
está vacía en la posición actual y tiene exactamente 3 celdas vecinas vivas.
En todos los demás casos la celda estará vacía.

### ¿Cómo se ha desarrollado?
>Creación de la interfaz.

- Un *formulario* que pregunta al usuario sobre las piezas que quiere utilizar, el *porcentaje de casillas vivas*, y las medidas del tablero (filas y columnas)
- Un *tablero*, generado a partir de las medidas indicadas, rellenado aleatoriamente de casillas y permite que el usuario interactúe, añadiendo casillas vivas o las piezas seleccionadas en el formulario.

>Funcionamiento del juego\
Se han generado 2 archivos de javascript:
#### **app.js**
En este archivo se crea la clase más importante, la clase Juego(), donde se desarrollarán todos los métodos
- getDatos() --> Para mostrar por consola la cantidad de filas y columnas
- aleatorio() --> Operación que calcula un porcentaje aleatorio de casillas vivas para inicializar la partida
- crearMatriz() --> For anidado que genera una matriz (tablero) a partir del resultado de aleatorio recorriendo el numero de columnas y filas 
- dibujaUniverso() --> Bucle for que en base a la matriz creada "dibuja" etiquetas divs para mostrar en el navegador el tablero.
- getVecinosVivos() --> Mira de cada una de las casillas sus 8 que tiene alrededor y comprueba su estado (viva o muerta).
- getNuevoEstadoCasilla() --> Calcula, con una serie de condicionales marcados por la norma del juego, la cantidad de vecinos vivos o muertos que tiene alrededor y cambia o no el estado de la casilla
- evolucionarMatriz() --> Una vez ha cambiado el estado o no de la casilla debe volver a crear la matriz con las casillas evolucionadas
- evoluciona() --> Sobreescribe el html creado anteriormente para que el usuario vea en el navegador el tablero evolucionado.
- start() --> Con este método, inicializa la matriz y la dibuja por primera vez para comenzar el juegoo. 
- obtener() --> Obtiene la posicón donde el usuario ha clicado para poder insertar una casilla de manera manual.

#### **piezas.js**
En este archivo se generan las piezas por defecto del juego. 

var piezas = 
[
	{
		nombre: 'unit',
		array: [[true]]
	},
	{
		nombre: 'block',
		array: 
		[
			[true,true],
			[true,true]
		]
	},
	{
		nombre: 'boat',
		array: 
		[
			[true,true,false],
			[true,false,true],
			[false,true,false]
		]
	},
	{
		nombre: 'blinker',
		array: 
		[
			[true,true,true]
		]
	},
	{
		nombre: 'toad',
		array: 
		[
			[false,true,true,true],
			[true,true,true,false]
		]
	},
	{
		nombre: 'glider',
		array: 
		[
			[true,true,true],
			[true,false,false],
			[false,true,false]
		]
	}
]

### Testing básico 
Durante el desarrollo del juego, se han ido creando diferentes tests de menos a más para difernetes partes del proyecto que se debían ir cumpliendo antes de pasar a la siguiente fase\
Se han definido un total de 7 TESTS y en cada uno se probaban los diferentes métodos comentados anteriormente.
