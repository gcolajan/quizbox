app.controller('QuizBoxController', ['$scope', 'socket', function($scope, socket) {

    // TODO: make a class who can handle screen switching
    $scope.screen = {
        start: true,
        questions: false,
        score: false
    };

    $scope.startGame = function() {
        $scope.screen.start = false;
        $scope.screen.questions = true;
        $scope.screen.score = false;
    };

    // Server give us a question
    socket.on('question', function(data) {
        console.log('Got question');
        console.log(data);
        $scope.question = data;
    });

    // Server give us the response to the current question
    socket.on('response', function(data) {
        console.log('Got response');
        console.log(data);
    });

    // Server five us the score of the current game
    socket.on('score', function(score) {
        $scope.score = score;
        $scope.screen.questions = false;
        $scope.screen.score = true;
    });

    $scope.getQuestion = function() {
        // Check if already answered or not (double check on server)
        socket.emit('question');
    };

    $scope.sendResponse = function(index) {
        console.log("index"+index);
        socket.emit('response', index);
    };

    $scope.again = function() {
        $scope.question = undefined;
        socket.emit('again');
        $scope.startGame();
    };

}]);