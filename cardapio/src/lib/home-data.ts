import { db } from "@/lib/db";
import { asc, desc, eq } from "drizzle-orm";
import {
	categories,
	subcategories,
	products,
	storeSettings,
	storeHours,
} from "../../drizzle/schema";

export async function getActiveCategories() {
	return db
		.select({
			id: categories.id,
			name: categories.name,
			slug: categories.slug,
			description: categories.description,
		})
		.from(categories)
		.where(eq(categories.status, "active"))
		.orderBy(asc(categories.displayOrder));
}

export async function getActiveSubcategories() {
	return db
		.select({
			id: subcategories.id,
			name: subcategories.name,
			categoryId: subcategories.categoryId,
		})
		.from(subcategories)
		.where(eq(subcategories.status, "active"))
		.orderBy(asc(subcategories.displayOrder));
}

export async function getActiveProducts() {
	return db
		.select({
			id: products.id,
			name: products.name,
			description: products.description,
			retailPrice: products.retailPrice,
			wholesalePrice: products.wholesalePrice,
			imageUrl: products.imageUrl,
			subcategoryId: products.subcategoryId,
		})
		.from(products)
		.where(eq(products.status, "active"))
		.orderBy(asc(products.displayOrder));
}

export async function getStoreSettings() {
	const rows = await db
		.select({
			brandName: storeSettings.brandName,
			logoUrl: storeSettings.logoUrl,
			heroImageUrl: storeSettings.heroImageUrl,
			heroAlt: storeSettings.heroAlt,
		})
		.from(storeSettings)
		.orderBy(desc(storeSettings.updatedAt))
		.limit(1);

	return rows[0] ?? null;
}

export async function getStoreHours() {
	return db
		.select({
			dayOfWeek: storeHours.dayOfWeek,
			openTime: storeHours.openTime,
			closeTime: storeHours.closeTime,
			isClosed: storeHours.isClosed,
		})
		.from(storeHours)
		.orderBy(asc(storeHours.dayOfWeek));
}

type CategoryRow = Awaited<ReturnType<typeof getActiveCategories>>[number];
type SubcategoryRow = Awaited<ReturnType<typeof getActiveSubcategories>>[number];
type ProductRow = Awaited<ReturnType<typeof getActiveProducts>>[number];

export function buildCategoryTree(
	categoryRows: CategoryRow[],
	subcategoryRows: SubcategoryRow[],
	productRows: ProductRow[],
) {
	return categoryRows.map((category) => ({
		...category,
		subcategories: subcategoryRows
			.filter((sub) => sub.categoryId === category.id)
			.map((sub) => ({
				id: sub.id,
				name: sub.name,
				products: productRows
					.filter((product) => product.subcategoryId === sub.id)
					.map(({ subcategoryId: _, ...product }) => product),
			})),
	}));
}

export async function getHomePageData() {
	const [categoryRows, subcategoryRows, productRows, storeSettingsRow, storeHoursList] =
		await Promise.all([
			getActiveCategories(),
			getActiveSubcategories(),
			getActiveProducts(),
			getStoreSettings(),
			getStoreHours(),
		]);

	return {
		categoryRows,
		categoryList: buildCategoryTree(categoryRows, subcategoryRows, productRows),
		storeSettings: storeSettingsRow,
		storeHours: storeHoursList,
	};
}
