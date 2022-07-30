# carrer-develoment-git
Repositorio en el que subo mis trabajos, practicas y demás para mejorar mis habilidades y probar herramientas nuevas.

//Para iniciar un repositorio en git

  git config
  
Comando que sirve para cambiar la configuración de git. Los campos mas importantes serán nuestro nombre y correo. Siendo user.name y user.email, respectivamente. Por tanto, si quisiéramos cambiar uno de estos campos, deberíamos hacer:

  git config --global user.name "NuevoNombre"
 
De este modo, usando el global, cambiará ese campo para todos los respositorios de mi usuario. Si por otro lado, usáramos el comando de --local, el cambio afectaría únicamente al repositorio en el que nos encontráramos en ese momento.

1- Imaginemos que ya hemos escripto un script y queremos subirlo a git. Lo que debemos hacer es abrir la consola e ir al directorio donde queramos crear ese repositorio. una vez ahí, escribirmos: 
  
  git init .
  
Habrá generado una carpeta .git donde estará todo mi código fuente. Ahora, para añadir todo el proyecto a este repo, deberemos escribir la sentencia:

  git add .
  
Si quisieramos añadir un archivo concreto, escribiremos lo siguiente:
  
    git add NombreFichero

En caso de querer añadir una carpeta de forma recursiva, sería del siguiente modo:

  git add src NombreCarpeta
  
Aun no está subido, tenemos que confirmar la subida de la siguiente manera:
  
   git commit -a -m "Mensaje"
   
El -m sirve para poner un mensaje de menos de 80 caracteres con un mensaje explicativo de los cambios. Para terminar de subir los cambios locales al github, tenemos que hacer:
  
  git push
  
En resumen, para gitear una carpeta y convertirla en un repositorio lo que hacemos es movernos a la carpeta en la consola e introducir los siguientes comandos:

  git init .
  git commit -am "Mensaje"
  
Así ya tendríamos un repositorio con la carpeta escogida, faltaría subir los cambios. Con git log, podemos ver todos los commits que se han hecho en ese repositorio y su información. 
  
Estas mismas funciones sirven en otros entornos de desarrollo como eclipse. 
