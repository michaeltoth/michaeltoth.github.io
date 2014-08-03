function Calculate() {

	var input = readInputs();
	var payments = objectConstructor(input);
	
	// Calculate array of cashflows
	for (i = 1; i < inputs.term; i++) {
	
		payments.aggressive.interest[i] = payments.aggressive.balance[i - 1] * inputs.monthlyInterest;
		payments.aggressive.schedPrincipal[i] = inputs.monthlyPayment - payments.aggressive.interest[i];
		payments.aggressive.unschedPrincipal[i] = payments.aggressive.unschedPrincipal[i - 1];
		payments.aggressive.cashflow[i] = payments.aggressive.interest[i] + payments.aggressive.schedPrincipal[i] + payments.aggressive.unschedPrincipal[i];
		payments.aggressive.balance[i] = payments.aggressive.balance[i - 1] - (payments.aggressive.schedPrincipal[i - 1] + payments.aggressive.unschedPrincipal[i - 1]);
		payments.aggressive.month[i] = i + 1;
		
		payments.base.interest[i] = payments.base.balance[i - 1] * inputs.monthlyInterest;
		payments.base.schedPrincipal[i] = inputs.monthlyPayment - payments.base.interest[i];
		payments.base.unschedPrincipal[i] = payments.base.unschedPrincipal[i - 1];
		payments.base.cashflow[i] = payments.base.interest[i] + payments.base.schedPrincipal[i] + payments.base.unschedPrincipal[i];
		payments.base.balance[i] = payments.base.balance[i - 1] - (payments.base.schedPrincipal[i - 1] + payments.base.unschedPrincipal[i - 1]);
		payments.base.month[i] = i + 1;
	}
	
	var basePay = arraySum(payments.base.cashflow);
	var aggressivePay = arraySum(payments.aggressive.cashflow);
	var savings = basePay - aggressivePay;
	outputToScreen(payments.aggressive);
}


function outputToScreen(cf) {
	
	monthArray = "<strong>MONTH</strong>";
	balArray = "<strong>BALANCE</strong>";
	intArray = "<strong>INTEREST</strong>";
	prinArray = "<strong>PRINCIPAL</strong>";
	prepayArray = "<strong>PREPAYMENT</strong>";
	cfArray = "<strong>TOTAL PAYMENT</strong>";
	
	i = 0;
	while(cf.balance[i] > 0) {
		monthArray = monthArray + "<br>" + cf.month[i];
		balArray = balArray + "<br>" + "$" + cf.balance[i].toFixed(2);
		intArray = intArray + "<br>" + "$" + cf.interest[i].toFixed(2);
		prinArray = prinArray + "<br>" + "$" + cf.schedPrincipal[i].toFixed(2);
		prepayArray = prepayArray + "<br>" + "$" + cf.unschedPrincipal[i].toFixed(2);
		cfArray = cfArray + "<br>" + "$" + cf.cashflow[i].toFixed(2);
		i += 1;
	}
	document.getElementById("month").innerHTML = monthArray;
	document.getElementById("balOut").innerHTML = balArray;
	document.getElementById("intOut").innerHTML = intArray;
	document.getElementById("prinOut").innerHTML = prinArray;
	document.getElementById("preOut").innerHTML = prepayArray;
	document.getElementById("cfOut").innerHTML = cfArray;
}

function objectConstructor(inputs) {

	// Declaring payments object with all needed arrays
	payments = {
		base: {
			balance: [],
			interest: [],
			schedPrincipal: [],
			unschedPrincipal: [],
			cashflow: [],
			month: []
		},
		aggressive: {
			balance: [],
			interest: [],
			schedPrincipal: [],
			unschedPrincipal: [],
			cashflow: [],
			month: []
		}
	}
	
	payments.aggressive.balance[0] = inputs.initBalance;
	payments.aggressive.interest[0] = inputs.monthlyInterest * inputs.initBalance;
	payments.aggressive.schedPrincipal[0] = inputs.monthlyPayment - payments.aggressive.interest[0];
	payments.aggressive.unschedPrincipal[0] = inputs.prepay;
	payments.aggressive.cashflow[0] = payments.aggressive.interest[0] + payments.aggressive.schedPrincipal[0] + payments.aggressive.unschedPrincipal[0];
	payments.aggressive.month[0] = 1;
	
	payments.base.balance[0] = inputs.initBalance;
	payments.base.interest[0] = inputs.monthlyInterest * inputs.initBalance;
	payments.base.schedPrincipal[0] = inputs.monthlyPayment - payments.base.interest[0];
	payments.base.unschedPrincipal[0] = 0;
	payments.base.cashflow[0] = payments.base.interest[0] + payments.base.schedPrincipal[0];
	payments.base.month[0] = 1;
	
	return payments;
}

function readInputs() {
	
	var initBalance = parseFloat(document.getElementById("initBalance").value);
	var term = parseFloat(document.getElementById("term").value);
	var prepay = parseFloat(document.getElementById("prepay").value);
	var monthlyInterest = parseFloat(document.getElementById("rate").value)/1200;
	var monthlyPayment = initBalance * (monthlyInterest * Math.pow(1 + monthlyInterest,term) / (Math.pow(1 + monthlyInterest,term) - 1));
	
	inputs = {
		initBalance: initBalance,
		term: term,
		prepay: prepay,
		monthlyInterest: monthlyInterest,
		monthlyPayment: monthlyPayment
	}
	return(inputs);
}

function arraySum(array) {
	var sum = 0;
	for(i = 0; i < array.length; i++) {
		sum += array[i];
	}
	return sum;
}