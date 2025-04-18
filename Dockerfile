# Dùng Node Alpine nhẹ nhàng
FROM node:18-alpine

# Thư mục làm việc
WORKDIR /app

# Copy package files trước (tận dụng cache)
COPY package*.json ./

# Cài deps (bao gồm devDeps để dùng prisma, tsc)
RUN npm install

# Copy toàn bộ project
COPY . .

# Tạo Prisma Client
RUN npx prisma generate

# Build TypeScript ra thư mục dist/
RUN npm run build

# Mở port Express server (tuỳ theo app bạn config)
EXPOSE 3000

# Khởi chạy app
CMD ["npm", "start"]
