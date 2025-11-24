document.addEventListener("DOMContentLoaded", () => {

    let shippingFee = 25.25;

    const ownerName = document.getElementById("name");
    const company = document.getElementById("company");
    const address = document.getElementById("address");
    const country = document.getElementById("country");
    const telephone = document.getElementById("telephone");
    const email = document.getElementById("email");
    const signUpButton = document.getElementById("submit-sign-up-button");
    const signUpForm = document.getElementById("sign-up");
    const accountEmail = document.getElementById("account-email");
    const password = document.getElementById("password");
    const logInButton = document.getElementById("submit-sign-in");
    const logInForm = document.getElementById("log-in");
    const cartButton = document.getElementById("cart-button");
    const cartLink = document.getElementById("cart-link");

    if(signUpButton){
        signUpButton.addEventListener("click", getFormInfo);
    }
    
    

    function getFormInfo()
    {
        const nameVal = ownerName.value.trim();
        const companyVal = company.value.trim();
        const addressVal = address.value.trim();
        const countryVal = country.value.trim();
        const telephoneVal = telephone.value.trim();
        const emailVal = email.value.trim();

        saveAccount(nameVal,companyVal,addressVal,countryVal,telephoneVal,emailVal);
    }

    function saveAccount(nameVal,companyVal,addressVal,countryVal,telephoneVal,emailVal)
    {
        const account = 
        {
            name: nameVal,
            company: companyVal,
            address: addressVal,
            country: countryVal,
            telephone: telephoneVal,
            email: emailVal,
            password: "password123",
            status: "loggedOut"
        }

        
        signUpForm.reset();
        console.log(account);

        const savedAccount = JSON.stringify(account); //saves the account to a json file
        console.log(savedAccount);
        localStorage.setItem('accounts', savedAccount);
        alert('You will be contacted by our company in 3-4 weeks for approval where an account log in will be created for you');

    }

    if(logInButton){
        logInButton.addEventListener("click", retrieveLogIn);
    }
    

    function retrieveLogIn()
    {
        const accountEmailVal = accountEmail.value.trim();
        const passwordVal = password.value.trim();
        logIn(accountEmailVal,passwordVal);
    }

    function logIn(accountEmailVal, passwordVal)
    {
        const loggedIn = 
        {
            email: accountEmailVal,
            password: passwordVal,
            status: "loggedOut"
        }
        const retrieveAccount = JSON.parse(localStorage.getItem('accounts'));

        if(retrieveAccount.status === "loggedIn"){
            alert('You are already logged in');
            logInForm.reset();
        }else{
            if(loggedIn.email === retrieveAccount.email && loggedIn.password === retrieveAccount.password && retrieveAccount.status === "loggedOut"){
                retrieveAccount.status = "loggedIn";
                const putBackAccount = JSON.stringify(retrieveAccount);
                localStorage.setItem('accounts', putBackAccount);
                alert('log in sucessful');
                console.log(retrieveAccount);
                alert('Cart button has now appeared and you can purchase products');
                logInForm.reset();
                window.location.href = "products.html";
            }else{
                alert('Incorrect password or email');
            }
        }
        
    }

    function checkStatus()
    {
        const retrieveAccount = JSON.parse(localStorage.getItem('accounts'));
        if(retrieveAccount && retrieveAccount.status === "loggedIn"){
            if(cartButton){
                cartButton.style.visibility = "visible";
            }
            if(cartLink){
                cartLink.style.visibility = "visible";
            }
            
        }
    }

    checkStatus();

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


    if (cartButton) {
        cartButton.addEventListener("click", addToCart);
    }

    const cartItems = document.getElementById("cart-items");
    if (!cartItems) return;

    let retrieveCart = JSON.parse(localStorage.getItem("cart")) || [];

    if (retrieveCart.length === 0) {
        cartItems.innerText = "No items selected";
        return;
    }

    let totalCost = 0 + shippingFee;

    retrieveCart.forEach(item => {
        const product = products.find(p => p.id === item.id);
        if (!product) return;

        const name = document.createElement("p");
        name.innerText = `${product.name} (x${item.quantity})`;

        const price = document.createElement("p");
        price.innerText = "Price: $" + (product.price * item.quantity);

        cartItems.appendChild(name);
        cartItems.appendChild(price);
        cartItems.appendChild(document.createElement("hr"));

        totalCost += product.price * item.quantity;
    });

    const displayTotal = document.createElement("p");
    displayTotal.innerText = `Total Cost of Items :$ ${totalCost}`;
    cartItems.append(displayTotal);

    function displayShippingInfo()
    {
        const companyInfo = document.getElementById("company-info");
        const retrieveAccount = localStorage.getItem('accounts');
        const displayAccount = JSON.parse(retrieveAccount);

        if(displayAccount){
            companyInfo.innerHTML = `
                <h2>Company Info</h2>
                <p>Name: ${displayAccount.name}</p>
                <p>Company: ${displayAccount.company}</p>
                <p>Address: ${displayAccount.address}</p>
                <p>Email: ${displayAccount.email}</p>
            `
        }
    }

    displayShippingInfo();

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

    const retrieveAccount = localStorage.getItem('accounts');
    const displayAccount = JSON.parse(retrieveAccount);
    let receiptText = "--- Medigician Pharma Receipt ---\n";
    receiptText += `Name: ${displayAccount.name}\nCompany: ${displayAccount.company}\nAddress: ${displayAccount.address}\n Email: ${displayAccount.email}`;

    let total = 0 + shippingFee;

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
    cartItems.innerHTML = "No items selected"; //since i didnt make loading the receipts a function
}

    
});
