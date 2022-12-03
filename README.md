# Telexercise
Dự án được lấy cảm hứng từ ứng dụng [Kahoot] (https://kahoot.com).Chức năng chính của ứng dụng là việc tạo ra các trò chơi giáo dục dưới dạng các câu đố, sau đó có thể được giải quyết bởi một số sinh viên cùng một lúc dưới dạng một trò chơi.Các câu đố có thể được tạo ra với việc sử dụng một trình hướng dẫn đặc biệt cho phép bạn chọn loại câu hỏi, xác định phương pháp trao điểm và thời gian trả lời cho một câu hỏi cụ thể và số lượng câu trả lời đúng.Trong bài kiểm tra, giáo viên đóng vai trò là người dẫn chương trình tạo ra một căn phòng mà học sinh có thể truy cập bằng mã truy cập.Trong trò chơi, sinh viên thấy bảng điểm sau mỗi câu hỏi trong thời gian thực.Các câu đố được chia thành công cộng và riêng tư.Mỗi người đăng nhập người dùng có thể xem danh sách các câu đố công khai, thêm lượt thích và nhận xét cho họ.

## Installation

Client side

```bash
cd client
npm install
```

Server side

```bash
cd server
npm install
```

## Run the app

You need four terminal instances - one for client app and three for backend servers.

```bash
cd client
npm start
```

```bash
cd server
npm run devStart
```

```bash
cd server
npm run devStartAuth
```

```bash
cd server
npm run devStartSocket
```

## Installation MongoDB


## Env configuration
Create a new file environment (.env):
```bash
DATABASE_URL=string (your database url)
PORT=3000 (required number)
AUTH_PORT=4000 (required number)
ACCESS_TOKEN_SECRET=string (required string, example 'jwtabc')
REFRESH_TOKEN_SECRET=string (required string, example 'jwtabcd')
```


