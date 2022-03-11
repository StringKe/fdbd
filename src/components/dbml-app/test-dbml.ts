export const TestDBML = ` // 项目名称
Project TestProject {
  // 数据库类型 mysql postgres mssql
  database_type: 'mysql'
  // 描述
  Note: 'Description of the project'
}

// 创建表
Table users as U {
  // pk 主键 increment 自增
  id int [pk, increment]
  full_name varchar
  created_at timestamp
  country_code int
}

Table countries {
  code int [pk]
  name varchar
  continent_name varchar
}

// 创建关联关系
// > 多对一
// < 一对多
// - 一对一
Ref: U.country_code > countries.code
Ref: merchants.country_code > countries.code

Table order_items {
  // 行内一对多关联
  order_id int [ref: > orders.id]
  product_id int
  // 默认值
  quantity int [default: 1]
}

Ref: order_items.product_id > products.id

Table orders {
  // 主键 pk
  id int [pk]
  // 不为空，唯一键
  user_id int [not null, unique]
  status varchar
  // 字段备注，并且不为空
  created_at varchar [note: 'When order created', not null]
}

// 常量
Enum products_status {
  out_of_stock
  in_stock
  // 备注
  running_low [note: 'less than 20']
}

// 复合使用
Table products {
  id int [pk]
  name varchar
  merchant_id int [not null]
  price int
  status products_status
  // 默认值为函数
  created_at datetime [default: \`now()\`]

  // 创建缩影
  Indexes {
    // 当前的 merchant_id 和 status 创建索引名字为 product_status
    (merchant_id, status) [name:'product_status']
    // 设置唯一键
    id [unique]
  }
}

Table merchants {
  id int
  country_code int
  merchant_name varchar

  // 包含特殊字符的字段
  "created at" varchar
  admin_id int [ref: > U.id]
  
  Indexes {
    (id, country_code) [pk]
  }
}

Table merchant_periods {
  id int [pk]
  merchant_id int
  country_code int
  start_date datetime
  end_date datetime
}

Ref: products.merchant_id > merchants.id
// 复合外建 一对多
Ref: merchant_periods.(merchant_id, country_code) > merchants.(id, country_code)
`
