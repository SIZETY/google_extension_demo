// 获取storage中保存的设置数据并进行回显
chrome.storage.sync.get('limitLogsNum').then((data) => {
	const { limitLogsNum = 3 } = data

	const radioList = document.querySelectorAll('.option>.radio')

	if (radioList) {
		for (let radio of radioList) {
			const text = radio.innerText
			if (text.substr(0, text.length - 1) == limitLogsNum) {
				radio.childNodes[1].checked = true
				break
			}
		}

		// 监听单选框修改事件
		for (let radio of radioList) {
			radio.addEventListener('click', (e) => {
				// storage中保存用户修改的选项设置
				if (e.target.checked) {
					chrome.storage.sync.set({
						limitLogsNum: Number(e.target.value) || 3,
					})
				}
			})
		}
	}
})
