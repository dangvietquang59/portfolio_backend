import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  try {
    // Kiểm tra kết nối database
    await prisma.$connect()
    console.log('Connected to database successfully!')

    // Ví dụ một số queries cơ bản:
    // 1. Tạo bản ghi mới
    // const newRecord = await prisma.yourModel.create({
    //   data: {
    //     // your data here
    //   }
    // })

    // 2. Lấy tất cả bản ghi
    // const allRecords = await prisma.yourModel.findMany()
    
    // 3. Tìm bản ghi theo điều kiện
    // const record = await prisma.yourModel.findFirst({
    //   where: {
    //     // your condition here
    //   }
    // })

    // Log kết quả queries ở đây
    
  } catch (error) {
    console.error('Error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

main() 