'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const displayTransactions = function (movements) {
  // console.log(movements);
  movements.forEach((mov, i) => {
    let type = mov > 0 ? 'deposit' : 'withdrawal';
    let html = `<div class="movements__row">
    <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
    <div class="movements__value">${mov}</div>
  </div>`;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(function (name) {
        return name.charAt(0);
      })
      .join('');
  });
};

createUsernames(accounts);

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce(function (acc, mov) {
    return acc + mov;
  }, 0);
  labelBalance.textContent = `${acc.balance}€`;
};

const calcDisplaySummary = function (acc) {
  console.log(acc);
  const incomming = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, movs) => acc + movs, 0);
  // console.log(incomming);
  labelSumIn.textContent = `${incomming}€`;

  const outgoing = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  // console.log(Math.abs(outgoing));

  labelSumOut.textContent = `${Math.abs(outgoing)}€`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter(int => int >= 1)
    .reduce((acc, int) => acc + int, 0);

  //  console.log(interest);
  labelSumInterest.textContent = `${interest}€`;
};


console.log(accounts);

const updateUI =function(acc){
 //display balance
 calcDisplayBalance(acc);
    
 //display movements
 displayTransactions(acc.movements);

 //display summary
 calcDisplaySummary(acc);
}
let currentAccount;

btnLogin.addEventListener('click',function(e){
  e.preventDefault();
  // console.log('click');
  // inputLoginUsername.value
  currentAccount = accounts.find(acc=>acc.username === inputLoginUsername.value)
  console.log(currentAccount);

  if(currentAccount?.pin === Number(inputLoginPin.value)){
    //display ui & message
    labelWelcome.textContent = `Welcome back. ${currentAccount.owner.split(' ')[0]}`;
    containerApp.style.opacity = 100;

    //clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();
    
    //update UI
    updateUI(currentAccount);
   
  }
})

btnTransfer.addEventListener('click',function(e){
  e.preventDefault();
  let receiverAcc = accounts.find(acc=>acc.username === inputTransferTo.value);
  let amount = Number(inputTransferAmount.value);
  console.log(receiverAcc);
  inputTransferTo.value = inputTransferAmount.value = '';
  if(amount > 0 && amount <= currentAccount.balance && receiverAcc && receiverAcc.username !== currentAccount.username){
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);
  }
  updateUI(currentAccount);
})

btnClose.addEventListener('click',function(e){
  e.preventDefault();
  if(inputCloseUsername.value === currentAccount.username && Number(inputClosePin.value) === currentAccount.pin){
    const index = accounts.findIndex(acc =>acc.username === currentAccount.username)
    console.log(index);
    accounts.splice(index,1);

    //hide UI
    containerApp.style.opacity = 0;
  }
})
/////////////////////////////////////////////////

//coding challege 1

const dogsJulia = [3, 5, 2, 12, 7];
const dogsKate = [4, 1, 15, 8, 3];

const newdogsJulia = dogsJulia.slice(1, 3);
// console.log(dogsJulia,newdogsJulia);

const checkDogs = function (array1) {
  // console.log(array1);
  array1.forEach((dogAge, i) => {
    let type = dogAge > 3 ? 'adult' : 'puppy';
    console.log(`Dog number ${i + 1} is an ${type},and is ${dogAge} years old`);
  });
};

checkDogs([...newdogsJulia, ...dogsKate]);

//coding challege 2

const calcAverageHumanAge = function (ages) {
  const humanAge = ages.map(function (age) {
    if (age <= 2) {
      return 2 * age;
    } else {
      return 16 + age * 4;
    }
  });
  const adults = humanAge.filter(function (age) {
    return age > 18;
  });
  // console.log(adults);

  const avgAgeofAdult = adults.reduce(function (acc, age, i, arr) {
    // console.log(arr);
    return acc + age / arr.length;
  }, 0);
  console.log(avgAgeofAdult);
};

calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);

//coding challenge 3

const calcAverageHumanAge1 = function (ages) {
  const humanAge = ages
    .map((age, i, arr) => {
      // console.log(arr);
      return age <= 2 ? 2 * age : 16 + age * 4;
    })
    .filter((age, i, arr) => {
      // console.log(arr);
      return age > 18;
    })
    .reduce((acc, age, i, arr) => acc + age / arr.length, 0);

  console.log(humanAge);
};

calcAverageHumanAge1([5, 2, 4, 1, 15, 8, 3]);

var name = 'khushali sangani';
var splitedName = name.split(' ');
// console.log(splitedName);
const username = splitedName
  .map(function (elem) {
    // console.log(elem);
    return elem.charAt(0);
    // console.log(res.charAt(0) + elem.charAt(0));
  })
  .join('');

console.log(username);



const account = accounts.find(acc => acc.owner === 'Jessica Davis');
console.log(account);

//coding challege 4

const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
  ];

  dogs.forEach(dog => {
    dog.recFood= Math.trunc(dog.weight ** 0.75 * 28);
    // console.log(recommendedFood);
  });

  console.log(dogs);
  
const dogSarah = dogs.find(dog => {
  // console.log(dog.owners.includes('Sarah'));
  dog.owners.includes('Sarah')
})
// const dogSarah = dogs.find(dog => dog.owners.includes('Sarah'));
console.log(dogSarah);

const ownersEatTooMuch = dogs.filter(dog=>{
  return dog.curFood > dog.recFood

  // })
})

console.log(ownersEatTooMuch);

const ownersEatTooLittle = dogs.
                          filter(dog=>dog.curFood < dog.recFood).map(dog=>dog.owners)
                          .flat()

console.log(ownersEatTooLittle);
console.log(`${ownersEatTooLittle.join(' and ')}'s dogs eat too little!`);

console.log(dogs.some(dog => dog.curFood === dog.recFood));

