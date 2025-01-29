-- CreateTable
CREATE TABLE `books` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(150) NOT NULL,
    `author` VARCHAR(100) NOT NULL,
    `isbn` VARCHAR(100) NOT NULL,
    `cover` VARCHAR(100) NOT NULL,
    `category` VARCHAR(100) NOT NULL,
    `status` VARCHAR(100) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `books_isbn_key`(`isbn`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE InnoDB;
