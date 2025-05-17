// index.js
const express = require('express');
const cors = require('cors'); // 引入 cors，方便跨域测试
const app = express();
const PORT = process.env.PORT || 3000;

// --- 中间件 ---
// 1. 解析 JSON 格式的请求体
app.use(express.json());
// 2. 解析 URL-encoded 格式的请求体 (例如来自 HTML 表单)
app.use(express.urlencoded({ extended: true }));
// 3. 启用 CORS (允许所有来源，生产环境应配置更严格)
app.use(cors());

// --- 路由 ---
app.get('/', (req, res) => {
  res.send('Hello from Render API! Send a POST request to /api/echo with JSON body.');
});

// 原来的 GET 路由，可以保留或修改
app.get('/api/data', (req, res) => {
  res.json({ message: 'This is some data from the API (GET)', timestamp: new Date() });
});

// 新增的 POST 路由，用于接收并回显数据
// 为了区分，我们把路径改为 /api/echo 或者 /api/submit-data
app.post('/api/echo', (req, res) => {
  const receivedData = req.body; // req.body 会包含 POST 请求发送过来的 JSON 数据

  console.log('Received data in /api/echo:', receivedData);

  // 检查是否收到了数据
  if (Object.keys(receivedData).length === 0 && receivedData.constructor === Object) {
    // 如果是空对象，可以返回一个提示
    return res.status(400).json({
      error: 'No data received in POST request body.',
      message: 'Please send data in the request body, e.g., {"name": "John Doe"}'
    });
  }

  // 将收到的数据原样返回，或者包装一下再返回
  res.json({
    message: 'Data received successfully!',
    yourData: receivedData, // 这里是你POST过来的数据
    timestamp: new Date()
  });
});

app.listen(PORT, '0.0.0.0', () => { 
  console.log(`Server is running on port ${PORT}`);
  console.log(`Try GET: http://localhost:${PORT}/api/data`);
  console.log(`Try POST to http://localhost:${PORT}/api/echo with a JSON body like: {"name": "Test User", "message": "Hello API"}`);
});