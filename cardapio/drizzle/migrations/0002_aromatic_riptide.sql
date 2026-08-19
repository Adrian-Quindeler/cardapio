PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_products` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`subcategory_id` text NOT NULL,
	`retail_price` real NOT NULL,
	`wholesale_price` real NOT NULL,
	`image_url` text,
	`status` text DEFAULT 'active' NOT NULL,
	`display_order` integer DEFAULT 0 NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`subcategory_id`) REFERENCES `subcategories`(`id`) ON UPDATE no action ON DELETE restrict
);--> statement-breakpoint
INSERT INTO `__new_products`("id", "name", "description", "subcategory_id", "retail_price", "wholesale_price", "image_url", "status", "display_order", "created_at", "updated_at") SELECT "id", "name", "description", "subcategory_id", "retail_price", "wholesale_price", "image_url", "status", "display_order", "created_at", "updated_at" FROM `products`;--> statement-breakpoint
DROP TABLE `products`;--> statement-breakpoint
ALTER TABLE `__new_products` RENAME TO `products`;--> statement-breakpoint
PRAGMA foreign_keys=ON;
