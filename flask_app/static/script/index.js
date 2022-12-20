let is_signUp = true;
let s = document.querySelector('#sign-up');
let l = document.querySelector('#login');


function indexSwitch() {
    switch (is_signUp) {
        case true:
            $(s).fadeOut(100);
            setTimeout(function () { 
                $(l).fadeIn(100)
            }, 101)
            is_signUp = false;
            break;
        case false:
            $(l).fadeOut(100);
            setTimeout(function () { 
                $(s).fadeIn(100)
            }, 101)
            is_signUp = true;
            break;
    }
}