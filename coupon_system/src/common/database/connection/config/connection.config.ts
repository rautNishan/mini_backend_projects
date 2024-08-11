export default () => ({
  data_base_type: process.env.DATA_BASE_TYPE || 'postgres',
  data_base_host: process.env.DATA_BASE_HOST,
  data_base_port: parseInt(process.env.DATA_BASE_PORT),
  data_base_userName: process.env.DATA_BASE_USER_NAME,
  data_base_password: process.env.DATA_BASE_PASSWORD,
  data_base_name: process.env.DATA_BASE_NAME,
});
