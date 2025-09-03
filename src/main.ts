import { createApp } from 'vue'
import Game from './Game.vue'
import './game.css'

function onResize() {
  // get actual vh on mobile
  document.body.style.setProperty('--vh', window.innerHeight + 'px')
}

function init() {
  onResize()
  // listen for subsequent resizes after initial styles are loaded
  window.addEventListener('resize', onResize)
  createApp(Game).mount('#app')
}

// Avoid forcing layout before stylesheets are loaded to prevent FOUC
if (document.readyState === 'complete') {
  init()
} else {
  window.addEventListener('load', init, { once: true })
}
