CREATE TABLE `transactions` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`merchant_name` text NOT NULL,
	`upi_id` text NOT NULL,
	`amount` real NOT NULL,
	`status` text NOT NULL,
	`note` text,
	`timestamp` integer NOT NULL,
	`created_at` integer NOT NULL
);
