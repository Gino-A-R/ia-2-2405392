document.addEventListener("DOMContentLoaded", () => {

    const products = [
        {id: 1,name:"Albuterol 2mg", price: 20.00, therapy: "respiratory"},
        {id: 2,name:"Albuterol 4mg", price: 25.00, therapy: "respiratory"},
        {id: 3,name:"Amlodipine 5mg", price: 30.00, therapy: "cardiovascular"},
        {id: 4,name:"Amlodipine 10mg", price: 45.00, therapy: "cardiovascular"},
        {id: 5,name:"Atenolol 25mg", price: 50.00, therapy: "cardiovascular"},
        {id: 6,name:"Atenolol 50mg", price: 55.00, therapy: "cardiovascular"},
        {id: 7,name:"Atorvastatin 10mg", price: 60.00, therapy: "cardiovascular"},
        {id: 8,name:"Atorvastatin 40mg", price: 90.00, therapy: "cardiovascular"},
        {id: 9,name:"Enalapril 10mg", price: 85.00, therapy: "cardiovascular"},
        {id: 10,name:"Enalapril 20mg", price: 95.00, therapy: "cardiovascular"},
        {id: 11,name:"Guaifenesin 200mg", price: 30.00, therapy: "respiratory"},
        {id: 12,name:"Haloperidol 2mg", price: 60.00, therapy: "antipsychotic"},
        {id: 13,name:"Haloperidol 5mg", price: 70.00, therapy: "antipsychotic"},
        {id: 14,name:"Levocetirizine 5mg", price: 45.00, therapy: "respiratory"},
        {id: 15,name:"Montelukast 10mg", price: 45.00, therapy: "respiratory"},
        {id: 16,name:"Olanzipine 5mg", price: 65.00, therapy: "antipsychotic"},
        {id: 17,name:"Olanzipine 10mg", price: 70.00, therapy: "antipsychotic"},
        {id: 18,name:"Pimozide 2mg", price: 70.00, therapy: "antipsychotic"},
        {id: 19,name:"Pimozide 4mg", price: 70.00, therapy: "antipsychotic"},
        {id: 20,name:"Prednisone 5mg", price: 70.00, therapy: "respiratory"},
        {id: 21,name:"Prednisone 10mg", price: 75.00, therapy: "respiratory"},
        {id: 22,name:"Quetiapine 25mg", price: 65.00, therapy: "antipsychotic"},
        {id: 23,name:"Quetiapine 100mg", price: 70.00, therapy: "antipsychotic"},
        {id: 24,name:"Resperidone 1mg", price: 70.00, therapy: "antipsychotic"},
        {id: 25,name:"Resperidone 2mg", price: 75.00, therapy: "antipsychotic"},
        {id: 26,name:"Simvastatin 10mg", price: 55.00, therapy: "cardiovascular"},
        {id: 27,name:"Simvastatin 40mg", price: 65.00, therapy: "cardiovascular"}
    ];

    const cartButton = document.getElementById("cart-button");
    if (cartButton) {
        cartButton.addEventListener("click", addToCart);
    }

    const checkoutItems = document.getElementById("checkout-items");
    if (!checkoutItems) return;

    let retrieveCart = JSON.parse(localStorage.getItem("cart")) || [];

    if (retrieveCart.length === 0) {
        checkoutItems.innerText = "No items selected";
        return;
    }

    let totalCost = 0;

    retrieveCart.forEach(item => {
        const product = products.find(p => p.id === item.id);
        if (!product) return;

        const name = document.createElement("p");
        name.innerText = `${product.name} (x${item.quantity})`;

        const price = document.createElement("p");
        price.innerText = "Price: $" + (product.price * item.quantity);

        checkoutItems.appendChild(name);
        checkoutItems.appendChild(price);
        checkoutItems.appendChild(document.createElement("hr"));

        totalCost += product.price * item.quantity;
    });

    const displayTotal = document.createElement("p");
    displayTotal.innerText = `Toal Cost of Items :$ ${totalCost}`;
    checkoutItems.append(displayTotal);

    function addToCart() {
        const productID = parseInt(cartButton.dataset.id);
        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        const existing = cart.find(item => item.id === productID);

        if (existing) {
            existing.quantity++;
        } else {
            cart.push({ id: productID, quantity: 1 });
        }

        localStorage.setItem("cart", JSON.stringify(cart));
    }

    const buyButton = document.getElementById("buy-button");

    if (buyButton) {
    buyButton.addEventListener("click", downloadReceipt);
    }

    function downloadReceipt() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart.length === 0) {
        alert("No items in cart to generate receipt!");
        return;
    }

    let receiptText = "--- Medigician Pharma Receipt ---\n";

    let total = 0;

    cart.forEach(item => {
        const product = products.find(p => p.id === item.id);
        if (!product) return;

        const subtotal = product.price * item.quantity;
        receiptText += `${product.name} (x${item.quantity}) - $${subtotal.toFixed(2)}\n`;
        total += subtotal;
    });

    receiptText += `\nTotal: $${total.toFixed(2)}\n`;


    const blob = new Blob([receiptText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "receipt.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    URL.revokeObjectURL(url);
    localStorage.removeItem("cart");
    checkoutItems.innerHTML = "No items selected"; //since i didnt make loading the receipts a function
}


});
