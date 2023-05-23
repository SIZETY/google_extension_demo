// 监听background页面发来的消息
chrome.runtime.onMessage.addListener((request) => {
	console.log('接收到background消息：', request)
	switch (request.todo) {
		case 'addLog':
			showAddLogModal(request.data)
			break
		case 'closeModal':
			closeAddLogModal()
			break
	}
})

// 打开添加日志弹窗
function showAddLogModal(text) {
	// 获取外部完整的图片URL
	const image = chrome.runtime.getURL('images/icon.png')

	const mask = document.createElement('div')
	mask.setAttribute('id', 'mask')
	mask.classList.add('mask')
	mask.setAttribute('class', 'mask')
	document.body.append(mask)

	const addLogModal = document.createElement('div')
	addLogModal.setAttribute('id', 'modal')
	addLogModal.classList.add('modal')
	addLogModal.innerHTML = `
	<img src="${image}"  width="60" height="60" style="border-radius: 4px">
	<input id="input" placeholder="请输入" required value="${text}">
	<button id="save">保存</button>
	`
	document.body.append(addLogModal)

	document.getElementById('mask').onclick = closeAddLogModal
	document.getElementById('save').onclick = onSave
}

// 关闭添加日志弹窗
function closeAddLogModal() {
	document.getElementById('modal').remove()
	document.getElementById('mask').remove()
}

// 点击保存按钮的回调
function onSave() {
	const inputText = document.getElementById('input').value
	if (!inputText) return alert('请先输入内容')

	// 在content_scripts中只能使用部分API，所以将输入的内容交给background页面处理
	chrome.runtime.sendMessage(chrome.runtime.id, {
		todo: 'saveLog',
		data: inputText,
	})
}
