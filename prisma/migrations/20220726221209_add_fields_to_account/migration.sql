-- AlterTable
ALTER TABLE `Account` ADD COLUMN `oauth_token` TEXT NULL,
    ADD COLUMN `oauth_token_secret` TEXT NULL,
    ADD COLUMN `refresh_token_expires_in` INTEGER NULL;
