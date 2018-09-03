//function interviewQuestion(job) {
//    if(job === 'designer') {
//        return function(name) {
//            console.log(name + ' what is UX');
//        }
//    } else if(job === 'teacher') {
//        return function(name) {
//            console.log('what subject ' + name);
//        }
//    } else {
//        return function(name) {
//            console.log('hello' + name);
//        }
//    }
//}
//var teacherQuestion = interviewQuestion('teacher');
//var designerQuestion = interviewQuestion('designer');
//
//teacherQuestion('John');
//designerQuestion('Mark')

//function game() {
//    var score = Math.random() * 10;
//    console.log(score >=5);
//}
//
//game();

//(function() {
//    var score = Math.random() *10;
//    console.log(score>=5);
//}
//)();

//(function(goodLuck) {
//    var score = Math.random() *10;
//    console.log(score>=5-goodLuck);
//}
//)(5);

//function retirement(retirementAge) {
//    var a = ' years left';
//    return function(yearOfBirth) {
//        var age = 2016 - yearOfBirth;
//        console.log((retirementAge-age) + a);
//    }
//}
//
//var retirementUS = retirement(66);
//
//retirementUS(1975);
//
//var retirementGer = retirement(65);
//var retirementIce = retirement(67);
//
//retirementGer(1990);
//retirementIce(1990);

// function interviewQuestion(job) {
//
//     return function(name) {
//         if(job === 'designer') {
//             console.log(name + ' what is UX?') ;
//         } else if(job === 'teacher') {
//             console.log('What do you teach? ' + name) ;
//         } else {
//             console.log(questionText = 'Hi ' +name);
//         }
//     }
// }
//
// var question = interviewQuestion('teacher');
// question('john');

// var john = {
//     name : 'John',
//     age : 26,
//     job : 'teacher',
//     presentation: function (style, timeOfDay) {
//       if (style === 'formal') {
//           console.log('Good ' + timeOfDay + ' ladies and gentlemen: I\'m ' + this.name +  ', I\'m a ' + this.job + ' and I\'m ' + this.age + ' years old.');
//       } else if (style === 'friendly') {
//         console.log('Hi, I\'m ' + this.name +  '. I\'m a ' + this.job + ' and I\'m ' + this.age + ' years old.' + ' Have a nice ' + timeOfDay);
//       }
//     }
// }
//
// var emily = {
//   name : 'emily',
//   age : 33,
//   job : 'designer'
// }
//
// john.presentation('formal', 'Afternoon');
// john.presentation('friendly', 'morning');
//
//
// john.presentation.call(emily, 'friendly', 'evening');
//
// john.presentation.apply(emily, ['friendly', 'morning']);
//
// var johnFriendly = john.presentation.bind(john, 'friendly')
//
// johnFriendly('night');

// var years = [1990, 1965, 1937, 2005, 1998];
//
// function arrayCalc(arr, fn) {
//   var arrRes = [];
//   for (var i = 0; i < arr.length; i++) {
//     arrRes.push(fn(arr[i]));
//   }
//   return arrRes;
// }
//
// function calculateAge(el) {
//   return 2016 - el;
// }
//
// function isFullAge(limit, el) {
//   return el >=  limit;
// }
//
// var ages = arrayCalc(years, calculateAge);
// var ageLimit = arrayCalc(ages, isFullAge.bind(this,20));
//
// console.log(ages);
// console.log(ageLimit);

(function() {
  function Question(question, answers, correctAnswer){
    this.questionText = question;
    this.possibleAnswers = answers;
    this.correctAnswer = correctAnswer;
  }

  Question.prototype.displayQuestion = function () {
      console.log(this.questionText);

      for (var i = 0; i < this.possibleAnswers.length; i++) {
        console.log('\[' + i + '\] ' + this.possibleAnswers[i]);
      }
  };

Question.prototype.checkAnswer = function (answer, callBack) {
      if (answer === this.correctAnswer) {
        console.log("Correct!");
        this.showScore(callBack(true));
      } else {
        console.log("Incorrect :(");
        this.showScore(callBack(false));
      }
      startQuiz();
  };

  Question.prototype.showScore = function (score) {
    console.log('Your current score is: ' + score);
    console.log('-------------------------');
  };

  function startQuiz() {
    questionNumber = Math.floor(Math.random() * questions.length);

    questions[questionNumber].displayQuestion();

    var answer = parseInt(prompt("Choose an answer"));
    if (isNaN(answer)) {
      return;
    }else {
      questions[questionNumber].checkAnswer(answer, scoreUpdate);
    }
  }

  function calcScore() {
    var score = 0;
    return function (correct) {
      if (correct) {
        score++;
      }
      return score;
    };
  }

  var scoreUpdate = calcScore();

  var question1 = new Question(
            "What is the Weather Like today?",
            ["Hot", "Cold", "Just right"],
            2
  );

  var question2 = new Question(
            "Are iPads worth it",
            ["Yes", "Yes, but expensive","No", "Maybe"],
            0
  );

  var questions = [question1, question2];


  startQuiz();

})();
