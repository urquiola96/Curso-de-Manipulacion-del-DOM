/**
 * This file is just a silly example to show everything working in the browser.
 * When you're ready to start on your site, clear the file. Happy hacking!
 **/

const baseurl = "https://platzi-avo.vercel.app";

const formatPrice = (price) => {
    const newprice = new window.Intl.NumberFormat(
        "en-EN", {
            style: "currency",
            currency: "USD"
        }
    ).format(price)
    return newprice
}

//la siguiente operacion se puede realizar seguida sin los saltos de linea
//se trae la informacion necesaria de la API por medio de fetch()
fetch(`${baseurl}/api/avo`)
//esta informacion la transformamos en un JSON
.then((response) => response.json())
//ahora procedemos a usar este JSON para crear nuestro contenido en memoria
//y luego renderizarlo
.then(responseJson => {
        //creamos un array para realizar 1 sola operacion que modifique el DOM
        let avocadosArray = [];
        //iteramos por cada item del array creando los elementos necesarios
        responseJson.data.forEach(avocado => {
            //image
            const img   = document.createElement("img");
            img.src = `${baseurl}${avocado.image}`
            //title
            const title = document.createElement("h2");
            title.textContent = avocado.name;
            //price
            const price = document.createElement("p");
            price.textContent = formatPrice(avocado.price);
            //    container
            const container = document.createElement("div");
            container.className = "card"

            const text = document.createElement("div");

            text.append(title, price)
            text.className = "card-text"
            
            container.append(img, text)
            avocadosArray.push(container)
        });

        const appnode = document.querySelector(".main-appnode");
        appnode.append(...avocadosArray);
    }
);