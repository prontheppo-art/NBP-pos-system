-- ========================================================
-- FILE: schema.sql
-- Date: 15/9/2569 13:49:32
-- ========================================================

-- TABLE: public.customer_types
CREATE TABLE IF NOT EXISTS public.customer_types (
    customer_type_id BIGINT,
    type TEXT
);

-- TABLE: public.customers
CREATE TABLE IF NOT EXISTS public.customers (
    customer_id BIGINT,
    name TEXT
);

-- TABLE: public.food_groups
CREATE TABLE IF NOT EXISTS public.food_groups (
    food_group_id BIGINT,
    name TEXT
);

-- TABLE: public.foods
CREATE TABLE IF NOT EXISTS public.foods (
    food_id BIGINT,
    name TEXT,
    food_group_id BIGINT,
    price_1 BIGINT,
    price_2 BIGINT,
    price_3 BIGINT
);

-- TABLE: public.locations
CREATE TABLE IF NOT EXISTS public.locations (
    location_id BIGINT,
    name TEXT
);

-- TABLE: public.orders
CREATE TABLE IF NOT EXISTS public.orders (
    order_id BIGINT,
    created_at TIMESTAMPTZ,
    total_price BIGINT,
    total_qty BIGINT,
    items JSONB,
    name_phone TEXT,
    customer_type_id BIGINT,
    note TEXT,
    location_id BIGINT,
    zone_id BIGINT,
    delivery_fee BIGINT,
    subtotal BIGINT,
    customer_id BIGINT
);

-- TABLE: public.zones
CREATE TABLE IF NOT EXISTS public.zones (
    zone_id BIGINT,
    name TEXT,
    location_id BIGINT
);
