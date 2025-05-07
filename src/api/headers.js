const apiUrl = import.meta.env.VITE_API_URL

const withoutAuthorizationJSON = (data) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  return [data, config]
}

const authorization = () => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem(import.meta.env.VITE_CREDENCIALES)}`
    }
  }
  return config
}

const authorizationJSON = (data) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem(import.meta.env.VITE_CREDENCIALES)}`
    }
  }

  return [data, config]
}

const authorizationFormData = (data) => {
  const config = {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem(import.meta.env.VITE_CREDENCIALES)}`
    }
  }

  return [data, config]
}

// Exporta las funciones de configuración para que puedan ser llamadas desde otros módulos
export { authorization, authorizationJSON, withoutAuthorizationJSON, authorizationFormData, apiUrl }


/**
 * withoutAuthorizationJSON(data):
 *   - POST sin token, tipo JSON.
 *   - return [data, config]
 *
 * authorization():
 *   - GET/DELETE con token, sin body.
 *   - return config
 *
 * authorizationJSON(data):
 *   - POST/PUT con token y JSON.
 *   - return [data, config]
 *
 * authorizationFormData(formData):
 *   - POST con token y archivos (FormData).
 *   - return [formData, config]
 *
 * 🔐 Token sacado de localStorage con VITE_CREDENCIALES
 */
