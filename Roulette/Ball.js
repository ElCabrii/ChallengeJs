let ball = Math.floor(Math.random() * 38);
    console.log(ball);
function CheckNumber(userNumber, betAmount) {
    if (ball === 0) {
        console.log("The ball landed on 0");
        if (userNumber === 0) {
            console.log("You win !");
            wallet += betAmount * 36;
        }
    }
    else if (ball === 37) {
        console.log("The ball landed on 00");
        if (userNumber === 37) {
            console.log("You win !");
            wallet += betAmount * 36;
        }
    }
    else {
        console.log("The ball landed on " + ball);
        if (userNumber === ball) {
            console.log("You win !");
            wallet += betAmount * 36;
        } else {
            console.log("You lose !");
            wallet -= betAmount;
        }

    }
    }
// Compare this snippet from Player.js:
function CheckColor(userNumber, betAmount)
{
    if (ball >= 1 && ball <= 10) {
        if (ball % 2 === 0) {
            console.log("Black");
            if (userNumber % 2 === 0) {
                console.log("You win !");
                wallet += betAmount * 2;
            }
        } else {
            console.log("Red");
            if (userNumber % 2 === 0) {
                console.log("You lose !");
                wallet -= betAmount;
            }
        }
    } else if (ball >= 11 && ball <= 18) {
        if (ball % 2 === 0) {
            console.log("Red");
            if (userNumber % 2 === 0) {
                console.log("You win !");
                wallet += betAmount * 2;
            }
        } else {
            console.log("Black");
            if (userNumber % 2 === 0) {
                console.log("You lose !");
                wallet -= betAmount;
            }
        }
    } else if (ball >= 19 && ball <= 28) {
        if (ball % 2 === 0) {
            console.log("Black");
            if (userNumber % 2 === 0) {
                console.log("You win !");
                wallet += betAmount * 2;
            }
        } else {
            console.log("Red");
            if (userNumber % 2 === 0) {
                console.log("You lose !");
                wallet -= betAmount;
            }
        }
    } else if (ball >= 29 && ball <= 36) {
        if (ball % 2 === 0) {
            console.log("Red");
            if (userNumber % 2 === 0) {
                console.log("You win !");
                wallet += betAmount * 2;
            }
        } else {
            console.log("Black");
            if (userNumber % 2 === 0) {
                console.log("You lose !");
                wallet -= betAmount;
            }
        }
    } else if (ball >= 37 && ball <= 50) {
        if (ball % 2 === 0) {
            console.log("Black");
            if (userNumber % 2 === 0) {
                console.log("You win !");
                wallet += betAmount * 2;
            }
        } else {
            console.log("Red");
            if (userNumber % 2 === 0) {
                console.log("You lose !");
                wallet -= betAmount;
            }
        }
    } else {
        if (ball % 2 === 0) {
            console.log("Red");
            if (userNumber % 2 === 0) {
                console.log("You win !");
                wallet += betAmount * 2;
            }
        } else {
            console.log("Black");
            if (userNumber % 2 === 0) {
                console.log("You lose !");
                wallet -= betAmount;
            }

        }
    }
}
function CheckDozen(userNumber, betAmount) {
    if (ball >= 1 && ball <= 12) {
        if (ball % 2 === 0) {
            console.log("1st dozen");
            if (userNumber >= 1 && userNumber <= 12) {
                console.log("You win !");
                wallet += betAmount * 3;
            }
        }
        else {
            console.log("2nd dozen");
            if (userNumber <= 1 && userNumber >= 12) {
                console.log("You lose !");
                wallet -= betAmount;
            }
        }
    }
    else if (ball >= 13 && ball <= 21) {
        if (ball % 2 === 0) {
            console.log("2nd dozen");
            if (userNumber >= 13 && userNumber <= 24) {
                console.log("You win !");
                wallet += betAmount * 3;
            }
        }
        else {
            console.log("3rd dozen");
            if (userNumber <= 13 && userNumber >= 24) {
                console.log("You lose !");
                wallet -= betAmount;
            }
        }
    }
    else {
        if (ball % 2 === 0) {
            console.log("3rd dozen");
            if (userNumber >= 25 && userNumber <= 36) {
                console.log("You win !");
                wallet += betAmount * 3;
            }
        } else {
            console.log("1st dozen");
            if (userNumber <= 25 && userNumber >= 36) {
                console.log("You lose !");
                wallet -= betAmount;
            }
        }
    }
}
function CheckColumn(userNumber, betAmount) {
    if (ball >= 1 && ball <= 18) {
        console.log("1 to 18");
        if (userNumber >= 1 && userNumber <= 18) {
            console.log("You win !");
            wallet += betAmount * 2;
        }
    }
    else {
        console.log("19 to 36");
        if (userNumber >= 19 && userNumber <= 36) {
            console.log("You win !");
            wallet += betAmount * 2;
        }
    }
}
function CheckParity(userNumber, betAmount) {
    if (ball % 2 === 0) {
        console.log("Even");
        if (userNumber % 2 === 0) {
            console.log("You win !");
            wallet += betAmount * 2;
        }
    } else {
        console.log("Odd");
        if (userNumber % 2 === 0) {
            console.log("You lose !");
            wallet -= betAmount;
        }
    }
}
function CheckLowHigh(userNumber, betAmount) {
    if (ball === 0 || ball === 37) {
        console.log("Neither");
        if (userNumber === 0 || userNumber === 37) {
            console.log("You win !");
            wallet += betAmount * 36;
        }
    }
    else if (ball % 2 === 0) {
        console.log("Low");
        if (userNumber >= 1 && userNumber <= 18) {
            console.log("You win !");
            wallet += betAmount * 2;
        }
    }
    else {
        console.log("High");
        if (userNumber >= 19 && userNumber <= 36) {
            console.log("You win !");
            wallet += betAmount * 2;
        }
    }
}

function CheckRow(userNumber, betAmount) {
    if (ball % 3 === 0) {
        console.log("3rd row");
        if (userNumber % 3 === 0) {
            console.log("You win !");
            wallet += betAmount * 3;
        }
    } else if (ball % 3 === 2) {
        console.log("2nd row");
        if (userNumber % 3 === 2) {
            console.log("You win !");
            wallet += betAmount * 3;
        }
    } else {
        console.log("1st row");
        if (userNumber % 3 === 1) {
            console.log("You win !");
            wallet += betAmount * 3;
        }
    }
}

// Contenu de Ball.js
function createBall() {
    console.log("Création de la balle...");
}

module.exports = { createBall };

