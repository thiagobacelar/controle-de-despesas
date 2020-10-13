const transactionUl = document.querySelector("#transactions");
const capital = document.querySelector("#balance");
const ativo = document.querySelector("#money-plus");
const passivo = document.querySelector("#money-minus");
const form = document.querySelector("#form");
const text = document.querySelector("#text");
const amount = document.querySelector("#amount");


const localStorageTransation = JSON.parse(localStorage.getItem('transactions'))

let Alltransaction = localStorage
.getItem('transactions') !== null ? localStorageTransation : []

const removeTransction = ID => {
    Alltransaction = Alltransaction.filter(transaction => transaction.id !== ID)
    updateLocalStorage()
    init();
}

const addTransacaoDom =  transaction => {

    const Operador = transaction.amount < 0 ? '-' : '+'
    const CSSClass = transaction.amount < 0 ? 'minus' : 'plus'
    const AmountOperacaoAbsoluto = Math.abs(transaction.amount).toFixed(2);
    const li = document.createElement("li")
    li.classList.add(CSSClass);
    li.innerHTML = ` 
        ${transaction.name} 
        <span>${Operador} R$ ${AmountOperacaoAbsoluto}
        </span><button class="delete-btn" onClick="removeTransction(${transaction.id})">
          x
        </button>
   `;
    transactionUl.append(li);
   
}

const updateTransationValues = () =>{
    const transactionAmount = Alltransaction.map(transaction => transaction.amount)

    const total = transactionAmount
    .reduce((acumular, numero) => acumular + numero, 0)
    .toFixed(2)

    const receita = transactionAmount
    .filter(item => item > 0)
    .reduce((acumular, item) => acumular + item, 0)
    .toFixed(2)

    const despesa = Math.abs(transactionAmount
    .filter(item => item < 0)
    .reduce((acumular, item) => acumular + item, 0))
    .toFixed(2);

    capital.textContent = `R$: ${total}`;
    ativo.textContent =   `R$: ${receita}`;
    passivo.textContent = `R$: ${despesa}`;
}    


const init = () => {
    transactionUl.innerHTML = ''
    Alltransaction.forEach(addTransacaoDom)
    updateTransationValues()
}

init();

const updateLocalStorage = () => {
    localStorage.setItem('transactions', JSON.stringify(Alltransaction))
}

// função que gera um ID aleatorio
const generateId = () => Math.round(Math.random() * 1000);


//envio de FORM 
form.addEventListener("submit", event => {
    event.preventDefault();

    const TransctionTexto = text.value.trim();
    const TransctionAmount = amount.value.trim();
    
    if(text.value.trim() === '' || amount.value.trim() === ''){
        alert("preencha o campo");
        return
    }

    let transaction = {
        id: generateId(),
        name: TransctionTexto,
        amount: Number(TransctionAmount) // number ou + na frente do TransctionAmount para converter de string para inteiro
    }
    

    Alltransaction.push(transaction)
    init()
    updateLocalStorage()
    
    text.value = '';
    amount.value = '';
    

})

// metodo: Math.abs() //retorna o valor absoluto
// map() percorer o array
// reduce() reduzir o array
// filter vai filtrar apenas o que queremos
//trim() 
// converter string para numero Number() ou + na frente do transaction 