const fs = require('fs');

// 引入依赖文件
const aiResult = require('./Results');
const queryFunc = require('./query');
const invokeFunc = require('./invokeTrue');
const updateFunc = require('./update');

// 文件名与准确率的String
const fileName = 'AiRes_' + aiResult.cnt + '.txt';
const accuracy = 'The AI dection accuracy of user uploaded photo is ' + aiResult.ratio * 100 + '%';

// 开始读取数据
fs.readFile(fileName, (err, buf) => {
  let result = false;
  console.log(buf.toString());
  
  // 如果通过检测 
  if(buf.toString() == 'true')
    result = true;
  // 如果已经判断过 or 未通过检测
  else {
    console.log("理赔已完成");
    return;
  }

  // 查询当前情况
  queryFunc();

  // 执行理赔
  if(result) {
    invokeFunc();
  }

  // 再次查询，看是否更新
  setTimeout(() => {
    updateFunc();
    setTimeout(() => {
      fs.writeFile(fileName, "done", () => {
        console.log("Updating Finished.");
      });
    }, 1000)
  }, 5000);

})

