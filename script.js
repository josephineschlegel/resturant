const modal = document.querySelector(".modal-background");
modal.addEventListener("click", () => {
    modal.classList.add("hide");
});

fetch("https://kea-alt-del.dk/t5/api/categories")
    .then(res => res.json())
    .then(createCategories)

function createCategories(data) {
    console.log(data)
    data.forEach(function (oneCategory) {

        const a = document.createElement("a")
        a.setAttribute("href", `#${oneCategory}`);

        document.querySelector("body>nav").appendChild(a);
        a.textContent = oneCategory;

        const section = document.createElement("section");
        section.id = oneCategory;

        const h2 = document.createElement("h2");
        h2.textContent = oneCategory;
        section.appendChild(h2);
        console.log(section)

        document.querySelector("main").appendChild(section);

    })



    getProducts();
}

function getProducts() {
    fetch("https://kea-alt-del.dk/t5/api/productlist")
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            showData(data)
        })
}

function showData(jsonData) {
    jsonData.forEach(showSingleDish)
    console.log(jsonData)
}

function showSingleDish(dish) {

    const template = document.querySelector("template").content;
    const clone = template.cloneNode(true);

    clone.querySelector("h2").textContent = dish.name;
    clone.querySelector("h3").textContent = dish.shortdescription;
    clone.querySelector("p.price-full span").textContent = dish.price;
    clone.querySelector("p.price-discount span").textContent = dish.discount;


    const imageName = dish.image;

    const base = "https://kea-alt-del.dk/t5/site/imgs/";

    const smallImg = base + "small/" + imageName + "-sm.jpg";
    const mediumImg = base + "medium/" + imageName + "-md.jpg";
    const largeImg = base + "large/" + imageName + ".jpg";
    clone.querySelector("img").src = smallImg;

    if (dish.discount) {
        console.log("yeah")
        clone.querySelector(".price-full span").textContent = dish.price;

        const newPrice = Math.round(dish.price - dish.price * dish.discount / 100);
        clone.querySelector(".price-discount span").textContent = newPrice;

    } else {
        clone.querySelector(".price-discount").remove()
        clone.querySelector(".price-full span").textContent = dish.price;
    }


    clone.querySelector("button").addEventListener("click", () => {
        console.log("click", dish)
        fetch(`https://kea-alt-del.dk/t5/api/product?id=${dish.id}`)
            .then(res => res.json())
            .then(showDetails);
    });

    function showDetails(data) {
        modal.querySelector(".modal-name").textContent = data.name;
        modal.querySelector(".modal-description").textContent = data.longdescription;
        //...
        modal.classList.remove("hide");
        modal.querySelector(".modal-image").src = mediumImg;
    }


    console.log(`#${dish.category}`)
    document.querySelector(`#${dish.category}`).appendChild(clone);

    function onSale(discount) {

        if (product.discount) {
            clone.querySelector('.product').classList.add("sale");
        }

        if (product.discount) {
            let p = document.createElement('p');
            p.textContent = "I'm on sale";
            clone.appendChild(p);
        }
    }
}




function showDish(dish) {
    //...
    copy.querySelector("button").addEventListener("click", () => {
        fetch(`https://kea-alt-del.dk/t5/api/product?id=${dish.id}`)
            .then(res => res.json())
            .then(showDetails);
    });
}
