function check_max_count_person(max_user_count){
	const count_person = localStorage.getItem('count_person');
	return !(count_person < max_user_count) || count_person === max_user_count
}

function addEventToSavePlus(){
	$("#mainbody\\:editPersRecord\\:saveButton" ).click( "click", function() {
		let count_person = localStorage.getItem('count_person');
		count_person ++ 
		localStorage.setItem('count_person', count_person);
	});
}

function t(){
	const max_count_persons_for_user = {
		'gpi': 500,
		'ykps': 700,
	}
	const exclude_users = ['admin']
	
	// Получаем пользователя
	let user_name = ''
	let user_span = $('#agmenuform\\:headerUserID')
	if(user_span){
		user_name = $('#agmenuform\\:headerUserID').text()
	}

	// Получаем кол-во заведенных людей из кол-во ячеек таблицы
	let t = $('#mainbody\\:searchPersRecord\\:searchresulttable_data')
	let count_person_table  = t.find('tr').length
	
	// Получаем кол-во заведенных людей из текста внизу страницы, если есть пагинация.
	let span_elem = $('#mainbody\\:searchPersRecord\\:searchresulttable').find('div.ui-datatable-footer.ui-widget-header.ui-corner-bottom').find('span')
	let count_person_span = 0;
	if(span_elem.length){
		count_person_span = parseInt(span_elem.text().split('Number of records:')[1].trim())
	}
	
	// Блокируем кнопку
	let max_user_count = 0;
	let count_person = 0;
	if(user_name){
		count_person = Math.max(count_person_table, count_person_span)
		max_user_count = max_count_persons_for_user[user_name]
		if(window.location.pathname.includes('personalmanagement/searchPersRecord')){
			localStorage.setItem('count_person', count_person);
		}
	}
	// && !(exclude_users.includes(user_name)
	if(!(exclude_users.includes(user_name)) && check_max_count_person(max_user_count) ){
		$('#mainbody\\:searchPersRecord\\:newButton').remove();
		$('#mainbody\\:editPersRecord\\:cloneButton').remove();
		$('#mainbody\\:editPersRecord\\:newButton').remove();
	}
}

$( document ).ready(function() {
    addEventToSavePlus();
	t();
});
