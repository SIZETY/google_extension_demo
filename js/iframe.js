chrome.runtime.onMessage.addListener((request) => {
	console.log('接收到background消息：', request)
	switch (request.todo) {
		case 'getIframe':
			getCurrentPageIframe(request.data)
			break
	}
})

function getCurrentPageIframe(data) {
	console.log('data:', data)
	console.log('document', document)
	console.log('video', document.querySelector('video'))
}
