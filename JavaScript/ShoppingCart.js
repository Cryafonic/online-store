const numberOfMilliseconds = new Date();


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

let shopping = [];

shopping = JSON.parse(sessionStorage.getItem("shoppingList"))

// Generates elements on the page.
let x = 1;
for (let i in shopping) {
    let tableRow = $(`<tr></tr>`);
    let tableDataName = $(`<td>${shopping[i]}</td>`);
    let tableDataPrice = "";
    if (shopping[i] == jsonData.products[i].name) {
        tableDataPrice = $(`<td>R${jsonData.products[i].price}</td>`);
    }

    let y = 0;

    while (shopping[i] != jsonData.products[i].name) {
        if (shopping[i] == jsonData.products[y].name) {
            tableDataPrice = $(`<td>R${jsonData.products[y].price}</td>`);
            break;
        }
        y++;
    }

    let dltButton = $(`<button>Remove</button>`);

    tableDataName.attr("scope", "row");
    dltButton.attr("class", "btn btn-outline-danger deleteButton")

    //Makes a copy of the current list.
    // Removes an item in the original list.
    $(dltButton).click(function () {
        let shoppingList = JSON.parse(sessionStorage.getItem("shoppingList"));
        sessionStorage.setItem("shoppingListCopy", JSON.stringify(shoppingList));
        shopping.splice(i, 1);
        sessionStorage.setItem("shoppingList", JSON.stringify(shopping));
    });

    $(tableRow).append(`<th>${x++}</th>`)
    $(tableRow).append(tableDataName);
    $(tableRow).append(tableDataPrice);
    $(tableRow).append(dltButton);
    $("#tableShoppingList").append(tableRow);

}
;
let dropDownForm = $(`<form class="col-sm-2 m-1" id="hideDeliveryForm"></form>`);
let dropDownLabel = $(`<label>Select delivery</label>"`);
let dropDownSelect = $(`<select class="form-control m-1" id="deliveryCost" name="deliveryOptions"><option value="0">Economy delivery - Free</option><option value="49">Standard delivery - R49</option><option value="99">Premium delivery - R99</option></select>`);
// Generates forms on the page.
$(dropDownForm).append(dropDownLabel);
$(dropDownForm).append(dropDownSelect);
$("#formsInserted").append(dropDownForm);
let dynamicPrice = $("#dynamicPrice").append(parseInt(sessionStorage.getItem('totalPrice')));

//Calculates the delivery cost and what to add when refreshed.
$("#deliveryCost").click(function () {
    let cost = document.getElementsByName("deliveryOptions")[0].value;

    if (cost === "49") {
        let deliveryCal = parseInt(sessionStorage.getItem("totalPrice"));
        deliveryCal = deliveryCal + 49;
        sessionStorage.setItem('totalPrice', JSON.stringify(deliveryCal));
    } else if (cost === "99") {
        let deliveryCal = parseInt(sessionStorage.getItem("totalPrice"));
        deliveryCal = deliveryCal + 99;
        sessionStorage.setItem('totalPrice', JSON.stringify(deliveryCal));
    }
    dynamicPrice = ("#dynamicPrice").append(parseInt(sessionStorage.getItem('totalPrice')));
});

// Confirms the order when button is being pressed.
$("#confirmOrderButton").click(function () {
    let discountValue = document.getElementById("discountInput").value;
    if (discountValue === sessionStorage.discountOrderNumber) {
        let noneDiscountTotalPrice = parseInt(sessionStorage.getItem('totalPrice'));
        let discountedTotalPrice = noneDiscountTotalPrice * 0.25;
        discountedTotalPrice = noneDiscountTotalPrice - discountedTotalPrice;
        sessionStorage.setItem('totalPrice', JSON.stringify(discountedTotalPrice));
        alert("Discounted price R" + JSON.parse(sessionStorage.getItem("totalPrice")));
    }
    sessionStorage.clear();
    referenceNumberGenerator();
});

//Refreshed the page when pressed.
$("#updateOrderButton").click(function () {
    location.reload();
});

// Generates a reference number.
function referenceNumberGenerator() {
    alert(`Your order has been successful.\n Your reference number is ${numberOfMilliseconds.getTime()}\n Use this order number ${numberOfMilliseconds.getTime()} on your next purchase for discount. `);
    sessionStorage.setItem('discountOrderNumber', JSON.stringify(numberOfMilliseconds.getTime()));
};

// Hides the delivery selection form.
$("#exampleRadios1").click(function () {
    $("#hideDeliveryForm").hide();
});

//Shows the delivery selected form.
$("#exampleRadios2").click(function () {
    $("#hideDeliveryForm").show();
});

// updates the dynamic total when a product is removed.
$(".deleteButton").click(function () {
    let shoppingListCopy = JSON.parse(sessionStorage.getItem("shoppingListCopy"));
    let shoppingList = JSON.parse(sessionStorage.getItem("shoppingList"));
    for (let i = 0; i < shoppingListCopy.length; i++) {
        if (shoppingList.length === 0){
            let totalPrice = parseInt(sessionStorage.getItem("totalPrice"));
            totalPrice = 0;
            sessionStorage.setItem("totalPrice", JSON.stringify(totalPrice));
            break;
        }
        let y = 0;
        while (shoppingList[i] != shoppingListCopy[i]) {
            if (shoppingListCopy[i] === jsonData.products[y].name) {
                let totalPrice = parseInt(sessionStorage.getItem("totalPrice"));
                let productRemoved = jsonData.products[y].price;
                totalPrice = totalPrice - productRemoved;
                sessionStorage.setItem("totalPrice", JSON.stringify(totalPrice));
                break;
            };
            y++;
        }
        if (shoppingListCopy[i] === jsonData.products[i].name ) {break;};
    }
});




