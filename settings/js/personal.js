/**
 * Copyright (c) 2011, Robin Appelman <icewind1991@gmail.com>
 *               2013, Morris Jobke <morris.jobke@gmail.com>
 * This file is licensed under the Affero General Public License version 3 or later.
 * See the COPYING-README file.
 */

/**
 * The callback will be fired as soon as enter is pressed by the
 * user or 1 second after the last data entry
 *
 * @param callback
 * @param allowEmptyValue if this is set to true the callback is also called when the value is empty
 */
jQuery.fn.keyUpDelayedOrEnter = function (callback, allowEmptyValue) {
	var cb = callback;
	var that = this;

	this.on('input', _.debounce(function (event) {
		// enter is already handled in keypress
		if (event.keyCode === 13) {
			return;
		}
		if (allowEmptyValue || that.val() !== '') {
			cb();
		}
	}, 1000));

	this.keypress(function (event) {
		if (event.keyCode === 13 && (allowEmptyValue || that.val() !== '')) {
			event.preventDefault();
			cb();
		}
	});
};

/**
 * The callback will be fired as soon as enter is pressed by the user
 *
 * @param callback
 * @param allowEmptyValue if this is set to true the callback is also called when the value is empty
 */

jQuery.fn.enter = function (callback, allowEmptyValue) {
	var cb = callback;
	var that = this;

	this.keypress(function (event) {
		if (event.keyCode === 13 && (allowEmptyValue || that.val !== '')) {
			event.preventDefault();
			cb();
		}
	});

	this.bind('paste', null, function (e) {
		if(!e.keyCode){
			if (allowEmptyValue || that.val() !== '') {
				cb();
			}
<<<<<<< HEAD
		});
	});

	$('#abortcropperbutton').click(function () {
		cleanCropper();
	});

	$('#sendcropperbutton').click(function () {
		sendCropData();
	});

	$('#pass2').strengthify({
		zxcvbn: OC.linkTo('core','vendor/zxcvbn/dist/zxcvbn.js'),
		titles: [
			t('core', 'Very weak password'),
			t('core', 'Weak password'),
			t('core', 'So-so password'),
			t('core', 'Good password'),
			t('core', 'Strong password')
		],
		drawTitles: true
	});

	// does the user have a custom avatar? if he does show #removeavatar
	$.get(OC.generateUrl(
		'/avatar/{user}/{size}',
		{user: OC.currentUser, size: 1}
	), function (result) {
		if (typeof(result) === 'string') {
			// Show the delete button when the avatar is custom
			$('#removeavatar').removeClass('hidden').addClass('inlineblock');
=======
>>>>>>> d17a83eaa52e94ce1451a9dd610bbc812b80f27e
		}
	});
};

$(document).ready(function () {
	// 'redirect' to anchor sections
	// anchors are lost on redirects (e.g. while solving the 2fa challenge) otherwise
	// example: /settings/personal?section=devices will result in /settings/personal?#devices
	if (!window.location.hash) {
		var query = OC.parseQueryString(location.search);
		if (query && query.section) {
			OC.Util.History.replaceState({});
			window.location.hash = query.section;
		}
	} else {
		if(window.location.hash === '#apppasswords' && window.location.pathname === '/settings/personal') {
			// Handle old apppasswords links from desktop apps
			OC.redirect(OC.generateUrl('/settings/personal?sectionid=security#apppasswords'));
		}
	}

});
