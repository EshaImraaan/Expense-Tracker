let expenses = [];
let totalAmount = 0;

const categorySelect = document.getElementById('category-select');
const amountInput = document.getElementById('amount-input');
const dateInput = document.getElementById('date-input');
const addBtn = document.getElementById('add-btn');
const expensesTableBody = document.getElementById('expnese-table-body');
const totalAmountCell = document.getElementById('total-amount');


function updateTotalAmount() {
    totalAmountCell.textContent = `₹${totalAmount}`;
}


function addExpenseToTable(expense, index) {
    const newRow = expensesTableBody.insertRow();

    const categoryCell = newRow.insertCell();
    const amountCell = newRow.insertCell();
    const dateCell = newRow.insertCell();
    const deleteCell = newRow.insertCell();

    categoryCell.textContent = expense.category;
    amountCell.textContent = `₹${expense.amount}`;
    dateCell.textContent = expense.date;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn');

    deleteBtn.addEventListener('click', function () {
        totalAmount -= expenses[index].amount;
        expenses.splice(index, 1);
        expensesTableBody.innerHTML = '';
        totalAmount = 0;
        expenses.forEach((exp, i) => {
            totalAmount += exp.amount;
            addExpenseToTable(exp, i);
        });
        updateTotalAmount();
    });

    deleteCell.appendChild(deleteBtn);
}


addBtn.addEventListener('click', function () {
    const category = categorySelect.value;
    const amount = Number(amountInput.value);
    const date = dateInput.value;

    if (category === '') {
        alert('Please select a category');
        return;
    }

    if (isNaN(amount) || amount <= 0) {
        alert('Please enter a valid amount');
        return;
    }

    if (date === '') {
        alert('Please select a date');
        return;
    }

    const expense = { category, amount, date };
    expenses.push(expense);
    totalAmount += amount;

    addExpenseToTable(expense, expenses.length - 1);
    updateTotalAmount();

    
    amountInput.value = '';
    dateInput.value = '';
});
