const appUsers = {
  title: 'CRUD Users',
  isLoading: false,
  users: [],
  newUser: {
    name: '',
    email: '',
    address: {
      street: '',
      suite: '',
      city: '',
      zipcode: '',
      geo: {
        lat: '',
        lng: ''
      }
    },
    phone: '',
    website: '',
    company: {
      name: '',
      catchPhrase: '',
      bs: ''
    }
  },
  editUser: {
    id: null,
    name: '',
    email: ''
  },
  editMode: false,
  resetForm () {
    this.newUser.name = ''
    this.newUser.email = ''
  },
  cancelEdit () {
    this.editMode = false
    this.editUser.id = ''
    this.editUser.name = ''
    this.editUser.email = ''
  },
  editItem (user) {
    this.editMode = true
    this.editUser.id = user.id
    this.editUser.name = user.name
    this.editUser.email = user.email
    this.$nextTick(() => this.$refs.editName.focus())
  },
  isEmpty (value) {
    return value.trim() === ''
  },
  async fetchUsers () {
    this.isLoading = true
    const response = await fetch('https://jsonplaceholder.typicode.com/users')
    this.users = await response.json()
    this.isLoading = false
  },
  async deleteUser (id) {
    this.isLoading = true
    await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
      method: 'DELETE'
    })
    this.users = this.users.filter(user => user.id !== id)
    this.isLoading = false
  },
  async createUser () {
    this.isLoading = true
    if (this.isEmpty(this.newUser.name.trim()) || this.isEmpty(this.newUser.email.trim())) {
      console.log('Complete los campos requeridos')
      return
    }

    const response = await fetch('https://jsonplaceholder.typicode.com/users', {
      method: 'POST',
      body: JSON.stringify(this.newUser),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const user = await response.json()
    user.id = this.users.length + 1
    this.users.push(user)
    this.resetForm()
    this.isLoading = false
  },
  async updateUser () {
    this.isLoading = true
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${this.editUser.id}`, {
      method: 'PUT',
      body: JSON.stringify(this.editUser),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const updatedUser = await response.json()
    const index = this.users.findIndex(user => user.id === updatedUser.id)
    this.users.splice(index, 1, updatedUser)
    this.cancelEdit()
    this.isLoading = false
  },
  get saludar () {
    return this.title
  }
}
