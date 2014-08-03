var myColor = 'white';

function selectColor(color) {
	myColor = color;
}

function paint(elem) {
	elem.style.backgroundColor = myColor;
}