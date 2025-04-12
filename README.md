SOBRE LA APLICACIÓN WEB
-------------------------
Este proyecto esta desarrollado gracias a Coding With Dawid, como metodo de aprendizadeje del framework de NextJS.
La parte del backend utiliza TailwindCSS para darle estilo al front donde se podran subir los productos, ver ordenes....
La parte del frontend que vera el cliente utiliza styled-components.

PASOS PARA EL FUNCIONAMIENTO FRONTEND Y BACKEND
-------------------------------
**BACKEND**
cd backend-ecommerce
npm install
touch .env
npm run dev

**FRONTEND**
cd front-ecommerce
npm install
touch .env
npm run dev


CONFIGURACIÓN DEL FICHERO .ENV
--------------------------------
EL fichero .env debera contener las siguientes variables:

**BACKEND**
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
MONGODB_URI="Dirección de MongoDB"
MAIL_ADMIN="Correo del administrador"

**FRONTEND**
MONGODB_URI="Dirección de MongoDB asociado al backend"
STRIPE_PK="Clave publica de Stripe"
STRIPE_SK="Clave privada de Stripe"
PUBLIC_URL="Direccion del fronted"
NEXT_PUBLIC_BACK_URL="Direccion del backend"

OBTENCIÓN DE LAS CLAVES DE STRIPE Y FUNCIONAMIENTO DEL FRONTEND
---------------------------------------------------
Crearemos una cuenta en stripe como modo de prueba y obtendremos las claves que pegaremos en el .env

Para poder hacer los pagos tendremos que tener instalado Stripe CLI y el frontend en funcionamiento. 
Abriremos un terminal como administrador y ejecutaremos 

```bash
stripe login
``` 

Esto nos dará un enlace que tendremos que abrir y darle acceso. Y ejecutamos

```bash
stripe listen --forward-to localhost:/3000/api/webhook
``` 

La clave que nos de, se pegara en la variable endpointSecret del fichero src/pages/api/webhook.js. En la pagina siguiente veremos tarjetas de credito de prueba https://docs.stripe.com/testing


FUNCIONALIDADES DEL BACKEND
------------------------------------
En esta aplicacion deberemos iniciar sesion con la cuenta de google y para poder acceder a ella tendremos que añadirla la varible MAIL_ADMIN del .env. La informacion de la sesion y del usuario se almacenara en en MongoDB.

Podremos crear diferentes categorias a las cuales podremos establecerlas como categoria padre o hija de alguna categoria creada anteriormente. Tambien podremos agregarle diferentes propiedades.

Crear productos a los cuales le podremos añadir las diferentes categorias y propiedads creadas, tambien se le añadiran diferentes images.

Por último, en la ordenes veremos las ordenes hechas en el frontend y ver si estan pagadas o no.
