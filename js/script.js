const incomeSection = document.querySelector(".income-area");
const expensesSection = document.querySelector(".expenses-area");
const availableMoney = document.querySelector(".avaible-money");
const addTransactionBtn = document.querySelector(".add-transaction");
const deleteAllBtn = document.querySelector(".delete-all");
const popupBackground = document.querySelector(".popup-background");

const addTransactionPopup = document.querySelector(".addTransactionPopup");
const addBtn = document.querySelector(".addButton");
const cancelBtn = document.querySelector(".cancelButton");
const categorySelect = document.querySelector("#category");
const amountInput = document.querySelector("#amount");
const errorText = document.querySelector(".error");

const deleteTransactionPopup = document.querySelector(".deleteTransactionsPopup");
const deleteAllPopupBtn = document.querySelector(".deleteAllBtn");
const cancelPopupBtn = document.querySelector(".cancelAllBtn");

let transactionID = 0;
let moneyArr = [0]; 

function showPopup() {
	addTransactionPopup.style.display = "block";
    popupBackground.style.display = 'block'
}
function closePopup() {
	addTransactionPopup.style.display = "none";
    popupBackground.style.display = 'none'
    clearInputs();
}

function clearInputs() {
    amountInput.value = "";
	categorySelect.selectedIndex = 0;
    errorText.style.display = "none"
}

function checkInput() {
    if(amountInput.value !== '' && categorySelect.value !== 'none'){
        addNewTransaction();
    } else {
        errorText.style.display = "block"
    }
}

function addNewTransaction() {
    const newTransaction = document.createElement("div");
    newTransaction.classList.add('transaction');
    newTransaction.setAttribute("id", transactionID);

    if (categorySelect.value === "income") {
        incomeSection.appendChild(newTransaction);
        newTransaction.classList.add('income')
        moneyArr.push(parseFloat(amountInput.value));
        newTransaction.innerHTML = `
            <p class="transaction-name">+</p>
            <p class="transaction-amount">${amountInput.value}zł 
            <button class="delete" onclick="deleteTransaction(${transactionID})"><i class="fas fa-times"></i></button></p>`;
    } else if (categorySelect.value === "shopping") {
        expensesSection.appendChild(newTransaction);
        newTransaction.classList.add('expense')
        moneyArr.push(-parseFloat(amountInput.value));
        newTransaction.innerHTML = `
            <p class="transaction-name">-</p>
            <p class="transaction-amount">${amountInput.value}zł 
            <button class="delete" onclick="deleteTransaction(${transactionID})"><i class="fas fa-times"></i></button></p>`;
    }

    countMoney(moneyArr);
    closePopup();
    transactionID++;
    clearInputs();
}

function countMoney(money) {
    const newMoney = money.reduce((a,b) => a + b)
    availableMoney.innerHTML = `${newMoney}<span class="currency"> PLN</span>`;

}

function deleteTransaction(id){
    const transactionToDelete = document.getElementById(id);
    const transactionAmount = parseFloat(transactionToDelete.childNodes[3].innerText)

    const indexOfTransaction = moneyArr.indexOf(transactionAmount)

    moneyArr.splice(indexOfTransaction, 1);

    if (transactionToDelete.classList.contains('income')) {
        incomeSection.removeChild(transactionToDelete)
    } else {
        expensesSection.removeChild(transactionToDelete)
    }

    countMoney(moneyArr);
}

function deleteAllTransactions() {
    incomeSection.innerHTML = '<h3>Przychód:</h3>'
    expensesSection.innerHTML = '<h3>Wydatki:</h3>'
    availableMoney.innerHTML = `<p class="avaible-money">0,00<span class="currency"> PLN </span></p>`;
    moneyArr = [0]
    closeDeletePopup()
}

function showDeletePopup() {
	deleteTransactionPopup.style.display = "block";
    popupBackground.style.display = 'block'
}
function closeDeletePopup() {
	deleteTransactionPopup.style.display = "none";
    popupBackground.style.display = 'none'
}


addTransactionBtn.addEventListener("click", showPopup);
cancelBtn.addEventListener("click", closePopup);
addBtn.addEventListener("click", checkInput);

deleteAllBtn.addEventListener("click", showDeletePopup);
deleteAllPopupBtn.addEventListener("click", deleteAllTransactions);
cancelPopupBtn.addEventListener("click", closeDeletePopup);

