
CREATE SCHEMA IF NOT EXISTS `calendar` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `calendar` ;

-- -----------------------------------------------------
-- Table `calendar`.`category_task`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `calendar`.`category_task` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(60) NOT NULL,
  `color` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `calendar`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `calendar`.`user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `password` VARCHAR(32) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  UNIQUE INDEX `username_UNIQUE` (`username` ASC) VISIBLE,
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE
  )
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `calendar`.`status_task`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `calendar`.`status_task` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `calendar`.`task`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `calendar`.`task` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(45) NULL DEFAULT NULL,
  `categoryname_id` INT NOT NULL,
  `description` VARCHAR(245) NULL,
  `duration` INT NULL,
  `isfavorite` TINYINT NULL,
  `user_id` INT NOT NULL,
  `status_task_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `fk_globaltask_categoryname_idx` (`categoryname_id` ASC) VISIBLE,
  INDEX `fk_task_user1_idx` (`user_id` ASC) VISIBLE,
  INDEX `fk_task_status_task1_idx` (`status_task_id` ASC) VISIBLE,
  CONSTRAINT `fk_globaltask_categoryname`
    FOREIGN KEY (`categoryname_id`)
    REFERENCES `calendar`.`category_task` (`id`)
    ON DELETE CASCADE,
  CONSTRAINT `fk_task_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `calendar`.`user` (`id`)
    ON DELETE CASCADE,
  CONSTRAINT `fk_task_status_task1`
    FOREIGN KEY (`status_task_id`)
    REFERENCES `calendar`.`status_task` (`id`)
    ON DELETE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;
