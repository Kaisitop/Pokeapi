# 🧩 PokeApi App - Django + React

Aplicación web que consume datos de la [PokeAPI](https://pokeapi.co/) y permite:

- Ver listado de Pokémon con nombre, imagen y habilidades.
- Buscar por nombre.
- Cargar más resultados con paginación.
- Ver el detalle completo de cada Pokémon.

---

## ⚙️ Tecnologías usadas

- **Backend**: Django, Django REST Framework, Requests
- **Frontend**: React (Vite), TailwindCSS, Axios
- **Extras**: Django CORS Headers, PokeAPI

---

## 📦 Instalación y ejecución

### 🔹 Backend (Django)

```bash
# Navegar al directorio del backend
cd pokeapi

# Creamos y activamos el entorno virtual
python -m venv venv
source venv/bin/activate  # En Windows: venv\Scripts\activate

# Se instalan las dependencias y se ejecutan
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

API disponible en: http://127.0.0.1:8000/api/pokemons/

### 🔹 Frontend (React)

```bash
# Navegar al directorio del frontend
cd frontend

# Se instalan las dependencias y se ejecutan
npm install
npm run dev
```

App disponible en: http://localhost:5173/

---

## 🧪 Cómo probar la app

- Ir a la ruta principal ("/") para ver el listado paginado con imágenes y búsqueda.
- Hacer clic en un Pokémon para ver su perfil completo (/pokemon/:name).
- Usar la barra de búsqueda o el botón "Cargar más" para interactuar.

---

## 👨‍💻 Autor

Desarrollado por Julio Andino como prueba técnica.


![image](https://github.com/user-attachments/assets/5ec4f1c7-a59b-4760-beb1-e6eaed653b87)
![image](https://github.com/user-attachments/assets/4eb2a03a-6678-4501-9281-2e6b44367294)

