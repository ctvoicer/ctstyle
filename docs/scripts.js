/**
 * Require HTML page
 * ------------------
 */
(function includeHTML() {
  var z, i, elmnt, file, xhttp

  z = document.getElementsByTagName("*")

  for (i = 0; i < z.length; i++) {
    elmnt = z[i]
    file = elmnt.getAttribute("include-html")

    if (file) {
      xhttp = new XMLHttpRequest()

      xhttp.onreadystatechange = function() {
        if (this.readyState === 4) {
          if (this.status === 200) {
            elmnt.innerHTML = this.responseText
          }
          if (this.status === 404) {
            elmnt.innerHTML = "Page not found."
          }

          elmnt.removeAttribute("include-html")

          includeHTML()
        }
      }

      xhttp.open("GET", file, true)
      xhttp.send()

      return
    }
  }
})()

/**
 * Navegação por abas
 * ------------------
 */
document.querySelectorAll("#nav li").forEach(function(navEl) {
  navEl.onclick = function() {
    toggleTab(this.id, this.dataset.target)
  }
})

function toggleTab(selectedNav, targetId) {
  var navEls = document.querySelectorAll("#nav li")

  navEls.forEach(function(navEl) {
    if (navEl.id === selectedNav) {
      navEl.classList.add("is-active")
    } else if (navEl.classList.contains("is-active")) {
      navEl.classList.remove("is-active")
    }
  })

  var tabs = document.querySelectorAll(".tab-pane")

  tabs.forEach(function(tab) {
    if (tab.id === targetId) {
      tab.style.display = "block"
    } else {
      tab.style.display = "none"
    }
  })
}

/**
 * Aba pré-selecionada
 * ---------------------
 */
var queryString = new URLSearchParams(window.location.search)
var tab = queryString.get('tab')
var selectedTab = document.getElementById(tab)
var selectedContainer = document.getElementById(tab + '_tab')
if (selectedTab) {
  selectedTab.classList.add('is-active')
}
if (selectedContainer) {
  selectedContainer.style.display = 'initial'
}
