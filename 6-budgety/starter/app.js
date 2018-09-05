// <------------------------------------------>
// <<<-------- Data Controller ------------->>>
// <------------------------------------------>


var budgetController = (function() {
    var Expense = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
        this.percentage = -1;
    };

    Expense.prototype.calcPercentage = function (totalIncome) {
        if (totalIncome > 0) {
            this.percentage = Math.round(this.value/totalIncome * 100);
        } else {
            this.percentage = -1;
        }
    };

    Expense.prototype.getPercentage = function() {
        return this.percentage;
    }

    var Income = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };



    var data = {
        allItems: {
            expense: [],
            income: []
        },
        totals:{
            expense: 0,
            income: 0
        },
        budget:0,
        percentage: -1
    };

    function calcTotal(type) {
            var sum = 0;
            data.allItems[type].forEach(function (current) {
                sum += current.value;
            });

            data.totals[type] = sum;
    };

    return {
        addItem: function (type, desc, val) {
            var newItem, ID;

            if (data.allItems[type].length > 0) {
                ID = data.allItems[type][data.allItems[type].length-1].id + 1;
            } else {
                ID = 0;
            }

            if (type === "expense") {
                newItem = new Expense(ID, desc, val);
            } else if(type === "income"){
                newItem = new Income(ID, desc, val);

              }
            data.allItems[type].push(newItem);
            return newItem;
        },

        deleteItem: function (type, id) {
            var ids, index;
            ids = data.allItems[type].map(function(current) {
                    return current.id;
            });

            index = ids.indexOf(id);

            if (index !== -1) {
                data.allItems[type].splice(index,1);
            }
        },

        showItem: function () {
            console.log(data);
        },

        calculateBudget:function () {
            calcTotal('expense');
            calcTotal('income');

            data.budget = data.totals.income - data.totals.expense;
            if (data.totals.income > 0) {
                data.percentage = Math.round((data.totals.expense/ data.totals.income) * 100);
            } else {
                data.percentage= -1;
            }
        },

        calculatePercentages: function () {
            data.allItems.expense.forEach(function(current) {
                current.calcPercentage(data.totals.income);
            });
        },

        getPercentages: function () {
                var allPercentages = data.allItems.expense.map(function (current) {
                    return current.getPercentage();
                });
                return allPercentages;
        },

        getBudget: function () {
            return {
                budget: data.budget,
                totalIncome: data.totals.income,
                totalExpense: data.totals.expense,
                percentage: data.percentage
            };
        }
    }

})();



// <------------------------------------------>
// <<<-------- UI Controller ------------->>>
// <------------------------------------------>

var UIController = (function () {

  var DOMstrings = {
    typeField: document.querySelector('.add__type'), //returns income or expense
    descriptionField: document.querySelector('.add__description'),
    valueField: document.querySelector('.add__value'),
    addBtn: document.querySelector('.add__btn'),
    incomeContainer: document.querySelector('.income__list'),
    expenseContainer: document.querySelector('.expenses__list'),
    budgetLabel: '.budget__value',
    incomeLabel: '.budget__income--value',
    expenseLabel: '.budget__expenses--value',
    percentageLabel: '.budget__expenses--percentage',
    container: document.querySelector('.container')
  };


  return {
        getInput: function () {
          return {
            type: DOMstrings.typeField.value,
            description: DOMstrings.descriptionField.value,
            value: parseFloat(DOMstrings.valueField.value)
          }
        },

        getDOMStrings: function () {
          return DOMstrings;
        },

        addItemToList: function (item, type) {
            var html, newHtml, element;

            if (type === 'income') {
                element = DOMstrings.incomeContainer;
                html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">+ %value%</div><div class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }else if (type === 'expense') {
                element = DOMstrings.expenseContainer;
                html = '<div class="item clearfix" id="expense-%id%"> <div class="item__description">%description%</div> <div class="right clearfix"> <div class="item__value">- %value%</div> <div class="item__percentage">21%</div> <div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button> </div> </div> </div>';
            }

            newHtml = html.replace('%id%',item.id);
            newHtml = newHtml.replace('%description%', item.description);
            newHtml = newHtml.replace('%value%', item.value);

            element.insertAdjacentHTML('beforeend', newHtml);

          },

          deleteItemFromList: function(selectorID) {
              var element = document.getElementById(selectorID);
              element.parentNode.removeChild(element);
          },

          clearFields: function() {
              var fields, fieldsArray;

              fields = document.querySelectorAll('.add__description' + ','+ '.add__value');

              fieldsArray = Array.prototype.slice.call(fields);

              fieldsArray.forEach(function (current,index, array) {
                  current.value = "";
              });

              fieldsArray[0].focus();
          },

          displayBudget: function(obj) {
              document.querySelector(DOMstrings.budgetLabel).textContent = obj.budget;
              document.querySelector(DOMstrings.incomeLabel).textContent = obj.totalIncome;
              document.querySelector(DOMstrings.expenseLabel).textContent = obj.totalExpense;
              if (obj.percentage>0) {
                  document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage + '%';
              }else {
                  document.querySelector(DOMstrings.percentageLabel).textContent = '---';
              }
          }
    };

})();

// <------------------------------------------>
// <<<-------- Main Controller ------------->>>
// <------------------------------------------>

var controller = (function (budgetCtrl,UICtrl) {

    function setUpEventListners() {
        var DOM = UICtrl.getDOMStrings();

        DOM.addBtn.addEventListener('click', ctrlAddItem) ;

        document.addEventListener('keydown', function (e) {
          if(e.keycode === 13 || e.which === 13) {
            ctrlAddItem();
          }
        });

        DOM.container.addEventListener('click', ctrlDeleteItem);
    };

    function updateBudget() {
          //1 calculate the budget
          budgetCtrl.calculateBudget();
          //2 return the budget
          var budget = budgetCtrl.getBudget();
          //3 Display the budget on the UI
          UICtrl.displayBudget(budget);
    };

    function updatePercentages() {
        //1. calculate update percentage
        budgetCtrl.calculatePercentages();
        //2. Read percentages from the budget controller
        var percentages = budgetCtrl.getPercentages();
        //3. Update the UI with the new percentages
        console.log(percentages);
    };

    var ctrlAddItem = function () {
        var input, newItem;

        // 1 Get the field input data
        input = UICtrl.getInput();

        if (input.description !== "" && !isNaN(input.value) && input.value >0){

            // 2 add item to the budget controller
            newItem = budgetCtrl.addItem(input.type, input.description, input.value);

            // 3 add the item to the UI
            UICtrl.addItemToList(newItem, input.type);

            // 4 clear fields
            UICtrl.clearFields();

            // 5 calulate and update budget
            updateBudget();

            //6 calculate and update percentages
            updatePercentages();
        }
    };

    var ctrlDeleteItem = function(e) {
        var itemID, splitID, type, ID;

        itemID = e.target.parentNode.parentNode.parentNode.id;
        if (itemID) {
            splitID = itemID.split('-');
            type = splitID[0];
            ID = parseInt(splitID[1]);
            budgetCtrl.deleteItem(type ,ID);
        }

        UICtrl.deleteItemFromList(itemID);
        updateBudget();
        //4 calculate and update percentages
        updatePercentages();
    };

    return {
      init: function () {
        console.log('Started');
        UICtrl.displayBudget({
            budget: 0,
            totalIncome: 0,
            totalExpense: 0,
            percentage: -1
        });

        setUpEventListners();
      }
    };
})(budgetController, UIController);


// <------------------------------------------>
// <<<-------- Start ------------->>>
// <------------------------------------------>

controller.init();
