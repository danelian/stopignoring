if ($.cookie("theme_csspath")) {
    $('link#theme-stylesheet').attr("href", $.cookie("theme_csspath"));
}

config = {
    countdown: {
        year: 2017,
        month: 12,
        day: 12,
        hour: 23,
        minute: 41,
        second: 00
    }
}

$(function () {

    countdown();
    utils();
	demo();
	player();
});

/* for demo purpose only - can be deleted */

function demo() {

    if ($.cookie("theme_csspath")) {
	$('link#theme-stylesheet').attr("href", $.cookie("theme_csspath"));
    }

    $("#colour").change(function () {

	if ($(this).val() !== '') {

	    var theme_csspath = 'css/style.' + $(this).val() + '.css';

	    $('link#theme-stylesheet').attr("href", theme_csspath);

	    $.cookie("theme_csspath", theme_csspath, {expires: 365, path: '/'});
	}

	return false;
    });
}

/* countdown */

function countdown() {
    // Countdown

    var date = new Date(config.countdown.year,
	    config.countdown.month - 1,
	    config.countdown.day,
	    config.countdown.hour,
	    config.countdown.minute,
	    config.countdown.second),
	    $countdownNumbers = {
		days: $('#countdown-days'),
		hours: $('#countdown-hours'),
		minutes: $('#countdown-minutes'),
		seconds: $('#countdown-seconds')
	    };

    $('#countdown').countdown(date).on('update.countdown', function (event) {
	$countdownNumbers.days.text(event.offset.totalDays);
	$countdownNumbers.hours.text(('0' + event.offset.hours).slice(-2));
	$countdownNumbers.minutes.text(('0' + event.offset.minutes).slice(-2));
	$countdownNumbers.seconds.text(('0' + event.offset.seconds).slice(-2));
    });

}

function utils() {

    /* tooltips */

    $('[data-toggle="tooltip"]').tooltip();

    /* click on the box activates the radio */

    $('#checkout').on('click', '.box.shipping-method, .box.payment-method', function (e) {
	var radio = $(this).find(':radio');
	radio.prop('checked', true);
    });
    /* click on the box activates the link in it */

    $('.box.clickable').on('click', function (e) {

	window.location = $(this).find('a').attr('href');
    });
    /* external links in new window*/

    $('.external').on('click', function (e) {

	e.preventDefault();
	window.open($(this).attr("href"));
    });
    /* animated scrolling */

    $('.scroll-to, .scroll-to-top').click(function (event) {

	var full_url = this.href;
	var parts = full_url.split("#");
	if (parts.length > 1) {

	    scrollTo(full_url);
	    event.preventDefault();
	}
    });
    function scrollTo(full_url) {
	var parts = full_url.split("#");
	var trgt = parts[1];
	var target_offset = $("#" + trgt).offset();
	var target_top = target_offset.top - 100;
	if (target_top < 0) {
	    target_top = 0;
	}

	$('html, body').animate({
	    scrollTop: target_top
	}, 1000);
    }
}

function player(){
	
	var getaudio = $('#player')[0];
	/* Get the audio from the player (using the player's ID), the [0] is necessary */
	var mouseovertimer;
	/* Global variable for a timer. When the mouse is hovered over the speaker it will start playing after hovering for 1 second, if less than 1 second it won't play (incase you accidentally hover over the speaker) */
	var audiostatus = 'off';
	/* Global variable for the audio's status (off or on). It's a bit crude but it works for determining the status. */
 
	$(document).on('mouseenter', '.speaker', function() {
	  /* Bonus feature, if the mouse hovers over the speaker image for more than 1 second the audio will start playing */
	  if (!mouseovertimer) {
		mouseovertimer = window.setTimeout(function() {
		  mouseovertimer = null;
		  if (!$('.speaker').hasClass("speakerplay")) {
			getaudio.load();
			/* Loads the audio */
			getaudio.play();
			/* Play the audio (starting at the beginning of the track) */
			$('.speaker').addClass('speakerplay');
			return false;
		  }
		}, 1000);
	  }
	});
 
	$(document).on('mouseleave', '.speaker', function() {
	  /* If the mouse stops hovering on the image (leaves the image) clear the timer, reset back to 0 */
	  if (mouseovertimer) {
		window.clearTimeout(mouseovertimer);
		mouseovertimer = null;
	  }
	});
 
	$(document).on('click touchend', '.speaker', function(event) {
		event.stopPropagation();
		event.preventDefault();
	  /* Touchend is necessary for mobile devices, click alone won't work */
	  if (!$('.speaker').hasClass("speakerplay")) {
		if (audiostatus == 'off') {
		  $('.speaker').addClass('speakerplay');
		  getaudio.load();
		  getaudio.play();
		  window.clearTimeout(mouseovertimer);
		  audiostatus = 'on';
		  return false;
		} else if (audiostatus == 'on') {
		  $('.speaker').addClass('speakerplay');
		  getaudio.play()
		}
	  } else if ($('.speaker').hasClass("speakerplay")) {
		getaudio.pause();
		$('.speaker').removeClass('speakerplay');
		window.clearTimeout(mouseovertimer);
		audiostatus = 'on';
	  }
	});
 
	$('#player').on('ended', function() {
	  $('.speaker').removeClass('speakerplay');
	  /*When the audio has finished playing, remove the class speakerplay*/
	  audiostatus = 'off';
	  /*Set the status back to off*/
	});
}