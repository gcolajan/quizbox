module.exports = QuestionSet;

// Fisher-Yates Shuffle
function shuffle(array) {
    var counter = array.length, temp, index;

    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        index = Math.floor(Math.random() * counter);

        // Decrease counter by 1
        counter--;

        // And swap the last element with it
        temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }

    return array;
}

function QuestionSet(nb, questions, responses) {
    this.nbQuestions = nb;
    this.questions = questions;
    this.responses = responses;
    this.score = 0;

    this.pickedQuestions = Array(); // shuffled id of questions
    var idList = Array();
    for (var i = 0 ; i < this.questions.length ; i++)
        idList.push(i);
    idList = shuffle(idList);
    for (var i = 0 ; i < this.nbQuestions ; i++)
        this.pickedQuestions.push(idList.pop());
    delete idList;

    this.reload = function() {
        return new QuestionSet(this.nbQuestions, this.questions, this.responses);
    };

    this.getQuestion = function() {
        return this.questions[this.pickedQuestions[0]];
    };

    this.updateScore = function(index) {
        if (index == this.responses[this.pickedQuestions[0]])
            this.score++;
    }

    this.getResponse = function() {
        return this.responses[this.pickedQuestions[0]];
    };

    this.getScore = function() {
        // Percentage of good answers
        return Math.round((this.score/this.nbQuestions)*100);
    };

    this.goNext = function() {
        if (this.empty())
            return false;

        this.pickedQuestions.shift();
        return true;
    };

    this.empty = function() {
        return this.pickedQuestions.length === 0;
    };
}
