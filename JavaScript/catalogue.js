const jsonData = {
    "products": [
        {
            "name": "LG 25UM58-P 25inch UltraWide Full HD IPS Monitor",
            "image": "https://media.takealot.com/covers_tsins/44302437/8806087691450_2-zoom.jpg",
            "price": 3309,
            "description": `<ul>
        <li>LG 25UM58-P 25</li>
        <li>UltraWide Full HD IPS Monitor</li>
        <li>21:9 UltraWide FHD IPS Monitor sRGB over 99%</li>
        <li>On-Screen Control with Screen Split 2.0</li>
        <li>Game Mode</li>
        <li>Delivery Available</li>
        </ul>`
        },
        {
            "name": "Taurus Air Fryer Digital Black 3.5L 1500W",
            "image": "https://media.takealot.com/covers_images/85a22a8f7fdb465fbec3b45a7bbe7970/s-zoom.file",
            "price": 1999,
            "description": `<ul>
        <li>Taurus Air Fryer Digital Black 3.5L 1500W</li>
        <li>Powerful 1500w</li>
        <li>3.5L capacity</li>
        <li>Game Mode</li>
        <li>Delivery Available</li>
        </ul>`
        },
        {
            "name": "RCT 850VA Line Interactive UPS",
            "image": "https://media.takealot.com/covers_tsins/35394329/35394329-1-zoom.jpg",
            "price": 849,
            "description": `<ul>
        <li>RCT 850VA Line Interactive UPS</li>
        <li>Output Voltage 110/120 VAC or 220/230/240 VAC</li>
        <li>Frequency Range 60/50 Hz (auto sensing)</li>
        <li>Delivery Available</li>
        </ul>`
        },
        {
            "name": "Russell Hobbs - 30cm Desk Fan",
            "image": "https://media.takealot.com/covers_tsins/45184915/6001498025685-17-zoom.jpg",
            "price": 599,
            "description": `<ul>
        <li>Russell Hobbs - 30cm Desk Fan</li>
        <li>Weight: 4.3kg</li>
        <li>Wattage: 24W</li>
        <li>Delivery Available</li>
        </ul>`
        },
        {
            "name": "Samsung - 18kg Top Loader",
            "image": "https://media.takealot.com/covers_tsins/56170711/56170711-1-zoom.jpg",
            "price": 11499,
            "description": `<ul>
        <li>Samsung - 18kg Top Loader</li>
        <li>9 Wash Cycles/ 10 Water Levels</li>
        <li>Eco Drum Clean</li>
        <li>Delivery Available</li>
        </ul>`
        },
        {
            "name": "Wacaco Nanopresso Portable Espresso Maker - Grey",
            "image": "https://media.takealot.com/covers_tsins/51517619/51517619_1-zoom.jpg",
            "price": 1489,
            "description": `<ul>
        <li>Wacaco Nanopresso Portable Espresso Maker - Grey</li>
        <li>Capsule Capacity: 8g</li>
        <li>Weight: 0.33kg</li>
        <li>Material: Polybutylene Terephthalate</li>
        <li>Delivery Available</li>
        </ul>`
        }
    ]
}

// Generates all of the products in the JSON object to page.
$(document).ready(function () {
    for (let i in jsonData.products) {
        let divOutSide = $(`<div class="col"></div>`);
        let div = $(`<div class="card" style="width: 18rem; height: 100%"></div>`);
        div.append(`<a href="../html/products.html" onclick="imgClicked('${jsonData.products[i].image}')" ><img src="${jsonData.products[i].image}" class="card-img-top" style="height: 220px; width: 250px" alt="${jsonData.products[i].name}"></a>`);
        let product = jsonData.products[i].name;
        div.append(`<div class="card-body"><h5 class="card-title fs-6">${jsonData.products[i].name}</h5><p class="card-text">${jsonData.products[i].description}</p> <strong class="price">R${jsonData.products[i].price}</strong><button class="btn btn-outline-success quickAddCart" onclick="addToCart('${product}'), totalPriceAlert()">Quick add to cart</button></div>`);

        $(divOutSide).append(div);
        $("#productList").append(divOutSide);
    };
});

let shoppingList;

//Adds a different set of products to the same session key "shoppingList"
function addToCart(product) {
    shoppingList = sessionStorage.getItem("shoppingList");

    if (!shoppingList) {
        shoppingList = [];
    } else {
        shoppingList = JSON.parse(shoppingList);
    }

    for (let i in jsonData.products) {
        if (product === jsonData.products[i].name) {
            shoppingList.push(jsonData.products[i].name);
            sessionStorage.setItem("shoppingList", JSON.stringify(shoppingList));
        }
    }
};

let imageCollector = [];

//Check's on what images you have linked and set it in session key.
function imgClicked(imgLink){
    imageCollector.push(imgLink);
    sessionStorage.setItem("imageCollector", JSON.stringify(imageCollector));
};

//Checks if the last item added tot he shoppingList is in the JSON Object.
function totalPriceAlert() {
    let totalPrice = JSON.parse(sessionStorage.getItem("totalPrice"));

    !totalPrice ? totalPrice = 0 : null;

    for (let i in jsonData.products){
        if ( shoppingList[i] === jsonData.products[i].name || shoppingList[shoppingList.length - 1] === jsonData.products[i].name) {
            totalPrice += parseInt(`${jsonData.products[i].price}`);
            sessionStorage.setItem("totalPrice", JSON.stringify(totalPrice));
            break;
        }

        if (shoppingList.length <= i) { break; };

        let y = 0;

        while ( shoppingList[shoppingList.length - 1] != jsonData.products[i].name ){
            if ( shoppingList[shoppingList.length - 1] === jsonData.products[y].name ){
                totalPrice += parseInt(`${jsonData.products[y].price}`);
                sessionStorage.setItem("totalPrice", JSON.stringify(totalPrice));
                break;
            };
            y++;
        }
        if (shoppingList[shoppingList.length - 1] === jsonData.products[y].name) { break; };
    };

    alert("Your total is R" + totalPrice);
}






