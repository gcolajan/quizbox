var server = require('http').createServer();
var io = require('socket.io').listen(server);

var QuestionSet = require('./lib/QuestionSet.js');
var db = require('./db.js');

// Number of question per set
const NB_QUESTIONS = 2;

io.sockets.on('connection', function (socket) {

    // Storage of the current question currently read by the user
    var questionSet = new QuestionSet(NB_QUESTIONS, db.questions, db.responses);

    console.log('Un client est connecté !');

    socket.on('again', function() {
       questionSet = questionSet.reload();
    });

    socket.on('question', function() {
        if (questionSet.empty())
            socket.emit('score', questionSet.getScore());
        else
            socket.emit('question', questionSet.getQuestion());
    });

    socket.on('response', function(data) {
        socket.emit('response', questionSet.getResponse());
        questionSet.updateScore(data);

        // We go to the next question
        questionSet.goNext();
    });
});

server.listen(8080);
