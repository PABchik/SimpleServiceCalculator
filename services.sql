-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Май 30 2019 г., 20:58
-- Версия сервера: 5.6.41
-- Версия PHP: 5.5.38

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `services`
--

-- --------------------------------------------------------

--
-- Структура таблицы `brand`
--

CREATE TABLE `brand` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `img_src` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `brand`
--

INSERT INTO `brand` (`id`, `name`, `img_src`) VALUES
(1, 'bmw', 'img/bmw.png'),
(2, 'audi', 'img/audi.jpg');

-- --------------------------------------------------------

--
-- Структура таблицы `car_part`
--

CREATE TABLE `car_part` (
  `id` int(11) NOT NULL,
  `brand_id` int(11) NOT NULL,
  `model_id` int(11) NOT NULL,
  `engine_id` varchar(150) NOT NULL,
  `part_id` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `car_part`
--

INSERT INTO `car_part` (`id`, `brand_id`, `model_id`, `engine_id`, `part_id`) VALUES
(1, 1, 1, 'aaa123bmw', '1231'),
(2, 1, 1, 'aaa123bmw', '1232'),
(3, 1, 1, 'aaa123bmw', '1233'),
(4, 1, 1, 'aaa123bmw', '1234'),
(5, 1, 1, 'aaa123bmw', '1235'),
(6, 1, 1, 'aaa123bmw', '1236'),
(7, 1, 1, 'aaa123bmw', '1237'),
(8, 1, 1, 'aaa123bmw', '1238');

-- --------------------------------------------------------

--
-- Структура таблицы `engine`
--

CREATE TABLE `engine` (
  `code` varchar(150) NOT NULL,
  `name` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `engine`
--

INSERT INTO `engine` (`code`, `name`) VALUES
('aaa123bmw', '123 engine 2l'),
('aaa456bmw', '456 engine 3l'),
('audi111', '111a 2l'),
('audi222', '222a 3l');

-- --------------------------------------------------------

--
-- Структура таблицы `engine_model`
--

CREATE TABLE `engine_model` (
  `id` int(11) NOT NULL,
  `engine_id` varchar(150) NOT NULL,
  `model_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `engine_model`
--

INSERT INTO `engine_model` (`id`, `engine_id`, `model_id`) VALUES
(1, 'aaa123bmw', 1),
(2, 'aaa456bmw', 2),
(3, 'audi111', 3),
(4, 'audi222', 4),
(5, 'aaa123bmw', 2),
(6, 'aaa456bmw', 1);

-- --------------------------------------------------------

--
-- Структура таблицы `model`
--

CREATE TABLE `model` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `brand_id` int(11) NOT NULL,
  `img_src` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `model`
--

INSERT INTO `model` (`id`, `name`, `brand_id`, `img_src`) VALUES
(1, '5 series', 1, 'img/model_bmw_5_series.jpg'),
(2, '7 series', 1, 'img/model_bmw_7_series.jpg'),
(3, 'Q5', 2, 'img/model_audi_Q5.jpg'),
(4, 'Q7', 2, 'img/model_audi_Q7.jpg'),
(5, '3 series', 1, 'img/model_bmw_3_series.jpg');

-- --------------------------------------------------------

--
-- Структура таблицы `part`
--

CREATE TABLE `part` (
  `code` varchar(150) NOT NULL,
  `name` varchar(200) NOT NULL,
  `price` int(11) NOT NULL,
  `part_type_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `part`
--

INSERT INTO `part` (`code`, `name`, `price`, `part_type_id`) VALUES
('1231', 'Моторное масло синтетическое с30 Liqui Moly (7.5 л)', 6000, 1),
('1232', 'Пробка сливная масляного поддона с уплотнительным кольцом SWAG', 240, 2),
('1233', 'Фильтр масляный Mann', 1110, 3),
('1234', 'Воздушный фильтр Mann', 3060, 4),
('1235', 'Фильтр салона угольный Bosch', 600, 5),
('1236', 'Фильтр топливный\r\nBosch', 2430, 6),
('1237', 'Щетки стеклоочистителя, комлект Touareg/Cayenne (650мм/650мм)\r\nBosch', 1650, 7),
('1238', 'Защита дизельных систем Diesel Systempflege\r\nLiqui Moly', 450, 8);

-- --------------------------------------------------------

--
-- Структура таблицы `part_type`
--

CREATE TABLE `part_type` (
  `id` int(11) NOT NULL,
  `name` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `part_type`
--

INSERT INTO `part_type` (`id`, `name`) VALUES
(1, 'моторное масло'),
(2, 'Сливная пробка масляного поддона'),
(3, 'масляный фильтр'),
(4, 'фильтр воздушный'),
(5, 'фильтр салона'),
(6, 'фильтр топливный'),
(7, 'щетки стеклоочистителя'),
(8, 'защита дизельных систем');

-- --------------------------------------------------------

--
-- Структура таблицы `part_type_for_service`
--

CREATE TABLE `part_type_for_service` (
  `id` int(11) NOT NULL,
  `part_type_id` int(11) NOT NULL,
  `service_for_car_id` int(11) NOT NULL,
  `count` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `part_type_for_service`
--

INSERT INTO `part_type_for_service` (`id`, `part_type_id`, `service_for_car_id`, `count`) VALUES
(1, 1, 1, 1),
(2, 2, 1, 1),
(3, 3, 1, 1),
(4, 4, 2, 1),
(5, 5, 3, 1),
(6, 6, 4, 1),
(7, 7, 5, 1),
(8, 8, 6, 1);

-- --------------------------------------------------------

--
-- Структура таблицы `service`
--

CREATE TABLE `service` (
  `id` int(11) NOT NULL,
  `name` varchar(200) NOT NULL,
  `description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `service`
--

INSERT INTO `service` (`id`, `name`, `description`) VALUES
(1, 'Замена масла в двигателе', 'Замена масла и масляного фильтра в двигателе Вашего автомобиля. Данная процедура рекомендована раз в 5-10 тыс. км.'),
(2, 'Замена свечей зажигания', 'Замена свечей зажигания рекомендована раз в 30-50 тыс. км.'),
(4, 'Замена воздушного фильтра', 'Завод изготовитель рекомендует менять воздушный фильтр каждые 30000км. Мы считаем, что лучше его менять каждое ТО. '),
(5, 'Замена Фильтра', 'На улице много пыли и грязи. Чистый фильтр - это чистый кондиционер и окна, отсутсвие неприяного запаха, и вам будет легче дышать.'),
(6, 'Замена дизельного топливного фильтра', 'Меняется через ТО, если необходимо заменить, просто поставьте галочку.'),
(7, 'Замена дворников стеклоочистителя', 'Как правило, хорошие щетки стеклоочистителя служат от полугода до года. Обычно, автовладельцы забывают про этот необходимый элемент обслуживания. А ведь после замены комфорт вождения повышается многократно, впрочем, как и безопасность.'),
(8, 'Присадка для обслуживания топливной системы', 'Каждое ТО производитель автомобиля рекомендует обслуживать топливную систему. Добавьте банку с удобным дозатором в бак при следующей заправке.'),
(9, 'проверка качества тормозной жидкости', 'Производитель рекомендует менять ее каждые три года. На самом деле, достаточно контролировать содержание в ней воды и грязи.\r\nЭто не сложно делать с помощью специального прибора, и стоит очень не дорого.');

-- --------------------------------------------------------

--
-- Структура таблицы `service_for_car`
--

CREATE TABLE `service_for_car` (
  `id` int(11) NOT NULL,
  `service_id` int(11) NOT NULL,
  `brand_id` int(11) NOT NULL,
  `model_id` int(11) NOT NULL,
  `engine_id` varchar(150) NOT NULL,
  `price` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `service_for_car`
--

INSERT INTO `service_for_car` (`id`, `service_id`, `brand_id`, `model_id`, `engine_id`, `price`) VALUES
(1, 1, 1, 1, 'aaa123bmw', 1200),
(2, 4, 1, 1, 'aaa123bmw', 3200),
(3, 5, 1, 1, 'aaa123bmw', 600),
(4, 6, 1, 1, 'aaa123bmw', 2430),
(5, 7, 1, 1, 'aaa123bmw', 200),
(6, 8, 1, 1, 'aaa123bmw', 450),
(7, 9, 1, 1, 'aaa123bmw', 200);

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `brand`
--
ALTER TABLE `brand`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `car_part`
--
ALTER TABLE `car_part`
  ADD PRIMARY KEY (`id`),
  ADD KEY `brand_id` (`brand_id`),
  ADD KEY `model_id` (`model_id`),
  ADD KEY `engine_id` (`engine_id`),
  ADD KEY `part_id` (`part_id`);

--
-- Индексы таблицы `engine`
--
ALTER TABLE `engine`
  ADD PRIMARY KEY (`code`);

--
-- Индексы таблицы `engine_model`
--
ALTER TABLE `engine_model`
  ADD PRIMARY KEY (`id`),
  ADD KEY `engine_id` (`engine_id`),
  ADD KEY `model_id` (`model_id`);

--
-- Индексы таблицы `model`
--
ALTER TABLE `model`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `part`
--
ALTER TABLE `part`
  ADD PRIMARY KEY (`code`),
  ADD KEY `part_type_id` (`part_type_id`);

--
-- Индексы таблицы `part_type`
--
ALTER TABLE `part_type`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `part_type_for_service`
--
ALTER TABLE `part_type_for_service`
  ADD PRIMARY KEY (`id`),
  ADD KEY `service_for_car_id` (`service_for_car_id`),
  ADD KEY `part_type_id` (`part_type_id`);

--
-- Индексы таблицы `service`
--
ALTER TABLE `service`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `service_for_car`
--
ALTER TABLE `service_for_car`
  ADD PRIMARY KEY (`id`),
  ADD KEY `brand_id` (`brand_id`),
  ADD KEY `engine_id` (`engine_id`),
  ADD KEY `model_id` (`model_id`),
  ADD KEY `service_id` (`service_id`);

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `car_part`
--
ALTER TABLE `car_part`
  ADD CONSTRAINT `car_part_ibfk_1` FOREIGN KEY (`brand_id`) REFERENCES `brand` (`id`),
  ADD CONSTRAINT `car_part_ibfk_2` FOREIGN KEY (`model_id`) REFERENCES `model` (`id`),
  ADD CONSTRAINT `car_part_ibfk_3` FOREIGN KEY (`engine_id`) REFERENCES `engine` (`code`),
  ADD CONSTRAINT `car_part_ibfk_4` FOREIGN KEY (`part_id`) REFERENCES `part` (`code`);

--
-- Ограничения внешнего ключа таблицы `engine_model`
--
ALTER TABLE `engine_model`
  ADD CONSTRAINT `engine_model_ibfk_1` FOREIGN KEY (`engine_id`) REFERENCES `engine` (`code`),
  ADD CONSTRAINT `engine_model_ibfk_2` FOREIGN KEY (`model_id`) REFERENCES `model` (`id`);

--
-- Ограничения внешнего ключа таблицы `part`
--
ALTER TABLE `part`
  ADD CONSTRAINT `part_ibfk_1` FOREIGN KEY (`part_type_id`) REFERENCES `part_type` (`id`);

--
-- Ограничения внешнего ключа таблицы `part_type_for_service`
--
ALTER TABLE `part_type_for_service`
  ADD CONSTRAINT `part_type_for_service_ibfk_1` FOREIGN KEY (`service_for_car_id`) REFERENCES `service_for_car` (`id`),
  ADD CONSTRAINT `part_type_for_service_ibfk_2` FOREIGN KEY (`part_type_id`) REFERENCES `part_type` (`id`);

--
-- Ограничения внешнего ключа таблицы `service_for_car`
--
ALTER TABLE `service_for_car`
  ADD CONSTRAINT `service_for_car_ibfk_1` FOREIGN KEY (`brand_id`) REFERENCES `brand` (`id`),
  ADD CONSTRAINT `service_for_car_ibfk_2` FOREIGN KEY (`engine_id`) REFERENCES `engine` (`code`),
  ADD CONSTRAINT `service_for_car_ibfk_3` FOREIGN KEY (`model_id`) REFERENCES `model` (`id`),
  ADD CONSTRAINT `service_for_car_ibfk_4` FOREIGN KEY (`service_id`) REFERENCES `service` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
