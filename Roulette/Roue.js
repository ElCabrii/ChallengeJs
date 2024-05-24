let wager = 5;
let bet = [];
let numbersBet = [];

let wheelnumbersAC = [0, 26, 3, 35, 12, 28, 7, 29, 18, 22, 9, 31, 14, 20, 1, 33, 16, 24, 5, 10, 23, 8, 30, 11, 36, 13, 27, 6, 34, 17, 25, 2, 21, 4, 19, 15, 32];

let container = document.createElement('div');
container.setAttribute('id', 'container');
document.body.append(container);

buildWheel();
buildBettingBoard();

let wheel = document.getElementsByClassName('wheel')[0];
let ballTrack = document.getElementsByClassName('ballTrack')[0];

function buildWheel(){
    let wheel = document.createElement('div');
    wheel.setAttribute('class', 'wheel');

    let outerRim = document.createElement('div');
    outerRim.setAttribute('class', 'outerRim');
    wheel.append(outerRim);

    let numbers = [0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 5, 24, 16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26];
    for(i = 0; i < numbers.length; i++){
        let a = i + 1;
        let spanClass = (numbers[i] < 10)? 'single' : 'double';
        let sect = document.createElement('div');
        sect.setAttribute('id', 'sect'+a);
        sect.setAttribute('class', 'sect');
        let span = document.createElement('span');
        span.setAttribute('class', spanClass);
        span.innerText = numbers[i];
        sect.append(span);
        let block = document.createElement('div');
        block.setAttribute('class', 'block');
        sect.append(block);
        wheel.append(sect);
    }

    let pocketsRim = document.createElement('div');
    pocketsRim.setAttribute('class', 'pocketsRim');
    wheel.append(pocketsRim);

    let ballTrack = document.createElement('div');
    ballTrack.setAttribute('class', 'ballTrack');
    let ball = document.createElement('div');
    ball.setAttribute('class', 'ball');
    ballTrack.append(ball);
    wheel.append(ballTrack);

    let pockets = document.createElement('div');
    pockets.setAttribute('class', 'pockets');
    wheel.append(pockets);

    let cone = document.createElement('div');
    cone.setAttribute('class', 'cone');
    wheel.append(cone);

    let turret = document.createElement('div');
    turret.setAttribute('class', 'turret');
    wheel.append(turret);

    let turretHandle = document.createElement('div');
    turretHandle.setAttribute('class', 'turretHandle');
    let thendOne = document.createElement('div');
    thendOne.setAttribute('class', 'thendOne');
    turretHandle.append(thendOne);
    let thendTwo = document.createElement('div');
    thendTwo.setAttribute('class', 'thendTwo');
    turretHandle.append(thendTwo);
    wheel.append(turretHandle);

    container.append(wheel);
}

function buildBettingBoard(){
    let bettingBoard = document.createElement('div');
    bettingBoard.setAttribute('id', 'betting_board');

    let wl = document.createElement('div');
    wl.setAttribute('class', 'winning_lines');

    var wlttb = document.createElement('div');
    wlttb.setAttribute('id', 'wlttb_top');
    wlttb.setAttribute('class', 'wlttb');
    for(i = 0; i < 11; i++){
        let j = i;
        var ttbbetblock = document.createElement('div');
        ttbbetblock.setAttribute('class', 'ttbbetblock');
        ttbbetblock.onclick = function(){
            var numA = (1 + (3 * j));
            var numB = (2 + (3 * j));
            var numC = (3 + (3 * j));
            var numD = (4 + (3 * j));
            var numE = (5 + (3 * j));
            var numF = (6 + (3 * j));
            let num = numA + ', ' + numB + ', ' + numC + ', ' + numD + ', ' + numE + ', ' + numF;
            var objType = 'double_street';
            setBet(this, num, objType, 5);
        };
        wlttb.append(ttbbetblock);
    }
    wl.append(wlttb);

    for(c =  1; c < 4; c++){
        let d = c;
        var wlttb = document.createElement('div');
        wlttb.setAttribute('id', 'wlttb_'+c);
        wlttb.setAttribute('class', 'wlttb');
        for(i = 0; i < 12; i++){
            let j = i;
            var ttbbetblock = document.createElement('div');
            ttbbetblock.setAttribute('class', 'ttbbetblock');
            ttbbetblock.onclick = function(){
                if(d == 1 || d == 2){
                    var numA = ((2 - (d - 1)) + (3 * j));
                    var numB = ((3 - (d - 1)) + (3 * j));
                    var num = numA + ', ' + numB;
                }
                else{
                    var numA = (1 + (3 * j));
                    var numB = (2 + (3 * j));
                    var numC = (3 + (3 * j));
                    var num = numA + ', ' + numB + ', ' + numC;
                }
                var objType = (d == 3)? 'street' : 'split';
                var odd = (d == 3)? 11 : 17;
                setBet(this, num, objType, odd);
            };
            wlttb.append(ttbbetblock);
        }
        wl.append(wlttb);
    }

    for(c = 1; c < 12; c++){
        let d = c;
        var wlrtl = document.createElement('div');
        wlrtl.setAttribute('id', 'wlrtl_'+c);
        wlrtl.setAttribute('class', 'wlrtl');
        for(i = 1; i < 4; i++){
            let j = i;
            var rtlbb = document.createElement('div');
            rtlbb.setAttribute('class', 'rtlbb'+i);
            rtlbb.onclick = function(){
                var numA = (3 + (3 * (d - 1))) - (j - 1);
                var numB = (6 + (3 * (d - 1))) - (j - 1);
                let num = numA + ', ' + numB;
                setBet(this, num, 'split', 17);
            };
            wlrtl.append(rtlbb);
        }
        wl.append(wlrtl);
    }

    for(c = 1; c < 3; c++){
        var wlcb = document.createElement('div');
        wlcb.setAttribute('id', 'wlcb_'+c);
        wlcb.setAttribute('class', 'wlcb');
        for(i = 1; i < 12; i++){
            let count = (c == 1)? i : i + 11;
            var cbbb = document.createElement('div');
            cbbb.setAttribute('id', 'cbbb_'+count);
            cbbb.setAttribute('class', 'cbbb');
            cbbb.onclick = function(){
                var numA = '2';
                var numB = '3';
                var numC = '5';
                var numD = '6';
                let num = (count >= 1 && count < 12)? (parseInt(numA) + ((count - 1) * 3)) + ', ' + (parseInt(numB)+((count - 1) * 3)) + ', ' + (parseInt(numC)+((count - 1) * 3)) + ', ' + (parseInt(numD)+((count - 1) * 3)) : ((parseInt(numA) - 1) + ((count - 12) * 3)) + ', ' + ((parseInt(numB) - 1)+((count - 12) * 3)) + ', ' + ((parseInt(numC) - 1)+((count - 12) * 3)) + ', ' + ((parseInt(numD) - 1)+((count - 12) * 3));
                var objType = 'corner_bet';
                setBet(this, num, objType, 8);
                console.log(num);
            };
            wlcb.append(cbbb);
        }
        wl.append(wlcb);
    }

    bettingBoard.append(wl);

    let bbtop = document.createElement('div');
    bbtop.setAttribute('class', 'bbtop');
    let bbtopBlocks = ['1 to 18', '19 to 36'];
    for(i = 0; i < bbtopBlocks.length; i++){
        let f = i;
        var bbtoptwo = document.createElement('div');
        bbtoptwo.setAttribute('class', 'bbtoptwo');
        bbtoptwo.onclick = function(){
            let num = (f == 0)? '1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18' : '19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36';
            var objType = (f == 0)? 'outside_low' : 'outside_high';
            setBet(this, num, objType, 1);
        };
        bbtoptwo.innerText = bbtopBlocks[i];
        bbtop.append(bbtoptwo);
    }
    bettingBoard.append(bbtop);

    let numberBoard = document.createElement('div');
    numberBoard.setAttribute('class', 'number_board');

    let zero = document.createElement('div');
    zero.setAttribute('class', 'number_0');
    zero.onclick = function(){
        var objType = 'zero';
        var odds = 35;
        setBet(this, '0', objType, odds);
    };
    let nbnz = document.createElement('div');
    nbnz.setAttribute('class', 'nbn');
    nbnz.innerText = '0';
    zero.append(nbnz);
    numberBoard.append(zero);

    var numberBlocks = [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36, '2 to 1', 2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35, '2 to 1', 1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34, '2 to 1'];
    for(i = 0; i < numberBlocks.length; i++){
        let a = i;
        var nbClass = (numberBlocks[i] == '2 to 1')? 'tt1_block' : 'number_block';
        var numberBlock = document.createElement('div');
        numberBlock.setAttribute('class', nbClass);
        numberBlock.onclick = function(){
            if(numberBlocks[a] != '2 to 1'){
                setBet(this, ''+numberBlocks[a]+'', 'inside_whole', 35);
            }else{
                num = (a == 12)? '3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36' : ((a == 25)? '2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35' : '1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34');
                setBet(this, num, 'outside_column', 2);
            }
        };
        var nbn = document.createElement('div');
        nbn.setAttribute('class', 'nbn');
        nbn.innerText = numberBlocks[i];
        numberBlock.append(nbn);
        numberBoard.append(numberBlock);
    }
    bettingBoard.append(numberBoard);

    let bo3Board = document.createElement('div');
    bo3Board.setAttribute('class', 'bo3_board');
    let bo3Blocks = ['1 to 12', '13 to 24', '25 to 36'];
    for(i = 0; i < bo3Blocks.length; i++){
        let b = i;
        var bo3Block = document.createElement('div');
        bo3Block.setAttribute('class', 'bo3_block');
        bo3Block.onclick = function(){
            num = (b == 0)? '1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12' : ((b == 1)? '13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24' : '25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36');
            setBet(this, num, 'outside_dozen', 2);
        };
        bo3Block.innerText = bo3Blocks[i];
        bo3Board.append(bo3Block);
    }
    bettingBoard.append(bo3Board);

    let otoBoard = document.createElement('div');
    otoBoard.setAttribute('class', 'oto_board');
    let otoBlocks = ['EVEN', 'RED', 'BLACK', 'ODD'];
    for(i = 0; i < otoBlocks.length; i++){
        let d = i;
        var otoBlock = document.createElement('div');
        otoBlock.setAttribute('class', 'oto_block');
        otoBlock.onclick = function(){
            num = (d == 0)? '2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36' : ((d == 1)? '1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36' : ((d == 2)? '2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35' : '1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 33, 35'));
            setBet(this, num, 'outside_oerb', 1);
        };
        otoBlock.innerText = otoBlocks[i];
        otoBoard.append(otoBlock);
    }
    bettingBoard.append(otoBoard);
    container.append(bettingBoard);

    let spinBtn = document.createElement('div');
    spinBtn.setAttribute('class', 'spinBtn');
    spinBtn.innerText = 'spin';
    spinBtn.onclick = function(){
        spin();
    };
    container.append(spinBtn);
}

function setBet(e, n, t, o){
    var obj = {
        amt: wager,
        type: t,
        odds: o,
        numbers: n
    };
    bet.push(obj);
    let numArray = n.split(',').map(Number);
    for(i = 0; i < numArray.length; i++){
        if(!numbersBet.includes(numArray[i])){
            numbersBet.push(numArray[i]);
        }
    }
    let chip = document.createElement('div');
    chip.setAttribute('class', 'chip');
    e.append(chip);
}

function spin(){
    console.log(numbersBet);
    var winningSpin = Math.floor(Math.random() * 36);
    spinWheel(winningSpin);
    setTimeout(function(){
        if(numbersBet.includes(winningSpin)){
            for(i = 0; i < bet.length; i++){
                var numArray = bet[i].numbers.split(',').map(Number);
                if(numArray.includes(winningSpin)){
                    console.log(winningSpin);
                    console.log('odds ' + bet[i].odds);
                    console.log('payout ' + ((bet[i].odds * bet[i].amt) + bet[i].amt));
                }
            }
        }else{
            console.log(winningSpin);
            console.log('no win');
        }

        bet = [];
        numbersBet = [];
        removeChips();
    }, 9000);
}

function spinWheel(winningSpin){
    for(i = 0; i < wheelnumbersAC.length; i++){
        if(wheelnumbersAC[i] == winningSpin){
            var degree = (i * 9.73) + 362;
        }
    }
    wheel.style.cssText = 'animation: wheelRotate 5s linear infinite;';
    ballTrack.style.cssText = 'animation: ballRotate 1s linear infinite;';

    setTimeout(function(){
        ballTrack.style.cssText = 'animation: ballRotate 2s linear infinite;';
        style = document.createElement('style');
        style.type = 'text/css';
        style.innerText = '@keyframes ballStop {from {transform: rotate(0deg);}to{transform: rotate(-'+degree+'deg);}}';
        document.head.appendChild(style);
    }, 2000);
    setTimeout(function(){
        ballTrack.style.cssText = 'animation: ballStop 3s linear;';
    }, 6000);
    setTimeout(function(){
        ballTrack.style.cssText = 'transform: rotate(-'+degree+'deg);';
    }, 9000);
    setTimeout(function(){
        wheel.style.cssText = '';
        style.remove();
    }, 10000);
}

function removeChips(){
    var chips = document.getElementsByClassName('chip');
    if(chips.length > 0){
        for(i = 0; i < chips.length; i++){
            chips[i].remove();
        }
        removeChips();
    }
}