import App from './App.svelte'

// Register PWA Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js').then(registration => {
      console.log('SW registered', registration)
    }).catch(error => {
      console.log('SW registration failed', error)
    })
  })
}

const app = new App({
  target: document.body
})

export default app