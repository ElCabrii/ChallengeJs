let container = document.querySelector('.container')
let btn = document.querySelector('.start_btn');
let scoreContainer = document.querySelector('.score');
let timeContainer = document.querySelector('.time');
let score  ;
let time ;
let viewportWidth = window.innerWidth  ;
let viewportHeight = window.innerHeight;
btn.onclick = function () {
    score = 0;
    time = 25;
    container.innerHTML = '';

    let interval = setInterval(function showTarget() {
        let target = document.createElement('img');
        target.id = 'target';
        target.src = "/img/target.png";
        target.style.position = 'absolute'; // Ensure the target is absolutely positioned
        container.appendChild(target);

        // Get the viewport dimensions


        // Set the target's position to random values within the viewport dimensions
        target.style.top = Math.random() * viewportHeight  + 'px';
        target.style.left = Math.random() * viewportWidth  +'px';
   // Adjust the interval time as needed




    setTimeout(function () {
                target.remove();
            }, 2000);

            target.onclick = function () {
                score+=1;
                target.style.display = 'none';
            }
            time-=1;

            scoreContainer.innerHTML = 'Score:' + score;
            timeContainer.innerHTML = 'Time: ' + time;

            if (time === 0) {
                clearInterval(interval);
                container.innerHTML = 'Game Over';
            }
        }
        , 1000);
}