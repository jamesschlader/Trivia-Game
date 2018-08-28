//Trivia game
// This is an NFL themed trivia game. The idea is that questions are offered to the player with a distinct amount of time required to guess an answer. If the player guesses the correct answer within the given amount of time, it's a win. Otherwise, if either the guess doesn't come in time or is incorrect, the player loses.

// The game is built into an object and runs on a loop that cannot be broken within the game. The player will have to close the window to quit. We'll keep track of wins and losses. //Each consecutive win will shorten the length of time it takes to guess an answer.

//I hope to include some music to play on a loop in the background as the game proceeds.
$(document).ready(function() { 

var nfl = {
    //Properties
    wins: 0,
    counter: 0,
    losses: 0,
    quanda: [
        {q: "Who is the all-time leader in points scored in NFL history?",
        a: "Morten Ansersen",
        w: ["Adam Vinatieri", "Emmit Smith", "Gary Anderson"]},
        {q: "Who has scored the most touchdowns in NFL history?", 
        a: "Jerry Rice",
        w: ["Emmitt Smith", "Jim Brown", "Jim Thorpe"]},
        {q: "Who holds the most League MVP Awards in NFL history?",
        a: "Peyton Manning",
        w: ["Joe Montana", "Tom Brady", "Bart Starr"]},
        {q: "Who has the most Super Bowl MVP Awards?",
        a: "Tom Brady",
        w: ["Emmitt Smth", "Joe Monatana", "Troy Aikman"]},
        {q: "Who is the all-time leader in sacks in NFL history?",
        a: "Bruce Smith",
        w: ["Reggie White", "Lawrence Taylor", "Julius Peppers"]},
        {q: "The 1967 NFL Championship Game was held in -15 degree weather. Where was it played?",
        a: "Green Bay, Wisconsin",
        w: ["Minneapolis, Minnesota", "Chicago, Illinois", "Buffalo. New York"]},
        {q: "Where was the first Super Bowl game held?",
        a: "The LA Coliseum, Los Angeles, California",
        w: ["The Orange Bowl, Miami, Flordia", "The Rose Bowl, Pasadena, California", "Tulane Stadium, New Orleans, Louisiana"]},
        {q: "What city was the first to feature a domed stadium to host an NFL football game?",
        a: "Houston, Texas",
        w: ["Detroit, Michigan", "New Orleans, Louisiana", "Seattle, Washington"]},
        {q: "Which stadium hosted the most Super Bowl games?",
        a: "Superdome in New Orleans, Louisiana",
        w: ["Orange Bowl in Miami, Florida", "Silverdome, Pontiac, Michigan", "Georgia Dome, Atlanta, Georgia"]},
        {q: "What year was the first Super Bowl game?",
        a: "1967",
        w: ["1966", "1968", "1969"]},
        {q: "What year did the AFL and NFL merge?",
        a: "1970",
        w: ["1967", "1969", "1972"]},
        {q: "What year did the Colts leave Baltimore for Indianapolis?",
        a: "1984",
        w: ["1983", "1986", "1990"]},
        {q: "What year was the first indoor Super Bowl played?",
        a: "1978",
        w: ["1982", "1981", "1990"]},
        {q: "Which tean has won the most Super Bowls?",
         a: "Pittsburgh Steelers",
        w: ["Dallas Cowboys", "New England Patriots", "San Francisco 49ers"]},
        {q: "Which of these teams started in the AFL?",
        a: "Cincinnati Bengals",
        w: ["Seattle Seahawks", "Los Angeles Rams", "Cleveland Browns"]},
        {q: "Which of these teams never called Los Angeles home?",
        a: "Cardinals",
        w: ["Raiders", "Chargers", "Rams"]}, 
        {q: "How many teams have won both an NFL Championship and a Super Bowl?",
        a: "Seven",
        w: ["Five", "Eight", "Ten"]},
    ],
    timer: 45,
    isRunning: false,
    question: "", 
    right: "",
    answers: [],
    
    //music playing object goes here

    //Methods
    offer() {
               
        //clears the billboard and question / answer areas if currently occupied
         
        $("#billboard").hide();
            //should be able to do this with a forEach through the question area element nodes.
        
            $("#question, #answer1, #answer2, #answer3, #answer4").empty();
        
        //go get a question to offer and assign to dom div variable
           
        //go get associated answers to the question and assign to variables
            //for the time being, the incorrect answers are in the nfl.answers array. 

            if (nfl.quanda.length === 0) {
                messages.billboard(messages.allDone);
                console.log("this is the wins " + nfl.wins + " and losses " + nfl.losses  + " just before sending the alldone message.");
            }
            var randomIndex = Math.floor(Math.random() * nfl.quanda.length);
            nfl.question = nfl.quanda[randomIndex].q;
            var qElement = $("<h1></h1>");
            qElement.text(nfl.question);

            nfl.right = nfl.quanda[randomIndex].a;
            for (i = 0; i < nfl.quanda[randomIndex].w.length; i++) {
                nfl.answers[i] = nfl.quanda[randomIndex].w[i];
            }

        //create divs into which the answers are placed
            var correct = $("<h3 class='answer-button' id='correct'></h3>");
            correct.text(nfl.right);
            var wrong = [];
            for (i = 0; i < 3; i++) {
                wrong[i] = $("<h3 class='answer-button' id='wrong'></h3>");
                wrong[i].text(nfl.answers[i]);
            };

            nfl.quanda.splice(randomIndex, 1);
        //render the question and associated answers to the screen
            $("#question").append(qElement);
            var target = Math.floor(Math.random() * 4);
            var list = [$("#answer1"), $("#answer2"), $("#answer3"), $("#answer4")];
            var element = list[target];
            element.append(correct);
            list.splice(target, 1);
            for (i=0; i < list.length; i++) {
                list[i].append(wrong[i]);
            };

            console.log("this is nfl.right after everything is rendered to the screen: " + nfl.right);
            
        //call the listen() function
        if ($("#billboard").hasClass("billboard-show")) {
            $("#billboard").addClass("billboard");
        }
       nfl.listen();
    
    
    }, //end offer()

    listen() {
        if ($("#billboard").hasClass("billboard-show")) {
            $("#billboard").addClass("billboard");
        }
        $(".question-area").show();
        $("#countdown").show();
         //installs an event listener looking for clicks
       console.log("counter is " + nfl.counter);
        nfl.timer = Math.floor(45 / (nfl.counter + 1));
        
       
            if (!nfl.isRunning) {
                clock = setInterval(count, 1000);
                nfl.isRunning = true;
            };
         
                
        function count () {
                nfl.timer--;
               
                $("#countdown").text("Time remaining: "  + nfl.timer + " Seconds");
                if (nfl.timer === 0) {
                    clearInterval(clock);
                    nfl.isRunning = false;
                    nfl.counter =0;
                    nfl.timer = 45;
                    nfl.output("alarm");
                };

        }; // end function count
    
        console.log("i made it all the way into the timer function from just closing the main opening billboard");
         

        function decide() { //defines a function for what to do on a click
         //stops timer
         clearInterval(clock);
         nfl.isRunning = false;
         
         console.log("I made it to the decide function already");
    
        
        //checks the id of the div clicked and routes to output() the argument 'win' for a correct answer or 'wrong' for an incorrect answer
        var clicked = $(this);
        console.log("I think this is the click event: " + this);
        console.log(console.dir(clicked));
        
        if (clicked.attr("id") === $("#correct").attr("id")) {
            nfl.counter++
            nfl.output("win");
            console.log("nfl.counter = " + nfl.counter)
            
        } else {
            nfl.timer = 45;
            nfl.counter = 0;
            nfl.output("wrong");
        }

        } //end decide()
        $(".answer-button").on("click", decide);
            
    }, //end listen()

    output(result) {
        //takes the argument incoming from listen and displays a messages on the billboard accordingly
        $(".question-area").hide();
           $("#countdown").hide();

        switch (result) {
             //if 'win', displays the 'success' praise message, increments wins, and increments counter
            case "win":
           
            nfl.wins++;
            $("#wins").text("Wins: " + nfl.wins);
            messages.billboard(messages.win);
            $("#ready-button").hide();
            setTimeout(function() {
                $("#billboard").hide();
                    nfl.offer();
                }, 3000);
            
            break;

            //if 'wrong', displays the 'wrong' feedback message and increments losses
            case "wrong":
            console.log("correct answer is..." + nfl.right);
            console.log( "You've made it through all the questions! <br> Your final stats are: <br>" + nfl.wins + " wins " + " and " + nfl.losses + " losses.");
            nfl.losses++;
            $("#losses").text("Losses: " + nfl.losses);
            messages.billboard(messages.wrong);
            $("#ready-button").hide();
            $("#countdown").hide();
            setTimeout(function() {
                $("#billboard").hide();
                    nfl.offer();
                }, 3000);
            break;

            //if 'alarm', displays the 'alarm' feedback message and increments losses
            case "alarm":
            console.log("correct answer is..." + nfl.right);
            nfl.losses++;
            $("#losses").text("Losses: " + nfl.losses);
            messages.billboard(messages.alarm);
            $("#ready-button").hide();
            setTimeout(function() {
                $("#billboard").hide();
                    nfl.offer();
                }, 3000);
          
            break;
        }

    } //end output()

} // end nfl object

var messages = { //Begin messages object
    rules: 'When you are ready, a series of trivia questions about the NFL will present on the screen. Four answers will be offered but only one is correct. <br><br>You will initially begin the game with 45 seconds to guess the correct answer. If you get an answer correct, the amount of time you have to answer subsequent questions will reduce. <br><br>If you cannot answer a question within the alloted amount of time, you lose. <br><br>If you guess an incorrect answer, you will lose.<br>You can see you progress at the top of the screen under the Stats heading. <br>Are you ready to begin?',
    win: 'You nailed it! Good job.<br>Get ready because you will have less time to answer the next question.',
    wrong: "Nice try, but incorrect.<br>The correct answer is<br>",
    alarm: 'Drat! You ran out of time.<br>The correct answer is <br>',
    restart: 'Get your wits about you. <br>Here comes another question...',
    clock: 'Seconds remaining...' + nfl.timer,
    allDone: "You've made it through all the questions! <br> Your final stats are: <br>",
    
    billboard(message) {
        $("#billboard").empty();
        var announcement = $("#billboard");
        announcement.append($("<h3 id='text'>"));
        if ((message === messages.wrong) || (message === messages.alarm)) {

        $("#text").append(message);
        $("#text").append(nfl.right);
       
        } else if (message === messages.allDone) {
            $("#text").append(message);
            $("#text").append(nfl.wins);
            $("#text").append(" wins and ");
            $("#text").append(nfl.losses);
            $("#text").append(" losses.");

        } else {
            $("#text").append(message);
        }
        announcement.addClass("billboard-show");
        var x = $("<button type ='button'class ='action-button' id = 'ready-button'></button");
        x.text("Ready");
        if (message === messages.rules) {
            $("#billboard").append(x)
        };
        $("#billboard").show();       
    }
} //end messages object

//call the offer method to start the game 

if (nfl.wins + nfl.losses === 0) {
    messages.billboard(messages.rules);
    $("#ready-button").on("click", function(){
       nfl.offer();
    })
   }

}); //end ready function call


