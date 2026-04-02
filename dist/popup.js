document.getElementById('ativar').addEventListener('click', async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  
  if (tab.id) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ['content-script.js']
    });
  }
});

document.getElementById('desativar').addEventListener('click', async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  
  if (tab.id) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => {
        // Envia o sinal para o React desmontar o componente na página atual
        window.dispatchEvent(new Event('lines-overlay-dismount'));
      }
    });
  }
});
