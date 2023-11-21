token = localStorage.getItem('accessToken')

const get_contacts = async () => {
  const response = await fetch('http://localhost:8000/api/contacts', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  console.log(response.status, response.statusText)
  if (response.status === 200) {
    result = await response.json()
    for (contact of result) {
      el = document.createElement('li')
      el.className = 'list-group-item'
      el.innerHTML = `ID: ${contact.id} firstname: <b>${contact.first_name}</b> lastname: <b>${contact.last_name}</b>e-mail: ${contact.email} phone: ${contact.phone_number} birtday: ${contact.birth_date} description: ${contact.additional_date}`
      contacts.appendChild(el)
    }
  }
}

const get_users = async () => {
  const response = await fetch('http://localhost:8000/api/', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  console.log(response.status, response.statusText)
  if (response.status === 200) {
    result = await response.json()
    owners.innerHTML = ''
    for (owner of result) {
      el = document.createElement('li')
      el.className = 'list-group-item'
      el.innerHTML = `ID: ${owner.id} email: ${owner.email}`
      owners.appendChild(el)
    }
  }
}

get_contacts()
// get_owners()

userCreate.addEventListener('submit', async (e) => {
  e.preventDefault()
  const response = await fetch('http://localhost:8000/api/auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      email: userCreate.email.value,
    }),
  })
  if (response.status === 201) {
    console.log('Ви успішно створили користувача')
    get_owners()
  }
})
