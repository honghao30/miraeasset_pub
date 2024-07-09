const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 3000;

// 정적 파일을 서빙하도록 설정
app.use(express.static('public'));

// 루트 경로로 접근 시 index.html 파일을 서빙
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 동적으로 HTML 파일을 서빙하는 라우트
app.get('/:pageName', (req, res) => {
  const pageName = req.params.pageName;
  const filePath = path.join(__dirname, 'public', `${pageName}.html`);
  
  // 파일 존재 여부 확인
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
        // 파일이 존재하지 않으면 404 에러 처리
        res.status(404).send('Page not found!');
        } else {
        // 파일이 존재하면 해당 파일을 서빙
        res.sendFile(filePath);
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
