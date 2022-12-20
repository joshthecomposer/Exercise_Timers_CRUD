$(document).ready(function () {
forms = document.querySelectorAll("[id^='edit-form-']")
    console.log(forms)
    for (let i = 0; i < forms.length; i++) {
        $(forms[i]).on('submit', function (e) {
            e.preventDefault();
            data = $(forms[i]).serialize()
            $.ajax({
                method: 'POST',
                url: "/edit_timer",
                data: data,
                cache: false,
                success: function (data) {
                    e = document.getElementById(`timer-${data.id}-container`)
                    e.children[0].innerText = data.name
                    e.children[1].innerText = "Exercise (seconds): "+data.exercise_time
                    e.children[2].innerText = "Rest (seconds): "+data.rest_time
                    e.children[3].innerText = "Total Sets: " + data.sets
                    hideEdit()
                    return false;
                }
            })
        });
    }
});

function destroyTimer(id) {
    id = id.slice(8)
    $.ajax({
        method: 'POST',
        url: '/delete/' + id,
        data: {id: id},
        cache: false,
        success: function (data) {
            console.log(data)
            e = document.getElementById(`timer-${data}-container`)
            $(e).fadeOut(400, function () {
                $(e).remove();
            })
            return false;
        }
    })
}



let blurElement = document.getElementById('blur');
let edit;
let create = document.querySelector('#create');







function revealEdit(id, name) {
    edit = document.getElementById(`${id} ${name}`);
    $(blurElement).addClass("disabled-btn");
    filterVal = "blur(50px)"
    $(edit).fadeIn(500)
    $(blurElement).css({
        'filter':filterVal,
        'webkitFilter':filterVal,
        'mozFilter':filterVal,
        'oFilter':filterVal,
        'msFilter': filterVal,
        'transition':'all 0.5s ease-in',
        '-webkit-transition':'all 0.5s ease-in',
        '-moz-transition':'all 0.5s ease-in',
        '-o-transition':'all 0.5s ease-in'
    });
};

function hideEdit() {
    filterVal = "blur(0)"
    $(edit).fadeOut(500)
    $(blurElement).css({
        'filter':filterVal,
        'webkitFilter':filterVal,
        'mozFilter':filterVal,
        'oFilter':filterVal,
        'msFilter':filterVal,
        'transition':'all 0.5s ease-in',
        '-webkit-transition':'all 0.5s ease-in',
        '-moz-transition':'all 0.5s ease-in',
        '-o-transition':'all 0.5s ease-in'
    });
    $(blurElement).removeClass("disabled-btn");
};

function revealCreate() { 
    $(blurElement).addClass("disabled-btn");
    filterVal = "blur(50px)"
    $(create).fadeIn(500)
    $(blurElement).css({
        'filter':filterVal,
        'webkitFilter':filterVal,
        'mozFilter':filterVal,
        'oFilter':filterVal,
        'msFilter': filterVal,
        'transition':'all 0.5s ease-in',
        '-webkit-transition':'all 0.5s ease-in',
        '-moz-transition':'all 0.5s ease-in',
        '-o-transition':'all 0.5s ease-in'
    });
}

function hideCreate() {
    filterVal = "blur(0)"
    $(create).fadeOut(500)
    $(blurElement).css({
        'filter':filterVal,
        'webkitFilter':filterVal,
        'mozFilter':filterVal,
        'oFilter':filterVal,
        'msFilter':filterVal,
        'transition':'all 0.5s ease-in',
        '-webkit-transition':'all 0.5s ease-in',
        '-moz-transition':'all 0.5s ease-in',
        '-o-transition':'all 0.5s ease-in'
    });
    $(blurElement).removeClass("disabled-btn");
};