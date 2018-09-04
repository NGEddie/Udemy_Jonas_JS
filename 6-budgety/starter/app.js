// <------------------------------------------>
// <<<-------- Data Controller ------------->>>
// <------------------------------------------>


var budgetController = (function() {
    var Expense = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

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
        }
    };

    return {
        addItem: function (type, desc, val) {
            var newItem, ID;

            if (data.allItems[type].length > 0) {
                ID = data.allItems[type][data.allItems[type].length-1].id +1;
            } else {
                ID = 1;
            }

            if (type === "expense") {
                newItem = new Expense(ID, desc, val);
            } else if(type === "income"){
                newItem = new Income(ID, desc, val);
            }

            data.allItems[type].push(newItem);
            return newItem;
        },

        showItem: function () {
            console.log(data);
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
    expenseContainer: document.querySelector('.expenses__list')
  };


  return {
        getInput: function () {
          return {
            type: DOMstrings.typeField.value,
            description: DOMstrings.descriptionField.value,
            value: DOMstrings.valueField.value
          }
        },

        getDOMStrings: function () {
          return DOMstrings;
        },

        addItemToList: function (item, type) {
            var html, newHtml, element;
            console.log(DOMstrings.incomeContainer);
            if (type === 'income') {
                element = DOMstrings.incomeContainer;
                html = '<div class="item clearfix" id="income-%id%"> <div class="item__description">%description%</div> <div class="right clearfix"> <div class="item__value">+ %value%</div> <div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button> </div> </div> </div>';
            }else if (type === 'expense') {
                element = DOMstrings.expenseContainer;
                html = '<div class="item clearfix" id="expense-%id%"> <div class="item__description">%description%</div> <div class="right clearfix"> <div class="item__value">- %value%</div> <div class="item__percentage">21%</div> <div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button> </div> </div> </div>';
            }

            newHtml = html.replace('%id%',item.id);
            newHtml = newHtml.replace('%description%', item.description);
            newHtml = newHtml.replace('%value%', item.value);

            element.insertAdjacentHTML('beforeend', newHtml);

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
      }

      var ctrlAddItem = function () {
          var input, newItem;

        // 1 Get the field input data
        input = UICtrl.getInput();

        // 2 add item to the budget controller
        newItem = budgetCtrl.addItem(input.type, input.description, input.value);

        // 3 add the item to the UI
        UICtrl.addItemToList(newItem, input.type);
        // console.log(newItem);
        // 4 calculate the budget

        //5 Display the budget on the UI
      }

    return {
      init: function () {
        console.log('Started');
        setUpEventListners();
      }
    };
})(budgetController, UIController);


// <------------------------------------------>
// <<<-------- Start ------------->>>
// <------------------------------------------>

controller.init();
