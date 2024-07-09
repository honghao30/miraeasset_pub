const path = require('path');

module.exports = {
    mode: 'production', 
    entry: './src/js/index.js', 
    output: {
        filename: 'index.js', // 출력 파일명 설정
        path: path.resolve(__dirname, 'public', 'assets', 'js'), // 출력 경로 설정
    },
    module: {
        rules: [
        {
            test: /\.js$/, // .js 확장자 파일에 대해서만 로더 적용
            exclude: /node_modules/, // node_modules 폴더 제외
            use: {
            loader: 'babel-loader', // babel 로더 사용
            },
        },
        ],
    },
};