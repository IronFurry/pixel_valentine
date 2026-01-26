// ---------- Screen logic ----------
function showScreen(screenId) {
  document.querySelectorAll('.screen').forEach(screen => {
    screen.classList.remove('active')
  })
  document.getElementById(screenId).classList.add('active')
}

function showChoiceScreen() {
  showScreen('choiceScreen')
  clearError()
}

function showCreateScreen() {
  showScreen('createScreen')
  document.getElementById('createForm').reset()
}

function showEnterScreen() {
  showScreen('enterScreen')
  document.getElementById('enterForm').reset()
  clearError()
}

function resetApp() {
  showChoiceScreen()
}

function clearError() {
  document.getElementById("errorMsg").classList.remove("show")
}

// ---------- CREATE MESSAGE ----------
document.getElementById("createForm").addEventListener("submit", async (e) => {
  e.preventDefault()

  const sender = document.getElementById("senderName").value.trim()
  const recipient = document.getElementById("recipientName").value.trim()
  const message = document.getElementById("message").value.trim()

  if (!sender || !recipient || !message) return

  const res = await fetch("http://localhost:3000/create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ sender, recipient, message })
  })

  const data = await res.json()
  document.getElementById("generatedCode").innerText = data.code
  showScreen("codeScreen")
})

// ---------- READ MESSAGE ----------
document.getElementById("enterForm").addEventListener("submit", async (e) => {
  e.preventDefault()

  const code = document.getElementById("codeInput").value.trim().toUpperCase()
  const errorMsg = document.getElementById("errorMsg")

  const res = await fetch("http://localhost:3000/read", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ code })
  })

  if (!res.ok) {
    errorMsg.innerText = "Invalid or already opened 💔"
    errorMsg.classList.add("show")
    return
  }

  const data = await res.json()

  document.getElementById("displaySender").innerText = data.sender
  document.getElementById("displayRecipient").innerText = data.recipient
  document.getElementById("displayMessage").innerText = data.message

  showScreen("messageScreen")
})
