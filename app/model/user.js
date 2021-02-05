'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const User = app.model.define('user', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    uuid:STRING(20),
    user_name:STRING,
    user_number:STRING,
    user_type:INTEGER(10),
    avator_url:STRING,
    login_num:INTEGER(10),
    create_time: DATE,
    last_login_time: DATE,
  });
  // 表关联的字段
  User.associate = function (){
    app.model.User.hasOne(app.model.UserLogin, {as:'menu',sourceKey: 'uuid',foreignKey:'uuid'});   
  }

  return User;
};

