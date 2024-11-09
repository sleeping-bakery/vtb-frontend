# Hackaton VTB 2024 frontend

## Запуск проекта

Перед началом работы необходимо заполнить .env файл в корневой директории проекта

```
REACT_APP_BACKEND_URL = 'СсылкаНаБэкенд'
REACT_APP_PUBLIC_PIN_KEY='SUPERSECRET' #Ключ для генерации пинкода
```

### Запуск в режиме разработки

1. `npm install`
2. `npm start`

### Запуск через докер

`docker compose up --build -d` в корневой директории
