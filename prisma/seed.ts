import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { categories, products } from "../src/lib/data/products";

const prisma = new PrismaClient();

const ADMIN_EMAIL = "admin@realfoods.in";
const ADMIN_PASSWORD = "Realfoods@123";
const ADMIN_PHONE = "+919526395590";

async function main() {
  // --- Admin user (created once) ---
  const existingAdmin = await prisma.user.findUnique({
    where: { email: ADMIN_EMAIL },
  });
  if (!existingAdmin) {
    await prisma.user.create({
      data: {
        name: "Admin",
        email: ADMIN_EMAIL,
        phone: ADMIN_PHONE,
        passwordHash: await bcrypt.hash(ADMIN_PASSWORD, 10),
        role: "ADMIN",
      },
    });
    console.log(
      `Created admin user: ${ADMIN_EMAIL} / ${ADMIN_PASSWORD}`,
    );
  }

  // --- Categories ---
  for (const category of categories) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: {
        name: category.name,
        description: category.description,
        image: category.image,
      },
      create: {
        id: category.slug,
        slug: category.slug,
        name: category.name,
        description: category.description,
        image: category.image,
      },
    });
  }

  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: {
        name: product.name,
        tagline: product.tagline,
        description: product.description,
        categoryId: product.categorySlug,
        active: product.active,
        tags: product.tags ?? [],
      },
      create: {
        id: product.id,
        slug: product.slug,
        name: product.name,
        tagline: product.tagline,
        description: product.description,
        categoryId: product.categorySlug,
        active: product.active,
        tags: product.tags ?? [],
      },
    });

    await prisma.productImage.deleteMany({ where: { productId: product.id } });
    await prisma.productImage.createMany({
      data: product.images.map((image, index) => ({
        productId: product.id,
        url: image.url,
        alt: image.alt,
        sortOrder: index,
      })),
    });

    for (const variant of product.variants) {
      await prisma.productVariant.upsert({
        where: { sku: variant.sku },
        update: {
          name: variant.name,
          size: variant.size,
          weightGrams: variant.weightGrams ?? null,
          price: variant.price,
          originalPrice: variant.originalPrice ?? null,
          stock: variant.stock,
          inStock: variant.inStock,
        },
        create: {
          id: variant.id,
          productId: product.id,
          name: variant.name,
          size: variant.size,
          weightGrams: variant.weightGrams ?? null,
          price: variant.price,
          originalPrice: variant.originalPrice ?? null,
          sku: variant.sku,
          stock: variant.stock,
          inStock: variant.inStock,
        },
      });
    }
  }

  console.log(`Seeded ${categories.length} categories and ${products.length} products.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });