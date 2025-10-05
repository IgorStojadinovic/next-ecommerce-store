import { PrismaClient, Prisma, Category } from "../generated/prisma";
import bcrypt from "bcrypt";
  
const prisma = new PrismaClient();

// Podaci za proizvode
const productData: Prisma.ProductCreateInput[] = [
  {
    name: 'XX99 Mark II Headphones',
    price: new Prisma.Decimal(2999),
    category: Category.HEADPHONES,
    stock: 10
  },
  {
    name: 'XX99 Mark I Headphones',
    price: new Prisma.Decimal(1750),
    category: Category.HEADPHONES,
    stock: 8
  },
  {
    name: 'XX59 Headphones',
    price: new Prisma.Decimal(899),
    category: Category.HEADPHONES,
    stock: 15
  },
  {
    name: 'ZX9 Speaker',
    price: new Prisma.Decimal(4500),
    category: Category.SPEAKERS,
    stock: 5
  },
  {
    name: 'ZX7 Speaker',
    price: new Prisma.Decimal(3500),
    category: Category.SPEAKERS,
    stock: 7
  },
  {
    name: 'YX1 Wireless Earphones',
    price: new Prisma.Decimal(599),
    category: Category.EARPHONES,
    stock: 20
  }
]

// Test korisnici
const userData: Prisma.UserCreateInput[] = [
  {
    name: 'Test user',
    email: 'test@example.com',
    password: 'testuser-prisma', 
    address: '123 Main St',
    city: 'New York',
    state: 'NY',
    zip: '10001',
    phone: '+1 234 567 890'
  },
  {
    name: 'Jane Smith',
    email: 'jane@example.com',
    password: 'test456',
    address: '456 Park Ave',
    city: 'Los Angeles',
    state: 'CA',
    zip: '90001',
    phone: '+1 234 567 891'
  }
]

async function main() {
  console.log('🗑️ Brisanje postojećih podataka...')
  
  // Brisanje podataka obrnutim redosledom zbog stranih ključeva
  await prisma.orderItem.deleteMany({})
  await prisma.order.deleteMany({})
  await prisma.cartItem.deleteMany({})
  await prisma.cart.deleteMany({})
  await prisma.product.deleteMany({})
  await prisma.user.deleteMany({})

  console.log('📦 Kreiranje novih proizvoda...')
  for (const product of productData) {
    await prisma.product.create({ data: product })
  }

  console.log('👥 Kreiranje test korisnika...')
  for (const user of userData) {
    user.password = await bcrypt.hash(user.password, 10)
    const createdUser = await prisma.user.create({ data: user })

    // Kreiranje korpe za svakog korisnika
    const cart = await prisma.cart.create({
      data: { userId: createdUser.id }
    })

    // Dodavanje random proizvoda u korpu
    const randomProduct = await prisma.product.findFirst({
      where: { category: Category.HEADPHONES }
    })

    if (randomProduct) {
      await prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productId: randomProduct.id,
          quantity: 1
        }
      })
    }

    // Kreiranje test narudžbine
    if (createdUser.id === 1) {
      const order = await prisma.order.create({
        data: {
          userId: createdUser.id,
          totalAmount: new Prisma.Decimal(2999),
          shippingAddress: createdUser.address || '',
          shippingMethod: 'Express',
          paymentMethod: 'CREDIT_CARD',
          status: 'PENDING',
          paymentStatus: 'PENDING'
        }
      })

      // Dodavanje proizvoda u narudžbinu
      if (randomProduct) {
        await prisma.orderItem.create({
          data: {
            orderId: order.id,
            productId: randomProduct.id,
            quantity: 1,
            price: randomProduct.price
          }
        })
      }
    }
  }

  console.log('✅ Seed završen!')
}

main()
  .catch((e) => {
    console.error('❌ Greška:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })