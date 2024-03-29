function getAccountId() {
	let login = prompt('Please enter your Username');
	if (login)
		login = login.toLowerCase();
	let jwtToken = document.getElementById('jwt_token').value;
	fetch(`https://api.streamelements.com/kappa/v2/channels/${login}`, {
		headers: {
			'Accept': 'application/json',
			'Authorization': `Bearer ${jwtToken}`,
			'Content-Type': 'application/json'
		}
	}).then(res => {
		if (!res.ok)
			console.log(`Non-OK-Response (getAccountId): ${res.status}`);
		return res.json();
	}).then(data => {
		if (data._id)
			document.getElementById('acc_id').value = data._id;
		document.getElementById('result').value = JSON.stringify(data, null, 2);
	}).catch(err => {
		console.log(`Error getting User Guid: ${err}`);
	});
}

async function streamElementsSay(guid, jwtToken, message, action) {
	return await fetch(`https://api.streamelements.com/kappa/v2/bot/${guid}/say`, {
		method: 'POST',
		headers: {
			'Accept': 'application/json; charset=utf-8',
			'Authorization': `Bearer ${jwtToken}`,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			message
		})
	}).then(res => {
		if (!res.ok)
			console.log(`Non-OK-Response (${action}): ${res.status}`);
		return res.json();
	}).then(data => {
		document.getElementById('result').value = JSON.stringify(data, null, 2);
	}).catch(err => {
		console.log(`Error sending Twitch Message: ${err}`);
	});
}

async function say() {
	let guid = document.getElementById('acc_id').value;
	let jwtToken = document.getElementById('jwt_token').value;
	let textMessage = document.getElementById('message').value;
	await streamElementsSay(guid, jwtToken, textMessage, 'say');
}

async function announce() {
	let guid = document.getElementById('acc_id').value;
	let jwtToken = document.getElementById('jwt_token').value;
	let textMessage = document.getElementById('message').value;
	await streamElementsSay(guid, jwtToken, `/announce ${textMessage}`, 'announce');
}

async function timeout() {
	let guid = document.getElementById('acc_id').value;
	let jwtToken = document.getElementById('jwt_token').value;
	let user = document.getElementById('timeoutuser').value.toLowerCase();
	let timeoutduration = document.getElementById('timeoutduration').value.trim();
	let timeoutreason = document.getElementById('timeoutreason').value.trim();
	let textMessage = `/timeout ${user} ${timeoutduration}`;
	if (timeoutreason != null && timeoutreason != '') textMessage += ` ${timeoutreason}`;
	await streamElementsSay(guid, jwtToken, textMessage, 'timeout');
}

async function ban() {
	let guid = document.getElementById('acc_id').value;
	let jwtToken = document.getElementById('jwt_token').value;
	let user = document.getElementById('banuser').value.toLowerCase();
	let banreason = document.getElementById('banreason').value.trim();
	let textMessage = `/ban ${user}`;
	if (banreason != null && banreason != '') textMessage += ` ${banreason}`;
	await streamElementsSay(guid, jwtToken, textMessage, 'ban');
}

async function unban() {
	let guid = document.getElementById('acc_id').value;
	let jwtToken = document.getElementById('jwt_token').value;
	let user = document.getElementById('unbanuser').value.toLowerCase();
	let textMessage = `/unban ${user}`;
	await streamElementsSay(guid, jwtToken, textMessage, 'unban');
}

async function del() {
	let guid = document.getElementById('acc_id').value;
	let jwtToken = document.getElementById('jwt_token').value;
	let messageid = document.getElementById('deleteid').value.trim();
	let textMessage = `/delete ${messageid}`;
	await streamElementsSay(guid, jwtToken, textMessage, 'delete');
}

async function clch() {
	let guid = document.getElementById('acc_id').value;
	let jwtToken = document.getElementById('jwt_token').value;
	let textMessage = '/clear';
	await streamElementsSay(guid, jwtToken, textMessage, 'clear');
}
