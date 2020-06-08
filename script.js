const alertBtn = document.querySelector('#alert-btn');
const alertMessage = document.querySelector('#alert');
const tmpl = document.querySelector('#notification-tmpl');
const toggleBtn = document.querySelector('.toggle');
const toggleContent = document.querySelector('.toggle-content');
const dialogBtn = document.querySelector('#dialog-btn');
const closeDialogBtn = document.querySelector('#closeDialog-btn');

alertBtn.addEventListener("click", function() {
    if (alertMessage.firstChild) {
        alertMessage.removeChild(alertMessage.firstChild);
    } else {
        const clone = tmpl.content.cloneNode(true);
        alertMessage.appendChild(clone);
    }

});

dialogBtn.addEventListener("click", openDialog);

closeDialogBtn.addEventListener("click", closeDialog);

// Show an element
var show = function (elem) {
	elem.style.display = 'block';
};

// Hide an element
var hide = function (elem) {
	elem.style.display = 'none';
};

// Toggle element visibility
var toggle = function (elem) {

	// If the element is visible, hide it
	if (window.getComputedStyle(elem).display === 'block') {
		hide(elem);
		return;
	}

	// Otherwise, show it
	show(elem);

};

toggleBtn.addEventListener('click', function (event) {
	toggle(toggleContent);
}, false);

const KEYCODE = {
    ESC: 27
}


//DIALOG SCRIPTS -----------------------------------------------
const dialog = document.querySelector('.dialog');
const dialogMask = dialog.querySelector('.dialog-mask');
const dialogWindow = dialog.querySelector('.dialog-window');
let previousActiveElement;

function openDialog() {
    previousActiveElement = document.activeElement;

    Array.from(document.body.children).forEach( child => {
        if(child !== dialog) {
            child.inert = true;
        }
    })

    dialog.classList.add('opened');

    dialogMask.addEventListener('click', closeDialog);
    dialogWindow.querySelectorAll('button').forEach(btn => {
        btn.addEventListener('keydown', checkCloseDialog);

        dialog.querySelector('button').focus();
    });
}

function checkCloseDialog(e) {
    if(e.keyCode == KEYCODE.ESC) {
        closeDialog();
    }
}

function closeDialog() {
    dialogMask.removeEventListener('click', closeDialog);
    dialogWindow.querySelectorAll('button').forEach(btn => {
        btn.removeEventListener('click', closeDialog);
    });
    document.removeEventListener('click', checkCloseDialog);

    Array.from(document.body.children).forEach(child => {
        if(child !== dialog) {
            child.inert = false;
        }
    });

    dialog.classList.remove('opened');

    previousActiveElement.focus();
}