var prev_button = null;
var prev_time = 0;
var click_count = 0;
var first_time = 0;
var second_time = 0;
var arr = [
    ['1', '.', ',', '!'],
    ['2', 'a', 'b', 'c'],
    ['3', 'd', 'e', 'f'],
    ['4', 'g', 'h', 'i'],
    ['5', 'j', 'k', 'l'],
    ['6', 'm', 'n', 'o'],
    ['7', 'p', 'q', 'r', 's'],
    ['8', 't', 'u', 'v'],
    ['9', 'w', 'x', 'y', 'z']
];

jQuery(document).ready(function() {
    jQuery("#phone").find("button").mousedown(function(event) {

        var button_pressed = jQuery(event.currentTarget).data("value");

        first_time = (new Date()).getTime();

        timeout = setInterval(function() {
            jQuery("#result").val(t9(jQuery("#result").val(), button_pressed));
            clearInterval(timeout);
        }, 500);

        return false;
    });

    jQuery("#phone").find("button").mouseup(function(event) {

        var button_pressed = jQuery(event.currentTarget).data("value");

        second_time = (new Date()).getTime();
        clearInterval(timeout);

        if (second_time - first_time < 500)
        {
            clickEvent(button_pressed);
        }

        return false;
    });
});



function clickEvent(button_pressed) {
    var current_time = (new Date()).getTime();

    if (isNaN(button_pressed) || button_pressed === 0)
    {
        jQuery("#result").val(t9(jQuery("#result").val(), button_pressed));
    }
    else
    {
        if (button_pressed === prev_button)
        {
            click_count++;
            sameButtonClick(prev_time, current_time, button_pressed);
        }
        else
        {
            click_count = 1;
            jQuery("#result").val(t9(jQuery("#result").val(), arr[button_pressed - 1][1]));
        }
    }

    prev_button = button_pressed;
    prev_time = current_time;
}


// to appened the character at the end
function t9(text, button_pressed) {
    text = text + button_pressed;
    return text;
}

// on same button  click replace last character with next character in array
function earlySameButton(text, button_pressed) {
    text = text.toString().slice(0, -1) + button_pressed;
    return text;
}

// if same button clicked again
function sameButtonClick(prevTime, currentTime, buttonValue)
{
    if (currentTime > (prevTime + 500))
    {
        // repeat value
        click_count = 1;
        jQuery("#result").val(t9(jQuery("#result").val(), arr[buttonValue - 1][1]));
    }
    else
    {
        // next value
        if (click_count > (arr[buttonValue - 1].length - 1))
        {
            click_count = 1;
        }
        console.log('early');
        jQuery("#result").val(earlySameButton(jQuery("#result").val(), arr[buttonValue - 1][click_count]));
    }
}
