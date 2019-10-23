use banktommorowDB //Create the database bankDB

//generate departments and positions
var bankDepartments = [
	{
		name: 'Credit Department',
		positions: [
			{
				id: 0,
				name: 'Credit Department possition 1'
			},
			{
				id: 1,
				name: 'Credit Department possition 2'
			},
			{
				id: 2,
				name: 'Credit Department possition 3'
			}
		]
	},
	{
		name: 'Finance Department',
		positions: [
			{
				id: 0,
				name: 'Finance Department possition 1'
			},
			{
				id: 1,
				name: 'Finance Department possition 2'
			},
			{
				id: 2,
				name: 'Finance Department possition 3'
			},
			{
				id: 3,
				name: 'Finance Department possition 4'
			},
			{
				id: 4,
				name: 'Finance Department possition 5'
			}
		]
	}
];

db.departments.insert(bankDepartments[0]);
db.departments.insert(bankDepartments[1]);

//generate employees
var generateFirstname = function(){
  var collection = ['Ivan','Divan','Kolio','Burkan','Zvrqn','Petkan','Chaban', 'Sasho', 'Tonkata'];
  
  var index = Math.floor(Math.random() * 9);
  return collection[index];
}

var generateSurname = function(){
  var collection = ['Kolev','Stanishev','Djendarov','Slivenov','Bademov'];
  
  var index = Math.floor(Math.random() * 5);
  return collection[index];
}

var generateLastname = function(){
  var collection = ['Geshev','Peshev','Vurst','Tyson','Pulev','Shumaher','Roman'];
  
  var index = Math.floor(Math.random() * 7);
  return collection[index];
}

var generateAddress = function(){
  var streets = ['jk Badema','Dragoman','Vardara', 'Kostadinovska','Kolio Ficheto'];
  
  var streetIndex = Math.floor(Math.random() * 5);
  
  var streetNumbers = ['18A','7','6B','40','12','16','42'];
  
  var index = Math.floor(Math.random() * 7);
  
  return streetNumbers[index] + ' ' + streets[streetIndex];
}

var generatePhone = function(){
  var phones = ['0878668525','0878548265','0895665254','0895668595','0896584548','0879568452', '0879552654'];
  
  var index = Math.floor(Math.random() * 7);
  return phones[index];
}

var generateMail = function(name){
  var collection = ['@gmail.com','@abv.bg'];
  
  var index = Math.floor(Math.random() * 2);
  return name.toLowerCase() + collection[index];
}



var fillEmployees = function(){
    var employee = {};
    var departmentIndex;
    var positionIndex;
	
	for (i = 0; i < 8; i++) {
        departmentIndex = Math.floor(Math.random() * 2);
        positionIndex = Math.floor(Math.random() * 2);

		employee.firstName = generateFirstname();
		employee.lastName = generateLastname();
		employee.surName = generateSurname();
        employee.address = generateAddress();
        employee.phone = generatePhone();
        employee.email = generateMail(employee.firstName + employee.lastName);
        employee.department = bankDepartments[departmentIndex].name;
        employee.position = bankDepartments[departmentIndex].positions[positionIndex].name;

		db.employees.insert(employee);
	}
}

fillEmployees();

//generate Clients


var fillClients = function(){
    var client = {};
	
	for (i = 0; i < 10; i++) {
		client.firstName = generateFirstname();
		client.lastName = generateLastname();
		client.additionalName = generateSurname();
        client.address = generateAddress();
        client.phone = generatePhone();
        client.email = generateMail(client.firstName+client.lastName);

		db.clients.insert(client);
	}
}

fillClients();


var geneateAccount = function(client){
	var accounts = [
		'BG18KOLI01858965281997', 'BG18KOLI05421581281997', 'BG18KOLI01965871281997', 'BG18KOLI01818181281997', 'BG18KOLI01817878981997', 'BG18KOLI01818181142369',
		'BG18KOLI01818181278412', 'BG18KOLI01818181123568', 'BG18KOLI01818181214784', 'BG18KOLI01818181121212', 'BG18KOLI01818181878796', 'BG18KOLI01818181212365',
		'BG18KOLI01818181212121', 'BG18KOLI01818187854215', 'BG18KOLI01818187878454', 'BG18KOLI01818181212512', 'BG18KOLI01818181288568', 'BG18KOLI01818181281125',
		'BG18KOLI01818145898797', 'BG18KOLI01818181281922'
	];
	
	var amounts = [
		999999.99, 1818.99, 1812.99, 18562.99, 181818.99, 1000.99, 20000.99, 2120.99, 2099.99, 2000.99
	];
	
	var currencies = ['BGN', 'USD', 'EUR'];
	var accountIndex;
	var amountIndex;
	var currencyIndex;
	var account = {};
	
	accountIndex = Math.floor(Math.random() * 20);
	amountIndex = Math.floor(Math.random() * 10);
	currencyIndex = Math.floor(Math.random() * 3);

	account = {
	account: accounts[accountIndex],
	currency: currencies[currencyIndex],
	amount: amounts[amountIndex],
	};
	db.clients.update(
	{_id: client._id},
	{$addToSet: {"accounts": account}}
	)
}


var fillAccounts = function(){
	var accountsNumber;
	var clients = db.clients.find().toArray();
	var clientsLength = clients.length;
	var client = [];
	
	for (i = 0; i < clientsLength; i++) {
		geneateAccount(clients[i]);
	}
}

fillAccounts();

//Query 1

//1 List departments
db.departments.find({},{name: 1})

//2 Add salary 
var addSalaryToEmployees = function(){
    var employees = db.employees.find().toArray();

    for (i = 0; i < employees.length; i++) {
		db.employees.update({_id:employees[i]._id}, {$set: {"salary": Math.floor(Math.random() * 3000) + 2000}});
	}
}

addSalaryToEmployees();

//List employees salaries
db.employees.find({},{firstName: 1, lastName: 1, salary: 1})

//3 Listing employees
var listEmployeesNewEmail = function(){
    var employees = db.employees.find().toArray();

    for (i = 0; i < employees.length; i++) {
		print(employees[i].firstName + ' ' + employees[i].lastName + ' : ' + employees[i].firstName.toLowerCase() + '.' + employees[i].lastName.toLowerCase() + '@bankoftomarow.bg');
	}
} 

listEmployeesNewEmail();

//4
var addWorkExpirience = function(){
	var employees = db.employees.find().toArray();
	
	
	for (i = 0; i < employees.length; i++) {
		db.employees.update({_id:employees[i]._id}, {$set: {"workExpirience": Math.floor(Math.random() * 15)}});
	}
}

addWorkExpirience();

var printEmployeesWithMoreThanFiveYearWorkEpirience = function(){
    var employees = db.employees.find({workExpirience: {$gt: 5}}).toArray();
    if(employees.length > 0){
        for (i = 0; i < employees.length; i++) {
            print(employees[i].firstName + ' ' + employees[i].lastName)
        }
    }
    else{
        print('There are not any employees with more than 5 years of work expirience')
    }
}

printEmployeesWithMoreThanFiveYearWorkEpirience();

//5 employees starting with S
var getEmployeesStartingWithS = function () {
    var employees = db.employees.find({firstName: {$regex: /^S/}}).toArray();
    if(employees.length > 0){
        for (i = 0; i < employees.length; i++) {
            print(employees[i].firstName + ' ' + employees[i].lastName)
        }
    }
    else{
        print('There are not employees with first letter S')
    }
};

getEmployeesStartingWithS();

//6 Add birth place, find wich are not from Bulgaria
var addPlaceOfBirth = function(){
	var placesOfBirthCollection = ['Bulgaria', 'Izrael', 'Turkey', 'Dubai', 'Iceland', 'Greenland', 'England', 'Afganistan', 'Deutschland', 'Greece'];
	var employees = db.employees.find().toArray();
	var placeOfBirthindex;
	
	for (i = 0; i < employees.length; i++) {
		placeOfBirthindex = Math.floor(Math.random() * 10);
		db.employees.update({_id:employees[i]._id}, {$set: {"placeOfBirth": placesOfBirthCollection[placeOfBirthindex]}});
	}
}

addPlaceOfBirth();

var getTalibans = function () {
    var employees = db.employees.find({placeOfBirth: {$ne: 'Bulgaria'}}).toArray();
    if(employees.length > 0){
        for (i = 0; i < employees.length; i++) {
            print(employees[i].firstName + ' ' + employees[i].lastName)
        }
    }
    else{
        print('There are not any talibans')
    }
}

getTalibans();

//7 Names with "I"
db.employees.find({
	$or: [
		{firstName: /I/i},
		{lastName: /I/i},
		{surName: /I/i}
	]
})

//Query 3

//4 Salary between 2000 and 3000
var employeesWithWithSpecialSalary = function () {
    var employees = db.employees.find({$and: [{"salary": {$gte: 2000}}, {"salary": {$lte: 3000}}]}).toArray();
    if(employees.length > 0){
        for (i = 0; i < employees.length; i++) {
            print(employees[i].firstName + ' ' + employees[i].lastName)
        }
    }
    else{
        print('There are not any employees with salary between 2000 and 3000')
    }
}

employeesWithWithSpecialSalary();



