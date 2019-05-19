-- phpMyAdmin SQL Dump
-- version 4.7.7
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3307
-- Время создания: Май 20 2019 г., 02:41
-- Версия сервера: 5.6.38
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
  `brand_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `model`
--

INSERT INTO `model` (`id`, `name`, `brand_id`) VALUES
(1, '5 series', 1),
(2, '7 series', 1),
(3, 'Q5', 2),
(4, 'Q7', 2),
(5, '3 series', 1);

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
(2, 'Замена свечей зажигания', 'Замена свечей зажигания рекомендована раз в 30-50 тыс. км.');

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
(1, 1, 1, 1, 'aaa123bmw', 1000),
(2, 2, 1, 1, 'aaa123bmw', 5000),
(3, 1, 1, 2, 'aaa123bmw', 1000),
(4, 2, 1, 2, 'aaa456bmw', 6000);

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `brand`
--
ALTER TABLE `brand`
  ADD PRIMARY KEY (`id`);

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
-- Ограничения внешнего ключа таблицы `engine_model`
--
ALTER TABLE `engine_model`
  ADD CONSTRAINT `engine_model_ibfk_1` FOREIGN KEY (`engine_id`) REFERENCES `engine` (`code`),
  ADD CONSTRAINT `engine_model_ibfk_2` FOREIGN KEY (`model_id`) REFERENCES `model` (`id`);

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
