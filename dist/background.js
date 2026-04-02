chrome.action.onClicked.addListener(async (tab) => {
  if (tab.id) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => {
        const container = document.getElementById('lines-overlay-extension-root');
        if (container) {
          // Se já existe, envia o sinal para fechar
          window.dispatchEvent(new Event('lines-overlay-dismount'));
          return false; // Indica que desmontou
        } else {
          return true; // Indica que não existe, logo precisa injetar
        }
      }
    }, (results) => {
      // Se não existe na página, injetamos o script compilado
      if (results && results[0] && results[0].result === true) {
        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          files: ['content-script.js']
        });
      }
    });
  }
});
