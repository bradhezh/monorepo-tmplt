window.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('.tsd-toolbar-contents')
  if (nav) {
    const paths = location.pathname.split('/')
    const i = paths.lastIndexOf('docs')
    const depth = paths.length - i - 2
    const up = Array(depth).fill('..').join('/') || '.'
    const link = document.createElement('a')
    link.href = `${up}/index.html`
    link.textContent = '⬆️ Home'
    link.style.fontWeight = 'bold'
    link.style.marginLeft = '1rem'
    nav.appendChild(link)
  }
})
