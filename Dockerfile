# Используем официальный образ Bun
FROM oven/bun:1.0

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и bun.lock
COPY package.json bun.lock ./

# Устанавливаем зависимости
RUN bun install

# Копируем остальные файлы проекта
COPY . .

# Указываем порт, который будет использовать приложение
ENV PORT=3000
EXPOSE $PORT

# Команда для запуска приложения
CMD ["bun", "start"]