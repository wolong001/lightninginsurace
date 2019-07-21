# P002-LightningInsurace

闪电保险项目说明书
一、项目简介
闪电保险项目是一款利用人工智能技术进行快速、准确核保，利用区块链技术确认合作与利益分配关系、加强企业间互信的保险平台，是一款利用先进计算机科研技术的金融科技产品。
冗长的保险审核流程，对于遭受意外损失的投保人来说是一个漫长痛苦的过程。闪电保险平台能够在分钟级完成对投保人的核保、赔保业务，大幅增进用户体验，进而增强投保人信任度与购买量，促进我国保险行业增长。目前应用场景有交通事故快速理赔等。
二、环境搭建
AI部分预备工作：
## 安装CUDA
1.**下载安装文件**（驱动和CUDA）。推荐去英伟达官网下载。
2.卸载当前驱动并重启
```
sudo /usr/bin/nvidia-uninstall
reboot
```
3.关闭图形界面安装新驱动
```
ctrl+alt+F1
sudo service lightdm stop
sudo chmod a+x NVIDIA-Linux-x86_64-430.34.run
sudo su
./ NVIDIA-Linux-x86_64-430.34.run
```
4.安装CUDA
```
sudo chmod a+x cuda_10.1.168_418.67_linux.run
sudo su
./ cuda_10.1.168_418.67_linux.run
```
5.重启
## 运行training
运行文件.../ISIC_2018_classification-master/main_1.py
输出net架构，训练集，模拟集的情况以及validate的精度acc
## 运行调用模型检测图片
运行文件.../AI_classification/main_1.py
会将结果写入固定的路径下的json文件
三、具体框架
1）AI使用方法：基于CVPR2017 google brain在论文《Learning Transferable Architectures for Scalable Image Recognition》中提出的NASNET网络架构进行的调整和修改之后的深度学习算法。
整体架构：如下图所示，NASNET是在之前的一篇论文NAS–Neural Architecture Search With Reinforcement Learning的基础做了突破性的改进，使得能让机器在小数据集（CIFAR-10数据集）上自动设计出CNN网络，并利用迁移学习技术使得设计的网络能够被很好的迁移到大数据集（ImageNet数据集），同时也可以迁移到其他的计算机视觉任务上（如目标检测）。但是实际上reinforcement learning在学习预测过程中计算量过大，而我们没有谷歌强大的算力，而RNN实际上可以替代此处reinforcement learning的作用，所以我们改用了RNN。



2）网络架构：采用了cifar-10和ImageNet的网络结构，由于cifar-10的网络输入为32*32，而ImageNet的网络输入为299*299，因此，ImageNet网络具有更多的模块堆叠，更大的深度。网络结构中主要包含2个模块，Normal cell和Reduction cell。然后进行这2个模块的堆叠形成最终的网络。其中堆叠的方式是由RNN预测出来的。




3）搜索过程：控制器RNN从搜索空间中以概率p预测网络结构A。worker单元，学习该网络直到收敛，并得到准确性R。最终将梯度p*R传递给RNN控制器进行梯度更新。控制器依次搜索隐藏状态，隐藏状态，何种操作，何种操作，何种组合方法，这5个方法和操作的组合。其中，每种方法，每种操作都对应于一个softmax损失。这样重复B次，得到一个最终block模块。最终的损失函数就有5B个。

4）预测步骤：
共是5个步骤： 
Step1：从hidden states（前面block中产生的）中选择一个hidden state—hi-1； 
Step2：重复step的操作，选择一个hidden state—hi； 
Step3：为step1中选择的hidden state选择一个操作； 
Step4：为step2中选择的hidden state选择一个操作； 
Step5：选择一个方法去连接step3和step4中的输出从而产生一个new hidden state，并将其添加到hidden states中。 

四、区块链技术与智能合约
```
|--build        // built WebAssembly targets
|--contract     // 智能合约
|--migrations   // 部署位置
/*
deploy(contracts_files_path, deploy_account) 第一个参数为合约目标文件的绝对路径，第二个合约部署者账号.
*/
|--templates    // 一些合同模板
|--test         // 测试文件 
|--config.js    // 图形或组合的部件或元件的布置
```
智能合约部分：
通过实现Serializable接口构造三个类，并建立三个数据表用来存储
```
@database(Company, companytable)  
@database(Consumer, consumertable)  
@database(Insurance, insurancetable) 
```
智能合约中实现的功能包括

```go
addCompany(name: account_name,balance: u32,contribution: u32,introduce: string): void//添加公司

addConsumer(name: account_name,sex: string,age: u8): void//添加购买者
addInsurance(id: account_name,name: string,ofCompany: string,price: u32,remaining: u32,money: u32): void//添加保险项
public buyIns(name: account_name,id: account_name,total: u32):void//购买保险
```
无、项目综述
本项目的前后端和数据库对的架构是React+NodeJS+MongoDB，其中，React用于前端页面的展示，NodeJs 作为后端服务器响应前端请求，并与MongoDB交互，MongoDB作为服务器，保存用户信息。
当用户初次注册时，将在前端对用户输入的账号密码进行基本的表单验证，在验证通过后，前端服务器将使用cryptico对用户密码进行加密，并通过axios向后端Node服务器发起Post请求。
后端服务器得到前端的请求后，将用户密码解密，使用Mongoose在MongoDB中进行查询，如果该用户名没有被注册过就进行插入操作，并向前端发送注册成功的response。
前端收到注册成功的响应后，将页面状态改为“已登录”，并跳转到已登录界面。在用户再次登录时，也会按类似的流程进行用户账号密码一致性的验证。
在用户登录系统后，可以选择“购买保险”,查看“我的保险”和“安全退出”，其中：
* “购买保险”:


  将展示当下的热门保险产品，用户可以选择“查看详情”或“立即购买”,当用户点击“立即购买”并填写相关信息后，并将相关信息上链。
* 查看“我的保险”:
 
  用户可以对当前已购买的保险进行理赔申请，点击“申请配保”并上传证明文件后：


  后端服务器将运行执行AI决策的Python文件，对用户上传的图片进行研判，并在几秒内给出对应于赔偿级别的三个损害级别，前端得到判定结果后，如果判定结果和用户申请的级别不一致，提示用户重新选择申请级别或重新上传图片，如果一致，就提示用户判定成功，将把结果上传到区块链上，并进行链端和后台服务器之间的交互。


